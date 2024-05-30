import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Month = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.sideButton} onPress={() => console.log('Previous month')}>
        <Text style={styles.sideButtonText}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>May 2024</Text>
      <TouchableOpacity style={styles.sideButton} onPress={() => console.log('Next month')}>
        <Text style={styles.sideButtonText}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  sideButton: {
    padding: 50,
  },
  sideButtonText: {
    fontSize: 24,
    color: 'blue',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Month;