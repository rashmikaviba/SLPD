import mongoose from 'mongoose';

const payslipSchema = new mongoose.Schema({
  driverNo: { type: String, required: true },
  HMdate: { type: Number, required: true },
  specialAllowance: { type: Number, required: true },
  grossSalary: { type: Number, required: true },
  netSalary: { type: Number, required: true }
});

const Payslip = mongoose.model('Payslip', payslipSchema);

export default Payslip;
