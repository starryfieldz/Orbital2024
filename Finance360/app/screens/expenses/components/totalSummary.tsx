import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { format, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';
import Colors from "../../../../constants/Colors";

function calculateTotalPerMonth({ data, currentDate }) {
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
}

function calculateTotalPerWeek({ data, currentDate }) {
    let total = 0.0;
    const start = startOfWeek(currentDate);
    const end = endOfWeek(currentDate);
    for (let date in data) {
        if (isWithinInterval(new Date(date), { start, end })) {
            Object.values(data[date]).forEach(category => {
                Object.values(category).forEach(item => {
                    total += item.amount;
                });
            });
        }
    }
    return total;
}

const TotalSummary = ({ userId, currentDate, viewMode }) => {
    const [totalExpensesPerPeriod, setTotalExpensesPerPeriod] = useState(0.0);
    const [totalIncomePerPeriod, setTotalIncomesPerPeriod] = useState(0.0);

    useEffect(() => {
        const db = getDatabase();
        const expensesRef = ref(db, `users/${userId}/expenses`);

        onValue(expensesRef, (snapshot) => {
            const data = snapshot.val();
            let newTotalExpensesPerPeriod = 0.0;

            if (viewMode === "month") {
                newTotalExpensesPerPeriod = calculateTotalPerMonth({ data, currentDate });
            } else {
                newTotalExpensesPerPeriod = calculateTotalPerWeek({ data, currentDate });
            }

            setTotalExpensesPerPeriod(newTotalExpensesPerPeriod);
        });
    }, [userId, currentDate, viewMode]);

    useEffect(() => {
        const db = getDatabase();
        const incomesRef = ref(db, `users/${userId}/income`);

        onValue(incomesRef, (snapshot) => {
            const data = snapshot.val();
            let newTotalIncomesPerPeriod = 0.0;

            if (viewMode === "month") {
                newTotalIncomesPerPeriod = calculateTotalPerMonth({ data, currentDate });
            } else {
                newTotalIncomesPerPeriod = calculateTotalPerWeek({ data, currentDate });
            }

            setTotalIncomesPerPeriod(newTotalIncomesPerPeriod);
        });
    }, [userId, currentDate, viewMode]);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.greenButton} />
                <Text style={styles.greenText}>Total Income</Text>
                <Text style={styles.amountGreenText}>+${totalIncomePerPeriod.toFixed(2)}</Text>
            </View>
            <View style={styles.row}>
                <View style={styles.redButton} />
                <Text style={styles.redText}>Total Expense</Text>
                <Text style={styles.amountRedText}>-${totalExpensesPerPeriod.toFixed(2)}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: Colors.mainBG,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
        width: '90%', // Adjust this value to control the width
        alignSelf: 'center', // Center the container
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    greenButton: {
        width: 20,
        height: 20,
        backgroundColor: 'green',
        borderRadius: 10,
        marginRight: 10,
    },
    redButton: {
        width: 20,
        height: 20,
        backgroundColor: 'red',
        borderRadius: 10,
        marginRight: 10,
    },
    greenText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        flex: 1,
    },
    redText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        flex: 1,
    },
    amountRedText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red',
    },
    amountGreenText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'green',
    },
});

export default TotalSummary;
