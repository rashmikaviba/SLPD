import Employee from '../models/employee.js';

export const createEmployee = async (req, res) => {
  try {
    const newEmployee = new Employee({
      empId: req.body.empId,
      empName: req.body.empName,
      date: req.body.date,
      designation: req.body.designation
    });

    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getEmployees = async (req, res) => {
    try {
      const employees = await Employee.find();
      res.status(200).json(employees);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
}
