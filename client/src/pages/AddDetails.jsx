import { Button, Label, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom'; 
import React, { useState } from 'react';

export default function AddDetails() {
  const [imageFile, setImageFile] = useState(null);
  const [driverId, setDriverId] = useState('');
  const [driverName, setDriverName] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [errorMessages, setErrorMessages] = useState({
    driverId: '',
    driverName: '',
    paymentDate: '',
    description: '',
    amount: '',
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate input fields
    let errors = {};
    if (!driverId) {
      errors.driverId = 'Please enter Driver ID';
    }
    if (!driverName) {
      errors.driverName = 'Please enter Driver Name';
    }
    if (!paymentDate) {
      errors.paymentDate = 'Please select the date';
    }
    if (!description) {
      errors.description = 'Please enter a description';
    }
    if (!amount) {
      errors.amount = 'Please enter the amount';
    }

    // Validate selected date
    const today = new Date();
    if (paymentDate < today) {
      errors.paymentDate = 'Please select today\'s date';
    }

    setErrorMessages(errors);

    // Submit the form if all fields are filled
    if (Object.keys(errors).length === 0) {
      // Add your form submission logic here
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div></div>
        <div className='flex-1'>
          <h2 className='text-3xl font-bold text-center mb-8'>Payment Details</h2>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Driver ID' />
              <TextInput type='text' placeholder='Driver ID' id='did' value={driverId} onChange={(e) => setDriverId(e.target.value)} />
              {errorMessages.driverId && <span className='text-red-500'>{errorMessages.driverId}</span>}
            </div>
            <div>
              <Label value='Driver Name' />
              <TextInput type='text' placeholder='Name' id='name' value={driverName} onChange={(e) => setDriverName(e.target.value)} />
              {errorMessages.driverName && <span className='text-red-500'>{errorMessages.driverName}</span>}
            </div>
            <div>
              <Label value='Payment Date' />
              <TextInput type='date' placeholder='Date' id='date' value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} min={new Date().toISOString().split('T')[0]} max={new Date().toISOString().split('T')[0]} />
              {errorMessages.paymentDate && <span className='text-red-500'>{errorMessages.paymentDate}</span>}
            </div>
            <div>
              <Label value='Description' />
              <TextInput type='text' placeholder='Description' id='description' value={description} onChange={(e) => setDescription(e.target.value)} />
              {errorMessages.description && <span className='text-red-500'>{errorMessages.description}</span>}
            </div>
            <div>
              <Label value='Amount (Rs.)' />
              <TextInput type='number' placeholder='Amount' id='amount' value={amount} onChange={(e) => setAmount(e.target.value)} />
              {errorMessages.amount && <span className='text-red-500'>{errorMessages.amount}</span>}
            </div>
            <div>
              <Label value='Attachments' />
              <span style={{ marginRight: '10px' }}>
                &nbsp;
              </span>
              <input type="file" accept='image/*' onChange={handleImageChange}  />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit'>
              Done
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}






