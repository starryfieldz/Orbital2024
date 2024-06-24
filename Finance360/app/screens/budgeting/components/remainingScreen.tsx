import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getId } from '../../../../components/commoncodes/commoncodes';

const RemainingScreen = ({ currentMonth }) => {
  const [budgets, setBudgets] = useState({});
  const [expenses, setExpenses] = useState({});
  const userId = getId();
  const db = getDatabase();

  useEffect(() => {
    const fetchBudgets = () => {
      const budgetsRef = ref(db, `users/${userId}/budget`);
      onValue(budgetsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setBudgets(data);
        }
      });
    };

    const fetchExpenses = () => {
      const expensesRef = ref(db, `users/${userId}/expenses`);
      onValue(expensesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const monthExpenses = Object.keys(data).reduce((acc, date) => {
            const expenseDate = new Date(date);
            if (expenseDate.getMonth() === currentMonth.getMonth() && expenseDate.getFullYear() === currentMonth.getFullYear()) {
              Object.keys(data[date]).forEach((category) => {
                if (!acc[category]) {
                  acc[category] = 0;
                }
                const categoryExpenses = Object.values(data[date][category]).reduce((sum, expense) => sum + expense.amount, 0);
                acc[category] += categoryExpenses;
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

    fetchBudgets();
    fetchExpenses();
  }, [userId, currentMonth, db]);

  const calculateRemaining = (category, subCategory) => {
    const budget = parseFloat(budgets[category]?.[subCategory] || 0);
    const spent = parseFloat(expenses[subCategory] || 0);
    return budget - spent;
  };

  const calculateProgress = (category, subCategory) => {
    const budget = parseFloat(budgets[category]?.[subCategory] || 0);
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
    <ScrollView contentContainerStyle={styles.container}>
      {Object.keys(budgets).length === 0 ? (
        <Text>No budget data available. Add some categories.</Text>
      ) : (
        Object.keys(budgets).map((category) => (
          <View key={category} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category}</Text>
            {Object.keys(budgets[category]).map((subCategory) => (
              subCategory !== 'placeholder' && (
                <View key={subCategory} style={styles.subCategoryContainer}>
                  <Text style={styles.subCategoryText}>{subCategory}: ${calculateRemaining(category, subCategory).toFixed(2)}</Text>
                  <ProgressBar
                    progress={calculateProgress(category, subCategory)}
                    width={null}
                    color={getProgressColor(calculateProgress(category, subCategory))}
                  />
                </View>
              )
            ))}
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  categoryContainer: {
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subCategoryContainer: {
    marginVertical: 8,
  },
  subCategoryText: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default RemainingScreen;
