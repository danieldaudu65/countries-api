# Countries API

## Overview

This project is a REST API built with TypeScript and Express, integrating data from the REST Countries API. It provides endpoints to fetch country information, regions, languages, and aggregated statistics.

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file and add your environment variables
4. Start the server: `npm run start`

## Endpoints

- `GET /api/countries`: Retrieve a list of countries
- `GET /api/countries/:id`: Retrieve detailed information for a specific country
- `GET /api/regions`: Retrieve a list of regions and the countries within each region
- `GET /api/languages`: Retrieve a list of languages and the countries where they are spoken
- `GET /api/statistics`: Provide aggregated statistics

## Highlights

- Implemented efficient data processing and caching strategies
- Secured the API against common vulnerabilities
- Provided comprehensive API documentation with Swagger

## Potential Improvements

- Enhance caching strategies
- Add more detailed error handling
- Implement more advanced filtering and sorting options
