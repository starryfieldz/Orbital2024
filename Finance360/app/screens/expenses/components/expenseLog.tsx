import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import ExpenseLogByDay from './expenseLogByDay';
import { format, startOfMonth, endOfMonth, endOfWeek, startOfWeek, isWithinInterval } from 'date-fns';

const FilterExpensesForMonth = ({data, currentDate}) => {
    const expensesForMonth = {};
    for (let date in data) {
        if (date.startsWith(format(currentDate, "yyyy-MM"))) {
            expensesForMonth[date] = data[date];
        }
    }
    return expensesForMonth;
};

const FilterExpensesForWeek = ({ data, currentDate }) => {
    const expensesForWeek = {};
    const start = startOfWeek(currentDate);
    const end = endOfWeek(currentDate);
    for (let date in data) {
        if (isWithinInterval(new Date(date), { start, end })) {
            expensesForWeek[date] = data[date];
        }
    }
    return expensesForWeek;
};

const FilterIncomesForMonth= ({data, currentDate}) => {
    const incomesForMonth = {};
    for (let date in data) {
        if (date.startsWith(format(currentDate, "yyyy-MM"))) {
            incomesForMonth[date] = data[date];
        }
    }
    return incomesForMonth;
};

const FilterIncomesForWeek = ({ data, currentDate }) => {
    const expensesForWeek = {};
    const start = startOfWeek(currentDate);
    const end = endOfWeek(currentDate);
    for (let date in data) {
        if (isWithinInterval(new Date(date), { start, end })) {
            expensesForWeek[date] = data[date];
        }
    }
    return expensesForWeek;
};

const ExpenseLog = ({ userId, currentDate, viewMode }) => {
    const [expenses, setExpenses] = useState({});
    const [incomes, setIncomes] = useState({});

    useEffect(() => {
        const db = getDatabase();
        const expensesRef = ref(db, `users/${userId}/expenses`);
        
        onValue(expensesRef, (snapshot) => {
            const data = snapshot.val();
            let filteredExpenses = {};
            if (viewMode === "month") {
                filteredExpenses = FilterExpensesForMonth({data, currentDate});
            } else {
                filteredExpenses = FilterExpensesForWeek({data, currentDate});
            }
            setExpenses(filteredExpenses);
        });
    }, [userId, currentDate, viewMode]);

    useEffect(() => {
        const db = getDatabase();
        const incomesRef = ref(db, `users/${userId}/income`);
        
        onValue(incomesRef, (snapshot) => {
            const data = snapshot.val();
            let filteredIncomes = {};
            if (viewMode === "month") {
                filteredIncomes = FilterIncomesForMonth({data, currentDate});
                
            } else {
                filteredIncomes = FilterIncomesForWeek({data, currentDate});
            }
            setIncomes(filteredIncomes);
        });
    }, [userId, currentDate, viewMode]);

    const allDates = Array.from(new Set([...Object.keys(expenses), ...Object.keys(incomes)])).sort();
    return (
        <ScrollView style={styles.container}>
            <Text style = {styles.headerText}> See all records for {format(currentDate, "MMM yyyy")}</Text>
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
        paddingHorizontal: 10,
        backgroundColor: '#FFFFFF',
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