import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';

function TotalPerDay(expenses) {
    let output = 0;
    Object.values(expenses).forEach((category) => {
        Object.values(category).forEach((expense) => {
            output += expense.amount;
        });
    });
    return output;
}

const ExpenseLogByDay = ({date, expenses}) => {
    return (
        <View style={styles.container}>
            <View style={styles.dateSection}>
                <Text style={styles.dateText}>{date}</Text>
            </View>
            {Object.keys(expenses).map((category) => (
                <View key={category} style={styles.categorySection}>
                    <Text style={styles.categoryText}>{category}</Text>
                    {Object.keys(expenses[category]).map((id) => (
                        <View key={id} style={styles.expenseDetail}>
                            <Text>{expenses[category][id].name}: ${expenses[category][id].amount}</Text>
                        </View>
                    ))}
                </View>
            ))}
            <Text style={styles.dateText}>{"Total: $" + TotalPerDay(expenses)}</Text>
        </View>
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
        color: "black"
    },
});

export default ExpenseLogByDay;



    
