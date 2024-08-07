"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const countriesRoute_1 = __importDefault(require("./routes/countriesRoute")); // Make sure this path is correct
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4500;
app.use(body_parser_1.default.json());
// Mount the router
app.use('/api/countries', countriesRoute_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
