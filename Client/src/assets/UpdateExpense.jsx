import React, { useEffect, useState } from 'react'
import {Button , Label, TextInput } from 'flowbite-react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function UpdateExpense() {
    const {id} = useParams()
    const [driver_id , setDriver_ID] = useState()
    const [driver_name , setDriver_Name] = useState()
    const [amount , setAmount] = useState()
    const [reason, setReason] = useState()

    const navigate = useNavigate()

    useEffect(()=> {
        axios.get('http://localhost:3000/getExpense/' + id)
        .then(result => {console.log(result)
            setDriver_ID(result.data.driver_id)
            setDriver_Name(result.data.driver_name)
            setAmount(result.data.amount)
            setReason(result.data.reason)
        })
        .catch(err => console.log(err))
    
      },[])

      const Update = (e) =>{
        e.preventDefault();
        axios.put("http://localhost:3000/updateExpense/" + id,{driver_id,driver_name,amount,reason})
        .then(result =>{
            console.log(result)
            navigate('/expenses')
        })

        .catch(err => console.log(err))
      }


  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3 flex-1'>
            <form className='flex flex-col gap-4' onSubmit={Update}>
                <b>Update User</b>
                <div className='mb-2'>
                    <Label value='driver_id'>Driver_ID</Label>
                    <TextInput type='text' placeholder='Enter ID' className='form-control'
                    value = {driver_id} onChange={(e) => setDriver_ID(e.target.value)} />

                </div>
                <div className='mb-2'>
                    <Label value='driver_name'>Driver_Name</Label>
                    <TextInput type='text' placeholder='Enter Name' className='form-control' 
                    value = {driver_name} onChange={(e) => setDriver_Name(e.target.value)}/>
                </div>
                <div className='mb-2'>
                    <Label value='amount'>Amount</Label>
                    <TextInput type='text' placeholder='Enter amount' className='form-control' 
                    value = {amount} onChange={(e) => setAmount(e.target.value)}/>
                </div>
                <div className='mb-2'>
                    <Label value='reason'>Reason</Label>
                    <TextInput type='text' placeholder='Enter reason' className='form-control'
                    value={reason} onChange={(e) => setReason(e.target.value)} />
                </div>
                <Button className='btn btn-success'>Update</Button>
            </form>
        </div>
    </div>
  )
}
