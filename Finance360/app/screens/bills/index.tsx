import { View, Text, ScrollView, StyleSheet } from "react-native";
import NavigationTab from "../../../components/navigation/navigation";
import Month from "../expenses/components/month";
import { getId } from "@/components/commoncodes/commoncodes";
import React, { useEffect, useState } from 'react';
import { subMonths, addMonths, setMonth, setYear, format } from "date-fns";
import Icon from "react-native-vector-icons/FontAwesome6";
import BillSummary from "./components/billSummary";
import BillsList from "./components/billsList";

const Bills = ({navigation, route}) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

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

  const userId = getId();
    return (
        <View style = {styles.container}>
            <View>
                <Text> Bills</Text>
            </View>
            <ScrollView contentContainerStyle = {styles.scrollViewContent}>
                <Month 
                    currentMonth={currentMonth}
                    earlierMonth={handleEarlierMonth}
                    nextMonth={handleNextMonth}
                />
                <BillSummary userId={userId} currentMonth={currentMonth}/>
                <BillsList userId={userId} currentMonth={currentMonth}/>
            </ScrollView>
            <View style = {styles.navigationTab}>
                <NavigationTab navigation = {navigation} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    navigationTab: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    summaryContainer: {
        backgroundColor: "#fff8dc",
        margin: 15,
        borderWidth: 5,
        borderColor: "black"
    }
});

export default Bills;