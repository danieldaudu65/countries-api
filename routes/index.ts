import { Router } from 'express'; 
import countryRoutes from './countriesRoute'; 

const router = Router(); 

// Use the imported countryRoutes for any routes starting with '/countries'
router.use('/countries', countryRoutes);

export default router;   
     