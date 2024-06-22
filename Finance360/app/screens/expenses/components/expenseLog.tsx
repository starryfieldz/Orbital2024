import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import ExpenseLogByDay from './expenseLogByDay';
import { format } from 'date-fns';

const FilterExpensesForMonth = ({data, currentMonth}) => {
    const expensesForMonth = {};
    for (let date in data) {
        if (date.startsWith(format(currentMonth, "yyyy-MM"))) {
            expensesForMonth[date] = data[date];
        }
    }
    return expensesForMonth;
};

const FilterIncomesForMonth= ({data, currentMonth}) => {
    const incomesForMonth = {};
    for (let date in data) {
        if (date.startsWith(format(currentMonth, "yyyy-MM"))) {
            incomesForMonth[date] = data[date];
        }
    }
    return incomesForMonth;
};

const ExpenseLog = ({ userId, currentMonth }) => {
    const [expenses, setExpenses] = useState({});
    const [incomes, setIncomes] = useState({});

    useEffect(() => {
        const db = getDatabase();
        const expensesRef = ref(db, `users/${userId}/expenses`);
        
        onValue(expensesRef, (snapshot) => {
            const data = snapshot.val();
            const filteredExpenses = FilterExpensesForMonth({data, currentMonth});
            setExpenses(filteredExpenses);
        });
    }, [userId, currentMonth]);

    useEffect(() => {
        const db = getDatabase();
        const incomesRef = ref(db, `users/${userId}/income`);
        
        onValue(incomesRef, (snapshot) => {
            const data = snapshot.val();
            const filteredIncomes = FilterIncomesForMonth({data, currentMonth});
            setIncomes(filteredIncomes);
        });
    }, [userId, currentMonth]);

    const allDates = Array.from(new Set([...Object.keys(expenses), ...Object.keys(incomes)])).sort();
    return (
        <ScrollView style={styles.container}>
            <Text style = {styles.headerText}> See all records for {format(currentMonth, "MMM yyyy")}</Text>
            {allDates.length == 0 ? (
                <Text style = {styles.message}>No expenses/incomes yet!</Text>
            ) : (
                allDates.map((date) => (
                    <ExpenseLogByDay key={date} date = {date} expenses = {expenses[date]} incomes = {incomes[date]} />
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