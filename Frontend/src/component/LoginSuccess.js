import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DonorService from '../services/donorService';
import Footer from './Footer';
import './css/LoginSuccess.css';
import BloodDrop from '../img/bloodDrop.png';

const LoginSuccess = () => {
  const [loggedUser, setLoggedUser] = useState('');
  const [bloodDetails, setBloodDetails] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const tempUser = sessionStorage.getItem('loggedUser') || '""';
    setLoggedUser(tempUser.replace(/^"(.*)"$/, '$1'));
    getBloodDetails();
  }, []);

  const getBloodDetails = async () => {
    try {
      const details = await DonorService.getBloodDetails();
      setBloodDetails(details.data);
    } catch (error) {
      setError('Error fetching blood details.');
      console.error('Error fetching blood details:', error);
    }
  };

  const handleStockChange = async (bloodGroup, change) => {
    try {
      await DonorService.updateBloodStock(bloodGroup, change);
      getBloodDetails();
    } catch (error) {
      setError('Error updating blood stock.');
      console.error('Error updating blood stock:', error);
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
          <b style={{ color: 'white' }}>Admin Dashboard</b>
        </div>
        <b className="sidebar-text" style={{ color: 'whitesmoke' }}>
          <i className="fa fa-user"></i> Welcome {loggedUser}
        </b>
        <button className="logoutbtn" onClick={logout}>
          <i className="fa fa-sign-out"></i> Logout
        </button>
      </div>

      <div className="d-flex">
        <div className="sidebar-container col-md-2">
          <ul className="sidebar-navigation">
            <li>
              <i className="fa fa-plus" aria-hidden="true"></i>
              <a href="/addDonor">Add Donors</a>
            </li>
            <li>
              <i className="fa fa-heart" aria-hidden="true"></i>
              <a href="/donorlist">Donors</a>
            </li>
            <li>
              <i className="fa fa-list" aria-hidden="true"></i>
              <a href="/requesthistory">Blood Requests</a>
            </li>
            <li>
              <i className="fa fa-list" aria-hidden="true"></i>
              <a href="/donorrequesthistory">Donor Requests</a>
            </li>
            <li>
              <i className="fa fa-user" aria-hidden="true"></i>
              <a href="/userlist">Users</a>
            </li>
          </ul>
        </div>

        <div className="content-container col-md-10" style={{ padding: '15px' }}>
          <div className="welcome-message">
            <center><h2><b>Welcome to Admin Dashboard</b></h2></center>
          </div>

          <div className="row">
            {bloodDetails.length > 0 ? (
              bloodDetails.map((details) => (
                <div key={details.bloodGroup} className="col-lg-4 col-md-6 col-sm-12 card" id="bloodCards">
                  <div className="card-body text-center">
                    <img
                      className="bloodimg"
                      src={BloodDrop}
                      width="100"
                      height="100"
                      alt="Blood Drop"
                    />
                    <div className="text">
                      <b>Blood Group: </b>
                      <b className="element blood-group">{details.bloodGroup}</b>
                    </div>
                    <div className="text">
                      <b>Number of Donors: </b>
                      <b className="element donor-count">{details.donorCount}</b>
                    </div>
                    <div className="text">
                      <b>Available Units: </b>
                      <b className="element available-units">{details.totalUnits}</b>
                    </div>
                    <div className="text button-group">
                      <button className="btn btn-success" onClick={() => handleStockChange(details.bloodGroup, 1)}>Increase Stock</button>
                      <button className="btn btn-danger" onClick={() => handleStockChange(details.bloodGroup, -1)}>Decrease Stock</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-data">No blood details available.</div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginSuccess;
