import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import ExpenseLogByDay from './expenseLogByDay';

const getExpensesForMonth = ({data, month}) => {
    const expensesForMonth = {};
    for (let date in data) {
        if (date.startsWith(month)) {
            expensesForMonth[date] = data[date];
        }
    }
    return expensesForMonth;
};
const ExpenseLog = ({ userId, month }) => {
    const [expenses, setExpenses] = useState({});

    useEffect(() => {
        const db = getDatabase();
        const expensesRef = ref(db, `users/${userId}/expenses`);
        
        onValue(expensesRef, (snapshot) => {
            const data = snapshot.val();
            const filteredExpenses = getExpensesForMonth({data, month});
            setExpenses(filteredExpenses);
        });
    }, [userId, month]);

    return (
        <ScrollView style={styles.container}>
            {Object.keys(expenses).length == 0 ? (
                <Text>No expenses recorded for {month}</Text>
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
    padding: 10,
    },
    dateSection: {
    marginVertical: 10,
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    categorySection: {
        paddingVertical: 5,
    },
    categoryText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'darkgreen',
    },
    expenseDetail: {
        paddingLeft: 10,
    },
    });

export default ExpenseLog;