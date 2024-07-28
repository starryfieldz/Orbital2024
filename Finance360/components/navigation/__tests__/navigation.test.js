import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import NavigationTab from "../navigation";

describe("Navigation Bar", () => {

    it("IntegratedNavigateToExpenses", () => {
        const navigation = {navigate: jest.fn()};
    
        const page = render(<NavigationTab navigation={navigation}/>)

        const expenses = page.getByTestId("Expenses");

        fireEvent.press(expenses);
        
        expect(navigation.navigate).toHaveBeenCalledWith("Expenses")

    })

    it("IntegratedNavigateToBudgeting", () => {
        const navigation = {navigate: jest.fn()};
    
        const page = render(<NavigationTab navigation={navigation}/>)

        const budgeting = page.getByTestId("Budgeting");

        fireEvent.press(budgeting);
        
        expect(navigation.navigate).toHaveBeenCalledWith("Budgeting")

    })

    it("IntegratedNavigateToBills", () => {
        const navigation = {navigate: jest.fn()};
    
        const page = render(<NavigationTab navigation={navigation}/>)

        const bills = page.getByTestId("Bills");

        fireEvent.press(bills);
        
        expect(navigation.navigate).toHaveBeenCalledWith("Bills")

    })

    it("IntegratedNavigateToPortfolio", () => {
        const navigation = {navigate: jest.fn()};
    
        const page = render(<NavigationTab navigation={navigation}/>)

        const portfolio = page.getByTestId("Portfolio");

        fireEvent.press(portfolio);
        
        expect(navigation.navigate).toHaveBeenCalledWith("Portfolio")

    })

    it("IntegratedNavigateToNews", () => {
        const navigation = {navigate: jest.fn()};
    
        const page = render(<NavigationTab navigation={navigation}/>)

        const news = page.getByTestId("News");

        fireEvent.press(news);
        
        expect(navigation.navigate).toHaveBeenCalledWith("News")

    })
})