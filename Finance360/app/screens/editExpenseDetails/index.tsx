import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import CustomDatePicker from '../addIncomeDetails/datetimepicker';
import { ref, update, remove } from 'firebase/database';
import { getId } from "../../../components/commoncodes/commoncodes";
import { DATABASE } from '../../firebaseConfig';
import Colors from '../../../constants/Colors';

const EditExpenseDetails = ({ route, navigation }) => {
  const { expenseId, expenseDate, category, expenseName, amountSpent } = route.params;
  const [date, setDate] = useState(new Date(expenseDate));
  const [newCategory, setNewCategory] = useState(category);
  const [newExpenseName, setNewExpenseName] = useState(expenseName);
  const [newAmountSpent, setNewAmountSpent] = useState(amountSpent.toString());
  const userId = getId();

  const saveExpense = async () => {
    if (!userId) {
      console.error('User not authenticated');
      return;
    }

    if (!date || !newCategory || !newExpenseName || !newAmountSpent) {
      Alert.alert('Error', 'Fill in all fields before updating expense.');
      return;
    }

    const formattedDate = date.toISOString().split('T')[0];

    const originalExpenseRef = ref(DATABASE, `users/${userId}/expenses/${expenseDate}/${category}/${expenseId}`);

    const updatedExpenseRef = ref(DATABASE, `users/${userId}/expenses/${formattedDate}/${newCategory}/${expenseId}`);

    try {
      // Remove the original expense if the date or category has changed
      if (formattedDate !== expenseDate || newCategory !== category) {
        await remove(originalExpenseRef);
      }

      // Update or create the expense at the new location
      await update(updatedExpenseRef, {
        name: newExpenseName,
        amount: parseFloat(newAmountSpent),
      });

      console.log("Expense updated successfully");
      const month = date.getMonth();
      const year = date.getFullYear();

      // Navigate back to the Expenses screen with the month and year parameters
      navigation.navigate('Expenses', { month, year, updated: true });
    } catch (error) {
      console.error("Error updating expense: ", error);
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      'Delete Expense',
      'Are you sure you want to delete this expense?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: deleteExpense },
      ],
      { cancelable: true }
    );
  };

  const deleteExpense = async () => {
    if (!userId) {
      console.error('User not authenticated');
      return;
    }

    const formattedDate = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    const expenseRef = ref(DATABASE, `users/${userId}/expenses/${formattedDate}/${category}/${expenseId}`);

    try {
      await remove(expenseRef);

      console.log("Expense deleted successfully");
      const month = date.getMonth();
      const year = date.getFullYear();

      // Navigate back to the Expenses screen with the month and year parameters
      navigation.navigate('Expenses', { date: formattedDate });
    } catch (error) {
      console.error("Error deleting expense: ", error);
    }
  };

  const placeholder = {
    label: 'Select a Category...',
    value: null,
  };

  const options = [
    { label: 'Food', value: 'Food' },
    { label: 'Bills', value: 'Bills' },
    { label: 'Groceries', value: 'Groceries' },
    { label: 'Transport', value: 'Transport' },
    { label: 'Shopping', value: 'Shopping' },
    { label: 'Social', value: 'Social' },
    { label: 'Others', value: 'Others' },
  ];

  const handleAmountChange = (inputValue) => {
    const pattern = /^\d+(\.\d{0,2})?$/;

    if (inputValue === '' || pattern.test(inputValue)) {
      setNewAmountSpent(inputValue);
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
        onValueChange={(value) => setNewCategory(value)}
        style={pickerSelectStyles}
        value={newCategory}
      />

      <Text style={styles.label}>Expense Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setNewExpenseName}
        value={newExpenseName}
        placeholder="Enter expense name"
        placeholderTextColor="gray"
      />

      <Text style={styles.label}>Amount Spent:</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleAmountChange}
        value={newAmountSpent}
        placeholder="Enter amount spent"
        keyboardType="numeric"
        placeholderTextColor="gray"
      />

      <View style={styles.buttonContainer}>
        <Button title="Update Expense" onPress={saveExpense} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Delete Expense" onPress={confirmDelete} color="red" />
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
    paddingRight: 30,
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
    paddingRight: 30,
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
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 16,
  },
});

export default EditExpenseDetails;