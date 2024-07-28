import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { format, subDays, isBefore } from 'date-fns';
import Icon from 'react-native-vector-icons/Entypo';
import CalendarPicker from 'react-native-calendar-picker';

const DayPicker = ({ currentDate, onDateChange }) => {
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);

    const handleDateChange = (date) => {
        const today = new Date();
        if (isBefore(date, today)) {
            onDateChange(date);
            setIsCalendarVisible(false);
        } else {
            Alert.alert('Invalid Date', 'Please select a date before today.');
        }
    };

    return (
        <View>
            <TouchableOpacity onPress={() => setIsCalendarVisible(!isCalendarVisible)}>
                <Text style={styles.dateText}>
                    {format(currentDate, 'yyyy-MM-dd')} <Icon name="calendar" size={25} />
                </Text>
            </TouchableOpacity>
            {isCalendarVisible && (
                <CalendarPicker
                    testID="calendar-picker"
                    onDateChange={handleDateChange}
                    selectedStartDate={currentDate}
                    maxDate={subDays(new Date(), 1)}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    dateText: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingLeft: 10,
    },
});

export default DayPicker;
