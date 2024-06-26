import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PieChart from './pieChart';
import BarChart from './barChart';

const Chart = ({ userId, currentDate, viewMode }) => {
    const [displayPieChart, setDisplayPieChart] = useState(true); // State to toggle between PieChart and BarChart

    const toggleChart = () => {
        setDisplayPieChart(!displayPieChart);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.toggleButton} onPress={toggleChart}>
                <Text style={styles.toggleButtonText}>
                    {displayPieChart ? 'Over Time' : 'By Category'}
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
        backgroundColor: '#fff',
    },
    toggleButton: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
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
        width: '100%',
        paddingVertical: 15
    },
});

export default Chart;
