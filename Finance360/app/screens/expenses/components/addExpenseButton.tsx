import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

const AddingExpenseButton = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const menuStyle = {
    opacity: animation,
    transform: [
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [100, 0],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleMenu}>
        <Icon name="plus-circle" size={65} color="black"/>
      </TouchableOpacity>

      {menuVisible && (
        <Animated.View style={[styles.menu, menuStyle]}>
          <TouchableOpacity
            style={styles.option2Button}
            onPress={() => {
              toggleMenu();
              navigation.navigate('AddExpenseDetails');
            }}
          >
            <Text style={styles.optionText}>E</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => {
              toggleMenu();
              navigation.navigate('AddIncomeDetails');
            }}
          >
            <Text style={styles.optionText}>I</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={toggleMenu}
          >
            <Text style={styles.cancelText}>X</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 50,
    fontFamily: 'calibri',
  },
  container: {
    position: 'absolute',
    bottom: 5,
    right: -10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 40,
    alignSelf: 'center',
  },
  menu: {
    position: 'absolute',
    right: 0,
    bottom: 70,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    zIndex: 10,
  },
  optionButton: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
    alignItems: 'center',
  },
  option2Button: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    alignItems: 'center',
  },
  optionText: {
    color: 'white',
    fontSize: 18,
    fontWeight: "bold",
  },
  cancelButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelText: {
    color: 'black',
    fontSize: 18,
  },
});

export default AddingExpenseButton;