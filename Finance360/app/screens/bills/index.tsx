// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, Dimensions, TouchableOpacity, Text,ScrollView } from 'react-native';
// import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
// import { getId } from '@/components/commoncodes/commoncodes';
// import Month from '../expenses/components/month';
// import { subMonths, addMonths, setMonth, setYear, format } from 'date-fns';
// import BillSummary from './components/billSummary';
// import SettledBillsList from './components/settledBillsList';
// import BillsList from './components/billsList';
// import AddBillButton from './components/addBillButton';
// import NavigationTab from '../../../components/navigation/navigation';
// import { getDatabase, ref, update } from 'firebase/database';

// const initialLayout = { width: Dimensions.get('window').width };

// const UpcomingBills = ({ userId, currentMonth, onSettleBills, onDeleteBills }) => (
//     <ScrollView style={styles.tabContainer}>
//         <BillsList userId={userId} currentMonth={currentMonth} settled={false} />
//     </ScrollView>
// );

// const SettledBills = ({ userId, currentMonth }) => (
//     <ScrollView style={styles.tabContainer}>
//         <BillsList userId={userId} currentMonth={currentMonth} settled={true} />
//     </ScrollView>
// );

// const Bills = ({ navigation, route }) => {
//     const [currentMonth, setCurrentMonth] = useState(new Date());
//     const [index, setIndex] = useState(0);
//     const [routes] = useState([
//         { key: 'upcoming', title: 'Upcoming Bills' },
//         { key: 'settled', title: 'Settled Bills' },
//     ]);
//     const userId = getId();
//     const [selectedBills, setSelectedBills] = useState([]);

//     useEffect(() => {
//         if (route.params?.month !== undefined && route.params?.year !== undefined) {
//             const { month, year } = route.params;
//             const newDate = setMonth(setYear(new Date(), year), month);
//             setCurrentMonth(newDate);
//         }
//     }, [route.params]);

//     const handleEarlierMonth = () => {
//         setCurrentMonth(subMonths(currentMonth, 1));
//     };

//     const handleNextMonth = () => {
//         setCurrentMonth(addMonths(currentMonth, 1));
//     };

//     const handleSettleBills = () => {
//         if (selectedBills.length === 0) {
//             alert('No bills have been selected. Please select a bill.');
//             return;
//         }
//         const db = getDatabase();
//         selectedBills.forEach(billId => {
//             const billRef = ref(db, `users/${userId}/bills/${billId}`);
//             update(billRef, { settled: true });
//         });
//         setSelectedBills([]);
//     };

//     const handleDeleteBills = () => {
//         if (selectedBills.length === 0) {
//             alert('No bills have been selected. Please select a bill.');
//             return;
//         }
//         const db = getDatabase();
//         selectedBills.forEach(billId => {
//             const billRef = ref(db, `users/${userId}/bills/${billId}`);
//             billRef.remove();
//         });
//         setSelectedBills([]);
//     };

//     const renderScene = SceneMap({
//         upcoming: () => (
//             <UpcomingBills
//                 userId={userId}
//                 currentMonth={currentMonth}
//                 onSettleBills={handleSettleBills}
//                 onDeleteBills={handleDeleteBills}
//             />
//         ),
//         settled: () => <SettledBills userId={userId} currentMonth={currentMonth} />,
//     });

//     const renderTabBar = props => (
//         <TabBar
//             {...props}
//             indicatorStyle={styles.indicator}
//             style={styles.tabBar}
//             labelStyle={styles.label}
//         />
//     );

//     return (
//         <View style={styles.container}>
//             <Month
//                 currentMonth={currentMonth}
//                 earlierMonth={handleEarlierMonth}
//                 nextMonth={handleNextMonth}
//             />
//             <BillSummary userId={userId} currentMonth={currentMonth} />
//             <TabView
//                 navigationState={{ index, routes }}
//                 renderScene={renderScene}
//                 onIndexChange={setIndex}
//                 initialLayout={initialLayout}
//                 renderTabBar={renderTabBar}
//             />
//             <View style={styles.actionButtons}>
//                 <TouchableOpacity style={styles.settleButton} onPress={handleSettleBills}>
//                     <Text style={styles.buttonText}>Settle Bills</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteBills}>
//                     <Text style={styles.buttonText}>Delete Bills</Text>
//                 </TouchableOpacity>
//             </View>
//             <AddBillButton navigation={navigation} />
//             <View style={styles.navigationTab}>
//                 <NavigationTab navigation={navigation} />
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     tabContainer: {
//         flex: 1,
//         padding: 10,
//     },
//     tabBar: {
//         backgroundColor: '#fff',
//     },
//     indicator: {
//         backgroundColor: '#000',
//     },
//     label: {
//         color: '#000',
//     },
//     actionButtons: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         padding: 20,
//     },
//     settleButton: {
//         backgroundColor: '#4CAF50',
//         padding: 15,
//         borderRadius: 10,
//         flex: 1,
//         marginRight: 10,
//         alignItems: 'center',
//     },
//     deleteButton: {
//         backgroundColor: '#F44336',
//         padding: 15,
//         borderRadius: 10,
//         flex: 1,
//         marginLeft: 10,
//         alignItems: 'center',
//     },
//     buttonText: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     navigationTab: {
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         right: 0,
//     },
// });

// export default Bills;



// Bills.js

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, ScrollView } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { getId } from '@/components/commoncodes/commoncodes';
import Month from '../expenses/components/month';
import { subMonths, addMonths, setMonth, setYear } from 'date-fns';
import BillSummary from './components/billSummary';
import SettledBillsList from './components/settledBillsList';
import BillsList from './components/billsList';
import AddBillButton from './components/addBillButton';
import NavigationTab from '../../../components/navigation/navigation';

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
    backgroundColor: '#fff',
  },
  tabContainer: {
    flex: 1,
    padding: 10,
  },
  tabBar: {
    backgroundColor: '#fff',
  },
  indicator: {
    backgroundColor: '#000',
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
