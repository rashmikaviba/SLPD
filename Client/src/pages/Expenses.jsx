import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Label, Table } from 'flowbite-react';

function ExpenseList() {
    const [expenses, setExpenses] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

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
        // Show confirmation dialog before deleting
        if (window.confirm('Are you sure you want to delete this expense?')) {
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
    }

    const handleUpdate = (id, name) => {
        navigate(`/update/${id}/${name}`);
    };

    const filteredExpenses = expenses.filter(expense => {
        const searchQueryLower = searchQuery.toLowerCase();
        return (
            expense.driver_ID.toLowerCase().includes(searchQueryLower) ||
            expense.Driver_Name.toLowerCase().includes(searchQueryLower) ||
            expense.Amount.toString().toLowerCase().includes(searchQueryLower) ||
            expense.Reason.toLowerCase().includes(searchQueryLower)
        );
    });

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <Link to="/create" className='btn btn-success'><Button>Add +</Button></Link>
                <br />
                <div className="search-container">
                    <Label style={{ padding: "50px", fontSize: "1.5rem"}}>Search Data</Label>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <br />
                <Table className='table'>
                    <thead>
                        <tr>
                            <th style={{fontSize: "1.25rem"}}>Driver ID</th>
                            <th style={{fontSize: "1.25rem"}}>Driver Name</th>
                            <th style={{fontSize: "1.25rem"}}>Amount</th>
                            <th style={{fontSize: "1.25rem"}}>Reason</th>
                            <th style={{fontSize: "1.25rem", textAlign: "Left", padding: "10px"}}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredExpenses.map((expense, index) => (
                            <tr key={index}>
                                <td style={{fontSize: "1.05rem"}}>{expense.driver_ID}</td>
                                <td style={{fontSize: "1.05rem"}}>{expense.Driver_Name}</td>
                                <td style={{fontSize: "1.05rem"}}>{expense.Amount}</td>
                                <td style={{fontSize: "1.05rem"}}>{expense.Reason}</td>
                                <td>
                                    
                                    <td><Link to ={`/update/${expense.driver_ID}` }className='btn btn-success'><Button gradientDuoTone='purpleToPink' className="edit-button" onClick={() => handleUpdate(expense.driver_ID, expense.Driver_Name)}>Update</Button></Link></td>
                                    <td><Button gradientDuoTone='purpleToPink' className="btn btn-danger" onClick={() => handleDelete(expense.driver_ID)}>Delete</Button></td>
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
