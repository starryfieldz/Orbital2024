// Login.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Login from '../app/screens/login'; // Adjust the path as necessary
import { signInWithEmailAndPassword } from 'firebase/auth';

// Mock the Firebase auth functions
jest.mock('firebase/auth', () => ({
    signInWithEmailAndPassword: jest.fn(),
}));

const mockNavigate = jest.fn();
const mockSetState = jest.fn();
const mockGet = jest.fn(() => ({ exists: () => true, val: () => ({ name: 'Test User' }) }));

jest.mock('firebase/database', () => ({
    ref: jest.fn(),
    child: jest.fn(),
    get: jest.fn(() => Promise.resolve(mockGet)),
}));

jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        navigate: mockNavigate,
    }),
}));

describe('Login Component', () => {
    it('renders correctly', () => {
        const { getByPlaceholderText, getByText } = render(<Login navigation={{ navigate: mockNavigate }} />);
        expect(getByPlaceholderText('Email')).toBeTruthy();
        expect(getByPlaceholderText('Password')).toBeTruthy();
        expect(getByText('Login')).toBeTruthy();
    });

    it('shows error when email is empty', async () => {
        const { getByText, getByPlaceholderText } = render(<Login navigation={{ navigate: mockNavigate }} />);
        const loginButton = getByText('Login');
        fireEvent.press(loginButton);
        await waitFor(() => {
            expect(getByText('Please enter a valid email address.')).toBeTruthy();
        });
    });

    it('shows error when password is empty', async () => {
        const { getByText, getByPlaceholderText } = render(<Login navigation={{ navigate: mockNavigate }} />);
        const emailInput = getByPlaceholderText('Email');
        fireEvent.changeText(emailInput, 'test@example.com');
        const loginButton = getByText('Login');
        fireEvent.press(loginButton);
        await waitFor(() => {
            expect(getByText('Please enter a password.')).toBeTruthy();
        });
    });

    it('navigates to Expenses screen on successful login', async () => {
        signInWithEmailAndPassword.mockResolvedValueOnce({
            user: { uid: '12345' }
        });
        const { getByText, getByPlaceholderText } = render(<Login navigation={{ navigate: mockNavigate }} />);
        const emailInput = getByPlaceholderText('Email');
        const passwordInput = getByPlaceholderText('Password');
        fireEvent.changeText(emailInput, 'test@example.com');
        fireEvent.changeText(passwordInput, 'password');
        const loginButton = getByText('Login');
        fireEvent.press(loginButton);
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('Expenses');
        });
    });

    it('shows error on failed login', async () => {
        signInWithEmailAndPassword.mockRejectedValueOnce({
            code: 'auth/invalid-credential'
        });
        const { getByText, getByPlaceholderText } = render(<Login navigation={{ navigate: mockNavigate }} />);
        const emailInput = getByPlaceholderText('Email');
        const passwordInput = getByPlaceholderText('Password');
        fireEvent.changeText(emailInput, 'test@example.com');
        fireEvent.changeText(passwordInput, 'password');
        const loginButton = getByText('Login');
        fireEvent.press(loginButton);
        await waitFor(() => {
            expect(getByText('The username/password is invalid.')).toBeTruthy();
        });
    });

    it('displays loading indicator when logging in', async () => {
        const { getByText, getByPlaceholderText, queryByText, getByTestId } = render(<Login navigation={{ navigate: mockNavigate }} />);
        const emailInput = getByPlaceholderText('Email');
        const passwordInput = getByPlaceholderText('Password');
        fireEvent.changeText(emailInput, 'test@example.com');
        fireEvent.changeText(passwordInput, 'password');
        const loginButton = getByText('Login');
        fireEvent.press(loginButton);
        await waitFor(() => {
            expect(queryByText('Login')).toBeNull();
            expect(getByTestId('loading-indicator')).toBeTruthy();
        });
    });
});
