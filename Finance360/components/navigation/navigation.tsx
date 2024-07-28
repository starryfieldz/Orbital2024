import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome6";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '@/constants/Colors';
const NavigationTab = ({ navigation }) => {
    const tabs = [
        { name: "Expenses", icon: "dollar-sign", path: "Expenses" },
        { name: "Budgeting", icon: "calendar-days", path: "Budgeting" },
        { name: "Bills", icon: "credit-card", path: "Bills" },
        { name: "Portfolio", icon: "arrow-trend-up", path: "Portfolio" },
        { name: "News", icon: "newspaper", path: "News" },
    ];

    return (
        <View style={styles.container}>
            {tabs.map((tab) => (
                <TouchableOpacity
                    testID={tab.name}
                    key = {tab.name}
                    style = {styles.link}
                    onPress = {() => navigation.navigate(tab.path)}>
                    <View style={styles.tab}>
                        <Icon name={tab.icon} size={30} style={styles.icon} />
                        <Text style={styles.text}>{tab.name}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: Colors.mainBG, // Adjust background as needed
    },
    link: {
        flex: 1,
        alignItems: 'center',
        width: 80,
    },
    tab: {
        alignItems: 'center',
    },
    icon: {
        marginBottom: 5,
    },
    text: {
        fontSize: 14,
        color: 'black',
    },
});

export default NavigationTab;

