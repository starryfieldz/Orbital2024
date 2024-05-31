import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const SideBarButtons = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => console.log('Left button pressed')}>
        <Text style={styles.buttonText}>{'<'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => console.log('Right button pressed')}>
        <Text style={styles.buttonText}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  button: {
    backgroundColor: 'grey',
    padding: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: 'black',
  },
});

export default SideBarButtons;