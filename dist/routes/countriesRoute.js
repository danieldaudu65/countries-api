"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const countryController_1 = require("../controllers/countryController"); // Import controller functions for handling requests
const router = (0, express_1.Router)();
// Route to get a list of all countries with optional filtering and pagination
router.get('/', countryController_1.getAllCountries);
// Route to get detailed information about a country by its name
router.get('/name', countryController_1.getCountryByName);
// Route to get aggregated data about regions
router.get('/regions', countryController_1.getRegions);
// Route to get statistics and information about languages spoken in countries
router.get('/languages', countryController_1.getLanguages);
// Route to get various statistics about countries (largest, smallest, etc.)
router.get('/statistics', countryController_1.getStatistics);
exports.default = router;
