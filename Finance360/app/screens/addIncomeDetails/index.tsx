import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import CustomDatePicker from './datetimepicker';
import { ref, set, get, push } from 'firebase/database';
import { getId } from "../../../components/commoncodes/commoncodes";
import { DATABASE } from '../../firebaseConfig';
import Colors from '../../../constants/Colors';

const AddIncomeDetails = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState('');
  const [incomeName, setIncomeName] = useState('');
  const [amountSaved, setAmountSaved] = useState('');
  const userId = getId();

  const saveIncome = async () => {
    if (!userId) {
      console.error('User not authenticated');
      return;
    }

    if (!date || !category || !incomeName || !amountSaved) {
      Alert.alert('Error', 'Fill in all fields before saving income.');
      return;
    }

    const incomeDate = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    const userIncomeRef = ref(DATABASE, `users/${userId}/income/${incomeDate}/${category}`);

    try {
      // Generate a unique key for the expense
      const newIncomeRef = push(userIncomeRef);

      // Set the expense details under the specified category
      await set(newIncomeRef, {
        name: incomeName,
        amount: parseFloat(amountSaved),
      });

      console.log("Expense saved successfully");
      const month = date.getMonth();
      const year = date.getFullYear();

      // Navigate back to the Expenses screen with the month and year parameters
      navigation.navigate('Expenses', { date: incomeDate });
    } catch (error) {
      console.error("Error saving income: ", error);
    }
  };

  const placeholder = {
    label: 'Select a Category...',
    value: null,
  };

  const options = [
    { label: 'Salary', value: 'Salary' },
    { label: 'Allowance', value: 'Allowance' },
    { label: 'Bonus', value: 'Bonus' },
    { label: 'Petty Cash', value: 'Petty Cash' },
    { label: 'Others', value: 'Others' },
  ];

  const handleAmountChange = (inputValue) => {
    // Regex pattern to match positive numbers with up to 2 decimal places
    const pattern = /^\d+(\.\d{0,2})?$/;

    // Check if input value is empty or matches the pattern
    if (inputValue === '' || pattern.test(inputValue)) {
      setAmountSaved(inputValue);
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

      <Text style={styles.label}>Income Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setIncomeName}
        value={incomeName}
        placeholder="Enter Income name"
        placeholderTextColor="gray"
      />

      <Text style={styles.label}>Amount Saved:</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleAmountChange}
        value={amountSaved}
        placeholder="Enter Income"
        keyboardType="numeric"
        placeholderTextColor="gray"
      />

      <View style={styles.buttonContainer}>
        <Button title="Save Income" onPress={saveIncome} />
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
    backgroundColor: Colors.mainBG,
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

export default AddIncomeDetails;