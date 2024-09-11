import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import RequestBlood from '../component/RequestBlood';

test('renders RequestBloodComponent', () => {
  render(
    <Router>
      <RequestBloodComponent />
    </Router>
  );

  expect(screen.getByText(/Request Blood/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/enter Patient name/i)).toBeInTheDocument();
});

test('allows the user to submit a blood request', () => {
  render(
    <Router>
      <RequestBloodComponent />
    </Router>
  );

  fireEvent.change(screen.getByPlaceholderText(/enter Patient name/i), {
    target: { value: 'John Doe' },
  });
  fireEvent.change(screen.getByPlaceholderText(/enter email/i), {
    target: { value: 'johndoe@example.com' },
  });
  fireEvent.change(screen.getByPlaceholderText(/enter blood group/i), {
    target: { value: 'A+' },
  });
  fireEvent.change(screen.getByPlaceholderText(/enter disease name/i), {
    target: { value: 'Flu' },
  });
  fireEvent.change(screen.getByPlaceholderText(/enter mobile number/i), {
    target: { value: '1234567890' },
  });
  fireEvent.change(screen.getByPlaceholderText(/enter patient age/i), {
    target: { value: '30' },
  });

  fireEvent.click(screen.getByText(/Send Request/i));

  expect(screen.getByText(/Blood Request Sent Successfully/i)).toBeInTheDocument();
});
