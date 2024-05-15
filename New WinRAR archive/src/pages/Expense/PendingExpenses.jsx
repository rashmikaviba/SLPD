import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./PendingExpenses.css";

function PendingExpenses() {
    const [pendingExpenses, setPendingExpenses] = useState([]);

    useEffect(() => {
        const fetchPendingExpenses = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/expenses/pending');
                setPendingExpenses(response.data);
            } catch (error) {
                console.error('Error fetching pending expenses:', error);
            }
        };

        fetchPendingExpenses();
    }, []);

    const handleApprove = async (id) => {
        try {
            await axios.put(`http://localhost:3000/api/expenses/changeStatus/${id}`, { status: "approve" });
            // Show alert message
            window.alert('Expense approved successfully');
            // Refresh the page
            window.location.reload();
        } catch (error) {
            console.error('Error changing status:', error);
        }
    };

    return (
        <div className="full-page-container">
            <div className="pending-expenses">
                {pendingExpenses.map((expense) => (
                    <div key={expense._id} className="expense-card">
                        <h3>{expense.Driver_Name}</h3>
                        <p>Driver ID: {expense.driver_ID}</p>
                        <p>Amount: {expense.Amount}</p>
                        <p>Reason: {expense.Reason}</p>
                        {expense.status === 'pending' && (
                            <button className='btn-color' onClick={() => handleApprove(expense._id)}>Approve</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PendingExpenses;
