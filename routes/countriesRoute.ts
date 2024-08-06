import { Router } from 'express'; 
import { getAllCountries, getCountryByName, getRegions, getLanguages, getStatistics } from '../controllers/countryController'; // Import controller functions for handling requests
   
  
const router = Router();

// Route to get a list of all countries with optional filtering and pagination
router.get('/', getAllCountries);

// Route to get detailed information about a country by its name
router.get('/name',  getCountryByName);

// Route to get aggregated data about regions
router.get('/regions', getRegions);

// Route to get statistics and information about languages spoken in countries
router.get('/languages', getLanguages);

// Route to get various statistics about countries (largest, smallest, etc.)
router.get('/statistics', getStatistics);

export default router; 
