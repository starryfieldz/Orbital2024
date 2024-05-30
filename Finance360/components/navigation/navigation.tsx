import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome6";

const NavigationTab = () => {
    const tabs = [
        { name: "Expenses", icon: "dollar-sign", path: "../../screens/credentials" },
        { name: "Budgeting", icon: "calendar-days", path: "/profile-screen" },
        { name: "Bills", icon: "money-bill", path: "/settings-screen" },
        { name: "Portfolio", icon: "briefcase", path: "/logout-screen" },
        { name: "Stock", icon: "arrow-trend-up", path: "/favourites-screen" },
    ];

    return (
        <View style={styles.container}>
            {tabs.map((tab) => (
                <Link key={tab.name} href={tab.path} style={styles.link}>
                    <View style={styles.tab}>
                        <Icon name={tab.icon} size={30} style={styles.icon} />
                        <Text style={styles.text}>{tab.name}</Text>
                    </View>
                </Link>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        bottom: -150,
        flexDirection: 'row', // Horizontal layout
        justifyContent: 'space-around', // Evenly distribute tabs
        paddingVertical: 10,
        backgroundColor: '#fff', // Adjust background as needed

    },
    link: {
        flex: 0,
    },
    tab: {
        alignItems: 'center', // Center align text and icon vertically
    },
    icon: {
        marginBottom: 5, // Space between icon and text
    },
    text: {
        fontSize: 14,
        color: 'white',
         // Adjust text size
    },
});

export default NavigationTab;

