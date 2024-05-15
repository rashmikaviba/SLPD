import express from 'express';
import { createEmployee,getEmployees } from '../controllers/employeeController.js';


const router = express.Router();

router.post('/add', createEmployee);
router.get('/get', getEmployees);

export default router;
