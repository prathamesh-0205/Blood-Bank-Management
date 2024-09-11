import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DonorService from '../services/donorService'; // Adjust the path as necessary
import Footer from './Footer'; // Assuming Footer is a separate component
import './css/RequestBlood.css';

const RequestBlood = () => {
  const [loggedUser, setLoggedUser] = useState('');
  const [request, setRequest] = useState({
    name: '',
    email: '',
    bloodgroup: '',
    units: 1,
    disease: '',
    mobile: '',
    gender: 'Male',
    age: '',
  });
  const [msg, setMsg] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [formValid, setFormValid] = useState(false); // Initialize to false

  const [bloodGroups] = useState([
    'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    const tempUser = sessionStorage.getItem('loggedUser');
    if (tempUser) {
      setLoggedUser(tempUser);
    }
    setMsg('');
  }, []);

  useEffect(() => {
    // Update form validity whenever request object changes or after availability check
    const validateForm = async () => {
      const isFormValid = Object.values(request).every(value => value !== '') && isEmailValid && isAvailable;
      setFormValid(isFormValid);
    };

    validateForm();
  }, [request, isEmailValid, isAvailable]);

  const navigateHome = () => {
    navigate('/userdashboard');
  };

  const checkAvailability = async () => {
    try {
      const response = await fetch(`http://localhost:7070/donor/checkAvailability?bloodGroup=${request.bloodgroup}&units=${request.units}`);
      const isAvailable = await response.json();
      setIsAvailable(isAvailable);
    } catch (error) {
      console.error('Error checking availability:', error);
      setMsg('Failed to check blood availability. Please try again later.');
      setIsAvailable(false);
    }
  };

  const requestBlood = async (e) => {
    e.preventDefault();
    if (isEmailValid && formValid) {
      await checkAvailability();
      if (isAvailable) {
        try {
          console.log('Submitting request with payload:', request); // Debugging line
          const response = await DonorService.requestForBlood(request);
          console.log('Response:', response); // Debugging line
          if (response.status === 201) {
            setMsg('Blood Request Sent Successfully !!!');
            navigate('/userdashboard');
          } else {
            setMsg('Failed to send blood request. Please try again later.');
          }
        } catch (error) {
          console.error('Request Failed', error.response || error.message);
          setMsg('Failed to send blood request. Please try again later.');
        }
      } else {
        setMsg('Requested units are not available.');
      }
    } else {
      setMsg('Please ensure all fields are correctly filled out and valid.');
    }
  };

  const logout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequest((prevRequest) => ({
      ...prevRequest,
      [name]: value,
    }));

    if (name === 'email') {
      if (value !== loggedUser) {
        setIsEmailValid(false);
        setErrorMsg('The email entered does not match the logged-in user.');
      } else {
        setIsEmailValid(true);
        setErrorMsg('');
      }
    }
  };

  return (
    <div>
      <div className="sidebar-logo">
        <div className="welcometxt" style={{ float: 'left' }}>
          <b style={{ color: 'white' }}>User Dashboard</b>
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
      <div className="container" id="requestBlood">
        <h3 className="textual">
          <i className="fa fa-plus" aria-hidden="true"></i> Request Blood
        </h3>
        <div style={{ textAlign: 'center', color: 'green' }}>
          <b>{msg}</b>
        </div>
        <form onSubmit={requestBlood}>
          <div className="form-group">
            <label htmlFor="patientname">
              Patient Name: <b className="text-danger">*</b>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="enter Patient name"
              name="name"
              value={request.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Patient Email Address: <b className="text-danger">*</b>
            </label>
            <input
              type="email"
              className={`form-control ${!isEmailValid ? 'is-invalid' : ''}`}
              placeholder="enter email"
              name="email"
              value={request.email}
              onChange={handleChange}
              required
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            />
            <small style={{ color: 'gray', fontSize: '10px' }}>
              Enter proper email address for verification purpose
            </small>
            {!isEmailValid && (
              <div style={{ color: 'red', fontSize: '12px' }}>{errorMsg}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="bloodgroup">
              Patient Blood Group: <b className="text-danger">*</b>
            </label>
            <select
              className="form-control"
              name="bloodgroup"
              value={request.bloodgroup}
              onChange={handleChange}
              required
            >
              <option value="">Select Blood Group</option>
              {bloodGroups.map(bloodGroup => (
                <option key={bloodGroup} value={bloodGroup}>
                  {bloodGroup}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="units">
              Required units: <b className="text-danger">*</b>
            </label>
            <select
              className="form-control"
              id="sel1"
              name="units"
              value={request.units}
              onChange={handleChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="disease">
              Patient Disease: <b className="text-danger">*</b>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="enter disease name"
              name="disease"
              value={request.disease}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="mobile">
              Patient Mobile Number: <b className="text-danger">*</b>
            </label>
            <input
              type="tel"
              className="form-control"
              placeholder="enter mobile number"
              name="mobile"
              value={request.mobile}
              onChange={handleChange}
              required
              pattern="\d{10}"
            />
            <small style={{ color: 'gray', fontSize: '10px' }}>
              Please enter a 10-digit valid mobile number
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="gender">
              Patient Gender: <b className="text-danger">*</b>
            </label>
            <select
              className="form-control"
              name="gender"
              value={request.gender}
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="age">
              Patient Age: <b className="text-danger">*</b>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="enter patient age"
              name="age"
              value={request.age}
              onChange={handleChange}
              required
              min="1"
            />
          </div>

          <button type="submit" className="btn registerbtn" disabled={!formValid}>
            Send Request
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default RequestBlood;
