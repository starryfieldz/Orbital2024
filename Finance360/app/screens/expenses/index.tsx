import Title from "../expenses/components/title";
import {View, ScrollView, StyleSheet} from 'react-native';
import Month from "../expenses/components/month";
import Chart from "../expenses/components/chart";
import NavigationTab from "../../../components/navigation/navigation";
import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import AddingExpenseButton from "./components/addExpenseButton";
import ExpenseLog from "../expenses/components/expenseLog";
import {getId} from "../../../components/commoncodes/commoncodes"
import { format, subMonths, addMonths } from 'date-fns';

const Expenses = ( {navigation} ) => {
    
    // const month = CurrentMonth();

    const [currentMonth, setCurrentMonth] = useState(new Date());

    const handleEarlierMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    // const [userId, setUserId] = useState(null); // State to hold the fetched userId
    

    // useEffect(() => {
    //     // Initialize Firebase Authentication
    //     const auth = getAuth();
    //     // Function that obtains userID
    //     // Listen for changes in authentication state (user sign-in or sign-out)
    //     const unsubscribe = onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             // User is signed in
    //             console.log("User found.")
    //             const fetchedUserId = user.uid; // Get the user's unique ID (UID)
    //             setUserId(fetchedUserId);
    //         } else {
    //             // No user is signed in
    //             setUserId(null); // Reset userId state if no user is signed in
    //         }
    //     });

    //     // Clean up the listener when the component unmounts
    //     return () => unsubscribe();
    // }, []);
    // // adjust the numbers to be able to sum up fetched categories
    // const Food = 30; //sum of Food expenses in given month
    // const Necessity = 20;
    // const Clothes = 25;
    // const Subscriptions = 25;
    // const userName = "Admin";

    const userId = getId();
    return (
        <View style = {styles.container}>
            <Title userId = {userId} />
            
            <ScrollView contentContainerStyle = {styles.scrollViewContent}>
                <Month
                    currentMonth = {currentMonth}
                    earlierMonth = {handleEarlierMonth}
                    nextMonth = {handleNextMonth}
                />
                <Chart userId = {userId} currentMonth = {currentMonth}/>
                {<ExpenseLog userId={userId} currentMonth={currentMonth} />}
                
                <Month
                    currentMonth = {currentMonth}
                    earlierMonth = {handleEarlierMonth}
                    nextMonth = {handleNextMonth}
                />
            </ScrollView>
            <View style = {styles.addExpenseButton}>
                <AddingExpenseButton navigation = {navigation}/>
            </View>
            <View style = {styles.navigationTab}>
                <NavigationTab navigation = {navigation} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 120,
    },
    navigationTab: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },

    addExpenseButton: {
        position: 'absolute',
        bottom : 80,
        right: 30, 
    }
});


export default Expenses;
