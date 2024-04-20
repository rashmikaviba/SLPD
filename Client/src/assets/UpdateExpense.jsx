import React, { useEffect, useState } from 'react';
import { Button, Label, TextInput } from 'flowbite-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateExpense() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [driver_id, setDriver_ID] = useState('');
  const [driver_name, setDriver_Name] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    async function fetchExpenses() {
        try {
          const response = await fetch(`http://localhost:3000/getExpense/${_id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch expense');
          }
          const data = await response.json();
          setDriver_ID(data.driver_id);
          setDriver_Name(data.driver_name);
          setAmount(data.amount);
          setReason(data.reason);
        } catch (error) {
          console.error('Error fetching expense:', error);
      }
    }
    fetchExpenses();
  }, [id]);
  
  

  const Update = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/updateExpense/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ driver_id, driver_name, amount, reason })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update expense');
        }
        console.log('Expense updated successfully');
        navigate('/expenses');
      })
      .catch(error => console.error('Error updating expense:', error));
  }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3 flex-1'>
        <form className="product-add-form" onSubmit={Update}>
          <b>Update Expense:-</b>
          <div>
            <Label>Driver_ID:</Label>
            <TextInput type="text" name="driver_ID" className='form-control' value={driver_id} onChange={(e) => setDriver_ID(e.target.value)} />
          </div>
          <div>
            <Label>Driver_Name:</Label>
            <TextInput type="text" name="Driver_Name" className='form-control' value={driver_name} onChange={(e) => setDriver_Name(e.target.value)} />
          </div>
          <div>
            <Label>Amount:</Label>
            <TextInput type="number" name="Amount" className='form-control' value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div>
            <Label>Reason:</Label>
            <TextInput type="text" name="Reason" className='form-control' value={reason} onChange={(e) => setReason(e.target.value)} />
          </div>
          <div>
            <Button type="submit">Update Expense</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
