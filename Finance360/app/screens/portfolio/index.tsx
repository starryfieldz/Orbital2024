import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { getId } from '@/components/commoncodes/commoncodes';
import NavigationTab from '@/components/navigation/navigation';
// import SearchStock from './SearchStock';
import StocksList from './components/stocksList';
import StockData from './components/stockData';
import SearchStock from './components/searchStock';
import Colors from '../../../constants/Colors'

const Portfolio = ({ navigation }) => {
  const userId = getId();

  return (
    <View style={styles.container}>
      <SearchStock navigation={navigation} />
      <StocksList navigation={navigation} userId={userId} />
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  navigationTab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default Portfolio;
