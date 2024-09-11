import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './UseAuth'; // Custom hook for authentication

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isUserLoggedIn, userType } = useAuth();

  const handleLogout = () => {
    // Handle logout logic
    // Clear session or token
    navigate('/login');
  };

  if (!isUserLoggedIn() || userType() !== 'admin') {
    // Redirect to login if user is not an admin
    navigate('/login');
    return null; // Prevent rendering while redirecting
  }

  return (
    <div>
      <header>
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <main>
        <section>
          <h2>Welcome, Admin</h2>
          {/* Add your dashboard content here */}
          <div>
            <p>Here you can manage users, view reports, and perform administrative tasks.</p>
            {/* Example of a dashboard feature */}
            <button onClick={() => navigate('/manage-users')}>Manage Users</button>
            <button onClick={() => navigate('/reports')}>View Reports</button>
          </div>
        </section>
      </main>
      <footer>
        <p>© 2024 Your Company</p>
      </footer>
    </div>
  );
};

export default AdminDashboard;
