// src/services/donorService.js
import axios from 'axios';

const getBloodDetails = () => {
  return axios.get('http://localhost:7070/donor/blooddetails'); // Update with your API endpoint
};

export default { getBloodDetails };
