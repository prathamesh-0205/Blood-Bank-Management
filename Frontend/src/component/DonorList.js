import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DonorService from '../services/donorService'; // Adjust the path as necessary
import Footer from './Footer';
import './css/DonorList.css';
import Male from '../img/male.png';
import Female from '../img/female.png';

const DonorList = () => {
  const [loggedUser, setLoggedUser] = useState('');
  const [title, setTitle] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem('loggedUser');
    if (user) {
      setLoggedUser(user);
      setTitle(user === 'admin@gmail.com' ? 'Admin Dashboard' : 'User Dashboard');
      reloadData(); // Load donor data as soon as we have the logged user
    }
  }, []); // This effect runs only once, on component mount

  useEffect(() => {
    if (bloodGroup.trim() === '') {
      setFilteredDonors(donors); // Reset filter when search is cleared
    } else {
      const lowerCaseBloodGroup = bloodGroup.trim().toLowerCase();
      const newFilteredDonors = donors.filter(donor =>
        donor.bloodGroup.trim().toLowerCase() === lowerCaseBloodGroup
      );
      setFilteredDonors(newFilteredDonors);
    }
  }, [bloodGroup, donors]); // Runs when bloodGroup or donors change

  const reloadData = async () => {
    try {
      const response = await DonorService.getDonorList();
      setDonors(response.data);
      setFilteredDonors(response.data); // Initialize filteredDonors with the full list
    } catch (error) {
      console.error('Error fetching donor list:', error);
    }
  };

  const navigateHome = () => {
    navigate(loggedUser === 'admin@gmail.com' ? '/loginsuccess' : '/userdashboard');
  };

  const logout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  const handleSearchChange = (e) => {
    setBloodGroup(e.target.value);
  };

  const handleDelete = async (donorId) => {
    try {
      await DonorService.deleteDonor(donorId); // Assuming deleteDonor is a method in DonorService
      setDonors(donors.filter(donor => donor.id !== donorId));
      setFilteredDonors(filteredDonors.filter(donor => donor.id !== donorId));
    } catch (error) {
      console.error('Error deleting donor:', error);
    }
  };

  return (
    <div>
      <div className="sidebar-logo">
        <div className="welcometxt" style={{ float: 'left' }}>
          <b style={{ color: 'white' }}>{title}</b>
        </div>
        <input
          className="form-control"
          id="searchtxt"
          type="text"
          name="bloodGroup"
          value={bloodGroup}
          onChange={handleSearchChange}
          placeholder="search via bloodGroup..."
        />
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
        {filteredDonors.map((donor) => (
          <div key={donor.id} className="col-4 card" id="bloodCards">
            <a>
              <img
                className="bloodimg"
                src={donor.gender.toLowerCase() === "male" ? Male : Female}
                alt={donor.gender}
                width="120"
                height="120"
              />
            </a>
            <div className="card-block">
              <div className="text">
                <b style={{ color: 'navy' }}>Donor ID:</b>
                <b className="element" style={{ color: 'red', marginLeft: '10px' }}>
                  {donor.id}
                </b>
              </div>
              <div className="text">
                <b style={{ color: 'navy' }}>Donor Name:</b>
                <b className="element" style={{ marginLeft: '10px' }}>
                  {donor.name}
                </b>
              </div>
              <div className="text">
                <b style={{ color: 'navy' }}>Blood Group:</b>
                <b className="element" style={{ color: 'red', marginLeft: '10px' }}>
                  {donor.bloodGroup}
                </b>
              </div>
              <div className="text">
                <b style={{ color: 'navy' }}>Gender:</b>
                <b className="element" style={{ marginLeft: '10px' }}>
                  {donor.gender}
                </b>
              </div>
              <div className="text">
                <b style={{ color: 'navy' }}>Contact:</b>
                <b className="element" style={{ marginLeft: '10px' }}>
                  {donor.mobile}
                </b>
              </div>
              <div className="text">
                <b style={{ color: 'navy' }}>Age:</b>
                <b className="element" style={{ marginLeft: '10px' }}>
                  {donor.age} years
                </b>
              </div>
              <div className="text">
                <b style={{ color: 'navy' }}>Location:</b>
                <b className="element" style={{ marginLeft: '10px' }}>
                  {donor.city}
                </b>
              </div>
              <button className="btn btn-danger delete-btn" onClick={() => handleDelete(donor.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default DonorList;
