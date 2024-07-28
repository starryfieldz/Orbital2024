import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import StockData from '../components/stockData'; // Adjust the import path as needed

jest.mock('axios');

describe('StockData', () => {
  it('IntegratedFetches and displays stock data', async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          symbol: 'AAPL',
          price: 150,
          open: 145,
          dayHigh: 155,
          dayLow: 140,
          volume: 1000000,
        },
      ],
    });

    const { getByText, queryByText } = render(
      <StockData navigation={{ navigate: jest.fn() }} symbol="AAPL" />
    );

    await waitFor(() => {
      expect(getByText('AAPL')).toBeTruthy();
      expect(getByText('High:')).toBeTruthy();
      expect(queryByText(/\$155\.00/)).toBeTruthy();
      expect(getByText('Low:')).toBeTruthy();
      expect(queryByText(/\$140\.00/)).toBeTruthy();
      expect(getByText('Volume:')).toBeTruthy();
      expect(queryByText(/10\.00M/)).toBeTruthy();
      expect(queryByText(/\$150\.00/)).toBeTruthy();
    });
  });
});
