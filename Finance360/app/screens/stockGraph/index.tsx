import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { format, subDays, isBefore } from 'date-fns';
import RealTimeStats from './components/realTimeStats';
import Icon from 'react-native-vector-icons/Entypo';
import { getDatabase, ref, set, remove, onValue, get } from 'firebase/database';
import { getId } from '@/components/commoncodes/commoncodes';
import Colors from '@/constants/Colors';
import GraphContainer from "./components/graphContainer";
import ViewButtons from './components/viewButtons';

const StockGraph = ({ navigation, route }) => {
    const { symbol } = route.params;
    const [historicalData, setHistoricalData] = useState({});
    const ytd = format(subDays(new Date(), 1), "yyyy-MM-dd");
    const [isFavourited, setIsFavourited] = useState(false); // State to track favourited status
    const userId = getId();
    const [currentDate, setCurrentDate] = useState(subDays(new Date(), 1))
    const [viewMode, setViewMode] = useState("day");
    const [isCalendarVisible, setIsCalendarVisible] = useState(false)

    // Function to toggle favourite status
    const toggleFavourite = async () => {
        const db = getDatabase();
        const stockRef = ref(db, `users/${userId}/stocks/${symbol}`);
        if (isFavourited) {
            // Remove from favourites
            await remove(stockRef);
            setIsFavourited(false);
        } else {
            // Add to favourites
            await set(stockRef, symbol);
            setIsFavourited(true);
        }
    };

    // Check favourited status on mount
    useEffect(() => {
        const db = getDatabase();
        const stockRef = ref(db, `users/${userId}/stocks/${symbol}`);
        const fetchData = async () => {
            try {
                const snapshot = await get(stockRef);
                const isFav = snapshot.exists();
                setIsFavourited(isFav);
            } catch (error) {
                console.error('Error fetching favourited status:', error);
            }
        };

        fetchData();
    }, [userId, symbol, currentDate, viewMode]);

    const onDayPress = () => {
        setViewMode("day");
        console.log("day view");
    }

    const onMonthPress = () => {
        setViewMode('month');
        console.log("month view");
    }

    const onDateChange = (date) => {
        const today = new Date();
        if (isBefore(date, today)) {
            setCurrentDate(date);
            setIsCalendarVisible(false);
        } else {
            Alert.alert("Invalid Date", "Please select a date before today.");
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={styles.text}> Real Time Data</Text>
                    <TouchableOpacity onPress={toggleFavourite}>
                        <Icon name={isFavourited ? "star" : "star-outlined"} size={25} />
                    </TouchableOpacity>
                </View>
                <RealTimeStats symbol={symbol} />
                <GraphContainer symbol={symbol} viewMode={viewMode} />
            </ScrollView>
            <View style={styles.fixedButtons}>
                <ViewButtons
                    onDayPress={onDayPress}
                    onMonthPress={onMonthPress}
                    viewMode={viewMode}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.orangeBG,
    },
    scrollContent: {
        padding: 10,
        paddingBottom: 100,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    dateText: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingLeft: 10,
    },
    fixedButtons: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
});

export default StockGraph;
