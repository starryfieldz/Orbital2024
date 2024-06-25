import { View, Text, StyleSheet, Dimensions, ScrollView, FlatList } from 'react-native';
import { VictoryPie, VictoryLabel, VictoryLegend } from 'victory-native';
import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';
import PieChart from './pieChart';
import BarChart from './barChart';

const FilterExpensesForMonth = ({ data, currentDate }) => {
    const expensesForMonth = {};
    for (let date in data) {
        if (date.startsWith(format(currentDate, "yyyy-MM"))) {
            expensesForMonth[date] = data[date];
        }
    }
    return expensesForMonth;
};

const FilterExpensesForWeek = ({ data, currentDate }) => {
    const expensesForWeek = {};
    const start = startOfWeek(currentDate);
    const end = endOfWeek(currentDate);
    for (let date in data) {
        if (isWithinInterval(new Date(date), { start, end })) {
            expensesForWeek[date] = data[date];
        }
    }
    return expensesForWeek;
};

function TotalPerCategory(expenses, givenCategory) {
    let output = 0.0;
    Object.keys(expenses).forEach((date) => {
        if (expenses[date][givenCategory]) {
            Object.keys(expenses[date][givenCategory]).forEach((id) => {
                output += expenses[date][givenCategory][id].amount;
            });
        }
    });
    return output;
};

const Chart = ({ userId, currentDate, viewMode }) => {
    const screenWidth = Dimensions.get('window').width;
    const [expenses, setExpenses] = useState({});
    const [categories, setCategories] = useState([]);
    const [categoryColors, setCategoryColors] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedValue, setSelectedValue] = useState(null);
    const predefinedColors = [
        'rgb(255, 0, 0)',       // Red
        'rgb(255, 140, 0)',     // Orange Red
        'rgb(255, 215, 0)',     // Gold
        'rgb(0, 128, 0)',       // Green
        'rgb(0, 0, 255)',       // Blue
        'rgb(75, 0, 130)',      // Indigo
        'rgb(238, 130, 238)',   // Violet
        'rgb(178, 34, 34)',     // Firebrick (Red)
        'rgb(255, 140, 0)',     // Dark Orange
        'rgb(218, 165, 32)',    // Golden Rod
        'rgb(34, 139, 34)',     // Forest Green
        'rgb(30, 144, 255)',    // Dodger Blue
        'rgb(106, 90, 205)',    // Slate Blue
        'rgb(153, 50, 204)',    // Dark Orchid (Violet)
        'rgb(220, 20, 60)',     // Crimson (Red)
        'rgb(255, 165, 0)',     // Orange
        'rgb(154, 205, 50)',    // Yellow Green
        'rgb(0, 255, 0)',       // Lime (Green)
        'rgb(0, 191, 255)',     // Deep Sky Blue
        'rgb(148, 0, 211)',     // Dark Violet (Indigo)
        'rgb(255, 0, 255)'      // Magenta (Violet)
    ];
    
    
    
    useEffect(() => {
        const db = getDatabase();
        const expensesRef = ref(db, `users/${userId}/expenses`);
    
        onValue(expensesRef, (snapshot) => {
            const data = snapshot.val();
            let filteredExpenses = {};
    
            if (viewMode === "month") {
                filteredExpenses = FilterExpensesForMonth({ data, currentDate });
            } else {
                filteredExpenses = FilterExpensesForWeek({ data, currentDate });
            }
    
            // Update state after filtering expenses
            setExpenses(filteredExpenses);
    
            // Get all categories from filtered expenses
            const categorySet = new Set();
            Object.keys(filteredExpenses).forEach((date) => {
                Object.keys(filteredExpenses[date]).forEach((category) => {
                    categorySet.add(category);
                });
            });
            const newCategories = Array.from(categorySet);
            setCategories(newCategories);
    
            // Assign colors to new categories
            const newCategoryColors = { ...categoryColors };
            let colorIndex = Object.keys(newCategoryColors).length;
            newCategories.forEach((category) => {
                if (!newCategoryColors[category] && colorIndex < predefinedColors.length) {
                    newCategoryColors[category] = predefinedColors[colorIndex];
                    colorIndex++;
                }
            });
            setCategoryColors(newCategoryColors);
        });
    }, [userId, currentDate, viewMode]);
    

    const data = categories.map((category) => ({
        x: category,
        y: parseFloat(TotalPerCategory(expenses, category).toFixed(2)),
    }));

    const sortedData = data.sort((a, b) => b.y - a.y)

    return (
        <View>
            <View>
                <View style = {{width: screenWidth, marginVertical: 5}}>
                    <PieChart userId={userId} currentDate={currentDate} viewMode={viewMode} />
                </View>
                <View style={{width: screenWidth, marginVertical: 5}}>
                    <BarChart userId={userId} currentDate={currentDate} viewMode={viewMode} />
                </View>
            </View>
        </View>
    );
    
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: "center",
        paddingBottom: 10,
    },
});

export default Chart;


