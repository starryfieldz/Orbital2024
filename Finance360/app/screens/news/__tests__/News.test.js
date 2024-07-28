import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import News from '..'; // Adjust the import path according to your project structure

const mock = new MockAdapter(axios);

describe('News Screen', () => {
  beforeEach(() => {
    mock.reset();
    mock.onGet('https://newsapi.org/v2/top-headlines', {
      params: { country: 'us', category: 'business', apiKey: 'b4ee4af9b9c64710be2504dbceaeb049' },
    }).reply(200, { articles: [{ title: 'Default US News' }] });
  });

  afterEach(() => {
    mock.reset();
  });

  it('Unit Test: Should change country state and fetch news for SG', async () => {
    const navigation = { navigate: jest.fn() };

    mock.onGet('https://newsapi.org/v2/top-headlines', {
      params: { country: 'sg', category: 'business', apiKey: 'b4ee4af9b9c64710be2504dbceaeb049' },
    }).reply(200, { articles: [{ title: 'SG News 1' }] });

    const { getByText, findByText } = render(<News navigation={navigation} />);

    fireEvent.press(getByText('SG News'));

    await waitFor(() => {
      expect(mock.history.get.length).toBe(2); // 1 for default US news, 1 for SG news
      expect(getByText('SG News 1')).toBeTruthy();
    });
  });

  it('Unit Test: Should handle search functionality', async () => {
    const navigation = { navigate: jest.fn() };

    mock.onGet('https://newsapi.org/v2/everything', {
      params: { q: 'bitcoin', apiKey: 'b4ee4af9b9c64710be2504dbceaeb049' },
    }).reply(200, { articles: [{ title: 'Bitcoin News 1' }] });

    const { getByPlaceholderText, getByText } = render(<News navigation={navigation} />);

    fireEvent.changeText(getByPlaceholderText('Search for news'), 'bitcoin');
    fireEvent.press(getByText('Search'));

    await waitFor(() => {
      expect(mock.history.get.length).toBe(2); // 1 for default US news, 1 for search results
      expect(getByText('Bitcoin News 1')).toBeTruthy();
    });
  });

  it('Unit Test: Should clear search results when search input is empty', async () => {
    const navigation = { navigate: jest.fn() };

    const { getByPlaceholderText, queryByText } = render(<News navigation={navigation} />);

    fireEvent.changeText(getByPlaceholderText('Search for news'), '');

    await waitFor(() => {
      expect(queryByText('Bitcoin News 1')).toBeNull();
    });
  });
});