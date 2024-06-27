import Title from "../expenses/components/title";
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Month from "./components/month";
import Week from "../expenses/components/week"; // Assuming you have a Week component
import Chart from "../expenses/components/chart";
import TotalSummary from "../expenses/components/totalSummary";
import NavigationTab from "../../../components/navigation/navigation";
import React, { useEffect, useState } from 'react';
import AddingExpenseButton from "./components/addExpenseButton";
import ExpenseLog from "../expenses/components/expenseLog";
import { getId } from "../../../components/commoncodes/commoncodes";
import { subWeeks, subMonths, addMonths, addWeeks } from 'date-fns';

const Expenses = ({ navigation, route }) => {
  const [viewMode, setViewMode] = useState('month'); // 'month' or 'week'
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    if (route.params?.date !== undefined) {
      const { date } = route.params;
      setViewMode("month");
      setCurrentDate(new Date(date));
    }
  }, [route.params]);

  const handleEarlierPeriod = () => {
    if (viewMode === 'month') {
      setCurrentDate(subMonths(currentDate, 1));
    } else if (viewMode === 'week') {
      setCurrentDate(subWeeks(currentDate, 1));
    }
  };

  const handleNextPeriod = () => {
    if (viewMode === 'month') {
      setCurrentDate(addMonths(currentDate, 1));
    } else if (viewMode === 'week') {
      setCurrentDate(addWeeks(currentDate, 1));
    }
  };

  const toggleViewMode = () => {
    if (viewMode === 'month') {
      setViewMode('week');
      // Reset currentDate to the current week's start date
      setCurrentDate(new Date());
    } else {
      setViewMode('month');
      setCurrentDate(new Date());
    }
  };

  const userId = getId();

  return (
    <View style={styles.container}>
      <Title userId={userId} />
      <TouchableOpacity style={styles.toggleButtonContainer} onPress={toggleViewMode}>
        <Text style={styles.toggleButtonText}>{viewMode === 'month' ? 'Monthly View' : 'Weekly View'}</Text>
      </TouchableOpacity>
      {viewMode === 'month' ? (
        <Month
          currentMonth={currentDate}
          earlierMonth={handleEarlierPeriod}
          nextMonth={handleNextPeriod}
        />
      ) : (
        <Week
          currentDate={currentDate}
          earlierPeriod={handleEarlierPeriod}
          nextPeriod={handleNextPeriod}
        />
      )}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TotalSummary userId={userId} currentDate={currentDate} viewMode={viewMode} />
        <Chart userId={userId} currentDate={currentDate} viewMode={viewMode} />
        <ExpenseLog userId={userId} currentDate={currentDate} viewMode={viewMode} />
      </ScrollView>
      <View style={styles.addExpenseButton}>
        <AddingExpenseButton navigation={navigation} />
      </View>
      <View style={styles.navigationTab}>
        <NavigationTab navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF38B',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 120,
  },
  navigationTab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  addExpenseButton: {
    position: 'absolute',
    bottom: 80,
    right: 30,
  },
  toggleButtonContainer: {
    alignSelf: 'flex-end',
    padding: 10,
    margin: 10,
    backgroundColor: '#E9FAE3',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  toggleButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Expenses;
