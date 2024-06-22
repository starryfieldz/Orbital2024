import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import CustomDatePicker from './datetimepicker';
import { ref, set, push } from 'firebase/database';
import { getId } from "../../../components/commoncodes/commoncodes";
import { DATABASE } from '../../firebaseConfig';

const AddBillDetails = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [recurrence, setRecurrence] = useState('');
  const userId = getId();

  const saveBill = async () => {
    if (!userId) {
      console.error('User not authenticated');
      return;
    }

    if (!date || !name || !amount || !recurrence) {
      Alert.alert('Error', 'Fill in all fields before saving bill.');
      return;
    }

    let dueDate = date.toISOString().split('T')[0]; // Initialize dueDate for one-time bills

    const userBillsRef = ref(DATABASE, `users/${userId}/bills`);

    try {
      // Handle different recurrence types
      switch (recurrence) {
        case 'one-time':
          // Save one-time bill
          await saveOneTimeBill(userBillsRef, dueDate);
          break;
        case 'daily':
          // Save daily bills for the next 6 days
          await saveRecurringBills(userBillsRef, 1, 6, 'day');
          break;
        case 'weekly':
          // Save weekly bills for the next 6 weeks
          await saveRecurringBills(userBillsRef, 7, 6, 'day');
          break;
        case 'monthly':
          // Save monthly bills for the next 6 months
          await saveRecurringBills(userBillsRef, 1, 6, 'month');
          break;
        case 'yearly':
          // Save yearly bills for the next 6 years
          await saveRecurringBills(userBillsRef, 1, 6, 'year');
          break;
        default:
          console.error('Invalid recurrence type');
          break;
      }

      // Navigate back to the Bills screen with the month and year parameters
      const month = date.getMonth();
      const year = date.getFullYear();
      navigation.navigate('Bills', { month, year });
    } catch (error) {
      console.error("Error saving bill: ", error);
    }
  };

  const saveOneTimeBill = async (userBillsRef, dueDate) => {
    // Generate a unique key for the bill
    const newBillRef = push(userBillsRef);

    // Set the bill details for one-time bill
    await set(newBillRef, {
      name,
      amount: parseFloat(amount),
      dueDate,
      recurrence,
      settled: false,
    });

    console.log("One-time bill saved successfully");
  };

  const saveRecurringBills = async (userBillsRef, interval, repetitions, unit) => {
    const startDate = new Date(date); // Start date for recurring bills

    for (let i = 0; i < repetitions; i++) {
      // Calculate the new due date based on recurrence type
      switch (unit) {
        case 'day':
          startDate.setDate(startDate.getDate() + interval);
          break;
        case 'week':
          startDate.setDate(startDate.getDate() + interval * 7);
          break;
        case 'month':
          startDate.setMonth(startDate.getMonth() + interval);
          break;
        case 'year':
          startDate.setFullYear(startDate.getFullYear() + interval);
          break;
        default:
          console.error('Invalid recurrence unit');
          break;
      }

      const newDueDate = startDate.toISOString().split('T')[0]; // New due date for each iteration

      // Generate a unique key for the bill
      const newBillRef = push(userBillsRef);

      // Set the bill details for each iteration
      await set(newBillRef, {
        name,
        amount: parseFloat(amount),
        dueDate: newDueDate,
        recurrence,
        settled: false, // All bills are assumed not settled initially
      });

      console.log(`Bill for ${newDueDate} saved successfully`);
    }
  };

  const recurrenceOptions = [
    { label: 'One-time', value: 'one-time' },
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Yearly', value: 'yearly' },
  ];

  const handleAmountChange = (inputValue) => {
    // Regex pattern to match positive numbers with up to 2 decimal places
    const pattern = /^\d+(\.\d{0,2})?$/;

    // Check if input value is empty or matches the pattern
    if (inputValue === '' || pattern.test(inputValue)) {
      setAmount(inputValue);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Due Date:</Text>
      <CustomDatePicker date={date} setDate={setDate} />

      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Enter Bill Name"
        placeholderTextColor="gray"
      />

      <Text style={styles.label}>Amount:</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleAmountChange}
        value={amount}
        placeholder="Enter Amount"
        keyboardType="numeric"
        placeholderTextColor="gray"
      />

      <Text style={styles.label}>Recurrence (only up to 6 times):</Text>
      <RNPickerSelect
        placeholder={{ label: 'Select Recurrence...', value: null }}
        items={recurrenceOptions}
        onValueChange={(value) => setRecurrence(value)}
        style={pickerSelectStyles}
        value={recurrence}
      />

      <View style={styles.buttonContainer}>
        <Button title="Save Bill" onPress={saveBill} />
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
    borderColor: 'rgb(150,150,150)',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 16,
  },
});

export default AddBillDetails;
