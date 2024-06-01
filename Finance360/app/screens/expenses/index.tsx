import Title from "../expenses/components/title";
import {View, ScrollView, StyleSheet} from 'react-native';
import Month from "../expenses/components/month";
import Chart from "../expenses/components/chart";
import NavigationTab from "../../../components/navigation/navigation";
import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import AddingExpenseButton from "./components/addExpenseButton";
import ExpenseLog from "../expenses/components/expenseLog";


const Expenses = ( {navigation} ) => {
    const [userId, setUserId] = useState(null); // State to hold the fetched userId
    const month = "2024-05";

    useEffect(() => {
        // Initialize Firebase Authentication
        const auth = getAuth();
        // Function that obtains userID
        // Listen for changes in authentication state (user sign-in or sign-out)
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                console.log("User found.")
                const fetchedUserId = user.uid; // Get the user's unique ID (UID)
                setUserId(fetchedUserId);
            } else {
                // No user is signed in
                setUserId(null); // Reset userId state if no user is signed in
            }
        });

        // Clean up the listener when the component unmounts
        return () => unsubscribe();
    }, []);
    // // adjust the numbers to be able to sum up fetched categories
    // const food = 30; //sum of food expenses in given month
    // const necessity = 20;
    // const clothes = 25;
    // const subscriptions = 25;
    // const userName = "Admin";
    
    return (
        <View style = {styles.container}>
            <Title userId = {userId} />
            
            <ScrollView contentContainerStyle = {styles.scrollViewContent}>
                <Month />
                {userId && <ExpenseLog userId={userId} month={month} />}
                {/* <Chart food={food} necessity={necessity} clothes={clothes} subscriptions={subscriptions} /> */}
                {/* <Chart userID = {userId} month = {"May"}/> */}
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