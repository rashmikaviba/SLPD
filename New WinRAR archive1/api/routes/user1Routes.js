import express from 'express';
import { createUser,getUsers } from '../controllers/user1Controller.js';


const router = express.Router();

router.post('/add', createUser);
router.get('/get', getUsers);

export default router;
