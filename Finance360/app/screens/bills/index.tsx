import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import NavigationTab from "../../../components/navigation/navigation";
import Month from "../expenses/components/month";
import { getId } from "@/components/commoncodes/commoncodes";
import React, { useEffect, useState } from 'react';
import { subMonths, addMonths, setMonth, setYear, format } from "date-fns";
import Icon from "react-native-vector-icons/FontAwesome";
import BillSummary from "./components/billSummary";
import BillsList from "./components/billsList";
import AddBillButton from "./components/addBillButton";
import { getDatabase, ref, update } from 'firebase/database';

const Bills = ({ navigation, route }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
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

    const handleSettleBills = (selectedBills) => {
        console.log("Settling bills:", selectedBills);
        // Implement logic to settle bills in the database
    };

    const handleDeleteBills = (selectedBills) => {
        console.log("Deleting bills:", selectedBills);
        // Implement logic to delete bills in the database
    };

    return (
        <View style={styles.container}>
            <Month
                currentMonth={currentMonth}
                earlierMonth={handleEarlierMonth}
                nextMonth={handleNextMonth}
            />
            
            <ScrollView contentContainerStyle={styles.scrollViewContent}>   
                <BillSummary userId={userId} currentMonth={currentMonth} /> 
                <BillsList userId={userId} currentMonth={currentMonth} />
            </ScrollView>
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
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 60,
    },
    navigationTab: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    settleButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 10,
        flex: 1,
        marginRight: 10,
        alignItems: 'center',
    },
    deleteButton: {
        backgroundColor: '#F44336',
        padding: 15,
        borderRadius: 10,
        flex: 1,
        marginLeft: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Bills;