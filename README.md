# Countries API

## Overview

This project is a REST API built with TypeScript and Express, integrating data from the REST Countries API. It provides endpoints to fetch country information, regions, languages, and aggregated statistics.

## Setup Instructions

1. Clone the repository  `git clone https://github.com/danieldaudu65country-api.git`

2. Install dependencies: `npm install`

3. Create a `.env` file add your environment variables (if needed). For now, this project does not require any specific environment variables.

4. Start the server: `npm run start`

## Endpoints

- `GET /api/countries`:     Retrieve a list of countries
- `GET /api/countries/:id`: Retrieve detailed information for a specific country
- `GET /api/regions`:       Retrieve a list of regions and the countries within each region
- `GET /api/languages`:     Retrieve a list of languages and the countries where they are spoken
- `GET /api/statistics`:    Provide aggregated statistics

## Highlights

- Implemented efficient data processing and caching strategies
- Secured the API against common vulnerabilities
- Provided comprehensive API documentation with Swagger

## Potential Improvements

- Enhance caching strategies
- Added more detailed error handling
- Implemented more advanced filtering and sorting options


## Contributions

- Feel free to submit issues or pull requests. Contributions are welcome!

