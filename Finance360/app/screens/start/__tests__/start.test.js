import React from "react";
import Start from "..";
import { render, fireEvent } from "@testing-library/react-native";
import LoginButton from '../components/loginButton';
import SignupButton from '../components/signupButton';
import Logo from '../components/logo';
import Quote from '../components/quote';

describe("start screen", () => {

    it('UnitTest LoginButton renders correctly', () => {
        const { getByText } = render(<LoginButton navigation={{ navigate: jest.fn() }} />);
        expect(getByText('Sign In')).toBeTruthy();
    });

    it('UnitTest SignupButton renders correctly', () => {
      const { getByText } = render(<SignupButton navigation={{ navigate: jest.fn() }} />);
      expect(getByText("Don't have an account? Sign up now")).toBeTruthy();
    });

    it('UnitTest Logo renders correctly', () => {
      const { getByTestId } = render(<Logo />);
      expect(getByTestId('logo')).toBeTruthy();
    });

    it('UnitTest Quote renders correctly', () => {
      const { getByText } = render(<Quote />);
      expect(getByText('Own Your Finance Today')).toBeTruthy();
    });

    it("IntegratedNavigateToLogin", () => {
        const navigation = {navigate: jest.fn()};
    
        const page = render(<Start navigation={navigation}/>)

        const loginButton = page.getByTestId("loginButton");

        fireEvent.press(loginButton);
        
        expect(navigation.navigate).toHaveBeenCalledWith("Login")

    })

    it("IntegratedNavigateToSignup", () => {
        const navigation = {navigate: jest.fn()}

        const page = render(<Start navigation={navigation}/>)

        const signupButton = page.getByTestId("signupButton")

        fireEvent.press(signupButton);
        
        expect(navigation.navigate).toHaveBeenCalledWith("SignupScreen")

    })

    it('IntegratedTesting everything renders correctly', () => {
      const { getByTestId, getByText } = render(<Start navigation={{ navigate: jest.fn() }} />);
      expect(getByTestId('logo')).toBeTruthy();
      expect(getByText('Own Your Finance Today')).toBeTruthy();
      expect(getByText('Sign In')).toBeTruthy();
      expect(getByText("Don't have an account? Sign up now")).toBeTruthy();
    });
})