"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const countriesRoute_1 = __importDefault(require("./countriesRoute"));
const router = (0, express_1.Router)();
// Use the imported countryRoutes for any routes starting with '/countries'
router.use('/countries', countriesRoute_1.default);
exports.default = router;
