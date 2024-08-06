import { Request, Response } from 'express';
import { fetchAllCountries } from '../services/countryService';
import axios from '../node_modules/axios/index';
// Define the structure of country data
interface Country {
  name: {
    common: string;
  };
  population: number;
  area: number;
  languages?: {
    [key: string]: string;
  };
}

// Helper function to format numbers with commas for better readability
const formatNumberWithCommas = (num: number): string => {
  return num.toLocaleString(); // Converts number to a string with commas
};

// Endpoint to fetch all countries with optional filters and pagination
export const getAllCountries = async (req: Request, res: Response) => {
  try {
    // Extract query parameters with default values
    const { page = 1, limit = 10, region, minPopulation, maxPopulation } = req.query;
    
    // Fetch all countries from the service
    const countries = await fetchAllCountries();

    // Apply filtering based on the region if provided
    let filteredCountries = countries;
    if (region) {
      filteredCountries = filteredCountries.filter((country: any) => country.region === region);
    }


    // Apply filtering based on population range if provided
    if (minPopulation) {
      filteredCountries = filteredCountries.filter((country: any) => country.population >= Number(minPopulation));
    }
    if (maxPopulation) {
      filteredCountries = filteredCountries.filter((country: any) => country.population <= Number(maxPopulation));
    }


    // Calculate pagination indices
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = Number(page) * Number(limit);


    const paginatedCountries = filteredCountries.slice(startIndex, endIndex);


    // Respond with paginated results and metadata
    res.json({
      total: filteredCountries.length,
      page: Number(page),
      limit: Number(limit),
      data: paginatedCountries
    });
  } 
  
  catch (error) {
    res.status(500).json({ error: 'Failed to fetch countries' });
  }
};

// Endpoint to fetch detailed information about a country by its name
export const getCountryByName = async (req: Request, res: Response) => {
  const { name } = req.query;

  // Validate the 'name' query parameter
  if (typeof name !== 'string') {
    return res.status(400).json({ error: 'Invalid country name' });
  }

  try {
    // Fetch country data from the REST Countries API
    const response = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`);

    // Check if the country was found
    if (response.data.length === 0) {
      return res.status(404).json({ error: 'Country not found' });
    }

    // Extract country data from the API response
    const countryData = response.data[0];

    // Format population and area for readability
    const formattedPopulation = countryData.population ? formatNumberWithCommas(countryData.population) : 'N/A';
    const formattedArea = countryData.area ? formatNumberWithCommas(countryData.area) : 'N/A';

    // Fetch names of bordering countries
    const borderPromises = countryData.borders?.map(async (border: string) => {
      try {
        const borderResponse = await axios.get(`https://restcountries.com/v3.1/alpha/${border}`);
        return borderResponse.data[0].name.common;
      } catch {
        return null;  // If there's an error fetching a border country, return null
      }
    });

    const borderingCountries = borderPromises ? (await Promise.all(borderPromises)).filter(name => name) : [];

    // Format languages into a readable string
    const languages = countryData.languages ? Object.entries(countryData.languages).map(([code, name]) => `${name} (${code})`).join(', ') : 'N/A';

    // Construct detailed country information
    const detailedCountryInfo = {
      name: countryData.name.common,
      languages: languages,
      population: formattedPopulation,
      area: formattedArea + ' km²',
      bordering_Countries: borderingCountries.length > 0 ? borderingCountries.join(', ') : 'None',
    };

    // Respond with detailed country information
    res.status(200).json(detailedCountryInfo);
  } 
  catch (error) {
    console.error('Error fetching country data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Endpoint to fetch aggregated data about regions
export const getRegions = async (req: Request, res: Response) => {
  try {
    // Fetch all countries
    const countries = await fetchAllCountries();

    // Group countries by region and calculate aggregated data
    const regions: { [key: string]: any[] } = {};
    countries.forEach((country: any) => {
      if (country.region) {
        if (!regions[country.region]) {
          regions[country.region] = [];
        }
        regions[country.region].push({
          name: country.name.common,
          population: country.population,
          area: country.area,
          languages: country.languages,
        });
      }
    });

    // Calculate total population and area for each region
    const regionsWithAggregatedData = Object.entries(regions).map(([region, countries]) => {
      const totalPopulation = countries.reduce((sum, country) => sum + country.population, 0);
      const totalArea = countries.reduce((sum, country) => sum + country.area, 0);

      return {
        region,
        countries: countries.map((country: any) => ({
          name: country.name,
          population: formatNumberWithCommas(country.population),
          area: formatNumberWithCommas(country.area),
          languages: country.languages ? Object.values(country.languages).join(', ') : 'N/A',
        })),
        totalPopulation: formatNumberWithCommas(totalPopulation),
        totalArea: formatNumberWithCommas(totalArea),
      };
    });

    // Respond with regions and aggregated data
    res.status(200).json({
      message: `There are ${regionsWithAggregatedData.length} regions.`,
      data: regionsWithAggregatedData,
    });
  } 
  catch (error) {
    // Handle errors by logging and sending a 500 response
    console.error('Error fetching regions data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Endpoint to fetch language statistics across all countries
export const getLanguages = async (req: Request, res: Response) => {
  try {
    // Fetch all countries
    const countries: Country[] = await fetchAllCountries();

    // Aggregate language data across all countries
    const languages: { [key: string]: { countries: string[], totalSpeakers: number } } = {};

    countries.forEach((country: Country) => { 
      if (country.languages) { 
        Object.entries(country.languages).forEach(([langCode, langName]) => {
          if (!languages[langName]) {
            languages[langName] = { countries: [], totalSpeakers: 0 };
          }
          if (!languages[langName].countries.includes(country.name.common)) {
            languages[langName].countries.push(country.name.common);
          }
          if (country.population) {
            languages[langName].totalSpeakers += country.population;
          }
        });
      }
    });

    // Get total number of languages
    const totalLanguages = Object.keys(languages).length;

    // Format total speakers for each language
    const languageData = Object.entries(languages).map(([lang, data]) => ({
      language: lang,
      countries: data.countries,
      totalSpeakers: formatNumberWithCommas(data.totalSpeakers)
    }));

    // Respond with language statistics and total number of languages
    res.status(200).json({
      totalLanguages: `There are ${totalLanguages} languages in total.`,
      languages: languageData
    });
  } catch (error) {
    // Handle errors by logging and sending a 500 response
    console.error('Error fetching language data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Endpoint to fetch various statistics about countries
export const getStatistics = async (req: Request, res: Response) => {
  try {
    // Fetch all countries
    const countries: Country[] = await fetchAllCountries();

    // Initialize variables for statistics
    let totalCountries = 0;
    let largestCountry = { name: '', area: 0 };
    let smallestCountry = { name: '', population: Number.MAX_SAFE_INTEGER };
    const languageCount: { [key: string]: number } = {};

    // Calculate statistics by iterating through countries
    countries.forEach((country) => {
      totalCountries += 1;

      // Determine the largest country by area
      if (country.area > largestCountry.area) {
        largestCountry = { name: country.name.common, area: country.area };
      }

      // Determine the smallest country by population
      if (country.population < smallestCountry.population) {
        smallestCountry = { name: country.name.common, population: country.population };
      }

      // Aggregate language data
      if (country.languages) {
        Object.values(country.languages).forEach((language) => {
          if (!languageCount[language]) {
            languageCount[language] = 0;
          }
          languageCount[language] += country.population;
        });
      }
    });

    // Find the most widely spoken language
    let mostWidelySpokenLanguage = { language: '', totalSpeakers: 0 };
    for (const [language, count] of Object.entries(languageCount)) {
      if (count > mostWidelySpokenLanguage.totalSpeakers) {
        mostWidelySpokenLanguage = { language, totalSpeakers: count };
      }
    }

    // Construct the statistics object
    const statistics = {
      totalCountries: formatNumberWithCommas(totalCountries),
      largestCountry: {
        name: largestCountry.name,
        area: formatNumberWithCommas(largestCountry.area)
      },
      smallestCountry: {
        name: smallestCountry.name,
        population: formatNumberWithCommas(smallestCountry.population)
      },
      mostWidelySpokenLanguage: {
        language: mostWidelySpokenLanguage.language,
        totalSpeakers: formatNumberWithCommas(mostWidelySpokenLanguage.totalSpeakers)
      },
    };

    // Respond with the statistics
    res.status(200).json(statistics);
  } 
  catch (error) {
    // Handle errors by logging and sending a 500 response
    console.error('Error fetching statistics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
