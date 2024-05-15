import mongoose from 'mongoose'

const employeeSchema = new mongoose.Schema({
  empId: {
    type: String,
    required: true,
   
  },
  empName: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true
  },
},{
  timestamps: true
});

const Employee = mongoose.model('employee', employeeSchema);

export default Employee;