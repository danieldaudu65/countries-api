import express from 'express'; 
import bodyParser from 'body-parser';
import countriesRoute from './routes/countriesRoute';

const app = express(); 
const PORT = process.env.PORT || 4000; // Define the port on which the server will listen to [4000] if not specifies

 
// Middleware to parse JSON request bodies
app.use(bodyParser.json()); 

  
// Mount the countries router at the '/api/countries' path
app.use('/api/countries', countriesRoute);
 

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
