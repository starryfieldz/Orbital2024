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
        alignItems: 'center',
        marginVertical: 20,
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center",
        padding: 10,      
    },

    redText: {
        fontSize: 24,
        color: "red",   
        fontWeight: "bold", 
    },
    greenText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
});

export default TotalSummary;