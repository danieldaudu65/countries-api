"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const countriesRoute_1 = __importDefault(require("./routes/countriesRoute"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000; // Define the port on which the server will listen to [4000] if not specifies
// Middleware to parse JSON request bodies
app.use(body_parser_1.default.json());
// Mount the countries router at the '/api/countries' path
app.use('/api/countries', countriesRoute_1.default);
// Start the server and listen on the defined port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
