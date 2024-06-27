import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { format, startOfWeek, endOfWeek } from 'date-fns';
import Colors from "../../../../constants/Colors";

const Week = ({ currentDate, earlierPeriod, nextPeriod }) => {
  // Calculate the start and end dates of the current week
  const startDate = startOfWeek(currentDate);
  const endDate = endOfWeek(currentDate);

  return (
    <View style={styles.container}>
      <View style={styles.weekWrapper}>
        <TouchableOpacity style={styles.sideButton} onPress={earlierPeriod}>
          <Text style={styles.sideButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{format(startDate, "MMM d")} - {format(endDate, "MMM d, yyyy")}</Text>
        <TouchableOpacity style={styles.sideButton} onPress={nextPeriod}>
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
  weekWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.mainBG,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
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
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});

export default Week;
