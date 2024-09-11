import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Loginsuccess from './Loginsuccess';
import { BrowserRouter as Router } from 'react-router-dom';
import DonorService from '../services/donorService';

// Mock DonorService
jest.mock('../services/DonorService', () => ({
  getBloodDetails: jest.fn(() => Promise.resolve([
    { bloodgroup: 'O+', count: 10, units: 5 },
    { bloodgroup: 'A+', count: 7, units: 2 },
  ])),
}));

describe('Loginsuccess Component', () => {
  test('renders component and fetches blood details', async () => {
    render(
      <Router>
        <Loginsuccess />
      </Router>
    );

    // Check if loggedUser text is in the document
    expect(screen.getByText(/Welcome/)).toBeInTheDocument();

    // Wait for the blood details to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('Blood Group:')).toBeInTheDocument();
      expect(screen.getByText('Number of Donors:')).toBeInTheDocument();
      expect(screen.getByText('Available Units:')).toBeInTheDocument();
    });
  });
});
