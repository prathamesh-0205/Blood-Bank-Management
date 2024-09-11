// src/components/RegistrationComponent.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import registrationService from '../services/registrationService'; 
import './css/Registration.css';

const Registration = () => {
  const [user, setUser] = useState({
    email: '',
    username: '',
    bloodgroup: '',
    gender: 'Male',
    age: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });
  const [msg, setMsg] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    // Add your validation logic here
    if (!user.email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
      newErrors.email = 'Invalid email Id';
    }
    if (!user.username) newErrors.username = 'required field';
    if (!user.bloodgroup) newErrors.bloodgroup = 'required field';
    if (!user.age) newErrors.age = 'required field';
    if (!user.mobile) newErrors.mobile = 'required field';
    if (!user.password) newErrors.password = 'required field';
    if (user.password !== user.confirmPassword) newErrors.confirmPassword = 'password not matched';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    registrationService
      .registerUser(user)
      .then(() => {
        console.log('Registration Success');
        localStorage.setItem('username', user.username);
        navigate('/registrationsuccess');
      })
      .catch((error) => {
        console.log('Registration Failed');
        console.log(error.response.data);
        setMsg(`User with ${user.email} already exists !!!`);
      });
  };

  return (
    <div className="container">
      <h3 className="textual">New User</h3>
      <form onSubmit={handleSubmit}>
        <small className="text-danger">
          <b>{msg}</b>
        </small>
        <div className="form-group">
          <label htmlFor="email">
            Email Address: <b className="text-danger">*</b>
          </label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            placeholder="enter email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
          {errors.email && <small className="text-danger"><b>{errors.email}</b></small>}
          <small style={{ color: 'gray', fontSize: '10px' }}>Enter proper email address for verification purpose</small>
        </div>

        <div className="form-group">
          <label htmlFor="username">
            UserName: <b className="text-danger">*</b>
          </label>
          <input
            type="text"
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            placeholder="enter username"
            name="username"
            value={user.username}
            onChange={handleChange}
            required
          />
          {errors.username && <small className="text-danger"><b>{errors.username}</b></small>}
          <small style={{ color: 'gray', fontSize: '10px' }}>Enter full name with initial for verification purpose</small>
        </div>

        <div className="form-group">
          <label htmlFor="bloodgroup">
            Blood Group: <b className="text-danger">*</b>
          </label>
          <input
            type="text"
            className={`form-control ${errors.bloodgroup ? 'is-invalid' : ''}`}
            placeholder="enter blood group"
            name="bloodgroup"
            value={user.bloodgroup}
            onChange={handleChange}
            required
          />
          {errors.bloodgroup && <small className="text-danger"><b>{errors.bloodgroup}</b></small>}
        </div>

        <div className="form-group">
          <label htmlFor="gender">
            Gender: <b className="text-danger">*</b>
          </label>
          <select className="form-control" name="gender" value={user.gender} onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="age">
            Age: <b className="text-danger">*</b>
          </label>
          <input
            type="number"
            className={`form-control ${errors.age ? 'is-invalid' : ''}`}
            placeholder="enter your age"
            name="age"
            value={user.age}
            onChange={handleChange}
            required
          />
          {errors.age && <small className="text-danger"><b>{errors.age}</b></small>}
        </div>

        <div className="form-group">
          <label htmlFor="mobile">
            Mobile Number: <b className="text-danger">*</b>
          </label>
          <input
            type="tel"
            className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
            placeholder="enter mobile number"
            name="mobile"
            value={user.mobile}
            onChange={handleChange}
            required
          />
          {errors.mobile && <small className="text-danger"><b>{errors.mobile}</b></small>}
          <small style={{ color: 'gray', fontSize: '10px' }}>Enter proper 10 digit mobile number for verification purpose</small>
        </div>

        <div className="form-group">
          <label htmlFor="password">
            Password: <b className="text-danger">*</b>
          </label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            placeholder="enter password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
          {errors.password && <small className="text-danger"><b>{errors.password}</b></small>}
          <small style={{ color: 'gray', fontSize: '10px' }}>
            At least one uppercase, numeric digit, lowercase, special character, length of 6-20
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">
            Confirm Password: <b className="text-danger">*</b>
          </label>
          <input
            type="password"
            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
            placeholder="Re-enter password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <small className="text-danger"><b>{errors.confirmPassword}</b></small>}
        </div>

        <div className="checkbox" style={{ marginTop: '5px' }}>
          <small style={{ color: 'gray' }}>
            <input type="checkbox" name="remember" required /> I agree to all Terms & Conditions
          </small>
        </div>

        <button type="submit" className="btn registerbtn" disabled={Object.keys(errors).length > 0}>
          Register
        </button>
      </form>
      <div className="sign-up" style={{ textAlign: 'center', marginTop: '10px' }}>
        Already have an Account?{' '}
        <small onClick={() => navigate('/login')} style={{ color: 'navy', cursor: 'pointer' }}>
          <b>Login here</b>
        </small>
      </div>
    </div>
  );
};

export default Registration;
