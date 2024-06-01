import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import ExpenseLogByDay from './expenseLogByDay';
import { format, subMonths, addMonths } from 'date-fns';

const FilterExpensesForMonth = ({data, currentMonth}) => {
    const expensesForMonth = {};
    for (let date in data) {
        if (date.startsWith(format(currentMonth, "yyyy-MM"))) {
            expensesForMonth[date] = data[date];
        }
    }
    return expensesForMonth;
};
const ExpenseLog = ({ userId, currentMonth }) => {
    const [expenses, setExpenses] = useState({});

    useEffect(() => {
        const db = getDatabase();
        const expensesRef = ref(db, `users/${userId}/expenses`);
        
        onValue(expensesRef, (snapshot) => {
            const data = snapshot.val();
            const filteredExpenses = FilterExpensesForMonth({data, currentMonth});
            setExpenses(filteredExpenses);
        });
    }, [userId, currentMonth]);

    return (
        <ScrollView style={styles.container}>
            <Text style = {styles.headerText}> See all expenses for {format(currentMonth, "MMM yyyy")}</Text>
            {Object.keys(expenses).length == 0 ? (
                <Text style = {styles.message}>No spending yet!</Text>
            ) : (
                Object.keys(expenses).map((date) => (
                    <ExpenseLogByDay date = {date} expenses={expenses[date]} />
                ))
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center",
        padding: 10,      
    },

    message: {
        fontSize: 15,
        textAlign: "center",      
    },
});

export default ExpenseLog;