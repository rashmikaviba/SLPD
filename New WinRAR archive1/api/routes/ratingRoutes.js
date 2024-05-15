import express from 'express';
import { addRating, getAllRatings, editRating, deleteRating, getRatingById } from '../controllers/ratingController.js';

const router = express.Router();

router.post('/add', addRating);
router.get('/', getAllRatings);
router.put('/edit/:id', editRating);
router.delete('/delete/:id', deleteRating);
router.get('/:id', getRatingById);



export default router;
