import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DonorService from '../services/donorService'; // Adjusted import path
import Footer from './Footer'; // Import Footer component
import './css/RequestHistory.css'; // Adjust the path as necessary
import Male from '../img/male.png';
import Female from '../img/female.png';

const DonorRequestHistory = () => {
  const [loggedUser, setLoggedUser] = useState('');
  const [title, setTitle] = useState('');
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let tempUser = sessionStorage.getItem('loggedUser') || '';

    // Try to parse as JSON, if it fails, use the string as is
    try {
      tempUser = JSON.parse(tempUser);
      tempUser = typeof tempUser === 'string' ? tempUser : '';
    } catch (e) {
      // If parsing fails, tempUser is already a string, so we can use it as is
    }

    setLoggedUser(tempUser);

    if (tempUser === 'admin@gmail.com') {
      setTitle('Admin Dashboard');
      getRequestHistory();
    } else {
      setTitle('User Dashboard');
      getRequestHistoryByEmail(tempUser);
    }
  }, []);

  const getRequestHistory = async () => {
    try {
      const response = await DonorService.getDonorRequestHistory();
      const data = Array.isArray(response.data) ? response.data : [];
      setRequests(data);
    } catch (error) {
      console.error('Error fetching request history:', error);
    }
  };

  const getRequestHistoryByEmail = async (email) => {
    try {
      const response = await DonorService.getRequestHistoryByEmail(email);
      const data = Array.isArray(response.data) ? response.data : [];
      setRequests(data);
    } catch (error) {
      console.error('Error fetching request history by email:', error);
    }
  };

  const updateRequestStatus = (email, id, status) => {
    setRequests(prevRequests =>
      prevRequests.map(req =>
        req.email === email && req.id === id ? { ...req, status } : req
      )
    );
  };

  const acceptRequest = async (email, id) => {
    try {
      await DonorService.acceptRequestOfDonor(email, id);
      updateRequestStatus(email, id, 'accept');
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const rejectRequest = async (email, id) => {
    try {
      await DonorService.rejectRequestOfDonor(email, id);
      updateRequestStatus(email, id, 'reject');
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  const navigateHome = () => {
    if (loggedUser === 'admin@gmail.com') {
      navigate('/loginsuccess');
    } else {
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

      <div className="panel panel-primary">
        <div className="panel-heading">
          <h2 style={{ textAlign: 'center', fontFamily: 'Oswald, sans-serif', color: 'maroon', marginTop: '3%', marginBottom: '3%' }}>
            Donor Request History
          </h2>
        </div>
        <div className="panel-body">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Identity</th>
                <th>Name</th>
                <th>Email</th>
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
              {requests.length > 0 ? (
                requests.map((history, index) => (
                  <tr key={index}>
                    <td>{history.id}</td>
                    <td>
                      <img
                        src={history.gender.toLowerCase() === 'female' ? Female : Male}
                        className="bloodimg"
                        width="80"
                        height="80"
                        alt="Gender"
                      />
                    </td>
                    <td>{history.name}</td>
                    <td>{history.email}</td>
                    <td>{history.mobile}</td>
                    <td>{history.gender}</td>
                    <td style={{ color: 'red', fontSize: '25px' }}>{history.bloodGroup}</td>
                    <td>{history.age} years</td>
                    <td style={{ color: 'red', fontSize: '25px' }}>{history.disease}</td>
                    <td>{history.units} units</td>
                    <td>
                      {loggedUser === 'admin@gmail.com' && history.status === 'pending' && (
                        <>
                          <button onClick={() => acceptRequest(history.email, history.id)} style={{ marginBottom: '5px' }} className="accepted">
                            Accept
                          </button>
                          <button onClick={() => rejectRequest(history.email, history.id)} className="rejected">
                            Reject
                          </button>
                        </>
                      )}
                      {(history.status === 'accept' || history.status === 'reject') && (
                        <div className={history.status === 'accept' ? 'accepted' : 'rejected'}>
                          {history.status === 'accept' ? 'Accepted' : 'Rejected'}
                        </div>
                      )}
                      {loggedUser !== 'admin@gmail.com' && (
                        <>
                          {history.status === 'accept' && <div className="accepted">Accepted</div>}
                          {history.status === 'reject' && <div className="rejected">Rejected</div>}
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" style={{ textAlign: 'center' }}>No requests found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <br /><br /><br /><br /><br /><br /><br /><br />
      <Footer />
    </div>
  );
};

export default DonorRequestHistory;
