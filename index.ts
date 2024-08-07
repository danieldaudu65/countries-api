import express from 'express';
import bodyParser from 'body-parser';
import countriesRoute from './routes/countriesRoute'; // Make sure this path is correct

const app = express();
const PORT = process.env.PORT || 4500;

app.use(bodyParser.json());

// Mount the router
app.use('/api/countries', countriesRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
