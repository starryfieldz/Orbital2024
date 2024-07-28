import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import SearchStock from '../components/searchStock'; // Adjust the import path as needed

jest.mock('axios');

describe('SearchStock', () => {
  it('Unit Test: Renders correctly', () => {
    const { getByPlaceholderText } = render(<SearchStock navigation={{ navigate: jest.fn() }} />);
    expect(getByPlaceholderText('Enter stock symbol')).toBeTruthy();
  });

  it('Unit Test: Searches stock on button press', async () => {
    axios.get.mockResolvedValue({ data: {} });

    const navigate = jest.fn();
    const { getByPlaceholderText, getByText } = render(<SearchStock navigation={{ navigate }} />);
    fireEvent.changeText(getByPlaceholderText('Enter stock symbol'), 'AAPL');
    fireEvent.press(getByText('Search'));

    await waitFor(() => expect(navigate).toHaveBeenCalledWith('StockGraph', { symbol: 'AAPL' }));
  });
});
