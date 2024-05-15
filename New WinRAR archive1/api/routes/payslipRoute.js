import express from 'express';
import {
  createPayslip,
  getPayslips,
  getPayslipById,
  updatePayslip,
  deletePayslip
} from '../controllers/payslipController.js';

const router = express.Router();

router.post('/add', createPayslip);
router.get('/get', getPayslips);
router.get('/:id', getPayslipById);
router.put('/:id', updatePayslip);
router.delete('/:id', deletePayslip);

export default router;
