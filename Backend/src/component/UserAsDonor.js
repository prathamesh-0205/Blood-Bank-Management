import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DonorService from '../services/donorService'; // Ensure DonorService is correctly configured
import './css/UserAsDonor.css';

const UserAsDonor = () => {
  const [loggedUser, setLoggedUser] = useState('');
  const [msg, setMsg] = useState('');
  const [donor, setDonor] = useState({
    name: '',
    email: '',
    bloodGroup: '',
    units: 1,
    mobile: '',
    gender: 'Male',
    age: '',
    city: '',
    address: '',
    lastDonationDate: '',
    disease: '', // New field for disease
  });
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isEligible, setIsEligible] = useState(true);

  const navigate = useNavigate();

  // Fetch the logged user from session storage
  useEffect(() => {
    const tempUser = sessionStorage.getItem('loggedUser') || '{}';
    const trimmedUser = tempUser.replace(/^"(.*)"$/, '$1'); // Removes the extra quotes
    setLoggedUser(trimmedUser);
    setMsg('');
  }, []);

  // Check if the donor is eligible based on the last donation date
  useEffect(() => {
    const checkEligibility = () => {
      if (donor.lastDonationDate) {
        const lastDonationDate = new Date(donor.lastDonationDate);
        const currentDate = new Date();
        const daysBetween = Math.floor((currentDate - lastDonationDate) / (1000 * 60 * 60 * 24));
        setIsEligible(daysBetween >= 60);
        if (daysBetween < 60) {
          setErrorMsg(`You must wait at least 60 days from your last donation. Only ${daysBetween} days have passed.`);
        } else {
          setErrorMsg('');
        }
      } else {
        setIsEligible(true);
        setErrorMsg('');
      }
    };
    checkEligibility();
  }, [donor.lastDonationDate]);

  // Validate the entire form
  useEffect(() => {
    const validateForm = () => {
      const isValid =
        donor.name.trim() !== '' &&
        isEmailValid &&
        donor.bloodGroup.trim() !== '' &&
        /^[0-9]{10}$/.test(donor.mobile) &&
        donor.age >= 18 && donor.age <= 65 &&
        donor.city.trim() !== '' &&
        donor.address.trim() !== '' &&
        isEligible;

      setIsFormValid(isValid);
    };
    validateForm();
  }, [donor, isEmailValid, isEligible]);

  // Handle navigation to the user dashboard
  const navigateHome = () => {
    navigate('/userdashboard');
  };

  // Function to add the donor
  const addDonor = async () => {
    try {
      if (!isEligible) {
        setMsg("You must wait at least 60 days from your last donation.");
        return;
      }

      await DonorService.requestForAddingDonor(donor); // Make sure DonorService is correctly set up for API calls
      setMsg("Donor Added Successfully !!!");
      navigate('/userdashboard');
    } catch (error) {
      console.error("Process Failed", error);
      setMsg("Failed to add donor. Please try again later.");
    }
  };

  // Handle logout
  const logout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate('/login');
    window.history.replaceState(null, '', '/login');
  };

  // Handle changes in the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonor((prevDonor) => ({
      ...prevDonor,
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
    <div className="container">
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
      <br />
      <h2 className="textual">
        <i style={{ color: 'red' }} className="fa fa-heart"></i> Donor
      </h2>
      <div style={{ textAlign: 'center', color: 'green' }}>
        <b>{msg}</b>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); addDonor(); }}>
        <div className="form-group">
          <label htmlFor="donorname">Name: <b className="text-danger">*</b></label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your name"
            name="name"
            value={donor.name}
            onChange={handleChange}
            required
          />
        </div>
        <small style={{ color: 'gray', fontSize: '10px' }}>Please enter the full name of the donor with initials</small>

        <div className="form-group">
          <label htmlFor="email">
            Email Address: <b className="text-danger">*</b>
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
            value={donor.email}
            onChange={handleChange}
            required
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
          />
          {!isEmailValid && (
            <div style={{ color: 'red', fontSize: '12px' }}>{errorMsg}</div>
          )}
          <small style={{ color: 'gray', fontSize: '10px' }}>
            Enter a valid email address for verification purposes
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="bloodgroup">Blood Group: <b className="text-danger">*</b></label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter blood group"
            name="bloodGroup"
            value={donor.bloodGroup}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="units">Units of Blood: <b className="text-danger">*</b></label>
          <select
            className="form-control"
            name="units"
            value={donor.units}
            onChange={handleChange}
            required
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <small style={{ color: 'rgb(179, 11, 11)', fontSize: '10px', fontWeight: 'bold' }}>The maximum number of units that can be donated is 3 pints</small>

        <div className="form-group">
          <label htmlFor="mobile">Mobile Number: <b className="text-danger">*</b></label>
          <input
            type="tel"
            className="form-control"
            placeholder="Enter mobile number"
            name="mobile"
            value={donor.mobile}
            onChange={handleChange}
            required
            pattern="[0-9]{10}"
          />
        </div>
        <small style={{ color: 'gray', fontSize: '10px' }}>Please enter a valid 10-digit mobile number</small>

        <div className="form-group">
          <label htmlFor="gender">Gender: <b className="text-danger">*</b></label>
          <select
            className="form-control"
            name="gender"
            value={donor.gender}
            onChange={handleChange}
            required
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="age">Age: <b className="text-danger">*</b></label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter your age"
            name="age"
            value={donor.age}
            onChange={handleChange}
            required
            min="18"
            max="65"
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City: <b className="text-danger">*</b></label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter city"
            name="city"
            value={donor.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address: <b className="text-danger">*</b></label>
          <textarea
            className="form-control"
            placeholder="Enter address"
            name="address"
            value={donor.address}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="lastDonationDate">Last Donation Date: <b className="text-danger">*</b></label>
          <input
            type="date"
            className="form-control"
            name="lastDonationDate"
            value={donor.lastDonationDate}
            onChange={handleChange}
            required
          />
        </div>
        {!isEligible && (
          <div style={{ color: 'red', fontSize: '12px' }}>{errorMsg}</div>
        )}

        <div className="form-group">
          <label htmlFor="disease">Disease (if any):<b className="text-danger">*</b></label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter any disease (leave blank if none)"
            name="disease"
            value={donor.disease}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-danger"
          style={{ marginTop: '20px' }}
          disabled={!isFormValid}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserAsDonor;
