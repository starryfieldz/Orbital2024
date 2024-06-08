import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import CustomDatePicker from './datetimepicker';
import { ref, set, get, push } from 'firebase/database';
import { getId } from "../../../components/commoncodes/commoncodes";
import { DATABASE } from '../../firebaseConfig';

const AddExpenseDetails = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState('');
  const [expenseName, setExpenseName] = useState('');
  const [amountSpent, setAmountSpent] = useState('');
  const userId = getId();

  const saveExpense = async () => {
    if (!userId) {
      console.error('User not authenticated');
      return;
    }

    if (!date || !category || !expenseName || !amountSpent) {
      Alert.alert('Error', 'Fill in all fields before saving expense.');
      return;
    }

    const expenseDate = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    const userExpensesRef = ref(DATABASE, `users/${userId}/expenses/${expenseDate}/${category}`);

    try {
      // Generate a unique key for the expense
      const newExpenseRef = push(userExpensesRef);

      // Set the expense details under the specified category
      await set(newExpenseRef, {
        name: expenseName,
        amount: parseFloat(amountSpent),
      });

      console.log("Expense saved successfully");
      const month = date.getMonth();
      const year = date.getFullYear();

      // Navigate back to the Expenses screen with the month and year parameters
      navigation.navigate('Expenses', { month, year });
    } catch (error) {
      console.error("Error saving expense: ", error);
    }
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
    { label: 'Groceries', value: 'Groceries' },
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
      <CustomDatePicker date={date} setDate={setDate} />

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
        placeholderTextColor="gray"
      />

      <Text style={styles.label}>Amount Spent:</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleAmountChange}
        value={amountSpent}
        placeholder="Enter amount spent"
        keyboardType="numeric"
        placeholderTextColor="gray"
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

export default AddExpenseDetails;
