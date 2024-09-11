import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Certificate.css'; // Import custom styles if you have any
import logo from '../img/logo.jpg'; // Example logo image path
import border from '../img/border.png'; // Example border image path

const Certificate = ({ donorRequest }) => {
  return (
    <div className="certificate-container">
      <img src={border} alt="Border" className="certificate-border" />
      <div className="certificate-header text-center">
        <img src={logo} alt="Logo" className="certificate-logo" />
        <h1 className="certificate-title">Certificate of Donation</h1>
      </div>
      <div className="certificate-body text-center">
        <h2 className="donor-name">{donorRequest.name}</h2>
        <p className="certificate-text">For generously donating <strong>{donorRequest.units} units</strong> of blood</p>
        <p className="certificate-date">Date: {new Date().toLocaleDateString()}</p>
        <p className="certificate-id">Request ID: {donorRequest.id}</p>
      </div>
      <div className="certificate-footer text-center">
        <p className="footer-text">Thank you for your valuable contribution!</p>
      </div>
    </div>
  );
};

export default Certificate;
