import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import ExpenseLogByDay from './expenseLogByDay';
import { format, subMonths, addMonths } from 'date-fns';

function calculateTotalPerMonth({data, currentMonth}) {
    let total = 0.0;
    for (let date in data) {
        if (date.startsWith(format(currentMonth, "yyyy-MM"))) {
            Object.values(data[date]).forEach(category => {
                Object.values(category).forEach(item => {
                    total += item.amount;
                });
            });
        }
    }
    return total;
};

const TotalSummary = ({ userId, currentMonth }) => {
    const [totalExpensesPerMonth, setTotalExpensesPerMonth] = useState(0.0);
    const [totalIncomePerMonth, setTotalIncomePerMonth] = useState(0.0);

    useEffect(() => {
        const db = getDatabase();
        const expensesRef = ref(db, `users/${userId}/expenses`);
        
        onValue(expensesRef, (snapshot) => {
            const data = snapshot.val();
            const newTotalExpensesPerMonth = calculateTotalPerMonth({data, currentMonth});
            setTotalExpensesPerMonth(newTotalExpensesPerMonth);
            
        });
    }, [userId, currentMonth]);

    useEffect(() => {
        const db = getDatabase();
        const incomesRef = ref(db, `users/${userId}/income`);
        
        onValue(incomesRef, (snapshot) => {
            const data = snapshot.val();
            const newTotalExpensesPerMonth = calculateTotalPerMonth({data, currentMonth});
            setTotalIncomePerMonth(newTotalExpensesPerMonth);
        });
    }, [userId, currentMonth]);

    return (
        <View style={styles.container}>
            <Text style={styles.redText}>Total Expenditure: ${totalExpensesPerMonth.toFixed(2)}</Text>
            <Text style={styles.greenText}>Total Income: ${totalIncomePerMonth.toFixed(2)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 20,
        paddingTop: 10,
        flex: 1,
        borderWidth: 5,
        borderColor: "rgb(100, 100, 100)",
        backgroundColor: "yellow",
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center",
        padding: 10,      
    },

    redText: {
        fontSize: 15,
        color: "red",    
    },
    greenText: {
        fontSize: 15,
        color: "green",    
    },
});

export default TotalSummary;