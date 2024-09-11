import axios from 'axios';

const BASE_URL = 'http://your-backend-api-url.com'; // Replace with your actual backend URL
const API_BASE_URL = 'http://localhost:7070';
const DonorListService = {
  // Fetch the list of donors
  getDonorList: () => {
    return axios.get(`${API_BASE_URL}/donor/donorlist`); // Adjust endpoint as needed
  },

  // Fetch a donor by ID (optional)
  getDonorById: (id) => {
    return axios.get(`${BASE_URL}/donors/${id}`); // Adjust endpoint as needed
  },

  // Add a new donor (optional)
  addDonor: (donor) => {
    return axios.post(`${BASE_URL}/donors`, donor); // Adjust endpoint as needed
  },

  // Update an existing donor (optional)
  updateDonor: (id, donor) => {
    return axios.put(`${BASE_URL}/donors/${id}`, donor); // Adjust endpoint as needed
  },

  // Delete a donor (optional)
  deleteDonor: (id) => {
    return axios.delete(`${BASE_URL}/donors/${id}`); // Adjust endpoint as needed
  }
};

export default DonorListService;
