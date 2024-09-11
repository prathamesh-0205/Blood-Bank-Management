import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './component/Login';
import AddDonor from './component/AddDonor';
import Registration from './component/Registration';
import BloodStock from './component/BloodStock';
import DonorList from './component/DonorList';
import LoginSuccess from './component/LoginSuccess';
import RegistrationSuccess from './component/RegistrationSuccess';
import RequestBlood from './component/RequestBlood';
import RequestHistory from './component/RequestHistory';
import Userlist from './component/UserList';
import RequestHistoryFromUser from './component/RequestHistoryFromUser';
import UserAsDonor from './component/UserAsDonor';
import UserDashboard from './component/UserDashboard';
import UserProfile from './component/UserProfile';
import AdminDashboard from './component/AdminDashboard';
import DonorRequestHistoryFromUser from './component/DonorRequestHistoryFromUser';
import DonorRequestHistory from './component/DonorRequestHistory';






const App = () => {
  return (
    

    <Router>
      <Routes>
      <Route path='/' element={<Login />} />
      <Route path="/register" element={<Registration />} />
        <Route path='/login' element={<Login />} />
        <Route path='/addDonor' element={<AddDonor />} />
        
        <Route path="/bloodstock" element={<BloodStock />} />
        <Route path="/donorlist" element={<DonorList />} />
        <Route path="/loginsuccess" element={<LoginSuccess />} />
        <Route path="/registrationsuccess" element={<RegistrationSuccess />} />
        <Route path="/requestblood" element={<RequestBlood />} />
        <Route path="/requesthistory" element={<RequestHistory />} />
        <Route path="/requesthistoryfromuser" element={<RequestHistoryFromUser />} />
        <Route path="/userasdonor" element={<UserAsDonor />} />
        <Route path="/donorrequesthistoryfromuser" element={<DonorRequestHistoryFromUser />} />
        <Route path="/donorrequesthistory" element={<DonorRequestHistory/>} />  
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/userlist" element={<Userlist />} />
        <Route path="/userprofile" element={<UserProfile />} />
      
        <Route path="/admindashboard" element={<AdminDashboard />} />
      </Routes>
      
    </Router>
  );
};

export default App;
