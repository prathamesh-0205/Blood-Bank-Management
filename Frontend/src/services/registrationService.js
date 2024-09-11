// src/services/registrationService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:7070';

const registerUser = (user) => {
  return axios.post(`${API_BASE_URL}/registration/register`, user);
};

export default { registerUser };
