import {View, Text, StyleSheet, Dimensions} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get, onValue } from 'firebase/database';
import { format, subMonths, addMonths } from 'date-fns';

const FilterExpensesForMonth = ({data, currentMonth}) => {
    const expensesForMonth = {};
    for (let date in data) {
        if (date.startsWith(format(currentMonth, "yyyy-MM"))) {
            expensesForMonth[date] = data[date];
        }
    }
    console.log(expensesForMonth);
    return expensesForMonth;
};


const Chart = ({userId, currentMonth}) => {
    const screenWidth = Dimensions.get('window').width;
    const defaultLegendFontColor =  '#7F7F7F';
    const defaultLegendFontSize = 12;
    const [expenses, setExpenses] = useState({});
    useEffect(() => {
        const db = getDatabase();
        const expensesRef = ref(db, `users/${userId}/expenses`);
        
        onValue(expensesRef, (snapshot) => {
            const data = snapshot.val();
            const filteredExpenses = FilterExpensesForMonth({data, currentMonth});
            setExpenses(filteredExpenses);
        });
    }, [userId, currentMonth]);

    

    function TotalPerCategory(expenses, givenCategory) {
        let output = 0;
        Object.keys(expenses).forEach((date) => {
            Object.keys(expenses[date]).filter(category => category == givenCategory).forEach((category) => {
                Object.keys(expenses[date][category]).map((id) => {
                    output += expenses[date][category][id].amount;
                });
            });
        });
        return output;
    };
    
    const data = [
        {
            name: `Food`,
            value: TotalPerCategory(expenses, "Food"),
            color: 'rgb(191, 33, 30)',
            legendFontColor: defaultLegendFontColor, // Custom legend font color
            legendFontSize: defaultLegendFontSize, // Custom legend font size
        },
        {
            name: `Necessity`,
            value: TotalPerCategory(expenses, "Necessity"),
            color: 'rgb(233, 206, 44)',
            legendFontColor: defaultLegendFontColor, // Custom legend font color
            legendFontSize: defaultLegendFontSize, // Custom legend font size
        },
        {
            name: `Clothes`,
            value: TotalPerCategory(expenses, "Clothes"),
            color: 'rgb(229, 249, 147)',
            legendFontColor: defaultLegendFontColor, // Custom legend font color
            legendFontSize: defaultLegendFontSize, // Custom legend font size
        },
        {
            name: `Subscriptions`,
            value: TotalPerCategory(expenses, "Subscriptions"),
            color: 'rgb(105, 161, 151)',
            legendFontColor: defaultLegendFontColor, // Custom legend font color
            legendFontSize: defaultLegendFontSize, // Custom legend font size
        },
    ];

    return (
        <View style={styles.container}>
            <Text style = {styles.headerText}> See your spending overview for {format(currentMonth, "MMM yyyy")} </Text>
            {TotalPerCategory(expenses, "Food") == 0 && TotalPerCategory(expenses, "Necessity") == 0 
            && TotalPerCategory(expenses, "Clothes") == 0 && TotalPerCategory(expenses, "Subscriptions") == 0 ?
            ( <Text style = {styles.message}>No spending yet!</Text>
            ) : (
                <PieChart
                    data={data}
                    width={screenWidth - 32}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#1cc910',
                        backgroundGradientFrom: '#eff3ff',
                        backgroundGradientTo: '#efefef',
                        decimalPlaces: 2,
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
                />)}
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




