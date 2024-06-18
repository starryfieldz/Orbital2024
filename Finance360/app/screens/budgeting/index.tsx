import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { getDatabase, ref, onValue } from 'firebase/database';
import NavigationTab from "../../../components/navigation/navigation";
import IncomeByMonth from "./components/incomeByMonth"
import { getId } from "../../../components/commoncodes/commoncodes";
import { subMonths, addMonths } from 'date-fns';
import Month from "../expenses/components/month";

const Budgeting = ({ navigation }) => {
    const handleEarlierMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    
    const handleNextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const userId = getId();

    // const [expenses, setExpenses] = useState({});
    // const categories = ['Food', 'Shopping', 'Transport', 'Bills', 'Groceries', 'Social', 'Others', 'Savings'];


        // const expensesRef = ref(db, `users/${userId}/expenses`);

        // onValue(expensesRef, (snapshot) => {
        //     const data = snapshot.val();
        //     const categoryExpenses = {};

        //     // Initialize all categories with 0
        //     categories.forEach(category => {
        //         categoryExpenses[category] = 0;
        //     });

        //     // Iterate over all dates and expenses
        //     for (const date in data) {
        //         if (date.startsWith(format(currentMonth, "yyyy-MM"))) {
        //             const dateExpenses = data[date];
        //             for (const category in dateExpenses) {
        //                 const items = dateExpenses[category];
        //                 if (categoryExpenses[category] !== undefined) {
        //                     // Sum up the amounts for each category
        //                     for (const item in items) {
        //                         categoryExpenses[category] += items[item].amount;
        //                     }
        //                 } else {
        //                     // Sum up amounts for 'Others' category
        //                     if (categoryExpenses['Others'] !== undefined) {
        //                         for (const item in items) {
        //                             categoryExpenses['Others'] += items[item].amount;
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     }

        //     setExpenses(categoryExpenses);
        // });
    // }, [userId, currentMonth]);


    return (
        <View style={styles.container}>
            {/* <View style={styles.header}>
                <Text style={styles.title}>Budgeting</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                    <Text style={styles.settingsIcon}>⚙️</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.monthContainer}> */}
            <Month
                currentMonth={currentMonth}
                earlierMonth={handleEarlierMonth}
                nextMonth={handleNextMonth}
            />
            <IncomeByMonth userId={userId} currentMonth={currentMonth}/>
            <View style={styles.navigationTab}>
                <NavigationTab navigation={navigation} />
            </View> 
            
                {/* <View style={styles.budgetInfo}>
                    <Text style={styles.incomeText}>Income: ${income.toFixed(2)}</Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {categories.map(category => (
                    <View key={category} style={styles.categoryContainer}>
                        <Text style={styles.categoryText}>{category}: ${expenses[category]?.toFixed(2)}</Text>
                    </View>
                ))}
                <View style={styles.contentContainer}>
                    <Text>To be done up</Text>
                </View>
            </ScrollView>
            */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8c200',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    settingsIcon: {
        fontSize: 24,
    },
    monthContainer: {
        padding: 20,
        backgroundColor: '#fff',
    },
    budgetInfo: {
        backgroundColor: '#f0f0f0',
        padding: 20,
        borderRadius: 10,
        marginTop: 10,
    },
    incomeText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingHorizontal: 20,
    },
    categoryContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    categoryText: {
        fontSize: 18,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navigationTab: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
});

export default Budgeting;