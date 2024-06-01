import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { format, subMonths, addMonths } from 'date-fns';


const Month = ( {currentMonth, earlierMonth, nextMonth}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.sideButton} onPress={earlierMonth}>
        <Text style={styles.sideButtonText}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{format(currentMonth, "MMM yyyy")}</Text>
      <TouchableOpacity style={styles.sideButton} onPress={nextMonth}>
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
    // padding: 10,
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


// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { format } from 'date-fns';

// const Month = ({ currentMonth, onPreviousMonth, onNextMonth }) => {
//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.sideButton} onPress={onPreviousMonth}>
//         <Text style={styles.sideButtonText}>{'<'}</Text>
//       </TouchableOpacity>
//       <Text style={styles.title}>{format(currentMonth, 'MMMM yyyy')}</Text>
//       <TouchableOpacity style={styles.sideButton} onPress={onNextMonth}>
//         <Text style={styles.sideButtonText}>{'>'}</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   sideButton: {
//     padding: 20,
//   },
//   sideButtonText: {
//     fontSize: 24,
//     color: 'blue',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
// });

// export default Month;
