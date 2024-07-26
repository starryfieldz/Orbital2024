import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { subDays, subMonths, addMonths, isBefore } from 'date-fns';
import Month from '../../../screens/expenses/components/month';
import Colors from '@/constants/Colors';
import Graph from './graph';
import MonthGraph from './monthGraph';
import DayPicker from './dayPicker';

const GraphContainer = ({ symbol, viewMode }) => {
    const [currentDate, setCurrentDate] = useState(subDays(new Date(), 1));
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const handleEarlierMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const handleDateChange = (date) => {
        const today = new Date();
        if (isBefore(date, today)) {
            setCurrentDate(date);
        } else {
            Alert.alert('Invalid Date', 'Please select a date before today.');
        }
    };

    return (
        <View style={styles.container}>
            {viewMode === 'day' ? (
                <View>
                    <DayPicker currentDate={currentDate} onDateChange={handleDateChange} />
                    <Graph symbol={symbol} date={currentDate} />
                </View>
            ) : viewMode === 'month' ? (
                <View>
                    <Month
                        currentMonth={currentMonth}
                        earlierMonth={handleEarlierMonth}
                        nextMonth={handleNextMonth}
                    />
                    <MonthGraph symbol={symbol} month={currentMonth} />
                </View>
            ) : (
                <Text>Invalid View Mode</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.orangeBG,
    },
});

export default GraphContainer;
