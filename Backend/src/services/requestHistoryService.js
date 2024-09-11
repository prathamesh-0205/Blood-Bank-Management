import axios from 'axios';

const RequestHistoryService = {
  getRequestHistory: async () => {
    try {
      const response = await axios.get('/requestHistory');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getRequestHistoryByEmail: async (email) => {
    try {
      const response = await axios.get(`/requestHistory/${email}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  acceptRequestForBlood: async (email) => {
    try {
      const response = await axios.post(`/requestHistory/accept`, { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  rejectRequestForBlood: async (email) => {
    try {
      const response = await axios.post(`/requestHistory/reject`, { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default RequestHistoryService;
