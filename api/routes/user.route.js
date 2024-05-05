import express from 'express';
import { signup } from '../controllers/auth.controller.js'; // Importing signup function from auth.controller.js
import { test } from '../controllers/user.controller.js'; // Importing test function from user.controller.js
import { updateTrip, getTripByUsername, getTripByKey } from '../controllers/auth.controller.js';
import { deleteTripByUsername } from '../controllers/auth.controller.js';
import {getAllTrips} from '../controllers/auth.controller.js';
import {markTripAsComplete,deleteTripById} from '../controllers/auth.controller.js';


const router = express.Router();

// Signup route
router.post('/signup', signup);

// Test route
router.get('/test', test);

//Update the trip route
router.put('/trip/:userName', updateTrip);

// Get trip by username route
router.get('/trip/:userName', getTripByUsername);

// Get trip by username or tripid route
router.get('/trip/:key/:value', getTripByKey);  

// Delete trip route
router.delete('/trip/:username', deleteTripByUsername);

// Get all trips route
router.get('/trips', getAllTrips);

// Update trip status to completed route
router.put('/trip/complete/:id', markTripAsComplete);

// Delete trip by ID route
router.delete('/trip/:id', deleteTripById);



export default router;
