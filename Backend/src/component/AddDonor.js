import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DonorService from '../services/donorService'; // Replace with actual path
import './css/AddDonor.css'; 
const AddDonor = () => {
  const [donor, setDonor] = useState({
    name: '',
    bloodGroup: '',
    units: '1',
    mobile: '',
    gender: 'Male',
    age: '',
    city: '',
    address: '',
    date: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const now = new Date();
    const day = ("0" + now.getDate()).slice(-2);
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    const today = `${now.getFullYear()}-${month}-${day}`;
    setDonor(prevDonor => ({ ...prevDonor, date: today }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonor(prevDonor => ({ ...prevDonor, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!donor.name) newErrors.name = 'required field';
    if (!donor.bloodGroup) newErrors.bloodGroup = 'required field';
    if (!donor.mobile) newErrors.mobile = 'required field';
    if (!donor.age) newErrors.age = 'required field';
    if (!donor.city) newErrors.city = 'required field';
    if (!donor.address) newErrors.address = 'required field';
    if (!donor.date) newErrors.date = 'required field';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    DonorService.addDonorFromRemote(donor)
      .then(() => {
        console.log("Donor added Successfully");
        navigate('/loginsuccess');
      })
      .catch(error => {
        console.log("Process Failed");
        console.log(error);
      });
  };

  const navigateHome = () => {
    const loggedUser = sessionStorage.getItem('loggedUser') || '';
    if (loggedUser === 'admin@gmail.com') {
      navigate('/loginsuccess');
    } else {
      navigate('/userdashboard');
    }
  };

  return (
    <div className="container">
      <button className="logoutbtn" onClick={navigateHome}>
        <i className="fa fa-home"></i> Home
      </button>

      <h2 className="textual">
        <i style={{ color: 'red' }} className="fa fa-heart"></i> Add new Donor
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Donor Name: <b className="text-danger">*</b></label>
          <input
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            placeholder="enter donor name"
            name="name"
            value={donor.name}
            onChange={handleChange}
          />
          {errors.name && <small className="text-danger"><b>{errors.name}</b></small>}
        </div>
        <small style={{ color: 'gray', fontSize: '10px' }}>Please enter full name of the donor with initial</small>

        <div className="form-group">
          <label htmlFor="bloodGroup">Donor Blood Group: <b className="text-danger">*</b></label>
          <input
            type="text"
            className={`form-control ${errors.bloodGroup ? 'is-invalid' : ''}`}
            placeholder="enter blood group"
            name="bloodGroup"
            value={donor.bloodGroup}
            onChange={handleChange}
          />
          {errors.bloodGroup && <small className="text-danger"><b>{errors.bloodGroup}</b></small>}
        </div>

        <div className="form-group">
          <label htmlFor="units">Units of Blood: <b className="text-danger">*</b></label>
          <select
            className={`form-control ${errors.units ? 'is-invalid' : ''}`}
            name="units"
            value={donor.units}
            onChange={handleChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          {errors.units && <small className="text-danger"><b>{errors.units}</b></small>}
        </div>
        <small style={{ color: 'rgb(179, 11, 11)', fontSize: '10px', fontWeight: 'bold' }}>Maximum units can be donated is 3 pints</small>

        <div className="form-group">
          <label htmlFor="mobile">Donor Mobile Number: <b className="text-danger">*</b></label>
          <input
            type="tel"
            className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
            placeholder="enter mobile number"
            name="mobile"
            value={donor.mobile}
            onChange={handleChange}
          />
          {errors.mobile && <small className="text-danger"><b>{errors.mobile}</b></small>}
        </div>
        <small style={{ color: 'gray', fontSize: '10px' }}>Please enter 10 digit valid mobile number</small>

        <div className="form-group">
          <label htmlFor="gender">Donor Gender: <b className="text-danger">*</b></label>
          <select
            className="form-control"
            name="gender"
            value={donor.gender}
            onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="age">Donor Age: <b className="text-danger">*</b></label>
          <input
            type="number"
            min="0"
            max="65"
            className={`form-control ${errors.age ? 'is-invalid' : ''}`}
            placeholder="enter donor age"
            name="age"
            value={donor.age}
            onChange={handleChange}
          />
          {errors.age && <small className="text-danger"><b>{errors.age}</b></small>}
        </div>
        <small style={{ color: 'rgb(179, 11, 11)', fontSize: '10px', fontWeight: 'bold' }}>Maximum Age limit of donors is 65</small>

        <div className="form-group">
          <label htmlFor="city">Donor Location: <b className="text-danger">*</b></label>
          <input
            type="text"
            className={`form-control ${errors.city ? 'is-invalid' : ''}`}
            placeholder="enter city"
            name="city"
            value={donor.city}
            onChange={handleChange}
          />
          {errors.city && <small className="text-danger"><b>{errors.city}</b></small>}
        </div>
        <small style={{ color: 'gray', fontSize: '10px' }}>Please mention proper city name (eg: Coimbatore)</small>

        <div className="form-group">
          <label htmlFor="address">Donor Address: <b className="text-danger">*</b></label>
          <input
            type="text"
            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
            placeholder="enter donor address"
            name="address"
            value={donor.address}
            onChange={handleChange}
          />
          {errors.address && <small className="text-danger"><b>{errors.address}</b></small>}
        </div>
        <small style={{ color: 'gray', fontSize: '10px' }}>Please mention proper donor address for reference purpose</small>

        <div className="form-group">
          <label htmlFor="date">Donating Date: <b className="text-danger">*</b></label>
          <input
            type="date"
            className={`form-control ${errors.date ? 'is-invalid' : ''}`}
            name="date"
            value={donor.date}
            onChange={handleChange}
          />
          {errors.date && <small className="text-danger"><b>{errors.date}</b></small>}
        </div>
        <small style={{ color: 'gray', fontSize: '10px' }}>By default, today's date will be selected</small>

        <div className="checkbox" style={{ marginTop: '5px' }}>
          <small style={{ color: 'gray' }}>
            <input type="checkbox" name="remember" required /> Is he/she interested to donate blood
          </small>
          <small style={{ color: 'rgb(179, 11, 11)', fontWeight: 'bold' }}>
            {' '} (adding donors without interest is punishable !!!)
          </small>
        </div>

        <button
          style={{ marginTop: '15px' }}
          type="submit"
          className="btn registerbtn"
          disabled={Object.keys(errors).length > 0}
        >
          Add Donor
        </button>
      </form>
    </div>
  );
};

export default AddDonor;
