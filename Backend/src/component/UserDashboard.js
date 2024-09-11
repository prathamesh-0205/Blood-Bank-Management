import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';
import "./css/User.css"
import BloodStock from './BloodStock';
const UserDashboard = () => {
  const [loggedUser, setLoggedUser] = useState('');
  const [bloodStock, setBloodStock] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempUser = sessionStorage.getItem('loggedUser');
    if (tempUser) {
      setLoggedUser(tempUser);
    }
    fetchBloodStock();
  }, []);

  useEffect(() => {
    console.log('BloodStock State:', bloodStock); // Log the state to check data
  }, [bloodStock]);

  const fetchBloodStock = async () => {
    try {
      const response = await axios.get('http://localhost:7070/inventory/getAll');
      console.log('API Response:', response.data);
      setBloodStock(response.data || '');
      console.log('data'+BloodStock.blood_group)
    } catch (error) {
      console.error('Error fetching blood stock:', error);
    }
  };

  const logout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <div className="user-dashboard">
      <div className="sidebar-logo">
        <div className="welcometxt" style={{ float: 'left' }}>
          <b style={{ color: 'white' }}>User Dashboard</b>
        </div>
        <b className="sidebar-text" style={{ color: 'whitesmoke' }}>
          <i className="fa fa-user"></i> Welcome {loggedUser}
        </b>
        <button className="logoutbtn" onClick={logout}>
          <i className="fa fa-sign-out"></i> Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="sidebar-container">
          <ul className="sidebar-navigation">
            <li>
              <i className="fa fa-plus" aria-hidden="true"></i>
              <a href="/requestblood">Make Request</a>
            </li>
            <li>
              <i className="fa fa-paper-plane" aria-hidden="true"></i>
              <a href="/requesthistoryfromuser">Request History</a>
            </li>
            <li>
              <i className="fa fa-heart" aria-hidden="true"></i>
              <a href="/userasdonor">Donate Blood</a>
            </li>
            <li>
              <i className="fa fa-user" aria-hidden="true"></i>
              <a href="/userprofile">Edit Profile</a>
            </li>
            <li>
              <i className="fa fa-user" aria-hidden="true"></i>
              <a href="/donorrequesthistoryfromuser">Donor History</a>
            </li>
          </ul>
        </div>

        <div className="blood-stock-content">
          <div className="title">
            <b>Welcome</b>
          </div>
          {console.log('Blood Stock:', bloodStock)}

          <div className="blood-stock-container">
            {bloodStock.length > 0 ? (
              bloodStock.map((stock) => (
                <div key={stock.id} className="card bg-light blood-stock-card">
                  <div className="card-body text-left">
                    <div className="blood-group">
                      Blood Group: {stock.bloodGroup}
                      {console.log('Blood Stock stock:',stock.blood_group)}
                    </div>
                    <div className="total-units">
                      Total Units: {stock.totalUnits} units
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="loading">Loading...</div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserDashboard;


