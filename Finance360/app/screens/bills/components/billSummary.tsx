import { View, Text, ScrollView, StyleSheet } from "react-native";
import Month from "../../expenses/components/month";
import React, { useEffect, useState } from 'react';
import Icon from "react-native-vector-icons/FontAwesome6";
import { format } from "date-fns";

function totalBill( {userId, currentMonth} ) {
    return 0;
}
const BillSummary = ( {userId, currentMonth} ) => {
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Icon name="credit-card" size={30}/>
                <Text style={styles.titleText}> {format(currentMonth, "MMMMMM yyyy").toUpperCase()}</Text>
            </View>
            <Text style={styles.text}> Total Bills: ${totalBill({userId, currentMonth})}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff8dc",
        margin: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 30,
        
    },
    title: {
        flexDirection: "row",
        paddingVertical: 10,
    },
    titleText : {
        fontSize: 30,
        fontWeight: "bold"
    },
    text : {
        fontSize: 30,
    }
});

export default BillSummary;