import React, { useEffect, useState } from 'react';
import DonorService from '../services/donorService'; // Adjust the path as necessary
import './css/UserList.css'; // Ensure this path is correct
import Male from '../img/male.png';
import Female from '../img/female.png';
import Footer from './Footer'; // Import Footer component

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await DonorService.getUserList();
        setUsers(response.data);
        setFilteredUsers(response.data); // Initialize filteredUsers with the full list
      } catch (error) {
        setError('Error fetching users.');
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers(users); // Reset filter when search is cleared
    } else {
      const lowerCaseQuery = searchQuery.trim().toLowerCase();
      const newFilteredUsers = users.filter(user =>
        (user.bloodgroup || '').toLowerCase().includes(lowerCaseQuery) // Ensure user.bloodgroup is not null
      );
      setFilteredUsers(newFilteredUsers);
    }
  }, [searchQuery, users]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="user-list-container">
      <div className="sidebar-logo">
        <div className="welcometxt" style={{ float: 'left' }}>
          <b style={{ color: 'white' }}>User List</b>
        </div>
        <input
          className="form-control"
          id="searchtxt"
          type="text"
          name="search"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search via blood group..."
        />
        <button className="btn btn-primary" onClick={() => window.location.href = '/'}>
          Home
        </button>
        <button className="logoutbtn" onClick={() => {
          sessionStorage.clear();
          window.location.href = '/login';
        }}>
          <i className="fa fa-sign-out"></i> Logout
        </button>
      </div>

      <div className="user-list">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user.email} className="user-card">
              <div className="user-image">
                <img
                  src={user.gender && user.gender.toLowerCase() === "male" ? Male : Female}
                  alt={user.gender}
                  width="120"
                  height="120"
                />
              </div>
              <div className="user-details">
                <div className="text">
                  <b style={{ color: 'navy' }}>Email:</b>
                  <b className="element" style={{ color: 'red', marginLeft: '10px' }}>
                    {user.email || 'N/A'}
                  </b>
                </div>
                <div className="text">
                  <b style={{ color: 'navy' }}>Age:</b>
                  <b className="element" style={{ marginLeft: '10px' }}>
                    {user.age || 'N/A'}
                  </b>
                </div>
                <div className="text">
                  <b style={{ color: 'navy' }}>Blood Group:</b>
                  <b className="element" style={{ color: 'red', marginLeft: '10px' }}>
                    {user.bloodgroup || 'N/A'}
                  </b>
                </div>
                <div className="text">
                  <b style={{ color: 'navy' }}>Gender:</b>
                  <b className="element" style={{ marginLeft: '10px' }}>
                    {user.gender || 'N/A'}
                  </b>
                </div>
                <div className="text">
                  <b style={{ color: 'navy' }}>Mobile:</b>
                  <b className="element" style={{ marginLeft: '10px' }}>
                    {user.mobile || 'N/A'}
                  </b>
                </div>
                <div className="text">
                  <b style={{ color: 'navy' }}>Username:</b>
                  <b className="element" style={{ marginLeft: '10px' }}>
                    {user.username || 'N/A'}
                  </b>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-data">No users available.</div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default UserList;
