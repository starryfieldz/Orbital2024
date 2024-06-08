// import {View, Text, StyleSheet, Dimensions} from 'react-native';
// import { PieChart } from 'react-native-chart-kit';
// import React, { useEffect, useState } from 'react';
// import { getDatabase, ref, get, onValue } from 'firebase/database';
// import { format, subMonths, addMonths } from 'date-fns';


// const FilterExpensesForMonth = ({data, currentMonth}) => {
//     const expensesForMonth = {};
//     for (let date in data) {
//         if (date.startsWith(format(currentMonth, "yyyy-MM"))) {
//             expensesForMonth[date] = data[date];
//         }
//     }
//     console.log(expensesForMonth);
//     return expensesForMonth;
// };


// const Chart = ({userId, currentMonth}) => {
//     const screenWidth = Dimensions.get('window').width;
//     const defaultLegendFontColor =  '#7F7F7F';
//     const defaultLegendFontSize = 12;
//     const [expenses, setExpenses] = useState({});
//     const [categories, setCategories] = useState([]);
//     const [categoryColors, setCategoryColors] = useState({});
//     const predefinedColors = [
//         'rgb(191, 33, 30)', 'rgb(233, 206, 44)', 'rgb(229, 249, 147)',
//         'rgb(105, 161, 151)', 'rgb(52, 73, 94)', 'rgb(155, 89, 182)',
//         'rgb(52, 152, 219)', 'rgb(46, 204, 113)', 'rgb(241, 196, 15)',
//         'rgb(231, 76, 60)', 'rgb(230, 126, 34)', 'rgb(231, 76, 60)',
//         'rgb(149, 165, 166)', 'rgb(243, 156, 18)', 'rgb(127, 140, 141)',
//         'rgb(39, 174, 96)', 'rgb(41, 128, 185)', 'rgb(142, 68, 173)',
//         'rgb(44, 62, 80)', 'rgb(26, 188, 156)'
//     ];

//     useEffect(() => {
//         const db = getDatabase();
//         const expensesRef = ref(db, `users/${userId}/expenses`);
        
//         onValue(expensesRef, (snapshot) => {
//             const data = snapshot.val();
//             const filteredExpenses = FilterExpensesForMonth({data, currentMonth});
//             setExpenses(filteredExpenses);
//             const categorySet = new Set();
//             Object.keys(filteredExpenses).forEach((date) => {
//                 Object.keys(filteredExpenses[date]).forEach((category) => {
//                     categorySet.add(category);
//                 });
//             });
//             setCategories(Array.from(categorySet));
//         });
//     }, [userId, currentMonth]);

//     useEffect(() => {
//         const newCategoryColors = { ...categoryColors };
//         let colorIndex = 0;
//         categories.forEach((category) => {
//             if (!newCategoryColors[category] && colorIndex < predefinedColors.length) {
//                 newCategoryColors[category] = predefinedColors[colorIndex];
//                 colorIndex++;
//             }
//         });
//         setCategoryColors(newCategoryColors);
//     }, [categories]);
    

//     // function TotalPerCategory(expenses, givenCategory) {
//     //     let output = 0;
//     //     Object.keys(expenses).forEach((date) => {
//     //         Object.keys(expenses[date]).filter(category => category == givenCategory).forEach((category) => {
//     //             Object.keys(expenses[date][category]).map((id) => {
//     //                 output += expenses[date][category][id].amount;
//     //             });
//     //         });
//     //     });
//     //     return output;
//     // };
//     function TotalPerCategory(expenses, givenCategory) {
//         let output = 0;
//         Object.keys(expenses).forEach((date) => {
//             if (expenses[date][givenCategory]) {
//                 Object.keys(expenses[date][givenCategory]).forEach((id) => {
//                     output += expenses[date][givenCategory][id].amount;
//                 });
//             }
//         });
//         return output;
//     };

//     // function getRandomColor() {
//     //     let r, g, b;
//     //     do {
//     //         r = Math.floor(Math.random() * 256);
//     //         g = Math.floor(Math.random() * 256);
//     //         b = Math.floor(Math.random() * 256);
//     //     } while (r > 200 && g > 200 && b > 200);
//     //     return `rgb(${r}, ${g}, ${b})`;
//     // }

//     // function colorDistance(color1, color2) {
//     //     return Math.sqrt(
//     //         Math.pow(color1.r - color2.r, 2) +
//     //         Math.pow(color1.g - color2.g, 2) +
//     //         Math.pow(color1.b - color2.b, 2)
//     //     );
//     // }

//     // function generateUniqueColor(existingColors) {
//     //     let newColor;
//     //     let isUnique;
//     //     do {
//     //         newColor = getRandomColor();
//     //         isUnique = true;
//     //         for (const color of existingColors) {
//     //             if (colorDistance(newColor, color) < 100) { // Threshold to ensure sufficient difference
//     //                 isUnique = false;
//     //                 break;
//     //             }
//     //         }
//     //     } while (!isUnique);
//     //     return `rgb(${newColor.r}, ${newColor.g}, ${newColor.b})`;
//     // }
    
//     // const data = [
//     //     {
//     //         name: `Food`,
//     //         value: TotalPerCategory(expenses, "Food"),
//     //         color: 'rgb(191, 33, 30)',
//     //         legendFontColor: defaultLegendFontColor, // Custom legend font color
//     //         legendFontSize: defaultLegendFontSize, // Custom legend font size
//     //     },
//     //     {
//     //         name: `Necessity`,
//     //         value: TotalPerCategory(expenses, "Necessity"),
//     //         color: 'rgb(233, 206, 44)',
//     //         legendFontColor: defaultLegendFontColor, // Custom legend font color
//     //         legendFontSize: defaultLegendFontSize, // Custom legend font size
//     //     },
//     //     {
//     //         name: `Clothes`,
//     //         value: TotalPerCategory(expenses, "Clothes"),
//     //         color: 'rgb(229, 249, 147)',
//     //         legendFontColor: defaultLegendFontColor, // Custom legend font color
//     //         legendFontSize: defaultLegendFontSize, // Custom legend font size
//     //     },
//     //     {
//     //         name: `Subscriptions`,
//     //         value: TotalPerCategory(expenses, "Subscriptions"),
//     //         color: 'rgb(105, 161, 151)',
//     //         legendFontColor: defaultLegendFontColor, // Custom legend font color
//     //         legendFontSize: defaultLegendFontSize, // Custom legend font size
//     //     },
//     // ];
//     const data = categories.map((category) => ({
//         name: category,
//         value: TotalPerCategory(expenses, category),
//         color: categoryColors[category],
//         legendFontColor: defaultLegendFontColor,
//         legendFontSize: defaultLegendFontSize,
//     }));

//     return (
//         <View style={styles.container}>
//             <Text style = {styles.headerText}> See your spending overview for {format(currentMonth, "MMM yyyy")} </Text>
//             {data.length === 0 || data.every(item => item.value === 0) ?
//             ( <Text style = {styles.message}>No spending yet!</Text>
//             ) : (
//                 <PieChart
//                     data={data}
//                     width={screenWidth - 32}
//                     height={220}
//                     chartConfig={{
//                         backgroundColor: '#1cc910',
//                         backgroundGradientFrom: '#eff3ff',
//                         backgroundGradientTo: '#efefef',
//                         decimalPlaces: 1,
//                         color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//                         labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//                         style: {
//                             borderRadius: 16,
//                         },
//                         propsForDots: {
//                             r: '6',
//                             strokeWidth: '2',
//                             stroke: '#ffa726',
//                         },
//                     }}
//                     accessor="value"
//                     backgroundColor="transparent"
//                     paddingLeft="15"
//                     absolute
//                 />)}
//         </View>
//     );
// };


// const styles = StyleSheet.create({
//     container: {
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     headerText: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         textAlign: "center",
//         paddingBottom: 10,      
//     },
//     message: {
//         fontSize: 15,
//         textAlign: "center",      
//     },

// });

// export default Chart;



import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
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
    const defaultLegendFontColor = '#7F7F7F';
    const defaultLegendFontSize = 12;
    const [expenses, setExpenses] = useState({});
    const [categories, setCategories] = useState([]);
    const [categoryColors, setCategoryColors] = useState({});
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
            const categorySet = new Set();
            Object.keys(filteredExpenses).forEach((date) => {
                Object.keys(filteredExpenses[date]).forEach((category) => {
                    categorySet.add(category);
                });
            });
            setCategories(Array.from(categorySet));
        });
    }, [userId, currentMonth]);

    useEffect(() => {
        const newCategoryColors = { ...categoryColors };
        let colorIndex = 0;
        categories.forEach((category) => {
            if (!newCategoryColors[category] && colorIndex < predefinedColors.length) {
                newCategoryColors[category] = predefinedColors[colorIndex];
                colorIndex++;
            }
        });
        setCategoryColors(newCategoryColors);
    }, [categories]);

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
        name: category,
        value: parseFloat(TotalPerCategory(expenses, category).toFixed(2)),
        color: categoryColors[category],
        legendFontColor: defaultLegendFontColor,
        legendFontSize: defaultLegendFontSize,
    }));

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}> See your spending overview for {format(currentMonth, "MMM yyyy")} </Text>
            {data.length === 0 || data.every(item => item.value === 0) ? (
                <Text style={styles.message}>No spending yet!</Text>
            ) : (
                <PieChart
                    data={data}
                    width={screenWidth - 32}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#1cc910',
                        backgroundGradientFrom: '#eff3ff',
                        backgroundGradientTo: '#efefef',
                        decimalPlaces: 2, // Set number of decimal places
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: '6',
                            strokeWidth: '2',
                            stroke: '#ffa726',
                        },
                    }}
                    accessor="value"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    absolute
                />
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
});

export default Chart;
