import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/HomePage.css';
import background from '../../assets/img/b1.jpeg';
import add from '../../assets/img//add.jpeg';
import slips from '../../assets/img/slips.png';

const HomePage = () => {
  return (
    <div className="homepage" style={{}}>
      <div className="content">
        <h1 className="main-heading">Welcome to the Payslip Management</h1>
        <div className="button-container">
          <Link to="/payslips" className="button" >Add Payslip</Link>
          <Link to="/payslips-list" className="button" >Payslips</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
