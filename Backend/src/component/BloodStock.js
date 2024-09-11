import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';
import './css/BloodStock.css';
import BloodDrop from '../img/bloodDrop.png';
const API_BASE_URL = 'http://localhost:7070';

const BloodStock = () => {
  const [loggedUser, setLoggedUser] = useState('');
  const [title, setTitle] = useState('');
  const [bloodDetails, setBloodDetails] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const tempUser = sessionStorage.getItem('loggedUser');
    const cleanedUser = tempUser ? tempUser.replace(/^"(.*)"$/, '$1') : '';
    setLoggedUser(cleanedUser);

    if (cleanedUser === 'admin@gmail.com') {
      setTitle('Admin Dashboard');
    } else {
      setTitle('User Dashboard');
    }

    getBloodDetails();
  }, []);

  const getBloodDetails = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/inventory/getAll`);
      setBloodDetails(response.data);
    } catch (error) {
      console.error('Error fetching blood details:', error);
      setError('Failed to load blood details.');
    }
  };

  const navigateHome = () => {
    if (loggedUser === 'admin@gmail.com') {
      setTitle('Admin Dashboard');
      navigate('/loginsuccess');
    } else {
      setTitle('User Dashboard');
      navigate('/userdashboard');
    }
  };

  const logout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <div>
      <div className="sidebar-logo">
        <div className="welcometxt" style={{ float: 'left' }}>
          <b style={{ color: 'white' }}>{title}</b>
        </div>
        <button className="logoutbtn" onClick={navigateHome}>
          <i className="fa fa-home"></i> Home
        </button>
        <b className="sidebar-text" style={{ color: 'whitesmoke' }}>
          <i className="fa fa-user"></i> Welcome {loggedUser}
        </b>
        <button className="logoutbtn" onClick={logout}>
          <i className="fa fa-sign-out"></i> Logout
        </button>
      </div>

      <div className="row">
        {error && <div className="error-message">{error}</div>}
        {bloodDetails.length > 0 ? (
          bloodDetails.map((details) => (
            <div key={details.bloodGroup} className="col-4 card" id="bloodCards">
              <a>
                <img
                  className="bloodimg"
                  src={BloodDrop}
                  width="100"
                  height="100"
                  alt="Blood Drop"
                />
              </a>
              <div className="card-block">
                <div className="text">
                  <b>Blood Group: </b>
                  <b className="element" style={{ fontSize: '30px', color: 'red' }}>
                    {details.bloodGroup}
                  </b>
                </div>
                <div className="text">
                  <b>Number of Donors: </b>
                  <b className="element" style={{ fontSize: '30px' }}>
                    {details.count}
                  </b>
                </div>
                <div className="text">
                  <b>Available Units: </b>
                  <b className="element" style={{ fontSize: '30px' }}>
                    {details.totalUnits}
                  </b>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-data">No blood details available.</div>
        )}
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default BloodStock;