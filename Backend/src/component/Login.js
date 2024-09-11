import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/Login.css';

const API_BASE_URL = 'http://localhost:7070';

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [admin, setAdmin] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isAdmin) {
      setAdmin((prevAdmin) => ({ ...prevAdmin, [name]: value }));
    } else {
      setUser((prevUser) => ({ ...prevUser, [name]: value }));
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/registration/login`, user);
      if (response.status === 200) {
        sessionStorage.setItem('loggedUser', user.email);
        sessionStorage.setItem('USER', 'user');
        sessionStorage.setItem('ROLE', 'user');
        navigate('/userdashboard');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMsg('Bad credentials, please enter valid credentials!');
      } else {
        setMsg('Something went wrong! Please try again later.');
      }
    }
  };

  const loginAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/bloodbank/adminlogin`, admin);
      if (response.status === 200) {
        sessionStorage.setItem('loggedUser', admin.email);
        sessionStorage.setItem('USER', 'admin');
        sessionStorage.setItem('ROLE', 'admin');
        navigate('/loginsuccess');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMsg('Bad admin credentials!');
      } else {
        setMsg('Something went wrong! Please try again later.');
      }
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/forgot-password`, { email: user.email });
      if (response.status === 200) {
        setMsg('Password reset link sent to your email!');
        setForgotPassword(false); // Reset the form after successful submission
      }
    } catch (error) {
      setMsg('An error occurred while sending the password reset link.');
    }
  };

  const toggleLoginForm = () => {
    setIsAdmin((prev) => !prev);
    setForgotPassword(false); // Reset forgot password state when toggling login form
  };

  const toggleForgotPassword = () => {
    setForgotPassword((prev) => !prev);
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="container">
      <div className="login-form">
        {forgotPassword ? (
          <>
            <h2 className="textual">Forgot Password</h2>
            {msg && <Alert variant="danger">{msg}</Alert>}
            <Form onSubmit={handleForgotPassword}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Send Password Reset Link
              </Button>
              <Button variant="link" onClick={toggleForgotPassword}>
                Back to Login
              </Button>
            </Form>
          </>
        ) : (
          <>
            <h2 className="textual">{isAdmin ? 'Admin Login' : 'User Login'}</h2>
            {msg && <Alert variant="danger">{msg}</Alert>}
            <Form onSubmit={isAdmin ? loginAdmin : loginUser}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address: <b className="text-danger">*</b></Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={isAdmin ? admin.email : user.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password: <b className="text-danger">*</b></Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={isAdmin ? admin.password : user.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              {!isAdmin && (
                <Button variant="link" onClick={toggleForgotPassword}>
                  Forgot Password?
                </Button>
              )}
              
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
            <div className="toggle-login mt-3" style={{ cursor: 'pointer', color: 'navy' }} onClick={toggleLoginForm}>
              {isAdmin ? 'Are you a User? Click here' : 'Are you an Admin? Click here'}
            </div>
            <div className="register-link mt-3" style={{ cursor: 'pointer', color: 'green' }} onClick={goToRegister}>
              New User? Register here
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
