import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DonorService from '../services/donorService';
import './css/RequestHistoryFromUser.css';
import Footer from './Footer';
import Male from '../img/male.png';
import Female from '../img/female.png';

const RequestHistoryFromUser = () => {
  const [loggedUser, setLoggedUser] = useState('');
  const [msg, setMsg] = useState('');
  const [title, setTitle] = useState('');
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempUser = sessionStorage.getItem('loggedUser');
    console.log('Temp user from session storage:', tempUser);
    
    if (tempUser) {
      const cleanedUser = tempUser.replace(/^"(.*)"$/, '$1');
      setLoggedUser(cleanedUser);
      setTitle(cleanedUser === "admin@gmail.com" ? "Admin Dashboard" : "User Dashboard");
      reloadData(cleanedUser);
    } else {
      console.error('Logged user not found in session storage');
      navigate('/login');
    }
  }, [navigate]);

  const reloadData = async (email) => {
    console.log('Requesting history for:', email);
    try {
      const response = await DonorService.getRequestHistoryByEmail(email);
      const data = response.data ?? [];
      console.log('Request history data:', data); // Debug line
      setRequests(data);
    } catch (error) {
      console.error("There was an error fetching the request history!", error);
      setMsg("There was an error fetching the request history!");
    }
  };

  const navigateHome = () => {
    navigate(loggedUser === "admin@gmail.com" ? '/loginsuccess' : '/userdashboard');
  };

  const logout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <>
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

      <div className="panel panel-primary">
        <div className="panel-heading">
          <h2 style={{ textAlign: 'center', fontFamily: "'Oswald', sans-serif", color: 'maroon', marginTop: '3%', marginBottom: '3%' }}>
            Overall Request History
          </h2>
        </div>
        <div className="panel-body">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Identity</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Gender</th>
                <th>Blood Group</th>
                <th>Age</th>
                <th>Disease</th>
                <th>Required Units</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? requests.map((history, index) => (
                <tr key={index}>
                  <td>
                    <img
                      className="bloodimg"
                      src={history.gender.toLowerCase() === "male" ? Male : Female}
                      alt={history.gender}
                      width="80"
                      height="80"
                    />
                  </td>
                  <td>{history.name}</td>
                  <td>{history.mobile}</td>
                  <td>{history.gender}</td>
                  <td style={{ color: 'red', fontSize: '25px' }}>{history.bloodgroup}</td>
                  <td>{history.age} years</td>
                  <td style={{ color: 'navy' }}>{history.disease}</td>
                  <td>{history.units} units</td>
                  <td>
                    {loggedUser !== 'admin@gmail.com' && (
                      <>
                        {history.status === 'accept' && <div className="accepted">Accepted</div>}
                        {history.status === 'pending' && <div className="rejected">Pending</div>}
                        {history.status === 'reject' && <div className="rejected">Rejected</div>}
                      </>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center' }}>No request history found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default RequestHistoryFromUser;
