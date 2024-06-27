import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryGroup } from 'victory-native';
import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isWithinInterval, eachDayOfInterval } from 'date-fns';
import Colors from "../../../../constants/Colors";

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

const FilterIncomesForMonth= ({data, currentDate}) => {
    const incomesForMonth = {};
    for (let date in data) {
        if (date.startsWith(format(currentDate, "yyyy-MM"))) {
            incomesForMonth[date] = data[date];
        }
    }
    return incomesForMonth;
};

const FilterIncomesForWeek = ({ data, currentDate }) => {
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

const TotalExpensesOrIncomesByDate = ({ data, startDate, endDate }) => {
    const expensesByDate = {};
    eachDayOfInterval({ start: startDate, end: endDate }).forEach(day => {
        const formattedDate = format(day, 'yyyy-MM-dd');
        expensesByDate[formattedDate] = 0;
    });

    for (let date in data) {
        if (expensesByDate.hasOwnProperty(date)) {
            for (let category in data[date]) {
                for (let id in data[date][category]) {
                    expensesByDate[date] += data[date][category][id].amount;
                }
            }
        }
    }

    return Object.keys(expensesByDate).map(date => ({
        x: date,
        y: expensesByDate[date]
    }));
};

const BarChart = ({ userId, currentDate, viewMode }) => {
    const screenWidth = Dimensions.get('window').width;
    const [expenses, setExpenses] = useState({});
    const [expenseData, setExpenseData] = useState([]);
    const [incomes, setIncomes] = useState({});
    const [incomeData, setIncomeData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedValue, setSelectedValue] = useState(null);

    useEffect(() => {
        const db = getDatabase();
        const expensesRef = ref(db, `users/${userId}/expenses`);
        
        onValue(expensesRef, (snapshot) => {
            const data = snapshot.val();
            let filteredExpenses = {};
            let startDate = new Date();
            let endDate = new Date();
    
            if (viewMode === "month") {
                filteredExpenses = FilterExpensesForMonth({ data, currentDate });
                startDate = startOfMonth(currentDate);
                endDate = endOfMonth(currentDate);
            } else {
                filteredExpenses = FilterExpensesForWeek({ data, currentDate });
                startDate = startOfWeek(currentDate);
                endDate = endOfWeek(currentDate);
            }
    
            setExpenses(filteredExpenses);
            const newExpenseData = TotalExpensesOrIncomesByDate({ data: filteredExpenses, startDate, endDate });
            setExpenseData(newExpenseData);
        });
    }, [userId, currentDate, viewMode]);

    useEffect(() => {
        const db = getDatabase();
        const incomesRef = ref(db, `users/${userId}/income`);

        onValue(incomesRef, (snapshot) => {
            const data = snapshot.val();
            let filteredIncomes = {};
            let startDate = new Date();
            let endDate = new Date();

            if (viewMode === "month") {
                filteredIncomes = FilterIncomesForMonth({ data, currentDate });
                startDate = startOfMonth(currentDate);
                endDate = endOfMonth(currentDate);
            } else {
                filteredIncomes = FilterIncomesForWeek({ data, currentDate });
                startDate = startOfWeek(currentDate);
                endDate = endOfWeek(currentDate);
            }

            setIncomes(filteredIncomes);
            const newIncomesData = TotalExpensesOrIncomesByDate({ data: filteredIncomes, startDate, endDate });
            setIncomeData(newIncomesData);
        });
    }, [userId, currentDate, viewMode]);
    
    const chartWidth = expenseData.length * 100; // Adjust the multiplier to change bar width
    console.log('bar')
    return (
        <View style={styles.chartContainer}>
            {((expenseData.length === 0 || expenseData.every(data => data.y === 0)) && 
            (incomeData.length === 0 || incomeData.every(data => data.y === 0))) ? (
                <Text style={styles.message}>No spending yet!</Text>
            ) : (
                <ScrollView horizontal style={styles.scrollView}>
                    <VictoryChart 
                        theme={VictoryTheme.material} 
                        domainPadding={10} 
                        width={chartWidth} 
                        height={350}
                    >
                        <VictoryAxis
                            style={{
                                tickLabels: {
                                    angle: -45,
                                    fontSize: 15,
                                    padding: 15
                                }
                            }}
                            tickFormat={(t) => format(new Date(t), "MMM d")}
                        />
                        <VictoryGroup offset={45}>
                            <VictoryBar
                                data={expenseData}
                                x="x"
                                y="y"
                                style={{
                                    data: { fill: "red",
                                    fillOpacity: ({ datum }) => (selectedDate && selectedDate == datum.x) ? 0.8 : 1,
                                    strokeWidth: ({ datum }) => (selectedDate && selectedDate == datum.x) ? 3 : 0,
                                    stroke: "black",
                                    },
                                    labels: {
                                        fill: "black",
                                        fontWeight: ({ datum }) => (selectedDate && selectedDate == datum.x) ? "bold" : "normal",
                                        fontSize: 14
                                    },
                                }}
                                barWidth={33}
                                labels={({datum}) => datum.y ? "$" + datum.y.toFixed(2) : null}
                                events={[{
                                    target: "data",
                                    eventHandlers: {
                                        onPress: (evt, clickedProps) => {
                                            const { datum } = clickedProps;
                                            if (datum.x === selectedDate) {
                                                setSelectedDate(null);
                                                setSelectedValue(null);
                                            } else {
                                                setSelectedDate(datum.x);
                                                setSelectedValue(datum.y);
                                            }
                                        }
                                    }
                                }]}
                            />
                            <VictoryBar
                                data={incomeData}
                                x="x"
                                y="y"
                                style={{
                                    data: { 
                                        fill: "green",
                                        fillOpacity: ({ datum }) => (selectedDate && selectedDate == datum.x) ? 0.8 : 1,
                                        strokeWidth: ({ datum }) => (selectedDate && selectedDate == datum.x && datum.y != 0) ? 3 : 0,
                                        stroke: "black",
                                },
                                    labels: {
                                        fill: "black",
                                        fontWeight: ({ datum }) => (selectedDate && selectedDate == datum.x) ? "bold" : "normal",
                                        fontSize: 14,

                                    },
                                }}
                                labels={({datum}) => (datum.y != 0 || (selectedDate && selectedDate == datum.x)) ? "$" + datum.y.toFixed(2) : null}
                                barWidth={33}
                                events={[{
                                    target: "data",
                                    eventHandlers: {
                                        onPress: (evt, clickedProps) => {
                                            const { datum } = clickedProps;
                                            if (datum.x === selectedDate) {
                                                setSelectedDate(null);
                                                setSelectedValue(null);
                                            } else {
                                                setSelectedDate(datum.x);
                                                setSelectedValue(datum.y);
                                            }
                                        }
                                    }
                                }]}
                            />
                            
                        </VictoryGroup>
                    </VictoryChart>
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    chartContainer: {
        alignItems: 'center',
        backgroundColor: Colors.mainBG,
    },
    chartWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    scrollView: {
        height: 400,
    },
    message: {
        fontSize: 15,
        textAlign: "center",
    },
});

export default BarChart;
