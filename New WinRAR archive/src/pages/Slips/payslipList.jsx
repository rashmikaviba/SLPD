import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Card, CardContent, Button, Grid, TextField } from '@mui/material';
import EditPayslipDialog from '../../components/EditPayslipDialog';
import { CSVLink } from 'react-csv';
import { PDFDownloadLink,  Document, Page } from '@react-pdf/renderer';
import PayslipPDFDocument from '../../components/PayslipPDFDocument'; // Import your PDF document component
import '../../assets/css/PayslipList.css'; // Import CSS file

const pages = ['Home', 'Dashboard', 'Profile']; // Updated pages array
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const PayslipList = () => {
  const [payslips, setPayslips] = useState([]);
  const [editingPayslip, setEditingPayslip] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [driverNumberError, setDriverNumberError] = useState('');

  useEffect(() => {
    const fetchPayslips = async () => {
      try {
        const response = await axios.get('http://localhost:3000/payslips/get');
        setPayslips(response.data);
      } catch (error) {
        console.error('Error fetching payslips:', error);
      }
    };

    fetchPayslips();
  }, []);

  const handleEdit = (payslip) => {
    setEditingPayslip(payslip);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/payslips/${id}`);
      setPayslips(prevPayslips => prevPayslips.filter(payslip => payslip._id !== id));
      alert('Payslip deleted successfully!');
    } catch (error) {
      console.error('Error deleting payslip:', error);
    }
  };

  const handleCloseEditDialog = () => {
    setEditingPayslip(null);
  };

  const handleUpdatePayslip = (updatedPayslip) => {
    setPayslips(payslips.map(p => (p._id === updatedPayslip._id ? updatedPayslip : p)));
  };

  const handleExportToCsv = (payslip) => {
    const csvData = [
      { label: 'Driver Number', value: payslip.driverNo },
      { label: 'HM Date', value: payslip.HMdate },
      { label: 'Special Allowance', value: payslip.specialAllowance },
      { label: 'Gross Salary', value: payslip.grossSalary },
      { label: 'Net Salary', value: payslip.netSalary }
    ];
    return csvData;
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
    // Reset driverNumberError when user types in search field
    setDriverNumberError('');
  };

  const filteredPayslips = payslips.filter(payslip => payslip.driverNo.includes(searchQuery));

  const handleEditValidation = (payslip) => {
    if (payslip.driverNo.trim() === '') {
      setDriverNumberError('Driver Number is required');
      return;
    }
    // Other validations for HM Date, Special Allowance, etc. can be added similarly
    setEditingPayslip(payslip);
  };

  return (
    <div>
      
      <div className="payslip-list">
        <Typography variant="h4" gutterBottom>All Payslips</Typography>
        <TextField
          label="Search Driver Number"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ marginBottom: '20px', color: 'white', backgroundColor: 'white' }}
        />
        {driverNumberError && (
          <Typography variant="body2" color="error" style={{ marginBottom: '10px' }}>
            {driverNumberError}
          </Typography>
        )}
        <Grid container spacing={2}>
          {filteredPayslips.map(payslip => (
            <Grid item xs={12} sm={6} md={4} key={payslip._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="h2">Driver Number: {payslip.driverNo}</Typography>
                  <Typography>HM Date: {payslip.HMdate}</Typography>
                  <Typography>Special Allowance: {payslip.specialAllowance}</Typography>
                  <Typography>Gross Salary: {payslip.grossSalary}</Typography>
                  <Typography>Net Salary: {payslip.netSalary}</Typography>
                  <div className="button-container">
                    <button
                      variant="outlined"
                      
                      onClick={() => handleEditValidation(payslip)} // Use validation before editing
                    >
                      Edit
                    </button>
                    <button
                      variant="outlined"
                      onClick={() => handleDelete(payslip._id)}
                    >
                      Delete
                    </button>
                    <CSVLink
                      data={handleExportToCsv(payslip)}
                      filename={`payslip_${payslip.driverNo}.csv`}
                      className="csv-link"
                      target="_blank"
                    >
                      CSV
                    </CSVLink>
                    <PDFDownloadLink
                      document={<PayslipPDFDocument payslip={payslip} />} // Pass the payslip data to your PDF document component
                      fileName={`payslip_${payslip.driverNo}.pdf`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Button variant="outlined">PDF</Button>
                    </PDFDownloadLink>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {editingPayslip && (
          <EditPayslipDialog payslip={editingPayslip} onClose={handleCloseEditDialog} onUpdate={handleUpdatePayslip} />
        )}
      </div>
    </div>
  );
};

export default PayslipList;
