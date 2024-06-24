import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome6";

const MyCheckBox = ({ value, onValueChange }) => {
    return (
      <TouchableOpacity onPress={() => onValueChange(!value)}>
        <View style={styles.container}>
          {value ? <Icon name="check-square" size={24} color="white" /> : <Icon name="square" size={24} color="black" />}
        </View>
      </TouchableOpacity>
    );
  };


const styles = StyleSheet.create({
    container: {
        alignItems: 'center', // Adjust as needed
        justifyContent: 'center', // Adjust as needed
    },
    checked: {
        backgroundColor: 'green',
    },
});

export default MyCheckBox;
