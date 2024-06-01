import {View, ScrollView, StyleSheet} from 'react-native';
import NavigationTab from "../../../components/navigation/navigation";
import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import AddingExpenseButton from "./components/addExpenseButton";
import ExpenseLog from "../expenses/components/expenseLog";

export function getId() {
    const [userId, setUserId] = useState(null); // State to hold the fetched userId

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
        return () => unsubscribe();
    }, []);
    return userId;
}
