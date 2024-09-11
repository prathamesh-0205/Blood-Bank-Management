import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import RegistrationSuccess from './RegistrationSuccess';

describe('RegistrationSuccess Component', () => {
  test('should render correctly', () => {
    render(
      <Router>
        <RegistrationSuccess />
      </Router>
    );

    // Check if the success message is rendered
    expect(screen.getByText(/User successfully registered !!!/i)).toBeInTheDocument();
    expect(screen.getByText(/You will be re-directed to the Login page in a few seconds/i)).toBeInTheDocument();
  });
});
