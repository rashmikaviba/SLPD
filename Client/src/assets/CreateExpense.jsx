import React, { useState } from 'react';
import { Button, Label, TextInput } from 'flowbite-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateExpense() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    driver_ID: '',
    Driver_Name: '',
    Amount: '',
    Reason: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/expenses/', formData);
      console.log('Expense added successfully');
      navigate("/expenses");
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3 flex-1'>
        <form className="product-add-form" onSubmit={handleSubmit}>
          <b>Add Expense:-</b>
          <br></br>
          <div>
            <Label>Driver_ID:</Label>
            <TextInput type="text" name="driver_ID" value={formData.driver_ID} onChange={handleChange} required />
          </div>
          <div>
            <Label>Driver_Name:</Label>
            <TextInput type="text" name="Driver_Name" value={formData.Driver_Name} onChange={handleChange} />
          </div>
          <div>
            <Label>Amount:</Label>
            <TextInput type="number" name="Amount" value={formData.Amount} onChange={handleChange} required />
          </div>
          <div>
            <Label>Reason:</Label>
            <TextInput type="text" name="Reason" value={formData.Reason} onChange={handleChange} />
          </div>
          <br></br>
          <div>
            <Label>Image:</Label>
            <input type="file" name="image" onChange={handleChange} />
          </div>
          <br></br>
          <div>
            <Button type="submit">Add Expense</Button>
          </div>
        </form>
      </div>
    </div>
  );
}