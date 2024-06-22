import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import PlanScreen from './components/planScreen';
import RemainingScreen from './components/remainingScreen';
import InsightsScreen from './components/insightsScreen';
import IncomeByMonth from './components/incomeByMonth';
import Month from '../expenses/components/month';
import { subMonths, addMonths } from 'date-fns';
import { getId } from '../../../components/commoncodes/commoncodes';
import NavigationTab from "../../../components/navigation/navigation";

const initialLayout = { width: Dimensions.get('window').width };

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
    { key: 'remaining', title: 'Remaining' },
    { key: 'insights', title: 'Insights' },
  ]);

  const renderScene = SceneMap({
    plan: PlanScreen,
    remaining: RemainingScreen,
    insights: InsightsScreen,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'black' }}
      style={{ backgroundColor: 'white' }}
      labelStyle={{ color: 'black' }}
    />
  );

  return (
    <View style={styles.container}>
      <Month
        currentMonth={currentMonth}
        earlierMonth={handleEarlierMonth}
        nextMonth={handleNextMonth}
      />
      <IncomeByMonth userId={userId} currentMonth={currentMonth} />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
      />
      <View style = {styles.navigationTab}>
          <NavigationTab navigation = {navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  navigationTab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  
});

export default Budgeting;
