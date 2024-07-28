import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import MonthGraph from './MonthGraph';
import RealTimeStats from './RealTimeStats';
import ViewButtons from './ViewButtons';
import Colors from '@/constants/Colors';

const GraphContainer = ({ symbol, viewMode }) => {
    const [currentViewMode, setCurrentViewMode] = useState(viewMode);

    const handleDayPress = () => {
        setCurrentViewMode('day');
    };

    const handleMonthPress = () => {
        setCurrentViewMode('month');
    };

    const handleFutureDateSelection = () => {
        Alert.alert('Error', 'Cannot select a future date');
    };

    return (
        <View style={styles.container}>
            <ViewButtons 
                onDayPress={handleDayPress} 
                onMonthPress={handleMonthPress} 
                viewMode={currentViewMode} 
            />
            {currentViewMode === 'month' ? (
                <MonthGraph symbol={symbol} month={new Date()} />
            ) : (
                <RealTimeStats symbol={symbol} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: Colors.orangeBG,
    },
});

export default GraphContainer;

