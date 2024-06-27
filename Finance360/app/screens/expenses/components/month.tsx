import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import Colors from "../../../../constants/Colors";

const Month = ({ currentMonth, earlierMonth, nextMonth }) => {
  return (
    <View style={styles.container}>
      <View style={styles.monthWrapper}>
        <TouchableOpacity style={styles.sideButton} onPress={earlierMonth}>
          <Text style={styles.sideButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{format(currentMonth, "MMM yyyy")}</Text>
        <TouchableOpacity style={styles.sideButton} onPress={nextMonth}>
          <Text style={styles.sideButtonText}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  monthWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.mainBG,
    borderRadius: 20,
    borderWidth: 0,
    borderColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 10,

  },
  sideButton: {
    paddingHorizontal: 10,
  },
  sideButtonText: {
    fontSize: 24,
    color: 'blue',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});

export default Month;
