import Title from "../expenses/components/title";
import { View, ScrollView, StyleSheet } from 'react-native';
import Month from "../expenses/components/month";
import Chart from "../expenses/components/chart";
import TotalSummary from "../expenses/components/totalSummary";
import NavigationTab from "../../../components/navigation/navigation";
import React, { useEffect, useState } from 'react';
import AddingExpenseButton from "./components/addExpenseButton";
import ExpenseLog from "../expenses/components/expenseLog";
import { getId } from "../../../components/commoncodes/commoncodes";
import { format, subMonths, addMonths, setMonth, setYear } from 'date-fns';

const Expenses = ({ navigation, route }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    if (route.params?.month !== undefined && route.params?.year !== undefined) {
      const { month, year } = route.params;
      const newDate = setMonth(setYear(new Date(), year), month);
      setCurrentMonth(newDate);
    }
  }, [route.params]);

  const handleEarlierMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const userId = getId();
  return (
    <View style={styles.container}>
      <Title userId={userId} />
      <Month
        currentMonth={currentMonth}
        earlierMonth={handleEarlierMonth}
        nextMonth={handleNextMonth}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        
        <TotalSummary userId={userId} currentMonth={currentMonth}/>
        <Chart userId={userId} currentMonth={currentMonth} />
        <ExpenseLog userId={userId} currentMonth={currentMonth} />
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
    backgroundColor: '#fff',
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
});

export default Expenses;