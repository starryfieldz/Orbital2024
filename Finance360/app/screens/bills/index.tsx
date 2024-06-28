import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, ScrollView } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { getId } from '@/components/commoncodes/commoncodes';
import Month from '../expenses/components/month';
import { subMonths, addMonths, setMonth, setYear } from 'date-fns';
import BillSummary from './components/billSummary';
import BillsList from './components/billsList';
import AddBillButton from './components/addBillButton';
import NavigationTab from '../../../components/navigation/navigation';
import Colors from '../../../constants/Colors';

const initialLayout = { width: Dimensions.get('window').width };

const UpcomingBills = ({ userId, currentMonth }) => (
  <ScrollView style={styles.tabContainer}>
    <BillsList userId={userId} currentMonth={currentMonth} settled={false} />
  </ScrollView>
);

const SettledBills = ({ userId, currentMonth }) => (
  <ScrollView style={styles.tabContainer}>
    <BillsList userId={userId} currentMonth={currentMonth} settled={true} />
  </ScrollView>
);

const Bills = ({ navigation, route }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'upcoming', title: 'Upcoming Bills' },
    { key: 'settled', title: 'Settled Bills' },
  ]);
  const userId = getId();

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

  const renderScene = SceneMap({
    upcoming: () => <UpcomingBills userId={userId} currentMonth={currentMonth} />,
    settled: () => <SettledBills userId={userId} currentMonth={currentMonth} />,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.label}
    />
  );

  return (
    <View style={styles.container}>
      <Month
        currentMonth={currentMonth}
        earlierMonth={handleEarlierMonth}
        nextMonth={handleNextMonth}
      />
      <BillSummary userId={userId} currentMonth={currentMonth} />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
      />
      <AddBillButton navigation={navigation} />
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
  },
  tabContainer: {
    flex: 1,
    padding: 10,
  },
  tabBar: {
    backgroundColor: Colors.mainBG,
  },
  indicator: {
    backgroundColor: Colors.darkOrangeBG,
  },
  label: {
    color: '#000',
  },
  navigationTab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default Bills;
