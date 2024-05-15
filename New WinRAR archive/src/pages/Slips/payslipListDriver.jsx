import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Card, CardContent, Button, Grid, TextField } from '@mui/material';
import EditPayslipDialog from '../../components/EditPayslipDialog';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PayslipPDFDocument from '../../components/PayslipPDFDocument';
import '../../assets/css/PayslipList.css';

const PayslipListDriver = () => {
  const [payslips, setPayslips] = useState([]);
  const [editingPayslip, setEditingPayslip] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [driverNumberError, setDriverNumberError] = useState('');
  const [showResults, setShowResults] = useState(false);

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

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
    setDriverNumberError('');
    setShowResults(false); // Reset showResults when user types in search field
  };

  const handleEditValidation = () => {
    if (searchQuery.trim() === '') {
      setDriverNumberError('Driver Number is required');
      setShowResults(false);
      return;
    }
    setShowResults(true);
  };

  const filteredPayslips = payslips.filter(payslip => payslip.driverNo.includes(searchQuery));

  return (
    <div>
      <div className="payslip-list">
        <Typography variant="h4" gutterBottom>All Payslips</Typography>
        <div className="search-container">
          <TextField
            label="Search Driver Number"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ marginBottom: '20px', width: '100%' }}
          />
          <Button variant="contained" onClick={handleEditValidation}>Submit</Button>
        </div>
        {driverNumberError && (
          <Typography variant="body2" color="error" style={{ marginBottom: '10px' }}>
            {driverNumberError}
          </Typography>
        )}
        {showResults && (
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
                      <PDFDownloadLink
                        document={<PayslipPDFDocument payslip={payslip} />}
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
        )}
        {editingPayslip && (
          <EditPayslipDialog payslip={editingPayslip} onClose={handleCloseEditDialog} onUpdate={handleUpdatePayslip} />
        )}
      </div>
    </div>
  );
};

export default PayslipListDriver;
