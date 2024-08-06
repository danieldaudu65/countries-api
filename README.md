# Countries API

## Overview

This project is a REST API built with TypeScript and Express, integrating data from the REST Countries API. It provides endpoints to fetch country information, regions, languages, and aggregated statistics. The API serves as a comprehensive resource for accessing global country data and is designed to be efficient and easy to use.

## Implementation Approach

The implementation involves:

1. **Setting Up the Server**: Utilized Express to create the server and handle HTTP requests.

2. **Fetching Data**: Used Axios to retrieve data from the REST Countries API.

3. **Data Processing**: Aggregated and formatted data to provide meaningful insights about countries, regions, and languages.

4. **Error Handling**: Incorporated robust error handling to manage potential issues with data retrieval or processing.

5. **Endpoints**: Defined clear endpoints for fetching various types of information related to countries.



## Setup Instructions

1. Clone the repository  `git clone https://github.com/danieldaudu65country-api.git`

2. Install dependencies: `npm install`

3. Create a `.env` file add your environment variables (if needed). For now, this project does not require any specific environment variables.

4. Start the server: `npm run start`



## Endpoints

- **`GET /api/countries`**: Retrieve a list of all countries.
- **`GET /api/countries/name`**: Retrieve information about countries by their names.
- **`GET /api/regions`**: Retrieve a list of regions and the countries within each region.
- **`GET /api/languages`**: Retrieve a list of languages spoken across countries, including the total number of speakers and the countries where each language is spoken.
- **`GET /api/statistics`**: Provide aggregated statistics about countries and languages.


## Highlights

- **Efficient Data Processing**: Aggregates and formats data for languages and regions, providing a comprehensive view of global language statistics.
- **Error Handling**: Includes robust error handling to manage server issues and provide meaningful responses in case of errors.
- **Detailed API Responses**: Provides detailed and well-structured responses for various endpoints, making the API easy to use for developers.


## Challenges and Features

- **Data Aggregation**: One of the key challenges was aggregating language data across countries and ensuring accurate statistics. The approach taken involved iterating over the fetched data and carefully managing the aggregation process.
- **Error Handling**: Implemented error handling to deal with potential issues during data fetching and processing, ensuring a smooth user experience.


## Aspects I'm Proud Of

- **Comprehensive Language Statistics**: The implementation provides a detailed overview of languages spoken around the world, including the total number of speakers and the countries where each language is spoken.
- **Robust Error Handling**: The API is designed to handle errors gracefully, providing useful feedback in case of issues.

## Potential Improvements

- **Enhance Caching Strategies**: Implement more advanced caching mechanisms to improve performance and reduce the load on the external API.
- **Advanced Filtering and Sorting**: Add additional options for filtering and sorting data to allow more tailored queries.
- **Extended Documentation**: Improve documentation to cover all aspects of the API in more detail and provide usage examples.

## Contributing

Feel free to submit issues or pull requests. Contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
