import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

const ViewButtons = ({ onDayPress, onMonthPress, viewMode }) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.button, {backgroundColor: viewMode==="day" ? Colors.darkOrangeBG : Colors.mainBG}]} onPress={onDayPress}>
                <Text style={[styles.buttonText, {color: viewMode==="day" ? "white" : "black"}]}>For the day</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: viewMode==="month" ? Colors.darkOrangeBG : Colors.mainBG}]} onPress={onMonthPress}>
                <Text style={[styles.buttonText, {color: viewMode==="month" ? "white" : "black"}]}>For the month</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ViewButtons;
