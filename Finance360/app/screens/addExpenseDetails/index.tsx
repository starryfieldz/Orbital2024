// import React, { useState } from 'react';
// import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
// import RNPickerSelect from 'react-native-picker-select';
// import CustomDatePicker from './datetimepicker';
// import { ref, set, get, child} from 'firebase/database';
// import {getId} from "../../../components/commoncodes/commoncodes"
// import { DATABASE } from '../../firebaseConfig';

// const addExpenseDetails = ( {navigation} ) => {
//     const [date, setDate] = useState(new Date());
//     const [category, setCategory] = useState('');
//     const [expenseName, setExpenseName] = useState('');
//     const [amountSpent, setAmountSpent] = useState('');
//     const userId = getId(); 

//     const saveExpense = async () => {
//         if (!userId) {
//           console.error('User not authenticated');
//           return;
//         }
    
//         const expenseDate = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
//         const userExpensesRef = ref(DATABASE, `/users/${userId}/expenses`);
//         const categoryRef = child(userExpensesRef, expenseDate);

//         try {
//         // Check if expenses node exists, if not, create it
//             await get(userExpensesRef).then((snapshot) => {
//                 if (!snapshot.exists()) {
//                     set(userExpensesRef, {});
//                 }
//             });

//     // Check if category exists, if not, create it
//             await get(categoryRef).then((snapshot) => {
//                 if (!snapshot.exists()) {
//                     set(categoryRef, {});
//                 }
//             });

//         // Generate a unique key for the expense
//             const expenseId = ref(categoryRef).push().key;

//         // Set the expense details under the specified category
//             await set(ref(categoryRef, `${category}/${expenseId}`), {
//                 name: expenseName,
//                 mount: parseFloat(amountSpent),
//             });

//             console.log("Expense saved successfully");
//             navigation.goBack();
//         } catch (error) {// Navigate back after saving catch (error) {
//             console.error("Error saving expense: ", error);
//         }
// };
    

//     const placeholder = {
//         label: 'Select a Category...',
//         value: null,
//     };

//     const options = [
//         { label: 'Food', value: 'Food' },
//         { label: 'Necessity', value: 'Necessity' },
//         { label: 'Clothes', value: 'Clothes' },
//         { label: 'Subscriptions', value: 'Subscriptions' },
//     ];

//     const handleAmountChange = (inputValue) => {
//         // Regex pattern to match positive numbers with up to 2 decimal places
//         const pattern = /^\d+(\.\d{0,2})?$/;
    
//         // Check if input value is empty or matches the pattern
//         if (inputValue === '' || pattern.test(inputValue)) {
//             setAmountSpent(inputValue);
//         }
//     };

//     return (
//         <View style={styles.container}>
//           <Text style={styles.label}>Date:</Text>
//           <CustomDatePicker date={date} setDate={setDate} />
    
//           <Text style={styles.label}>Category:</Text>
//           <RNPickerSelect
//             placeholder={placeholder}
//             items={options}
//             onValueChange={(value) => setCategory(value)}
//             style={pickerSelectStyles}
//             value={category}
//           />
    
//           <Text style={styles.label}>Expense Name:</Text>
//           <TextInput
//             style={styles.input}
//             onChangeText={setExpenseName}
//             value={expenseName}
//             placeholder="Enter expense name"
//           />
    
//           <Text style={styles.label}>Amount Spent:</Text>
//           <TextInput
//             style={styles.input}
//             onChangeText={handleAmountChange}
//             value={amountSpent}
//             placeholder="Enter amount spent"
//             keyboardType="numeric"
//           />
    
//           <View style={styles.buttonContainer}>
//             <Button title="Save Expense" onPress={saveExpense} />
//           </View>
//         </View>
//       );
// };

// const pickerSelectStyles = StyleSheet.create({
//     inputIOS: {
//         fontSize: 16,
//         paddingVertical: 12,
//         paddingHorizontal: 10,
//         borderWidth: 1,
//         borderColor: 'gray',
//         borderRadius: 4,
//         color: 'black',
//         paddingRight: 30, // to ensure the text is never behind the icon
//         marginBottom: 16,
//     },
//     inputAndroid: {
//         fontSize: 16,
//         paddingHorizontal: 10,
//         paddingVertical: 8,
//         borderWidth: 0.5,
//         borderColor: 'gray',
//         borderRadius: 8,
//         color: 'black',
//         paddingRight: 30, // to ensure the text is never behind the icon
//         marginBottom: 16,
//     },
// });

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//     },
//     label: {
//         fontSize: 18,
//         marginVertical: 8,
//     },
//     input: {
//         height: 40,
//         borderColor: 'gray',
//         borderWidth: 1,
//         paddingHorizontal: 8,
//         marginBottom: 16,
//     },
//     buttonContainer: {
//         marginTop: 16,
//     },
// });


// export default addExpenseDetails;



import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
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
      navigation.goBack();
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
