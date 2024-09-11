import axios from 'axios';
//import { environment } from '../environment'; // Make sure you have an environment.js file with the API URL

const NAV_URL = process.env.REACT_APP_API_URL;
const API_BASE_URL = 'http://localhost:7070';

class DonorService {
  
  getDonorList() {
    return axios.get(`${API_BASE_URL}/donor/donorlist`);
  }

  getRequestHistory() {
    return axios.get(`${API_BASE_URL}/donor/requestHistory`);
  }

  getDonorRequestHistory(){
    return axios.get(`${API_BASE_URL}/donor/donorHistory`);
  }

  getRequestHistoryByEmail(loggedUser) {
    return axios.get(`${API_BASE_URL}/request/requestHistory/${encodeURIComponent(loggedUser)}`);
  }

  getDonorRequestHistoryByEmail(loggedUser){
    return axios.get(`${API_BASE_URL}/donor/donorRequestHistory/${encodeURIComponent(loggedUser)}`);
  }
  
    
    
  getUserList() {
    return axios.get(`${API_BASE_URL}/donor/userlist`);
    
  }

  deleteDonor(id){
    return axios.delete(`${API_BASE_URL}/donor/deleteDonor/${id}`);
  }

  addDonorFromRemote(donor) {
    return axios.post(`${API_BASE_URL}/donor/addDonor`, donor);
  }

  requestForBlood(request) {
    return axios.post(`${API_BASE_URL}/donor/requestblood`, request);
  }

  requestForAddingDonor(donor) {
    return axios.post(`${API_BASE_URL}/donor/addAsDonor`, donor);
  }

  getBloodDetails() {
    return axios.get(`${API_BASE_URL}/inventory/inventoryDetails`);
  }
  async getDonorCountByBloodGroup(bloodGroup) {
    try {
      const response = await axios.get(`${API_BASE_URL}/donors/count`, {
        params: { bloodGroup },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error fetching donor count');
    }}

  getProfileDetails(loggedUser) {
    return axios.get(`${API_BASE_URL}/donor/profileDetails/${encodeURIComponent(loggedUser)}`);
  }
  
  updateUserProfile(user) {
    return axios.put('http://localhost:7070/registration/updateuser', user);
  }

  updateBloodStock = async (bloodGroup, change) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/inventory/updateStock`, null, {
        params: {
          bloodGroup,
          change
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error updating blood stock:", error);
      throw error;
    }
  };
  

  
  acceptRequestForBlood = async (email, id) => {
    try {
      // First, call the endpoint to accept the donor request
      await axios.get(`${API_BASE_URL}/donor/acceptstatus/${email}/${id}`);
  
      // After accepting, update the inventory for this donor
      await axios.put(`${API_BASE_URL}/inventory/updateInventory/${id}`);
    } catch (error) {
      throw error;
    }
  };
  

  rejectRequestForBlood(email,id) {
    return axios.get(`${API_BASE_URL}/donor/rejectstatus/${email}/${id}`);
  }

  

  
   
   acceptRequestOfDonor = async (email, id) => {
    try {
      // First, call the endpoint to accept the donor request
      await axios.get(`${API_BASE_URL}/donor/acceptStatusOfDonor/${email}/${id}`);
  
      // After accepting, update the inventory for this donor
      await axios.put(`${API_BASE_URL}/inventory/update/${id}`);
    } catch (error) {
      throw error;
    }
  };
  

  rejectRequestOfDonor(email, id){
    return axios.get(`${API_BASE_URL}/donor/rejectStatusOfDonor/${email}/${id}`);
  }
  

}



 


export default new DonorService();
