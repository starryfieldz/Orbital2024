import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { getId } from "../../../components/commoncodes/commoncodes";
import { DATABASE } from '../../firebaseConfig';
import { ref, update } from 'firebase/database';

const EditBudgetDetails = ({ route, navigation }) => {
  const { category, subCategory, amount, currentMonth } = route.params;
  const [newAmount, setNewAmount] = useState(amount.toString());
  const userId = getId();
  const formattedDate = new Date(currentMonth).toISOString().slice(0, 7); // Parse the string to a Date object and format it

  const saveBudget = async () => {
    if (!userId) {
      console.error('User not authenticated');
      return;
    }
    if (!newAmount || isNaN(newAmount)) {
      Alert.alert('Error', 'Enter a valid numeric amount.');
      return;
    }

    const budgetRef = ref(DATABASE, `users/${userId}/budgets/${formattedDate}/${category}`);

    try {
      await update(budgetRef, { [subCategory]: parseFloat(newAmount) });
      console.log("Budget updated successfully");
      navigation.navigate('Budgeting'); // Navigate back to the Budgeting screen
    } catch (error) {
      console.error("Error updating budget: ", error);
    }
  };

  const handleAmountChange = (inputValue) => {
    const pattern = /^\d+(\.\d{0,2})?$/;

    if (inputValue === '' || pattern.test(inputValue)) {
      setNewAmount(inputValue);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Category:</Text>
      <Text style={styles.text}>{category}</Text>

      <Text style={styles.label}>Sub-Category:</Text>
      <Text style={styles.text}>{subCategory}</Text>

      <Text style={styles.label}>Amount:</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleAmountChange}
        value={newAmount}
        placeholder="Enter amount"
        keyboardType="numeric"
        placeholderTextColor="gray"
      />

      <View style={styles.buttonContainer}>
        <Button title="Update Budget" onPress={saveBudget} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginVertical: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
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

export default EditBudgetDetails;

