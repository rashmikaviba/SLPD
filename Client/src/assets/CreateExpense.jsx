import React, { useState } from 'react'
import { Button, Label, TextInput } from 'flowbite-react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



export default function CreateExpense() {
    const [driver_id , setDriver_ID] = useState()
    const [driver_name , setDriver_Name] = useState()
    const [amount , setAmount] = useState()
    const [reason, setReason] = useState()

    const navigate = useNavigate()

    const Submit = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:3000/createExpense",{driver_id,driver_name,amount,reason})
        .then(result =>{
            console.log(result)
            navigate('/expenses')
        })

        .catch(err => console.log(err))


    }

    
    
  return (<div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
  <div className='w-50 bg-white rounded p-3 flex-1'>
      <form className='flex flex-col gap-4' onSubmit={Submit}>
          <b >Add User</b>
          <div className='mb-2'>
              <Label value='Your Driver ID'></Label>
              <TextInput type='text' placeholder='Enter ID' className='form-control' onChange={(e) => setDriver_ID(e.target.value)} />
          
          </div>
          <div className='mb-2'>
              <Label value='Your Name'></Label>
              <TextInput type='text' placeholder='Enter Name' className='form-control' onChange={(e) => setDriver_Name(e.target.value)} />
          </div>
          <div className='mb-2'>
              <Label value='Amount'></Label>
              <TextInput type='text' placeholder='Enter amount' className='form-control' onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div className='mb-2'>
              <Label value='Reason'></Label>
              <TextInput type='text' placeholder='Enter reason' className='form-control' onChange={(e) => setReason(e.target.value)} />
          </div>
          <Button className='btn btn-success ' gradientDuoTone='purpleToPink' >Submit</Button>
      </form>
  </div>
</div>
)

        
}
