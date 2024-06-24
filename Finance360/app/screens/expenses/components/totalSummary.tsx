import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import ExpenseLogByDay from './expenseLogByDay';
import { format, subMonths, addMonths, startOfWeek, endOfWeek, isWithinInterval, startOfMonth, endOfMonth, parseISO } from 'date-fns';

function calculateTotalPerMonth({data, currentDate}) {
    let total = 0.0;
    for (let date in data) {
        if (date.startsWith(format(currentDate, "yyyy-MM"))) {
            Object.values(data[date]).forEach(category => {
                Object.values(category).forEach(item => {
                    total += item.amount;
                });
            });
        }
    }
    return total;
};

function calculateTotalPerWeek({data, currentDate}) {
    let total = 0.0;
    const start = startOfWeek(currentDate);
    const end = endOfWeek(currentDate);
    for (let date in data) {
        if (isWithinInterval(parseISO(date), { start, end } )) {
            Object.values(data[date]).forEach(category => {
                Object.values(category).forEach(item => {
                    total += item.amount;
                });
            });
        }
    }
    return total;
};

const TotalSummary = ({ userId, currentDate, viewMode }) => {
    const [totalExpensesPerPeriod, setTotalExpensesPerPeriod] = useState(0.0);
    const [totalIncomePerPeriod, setTotalIncomePerPeriod] = useState(0.0);

    useEffect(() => {
        const db = getDatabase();
        const expensesRef = ref(db, `users/${userId}/expenses`);
        
        onValue(expensesRef, (snapshot) => {
            const data = snapshot.val();
            if ( viewMode === "month" ) {
                const newTotalExpensesPerPeriod = calculateTotalPerMonth({data, currentDate});
                setTotalExpensesPerPeriod(newTotalExpensesPerPeriod);
            } else {
                const newTotalExpensesPerPeriod = calculateTotalPerWeek({data, currentDate});
                setTotalExpensesPerPeriod(newTotalExpensesPerPeriod);
            }
        });
    }, [userId, currentDate]);

    useEffect(() => {
        const db = getDatabase();
        const incomesRef = ref(db, `users/${userId}/income`);
        
        onValue(incomesRef, (snapshot) => {
            const data = snapshot.val();
            const newTotalExpensesPerPeriod = calculateTotalPerMonth({data, currentDate});
            setTotalIncomePerPeriod(newTotalExpensesPerPeriod);
        });
    }, [userId, currentDate]);

    return (
        <View style={styles.container}>
            <Text style={styles.redText}>Total Expenditure: ${totalExpensesPerPeriod.toFixed(2)}</Text>
            <Text style={styles.greenText}>Total Income: ${totalIncomePerPeriod.toFixed(2)}</Text>
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