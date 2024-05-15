import React, { useEffect, useState } from 'react';
import { Button, Label, TextInput } from 'flowbite-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateExpense() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [driverId, setDriverId] = useState('');
  const [driverName, setDriverName] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const response = await fetch(`http://localhost:3000/api/expenses/getExpense/${id}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch expense');
        }
        const data = await response.json();
        console.log(data);
        setDriverId(data.expense.driver_ID);
        setDriverName(data.expense.Driver_Name);
        setAmount(data.expense.Amount);
        setReason(data.expense.Reason);
      } catch (error) {
        console.error('Error fetching expense:', error);
      }
    }
    fetchExpenses();
  }, [id]);

  const Update = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/api/expenses/updateExpense/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ driver_ID: driverId, Driver_Name: driverName, Amount: amount, Reason: reason })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update expense');
        }
        console.log('Expense updated successfully');
        return response.json(); // Parse response JSON
      })
      .then(data => {
        console.log(data); // Log updated expense data
        navigate('/expense-list');
      })
      .catch(error => console.error('Error updating expense:', error));
  };

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3 flex-1'>
        <form className="product-add-form" onSubmit={Update}>
          <b>Update Expense:-</b>
          <br></br>
          <div>
            <Label>Driver ID:</Label>
            <TextInput type="text" name="driverId" className='form-control' value={driverId} onChange={(e) => setDriverId(e.target.value)} />
          </div>
          <div>
            <Label>Driver Name:</Label>
            <TextInput type="text" name="driverName" className='form-control' value={driverName} onChange={(e) => setDriverName(e.target.value)} />
          </div>
          <div>
            <Label>Amount:</Label>
            <TextInput type="text" name="amount" className='form-control' value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div>
            <Label>Reason:</Label>
            <TextInput type="text" name="reason" className='form-control' value={reason} onChange={(e) => setReason(e.target.value)} />
          </div>
          <div>
            <br></br>
            <Button type="submit">Update Expense</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
