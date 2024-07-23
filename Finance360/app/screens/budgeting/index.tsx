import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import PlanScreen from './components/planScreen';
import Month from '../expenses/components/month';
import { subMonths, addMonths } from 'date-fns';
import { getId } from '../../../components/commoncodes/commoncodes';
import NavigationTab from "../../../components/navigation/navigation";
import IncomeByMonth from './components/incomeByMonth'; 
import AddBudgetDetails from '../addBudgetDetails';
import Colors from "../../../constants/Colors";

const Budgeting = ({ navigation }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const userId = getId();

  const handleEarlierMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'plan', title: 'Plan' },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'plan':
        return <PlanScreen userId={userId} currentMonth={currentMonth} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Month
        currentMonth={currentMonth}
        earlierMonth={handleEarlierMonth}
        nextMonth={handleNextMonth}
      />
      <IncomeByMonth userId={userId} currentMonth={currentMonth} />
      <PlanScreen userId={userId} currentMonth={currentMonth} />
      <View style={styles.navigationTab}>
        <NavigationTab navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.orangeBG,
    padding: 10,
  },
  navigationTab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default Budgeting;
