import React, { useEffect, useState } from 'react'
import { Table , Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import axios from 'axios';



export default function Expenses() {
  const [ expenses , setexpenses] = useState([]);

  useEffect(()=> {
    axios.get('http://localhost:3000/expenses')
    .then(result =>  setexpenses(result.data))
    .catch(err => console.log(err))

  },[])

  const handleDelete =(id) =>{
    axios.delete('http://localhost:3000/deleteExpense/' + id)
    .then(res => {console.log(res)
    window.location.reload()})
    .catch(err => console.log(err))
  }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <Link to ="/create" className='btn btn-success'><Button>Add +</Button></Link>
        <Table className='table'>
          <thead>
            <tr>
              <th>Driver_ID</th>
              <th>Driver_Name</th>
              <th>Amount</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {
            expenses.map((expenses , index) => (
              <tr key ={index} >
                <td>{expenses.driver_id}</td>
                <td>{expenses.driver_name}</td>
                <td>{expenses.amount}</td>
                <td>{expenses.reason}</td>
                <td>
                <Link to ={'/update/${expenses._id}'} className='btn btn-success'><Button>Update</Button></Link>
                <Button className='btn btn-danger' onClick={(e) => handleDelete(expenses._id)}>Delete</Button>
                </td>
                
              </tr>

            ))
          }

          </tbody>
        </Table>
      </div>


    </div>
  );
}
