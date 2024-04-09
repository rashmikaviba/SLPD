import express from 'express';
import { adddetails } from '../controllers/auth.controller.js';

const router = express.Router();


router.post('/adddetails', adddetails);


export default router;