import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { format } from 'date-fns';
import { View, Text, StyleSheet } from 'react-native';
import Colors from "../../../../constants/Colors";

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

const IncomeByMonth = ({ userId, currentMonth }) => {
    const [totalIncomePerMonth, setTotalIncomePerMonth] = useState(0.0);
    
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
            <Text style={styles.label}>Monthly Income</Text>
            <Text style={styles.amount}>${totalIncomePerMonth.toFixed(2)}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 10,
        padding: 10,
        backgroundColor: Colors.mainBG,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
        width: '80%'
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    amount: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
});

export default IncomeByMonth;
