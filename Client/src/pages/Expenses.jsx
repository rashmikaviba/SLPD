import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'flowbite-react';

function ExpenseList() {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        async function fetchExpenses() {
            try {
                const response = await fetch('http://localhost:3000/api/expenses');
                if (!response.ok) {
                    throw new Error('Failed to fetch expenses');
                }
                const data = await response.json();
                setExpenses(data);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        }
        fetchExpenses();
    }, []);

    const handleDelete = (id) => {
        fetch(`http://localhost:3000/api/expenses/deleteExpense/${id}`, {
          method: 'DELETE'
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to delete expense');
            }
            console.log('Expense deleted successfully');
            window.location.reload()
          })
          .catch(error => console.error('Error deleting expense:', error));
      }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <Link to="/create" className='btn btn-success'><Button>Add +</Button></Link>
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
                        {expenses.map((expense, index) => (
                            <tr key={index}>
                                <td>{expense.driver_ID}</td>
                                <td>{expense.Driver_Name}</td>
                                <td>{expense.Amount}</td>
                                <td>{expense.Reason}</td>
                                <td className='action-buttons'>
                                   <Link to ={'/update/${expense._id}' }className='btn btn-success'> <Button gradientDuoTone='purpleToPink' className="edit-button">Update</Button></Link>
                                    <Button gradientDuoTone='purpleToPink' className="btn btn-danger" onClick={(e) => handleDelete(expense._id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default ExpenseList;
