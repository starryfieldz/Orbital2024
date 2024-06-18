import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { format } from 'date-fns';

function calculateTotalPerDay(expensesOrIncomes) {
    let total = 0.0;
    Object.values(expensesOrIncomes).forEach(category => {
        Object.values(category).forEach(item => {
            total += item.amount;
        });
    });
    return total;
}


const ExpenseLogByDay = ({ date, expenses = {}, incomes = {} }) => {
    return (
        <View style={styles.container}>
            <View style={styles.dateSection}>
                <Text style={styles.dateText}>{format(date, "MMM dd")}</Text>
                <View style={styles.totalsContainer}>
                    <Text style={styles.totalExpText}>${calculateTotalPerDay(expenses).toFixed(2)}</Text>
                    <Text style={styles.totalIncText}>${calculateTotalPerDay(incomes).toFixed(2)}</Text>
                </View>
            </View>

            {Object.keys(expenses).length === 0 ? (
                <Text>No expenses today</Text>
            ) : (
                Object.keys(expenses).map(category => (
                    <View key={category} style={styles.categorySection}> 
                        {Object.keys(expenses[category]).map(id => (
                            <View key={id} style={styles.cellContainer}>
                                <Text style={styles.cellText}> {category} </Text>
                                <Text style={styles.cellText}>{expenses[category][id].name} </Text>
                                <Text style={styles.cellTextRed}>${expenses[category][id].amount.toFixed(2)}</Text>
                            </View>
                        ))}
                    </View>

                ))
            )}

            {Object.keys(incomes).length === 0 ? (
                <Text>No income today</Text>
            ) : (
                Object.keys(incomes).map(category => (
                    <View key={category} style={styles.categorySection}> 
                        {Object.keys(incomes[category]).map(id => (
                            <View key={id} style={styles.cellContainer}>
                                <Text style={styles.cellText}> {category} </Text>
                                <Text style={styles.cellText}>{incomes[category][id].name} </Text>
                                <Text style={styles.cellTextGreen}>${incomes[category][id].amount.toFixed(2)}</Text>
                            </View>
                        ))}
                    </View>
                ))
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderColor: "black",
        borderWidth: 3,
        margin: 5,
    },
    dateSection: {
        marginVertical: 10,
        flexDirection: "row",
        flex: 1,
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    totalExpText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "red",
        paddingHorizontal: 3,
    },
    totalIncText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "green",
        paddingHorizontal: 3,
    },
    totalsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex: 2,
    },
    cellText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 15,
    },
    cellTextRed: {
        flex: 1,
        textAlign: 'center',
        color: "red",
        fontSize: 15,
        fontWeight: "bold",
    },
    cellTextGreen: {
        flex: 1,
        textAlign: 'center',
        color: "green",
        fontSize: 15,
        fontWeight: "bold",
    },
    categorySection: {
        paddingVertical: 0,
    },
    categoryText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red',
    },
    cellContainer: {
        paddingLeft: 10,
        flexDirection: "row",
        flex: 1,
        borderColor: "grey",
        borderBottomWidth: 1,
        justifyContent: "space-between",
    },
});

export default ExpenseLogByDay;