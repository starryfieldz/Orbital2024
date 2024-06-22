import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { VictoryPie } from 'victory-native';
import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { format } from 'date-fns';

const FilterExpensesForMonth = ({ data, currentMonth }) => {
    const expensesForMonth = {};
    for (let date in data) {
        if (date.startsWith(format(currentMonth, "yyyy-MM"))) {
            expensesForMonth[date] = data[date];
        }
    }
    console.log(expensesForMonth);
    return expensesForMonth;
};

const Chart = ({ userId, currentMonth }) => {
    const screenWidth = Dimensions.get('window').width;
    const [expenses, setExpenses] = useState({});
    const [categories, setCategories] = useState([]);
    const [categoryColors, setCategoryColors] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedValue, setSelectedValue] = useState(null);
    const predefinedColors = [
        'rgb(191, 33, 30)', 'rgb(233, 206, 44)', 'rgb(229, 249, 147)',
        'rgb(105, 161, 151)', 'rgb(52, 73, 94)', 'rgb(155, 89, 182)',
        'rgb(52, 152, 219)', 'rgb(46, 204, 113)', 'rgb(241, 196, 15)',
        'rgb(231, 76, 60)', 'rgb(230, 126, 34)', 'rgb(231, 76, 60)',
        'rgb(149, 165, 166)', 'rgb(243, 156, 18)', 'rgb(127, 140, 141)',
        'rgb(39, 174, 96)', 'rgb(41, 128, 185)', 'rgb(142, 68, 173)',
        'rgb(44, 62, 80)', 'rgb(26, 188, 156)'
    ];

    useEffect(() => {
        const db = getDatabase();
        const expensesRef = ref(db, `users/${userId}/expenses`);

        onValue(expensesRef, (snapshot) => {
            const data = snapshot.val();
            const filteredExpenses = FilterExpensesForMonth({ data, currentMonth });
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
    }, [userId, currentMonth]);

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
    }

    const data = categories.map((category) => ({
        x: category,
        y: parseFloat(TotalPerCategory(expenses, category).toFixed(2)),
    }));

    const sortedData = data.sort((a, b) => b.y - a.y)

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}> See your spending overview for {format(currentMonth, "MMM yyyy")} </Text>
            {data.length === 0 || data.every(item => item.y === 0) ? (
                <Text style={styles.message}>No spending yet!</Text>
            ) : (
                <>
                    <VictoryPie
                        data={data}
                        colorScale={categories.map(category => categoryColors[category])}
                        width={screenWidth - 10}
                        height={310}
                        innerRadius={20}
                        labels={({ datum }) => `${datum.x}`}
                        style={{
                            labels: {
                                fill: 'black',
                                fontSize: 12,
                                fontWeight: 'bold',
                            },
                        }}
                        events={[{
                            target: "data",
                            eventHandlers: {
                                onPress: (evt, clickedProps) => {
                                    const { datum } = clickedProps;
                                    setSelectedCategory(datum.x);
                                    setSelectedValue(datum.y);
                                }
                            }
                        }]}
                    />
                    {selectedCategory && selectedValue !== null && (
                        <Text style={styles.selectedText}>
                            {`${selectedCategory},$${selectedValue}`}
                        </Text>
                    )}
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center",
        paddingBottom: 10,
    },
    message: {
        fontSize: 15,
        textAlign: "center",
    },
    selectedText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        color: 'blue',
    }
});

export default Chart;
