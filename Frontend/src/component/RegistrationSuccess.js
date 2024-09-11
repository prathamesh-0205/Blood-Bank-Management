import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import successImage from '../img/success.gif'

const RegistrationSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 7000);

    // Clean up the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginLeft: '15%', marginTop: '6%' }}>
      <div className="row col-md-10 col-md-offset-3">
        <div className="card card-body">
          <div style={{ textAlign: 'center' }}>
            <img src={successImage} width="200px" height="200px" alt="Success" />
          </div>
          <br />
          <h1>User successfully registered !!!</h1>
          <br />
          <h3 style={{ color: 'rgb(16, 72, 80)' }}>
            You will be re-directed to the Login page in a few seconds
          </h3>
        </div>
      </div>
      <br /><br />
    </div>
  );
};

export default RegistrationSuccess;
