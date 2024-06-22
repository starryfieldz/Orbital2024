import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import CustomDatePicker from '../addIncomeDetails/datetimepicker';
import { ref, update, remove } from 'firebase/database';
import { getId } from "../../../components/commoncodes/commoncodes";
import { DATABASE } from '../../firebaseConfig';

const EditIncomeDetails = ({ route, navigation }) => {
    const { incomeId, incomeDate, category, incomeName, amountReceived } = route.params;
    const [date, setDate] = useState(new Date(incomeDate));
    const [newCategory, setNewCategory] = useState(category);
    const [newIncomeName, setNewIncomeName] = useState(incomeName);
    const [newAmountReceived, setNewAmountReceived] = useState(amountReceived.toString());
    const userId = getId();
  
    const saveIncome = async () => {
      if (!userId) {
        console.error('User not authenticated');
        return;
      }
  
      if (!date || !newCategory || !newIncomeName || !newAmountReceived) {
        Alert.alert('Error', 'Fill in all fields before updating income.');
        return;
      }
  
      const formattedDate = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
      const originalIncomeRef = ref(DATABASE, `users/${userId}/income/${incomeDate}/${category}/${incomeId}`);
      const updatedIncomeRef = ref(DATABASE, `users/${userId}/income/${formattedDate}/${newCategory}/${incomeId}`);
  
      try {
        if (formattedDate !== incomeDate || newCategory !== category) {
          await remove(originalIncomeRef);
        }
  
        await update(updatedIncomeRef, {
          name: newIncomeName,
          amount: parseFloat(newAmountReceived),
        });
  
        console.log("Income updated successfully");
        const month = date.getMonth();
        const year = date.getFullYear();
  
        // Navigate back to the Expenses screen with the month and year parameters
        navigation.navigate('Expenses', { month, year });
      } catch (error) {
        console.error("Error updating income: ", error);
      }
    };
  
    const confirmDelete = () => {
      Alert.alert(
        'Delete Income',
        'Are you sure you want to delete this income?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'OK', onPress: deleteIncome },
        ],
        { cancelable: true }
      );
    };

  const deleteIncome = async () => {
    if (!userId) {
      console.error('User not authenticated');
      return;
    }

    const formattedDate = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    const incomeRef = ref(DATABASE, `users/${userId}/income/${formattedDate}/${category}/${incomeId}`);

    try {
      await remove(incomeRef);

      console.log("Income deleted successfully");
      const month = date.getMonth();
      const year = date.getFullYear();

      // Navigate back to the Expenses screen with the month and year parameters
      navigation.navigate('Expenses', { month, year });
    } catch (error) {
      console.error("Error deleting income: ", error);
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
    const pattern = /^\d+(\.\d{0,2})?$/;

    if (inputValue === '' || pattern.test(inputValue)) {
      setNewAmountReceived(inputValue);
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

      <Text style={styles.label}>Income Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setNewIncomeName}
        value={newIncomeName}
        placeholder="Enter income name"
        placeholderTextColor="gray"
      />

      <Text style={styles.label}>Amount Received:</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleAmountChange}
        value={newAmountReceived}
        placeholder="Enter amount received"
        keyboardType="numeric"
        placeholderTextColor="gray"
      />

      <View style={styles.buttonContainer}>
        <Button title="Save Income" onPress={saveIncome} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Delete Income" onPress={confirmDelete} color="red" />
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

export default EditIncomeDetails;