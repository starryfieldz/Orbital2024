import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

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
    const navigation = useNavigation();

    const handleExpensePress = (expenseId, expenseCategory, expenseName, amountSpent) => {
        navigation.navigate('EditExpenseDetails', {
            expenseId,
            expenseDate: date,
            category: expenseCategory,
            expenseName,
            amountSpent,
        });
    };

    const handleIncomePress = (incomeId, incomeCategory, incomeName, amountReceived) => {
        navigation.navigate('EditIncomeDetails', {
            incomeId,
            incomeDate: date,
            category: incomeCategory,
            incomeName,
            amountReceived,
        });
    };

    return (
        <ScrollView style={styles.container}>
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
                            <TouchableOpacity
                                key={id}
                                style={styles.cellContainer}
                                onPress={() =>
                                    handleExpensePress(
                                        id,
                                        category,
                                        expenses[category][id].name,
                                        expenses[category][id].amount
                                    )
                                }
                            >
                                <Text style={styles.cellText}>{category}</Text>
                                <Text style={styles.cellText}>{expenses[category][id].name}</Text>
                                <Text style={styles.cellTextRed}>${expenses[category][id].amount.toFixed(2)}</Text>
                            </TouchableOpacity>
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
                            <TouchableOpacity
                                key={id}
                                style={styles.cellContainer}
                                onPress={() =>
                                    handleIncomePress(
                                        id,
                                        category,
                                        incomes[category][id].name,
                                        incomes[category][id].amount
                                    )
                                }
                            >
                                <Text style={styles.cellText}>{category}</Text>
                                <Text style={styles.cellText}>{incomes[category][id].name}</Text>
                                <Text style={styles.cellTextGreen}>${incomes[category][id].amount.toFixed(2)}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderColor: "black",
        borderWidth: 0,
        margin: 1,
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
        fontSize: 16,
    },
    cellTextRed: {
        flex: 1,
        textAlign: 'center',
        color: "red",
        fontSize: 16,
        fontWeight: "bold",
    },
    cellTextGreen: {
        flex: 1,
        textAlign: 'center',
        color: "green",
        fontSize: 16,
        fontWeight: "bold",
    },
    categorySection: {
        paddingVertical: 0,
    },
    cellContainer: {
        flexDirection: "row",
        flex: 1,
        borderColor: "grey",
        borderBottomWidth: 1,
        justifyContent: "space-between",
        paddingVertical: 5,
    },
});

export default ExpenseLogByDay;