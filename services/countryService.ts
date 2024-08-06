import axios from "../node_modules/axios/index";


// Base URL for the REST Countries API
const BASE_URL = 'https://restcountries.com/v3.1'; 

/** 
 * Fetches data for all countries from the REST Countries API.
 * @returns {Promise<any[]>} - A promise that resolves to an array of country data.
 */ 

export const fetchAllCountries = async () => {

  try {
    // Send a GET request to the '/all' endpoint to fetch data for all countries
    const response = await axios.get(`${BASE_URL}/all`);

    return response.data; 
  } 

  catch (error) {
    // Handle any errors that occur during the API request
    console.error('Error fetching all countries:', error);
    throw error; 
  }
};
