import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';  // Make sure you have the vector-icons library installed
import Colors from '@/constants/Colors';

const Progress = ({ userId, currentMonth, category, subCategory, amount }) => {
  const navigation = useNavigation();
  const [expenses, setExpenses] = useState({});
  const db = getDatabase();

  useEffect(() => {
    const fetchExpenses = () => {
      const expensesRef = ref(db, `users/${userId}/expenses`);
      onValue(expensesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const monthExpenses = Object.keys(data).reduce((acc, date) => {
            const expenseDate = new Date(date);
            if (expenseDate.getMonth() === currentMonth.getMonth() && expenseDate.getFullYear() === currentMonth.getFullYear()) {
              Object.keys(data[date]).forEach((expCategory) => {
                if (!acc[expCategory]) {
                  acc[expCategory] = 0;
                }
                const categoryExpenses = Object.values(data[date][expCategory]).reduce((sum, expense) => sum + expense.amount, 0);
                acc[expCategory] += categoryExpenses;
              });
            }
            return acc;
          }, {});
          setExpenses(monthExpenses);
        } else {
          setExpenses({});
        }
      });
    };
    fetchExpenses();
  }, [currentMonth, userId]);

  const handleEdit = () => {
    navigation.navigate("EditBudgetDetails", {
      category,
      subCategory,
      amount,
      currentMonth
    });
  };

  const calculateRemaining = () => {
    const budget = parseFloat(amount || 0);
    const spent = parseFloat(expenses[subCategory] || 0);
    return budget - spent;
  };

  const calculateProgress = () => {
    const budget = parseFloat(amount || 0);
    const spent = parseFloat(expenses[subCategory] || 0);
    return budget === 0 ? 0 : spent / budget;
  };

  const getProgressColor = (progress) => {
    if (progress < 0.5) {
      return '#4caf50'; // Green
    } else if (progress < 0.75) {
      return '#ffeb3b'; // Yellow
    } else {
      return '#f44336'; // Red
    }
  };

  return (
    <View style={styles.subCategoryContainer}>
      <View style={styles.subCategoryHeader}>
        <Text style={styles.subCategoryText}>{`${subCategory}: $${amount}`}</Text>
        <TouchableOpacity onPress={handleEdit}>
          <Icon name="edit" size={20} color={'gray'} />
        </TouchableOpacity>
      </View>
      <Text style={styles.remainingText}>{`Remaining: $${calculateRemaining().toFixed(2)}`}</Text>
      <ProgressBar
        progress={calculateProgress()}
        width={null}
        color={getProgressColor(calculateProgress())}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  subCategoryContainer: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginBottom: 5,
    backgroundColor: Colors.mainBG,
  },
  subCategoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  subCategoryText: {
    fontSize: 16,
  },
  remainingText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
});

export default Progress;

