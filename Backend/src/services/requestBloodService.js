import axios from 'axios';

const API_BASE_URL = 'http://localhost:7070'; // Adjust the base URL as necessary

class requestBloodService {
  requestForBlood(request) {
    return axios.post(`${API_BASE_URL}/requestBlood`, request);
  }

  // Other service methods as needed
}

export default new requestBloodService();
