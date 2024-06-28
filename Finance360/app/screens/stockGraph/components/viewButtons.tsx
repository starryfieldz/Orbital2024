import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

const ViewButtons = ({ onDayPress, onMonthPress, onYearsPress, viewMode }) => {

    const getColor = (viewMode) => {

    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.button, {backgroundColor: viewMode==="day" ? Colors.darkOrangeBG : Colors.mainBG}]} onPress={onDayPress}>
                <Text style={styles.buttonText}>For the day</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: viewMode==="month" ? Colors.darkOrangeBG : Colors.mainBG}]} onPress={onMonthPress}>
                <Text style={styles.buttonText}>For the month</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: viewMode==="years" ? Colors.darkOrangeBG : Colors.mainBG}]} onPress={onYearsPress}>
                <Text style={styles.buttonText}>Past 5 years</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    button: {
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ViewButtons;
