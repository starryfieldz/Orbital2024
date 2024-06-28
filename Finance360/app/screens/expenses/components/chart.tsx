import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PieChart from './pieChart';
import BarChart from './barChart';
import Colors from "../../../../constants/Colors";

const Chart = ({ userId, currentDate, viewMode }) => {
    const [displayPieChart, setDisplayPieChart] = useState(true); // State to toggle between PieChart and BarChart

    const toggleChart = () => {
        setDisplayPieChart(!displayPieChart);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.toggleButton} onPress={toggleChart}>
                <Text style={styles.toggleButtonText}>
                    {displayPieChart ? 'By Category' : 'Over Time'}
                </Text>
            </TouchableOpacity>
            <View style={styles.chartContainer}>
                {displayPieChart ? (
                    <PieChart userId={userId} currentDate={currentDate} viewMode={viewMode} />
                ) : (
                    <BarChart userId={userId} currentDate={currentDate} viewMode={viewMode} />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.orangeBG,
        flex: 1,
        marginHorizontal: 0
    },
    toggleButton: {
        backgroundColor: Colors.mainBG,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
        margin: 5
    },
    toggleButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    chartContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        backgroundColor: Colors.mainBG,
        borderRadius: 20,   
        width: "90%",
    },
});

export default Chart;
