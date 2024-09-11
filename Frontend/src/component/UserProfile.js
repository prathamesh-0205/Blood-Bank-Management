import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/UserProfile.css';
import Footer from './Footer';
import Male from '../img/male.png';
import Female from '../img/female.png';

const UserProfile = () => {
  const [loggedUser, setLoggedUser] = useState('');
  const [profileDetails, setProfileDetails] = useState(null); // Changed to null for better handling
  const [user, setUser] = useState({
    username: '',
    email: '',
    bloodgroup: '',
    units: 1,
    mobile: '',
    gender: 'Male',
    age: '',
    password: ''
  });
  const [msg, setMsg] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const tempUser = sessionStorage.getItem('loggedUser') || '';
    console.log("Logged User from Session Storage:", tempUser);
    setLoggedUser(tempUser);

    if (tempUser) {
      getProfileDetails(tempUser);
    } else {
      setLoading(false);
    }
  }, []);

  const getProfileDetails = (loggedUser) => {
    setLoading(true);
    axios.get(`http://localhost:7070/donor/profileDetails/${loggedUser}`)
      .then(response => {
        console.log("API Response:", response); // Log full response
        if (response.data) {
          setProfileDetails(response.data);
          setUser(response.data);
          console.log("Profile Details set in state:", response.data);
        } else {
          console.error("No profile details found in response.");
          setMsg("No profile details found.");
        }
      })
      .catch(error => {
        console.error("Error fetching profile details", error);
        setMsg("Error fetching profile details.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const editProfile = () => {
    setIsEditing(true);
  };

  const updateUserProfile = (e) => {
    e.preventDefault();
    axios.put('http://localhost:7070/registration/updateuser', user, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setMsg("Profile Updated Successfully !!!");
        setIsEditing(false);
        setTimeout(() => {
          navigate('/userdashboard');
        }, 3000);
      })
      .catch(error => {
        console.error("Profile Update Failed", error);
        setMsg("Profile Updation Failed !!!");
      });
  };

  const logout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  return (
    <div>
      <div className="sidebar-logo">
        <div className="welcometxt" style={{ float: 'left' }}>
          <b style={{ color: 'white' }}>User Dashboard</b>
        </div>
        
        <b className="sidebar-text" style={{ color: 'whitesmoke' }}>
          <i className="fa fa-user"></i> Welcome: {loggedUser}
        </b>
        <button className="logoutbtn" onClick={() => navigate('/userdashboard')}>
          <i className="fa fa-home"></i> Home
        </button>
        <button className="logoutbtn" onClick={logout}>
          <i className="fa fa-sign-out"></i> Logout
        </button>
      </div>

      <div className="row">
        {loading && <div>Loading profile details...</div>}
        {!loading && profileDetails && !isEditing && (
          <div className="col-4 card" id="bloodCards">
            <img
              className="bloodimg"
              src={profileDetails.gender === 'Female' ? Female : Male}
              alt={profileDetails.gender}
              width="120"
              height="120"
            />
            <div className="card-block">
              <div className="text">
                <b style={{ color: 'navy' }}>User Name : </b>
                <b className="element" style={{ marginLeft: '53px' }}>{profileDetails.username}</b>
              </div>
              <div className="text">
                <b style={{ color: 'navy' }}>Blood Group : </b>
                <b className="element" style={{ color: 'red', fontSize: 'larger', marginLeft: '35px' }}>{user.bloodgroup}</b>
              </div>
              <div className="text">
                <b style={{ color: 'navy' }}>Mobile Number : </b>
                <b className="element" style={{ marginLeft: '12px' }}>{profileDetails.mobile}</b>
              </div>
              <div className="text">
                <b style={{ color: 'navy' }}>Gender : </b>
                <b className="element" style={{ marginLeft: '80px' }}>{profileDetails.gender}</b>
              </div>
              <div className="text">
                <b style={{ color: 'navy' }}>Mail ID : </b>
                <b className="element" style={{ marginLeft: '78px' }}>{profileDetails.email}</b>
              </div>
              <div className="text">
                <b style={{ color: 'navy' }}>Age : </b>
                <b className="element" style={{ marginLeft: '110px' }}>{profileDetails.age} years</b>
              </div>
              <div className="btndiv" style={{ alignItems: 'center' }}>
                <button className="editbtn" onClick={editProfile}>
                  <i className="fa fa-edit"></i> Edit
                </button>
              </div>
              {msg && (
                <small style={{ textAlign: 'center', marginTop: '3%', color: 'green' }}>
                  <b>{msg}</b>
                </small>
              )}
            </div>
          </div>
        )}
        {!loading && !profileDetails && !isEditing && (
          <div>No profile details available.</div>
        )}
      </div>

      {isEditing && (
        <div className="container">
          <h3 className="textual">Update Profile</h3>
          <form onSubmit={updateUserProfile}>
            <small style={{ textAlign: 'center', color: 'green' }}>
              <b>{msg}</b>
            </small>
            <div className="form-group">
              <label htmlFor="username">Username: <b className="text-danger">*</b></label>
              <input
                type="text"
                className="form-control"
                name="username" // Fixed name attribute to match state field
                id="username"
                placeholder="Enter Username"
                value={user.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email: <b className="text-danger">*</b></label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                placeholder="Enter Email"
                value={user.email}
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="bloodgroup">Blood group: <b className="text-danger">*</b></label>
              <select
                className="form-control"
                name="bloodgroup"
                id="bloodgroup"
                value={user.bloodgroup}
                onChange={handleChange}
                required
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="mobile">Mobile: <b className="text-danger">*</b></label>
              <input
                type="text"
                className="form-control"
                name="mobile"
                id="mobile"
                placeholder="Enter Mobile Number"
                value={user.mobile}
                pattern="[6-9][0-9]{9}"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age: <b className="text-danger">*</b></label>
              <input
                type="text"
                className="form-control"
                name="age"
                id="age"
                placeholder="Enter Age"
                value={user.age}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender: <b className="text-danger">*</b></label>
              <select
                className="form-control"
                name="gender"
                id="gender"
                value={user.gender}
                onChange={handleChange}
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password: <b className="text-danger">*</b></label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                placeholder="Enter Password"
                value={user.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </form>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default UserProfile;
