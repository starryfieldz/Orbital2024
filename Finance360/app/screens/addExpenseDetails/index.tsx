import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';

const addExpenseDetails = ( {navigation} ) => {
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [category, setCategory] = useState('');
    const [expenseName, setExpenseName] = useState('');
    const [amountSpent, setAmountSpent] = useState('');

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const saveExpense = () => {
        console.log("Date:", date);
        console.log("Category:", category);
        // Save the expense details
    };

    const placeholder = {
        label: 'Select a Category...',
        value: null,
    };

    const options = [
        { label: 'Food', value: 'Food' },
        { label: 'Necessity', value: 'Necessity' },
        { label: 'Clothes', value: 'Clothes' },
        { label: 'Subscriptions', value: 'Subscriptions' },
    ];

    const handleAmountChange = (inputValue) => {
        // Regex pattern to match positive numbers with up to 2 decimal places
        const pattern = /^\d+(\.\d{0,2})?$/;
    
        // Check if input value is empty or matches the pattern
        if (inputValue === '' || pattern.test(inputValue)) {
            setAmountSpent(inputValue);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Date:</Text>
            <Button onPress={showDatepicker} title={date.toDateString()} />

            {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChangeDate}
                />
            )}

            <Text style={styles.label}>Category:</Text>
            <RNPickerSelect
                placeholder={placeholder}
                items={options}
                onValueChange={(value) => setCategory(value)}
                style={pickerSelectStyles}
                value={category}
            />

            <Text style={styles.label}>Expense Name:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setExpenseName}
                value={expenseName}
                placeholder="Enter expense name"
            />

            <Text style={styles.label}>Amount Spent:</Text>
            <TextInput
                style={styles.input}
                onChangeText={handleAmountChange}
                value={amountSpent}
                placeholder="Enter amount spent"
                keyboardType="numeric"
            />

            <View style={styles.buttonContainer}>
                <Button title="Save Expense" onPress={saveExpense} />
            </View>
        </View>
    );
};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        marginBottom: 16,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        marginBottom: 16,
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    label: {
        fontSize: 18,
        marginVertical: 8,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    buttonContainer: {
        marginTop: 16,
    },
});


export default addExpenseDetails;