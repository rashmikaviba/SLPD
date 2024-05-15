import Payslip from '../models/payslip.js';

export const createPayslip = async (req, res) => {
  try {
    const payslip = new Payslip(req.body);
    await payslip.save();
    res.status(201).json(payslip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getPayslips = async (req, res) => {
  try {
    const payslips = await Payslip.find();
    res.status(200).json(payslips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getPayslipById = async (req, res) => {
  try {
    const payslip = await Payslip.findById(req.params.id);
    if (!payslip) {
      return res.status(404).json({ message: 'Payslip not found' });
    }
    res.status(200).json(payslip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updatePayslip = async (req, res) => {
  try {
    const payslip = await Payslip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!payslip) {
      return res.status(404).json({ message: 'Payslip not found' });
    }
    res.status(200).json(payslip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deletePayslip = async (req, res) => {
  try {
    const payslip = await Payslip.findByIdAndDelete(req.params.id);
    if (!payslip) {
      return res.status(404).json({ message: 'Payslip not found' });
    }
    res.status(200).json({ message: 'Payslip deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
