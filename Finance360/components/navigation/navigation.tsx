import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome6";
import { TouchableOpacity } from 'react-native-gesture-handler';

const NavigationTab = ({ navigation }) => {
    const tabs = [
        { name: "Expenses", icon: "dollar-sign", path: "Expenses" },
        { name: "Budgeting", icon: "calendar-days", path: "Budgeting" },
        { name: "Bills", icon: "money-bill", path: "Bills" },
        { name: "Portfolio", icon: "briefcase", path: "Portfolio" },
        { name: "Stock", icon: "arrow-trend-up", path: "Stock" },
    ];

    return (
        <View style={styles.container}>
            {tabs.map((tab) => (
                // <Link key={tab.name} href={tab.path} style={styles.link}>
                //     <View style={styles.tab}>
                //         <Icon name={tab.icon} size={30} style={styles.icon} />
                //         <Text style={styles.text}>{tab.name}</Text>
                //     </View>
                // </Link>
                <TouchableOpacity
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
        position: 'absolute',
        bottom: -185,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ccc', // Optional: Adds a border to the top of the tab for separation
    },
    link: {
        flex: 1,
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

