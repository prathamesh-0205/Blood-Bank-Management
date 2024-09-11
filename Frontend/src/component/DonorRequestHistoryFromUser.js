import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DonorService from '../services/donorService';
import Footer from './Footer';
import Male from '../img/male.png';
import Female from '../img/female.png';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Certificate from './Certificate';

const DonorRequestHistoryFromUser = () => {
  const [loggedUser, setLoggedUser] = useState('');
  const [msg, setMsg] = useState('');
  const [title, setTitle] = useState('');
  const [donorRequests, setDonorRequests] = useState([]);
  const [currentRequest, setCurrentRequest] = useState(null); // Track the current request
  const certificateRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const tempUser = sessionStorage.getItem('loggedUser');
    if (tempUser) {
      const cleanedUser = tempUser.replace(/^"(.*)"$/, '$1');
      setLoggedUser(cleanedUser);
      setTitle(cleanedUser === "admin@gmail.com" ? "Admin Dashboard" : "User Dashboard");
      fetchDonorRequestHistory(cleanedUser);
    } else {
      console.error('Logged user not found in session storage');
      navigate('/login');
    }
  }, [navigate]);

  const fetchDonorRequestHistory = async (email) => {
    try {
      const response = await DonorService.getDonorRequestHistoryByEmail(email);
      const data = response.data ?? [];
      setDonorRequests(data);
    } catch (error) {
      console.error("There was an error fetching the donor request history!", error);
      setMsg("There was an error fetching the donor request history!");
    }
  };

  const navigateHome = () => {
    navigate(loggedUser === "admin@gmail.com" ? '/loginsuccess' : '/userdashboard');
  };

  const logout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  const downloadCertificate = (donorRequest) => {
    setCurrentRequest(donorRequest); // Set the current request
    setTimeout(() => {
      const input = certificateRef.current;
      html2canvas(input)
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          if (!imgData || imgData === "data:,") {
            throw new Error("Image data is invalid or empty");
          }
          const pdf = new jsPDF();
          pdf.addImage(imgData, 'PNG', 0, 0);
          pdf.save(`donor_certificate_${donorRequest.id}.pdf`);
        })
        .catch((error) => {
          console.error("There was an error generating the PDF!", error);
        });
    }, 1000); // Consider removing this timeout if it causes issues
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
            Donor Request History
          </h2>
        </div>
        <div className="panel-body">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Identity</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Gender</th>
                <th>Blood Group</th>
                <th>Age</th>
                <th>City</th>
                <th>Units</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {donorRequests.length > 0 ? donorRequests.map((donorRequest, index) => (
                <tr key={index}>
                  <td>
                    <img
                      className="donor-img"
                      src={donorRequest.gender.toLowerCase() === "male" ? Male : Female}
                      alt={donorRequest.gender}
                      width="80"
                      height="80"
                    />
                  </td>
                  <td>{donorRequest.name}</td>
                  <td>{donorRequest.email}</td>
                  <td>{donorRequest.mobile}</td>
                  <td>{donorRequest.gender}</td>
                  <td style={{ color: 'red', fontSize: '25px' }}>{donorRequest.bloodGroup}</td>
                  <td>{donorRequest.age} years</td>
                  <td>{donorRequest.city}</td>
                  <td>{donorRequest.units} units</td>
                  <td>
                    {loggedUser !== 'admin@gmail.com' && (
                      <>
                        {donorRequest.status === 'accept' && <div className="accepted">Accepted</div>}
                        {donorRequest.status === 'pending' && <div className="pending">Pending</div>}
                        {donorRequest.status === 'reject' && <div className="rejected">Rejected</div>}
                      </>
                    )}
                  </td>
                  <td>
                    {donorRequest.status === 'accept' && (
                      <>
                        <button
                          className="btn btn-success"
                          onClick={() => downloadCertificate(donorRequest)}
                        >
                          Download Certificate
                        </button>
                        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
                          <div ref={certificateRef}>
                            <Certificate donorRequest={donorRequest} />
                          </div>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="11" style={{ textAlign: 'center' }}>No donor request history found</td>
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

export default DonorRequestHistoryFromUser;