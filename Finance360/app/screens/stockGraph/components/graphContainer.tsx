import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { format, subDays, isBefore, subMonths, addMonths, startOfMonth } from 'date-fns';
import Icon from 'react-native-vector-icons/Entypo';
import CalendarPicker from 'react-native-calendar-picker';
import Graph from './graph';
import Colors from '@/constants/Colors';
import DayPicker from './dayPicker';
import Month from "../../../screens/expenses/components/month"
import MonthGraph from './monthGraph';
import FiveYearsGraph from './fiveYearsGraph';

const GraphContainer = ({ symbol, viewMode }) => {
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);
    const [currentDate, setCurrentDate] = useState(subDays(new Date(), 1));
    const [currentMonth, setCurrentMonth] = useState(new Date());


    const handleEarlierMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const onDateChange = (date) => {
        const today = new Date();
        if (isBefore(date, today)) {
            setCurrentDate(date);
            setIsCalendarVisible(false);
        } else {
            Alert.alert("Invalid Date", "Please select a date before today.");
        }
    };

    return (
        <View style={styles.container}>
            {viewMode === "day" ? (
                <View>
                    {/* <TouchableOpacity onPress={() => setIsCalendarVisible(!isCalendarVisible)}>
                        <Text style={styles.dateText}>
                            {format(currentDate, "yyyy-MM-dd")} <Icon name="calendar" size={25} />
                        </Text>
                    </TouchableOpacity>
                    {isCalendarVisible && (
                        <CalendarPicker
                            onDateChange={onDateChange}
                            selectedStartDate={currentDate}
                            maxDate={subDays(new Date(), 1)}
                        />
                    )} */}
                    <DayPicker />
                    <Graph symbol={symbol} date={currentDate} />
                </View>
            ) : viewMode === "month" ? (
                <View>
                    <Month 
                        currentMonth={currentMonth} 
                        earlierMonth={handleEarlierMonth}
                        nextMonth={handleNextMonth} 
                    /> 
                    <MonthGraph symbol={symbol} month={currentMonth} />
                </View>
            ) : (
                <Text> invalid View Mode </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.orangeBG,
    },
    dateText: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingLeft: 10,
    },
});

export default GraphContainer;
