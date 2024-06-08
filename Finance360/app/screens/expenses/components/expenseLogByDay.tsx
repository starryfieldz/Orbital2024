import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { format, } from 'date-fns';

function TotalPerDay(expenses) {
    let output = 0.0;
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
                <Text style={styles.dateText}>{format(date, "MMM dd")}</Text>
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
            <Text style={styles.dateText}>{"Total: $" + TotalPerDay(expenses).toFixed(2)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderColor: "black",
        borderTopWidth: 3,
        borderBottomWidth: 3,
        borderLeftWidth: 3,
        borderRightWidth: 3,
        margin: 5

    },
    dateSection: {
        marginVertical: 10,
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    categorySection: {
        paddingVertical: 10,
    },
    categoryText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red',
    },
    expenseDetail: {
        paddingLeft: 10,
        color: "black"
    },
});

export default ExpenseLogByDay;