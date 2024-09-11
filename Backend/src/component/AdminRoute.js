import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './authContext'; // Custom hook to check authentication and user type

const AdminRoute = ({ component: Component, ...rest }) => {
  const { isUserLoggedIn, userType } = useAuth(); // Replace with actual authentication logic

  return (
    <Route
      {...rest}
      render={(props) =>
        isUserLoggedIn() && userType() === 'admin' ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default AdminRoute;
