import React from 'react';
import './css/Footer.css'; // Make sure to convert the styles to CSS modules or regular CSS

const Footer = () => {
  return (
    <footer className="bg-light text-center">
      <div className="text-center p-3" style={{ backgroundColor: '#13534e', color: 'white' }}>
        © 2024 Copyright:
        <b style={{ color: 'white' }} className="text-light">Suraj&Prathamesh</b>
        <br /><br />
        <section className="mb-4">
          <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#3b5998', border: 'none' }} href="#!" role="button">
            <i className="fa fa-facebook-f"></i>
          </a>
          <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#55acee', border: 'none' }} href="#!" role="button">
            <i className="fa fa-twitter"></i>
          </a>
          <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#dd4b39', border: 'none' }} href="#!" role="button">
            <i className="fa fa-google"></i>
          </a>
          <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#0082ca', border: 'none' }} href="#!" role="button">
            <i className="fa fa-linkedin"></i>
          </a>
          <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#333333', border: 'none' }} href="#!" role="button">
            <i className="fa fa-github"></i>
          </a>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
