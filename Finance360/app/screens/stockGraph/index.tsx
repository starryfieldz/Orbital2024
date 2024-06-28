import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LineGraph, GraphPoint } from 'react-native-graph';
import { format, subDays } from 'date-fns';
import RealTimeStats from './components/realTimeStats';
import Icon from 'react-native-vector-icons/Entypo';
import { getDatabase, ref, set, remove, onValue, get } from 'firebase/database';
import { getId } from '@/components/commoncodes/commoncodes';
import Colors from '@/constants/Colors';
import Graph from "./components/graph";
import ViewButtons from './components/viewButtons';

const StockGraph = ({ navigation, route }) => {
    const { symbol } = route.params;
    const [historicalData, setHistoricalData] = useState({});
    const ytd = format(subDays(new Date(), 1), "yyyy-MM-dd");
    const [isFavourited, setIsFavourited] = useState(false); // State to track favourited status
    const userId = getId();
    const [currentDate, setCurrentDate] = useState(subDays(new Date(), 1))
    const [viewMode, setViewMode] = useState("day");

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

    const points: GraphPoint[] = Object.values(historicalData).map((item) => ({
        date: new Date(item.date),
        value: item.close,
    }));

    const [selectedPoint, setSelectedPoint] = useState<GraphPoint>(points[points.length - 1]);
    const onPointSelected = (point) => {
        setSelectedPoint(point);
    };

    const onDayPress = () => {
        console.log("day view");
    }

    const onMonthPress = () => {
        console.log("month view");
    }

    const onYearsPress = () => {
        console.log("years view");
    }

    return (
        <ScrollView style={styles.container}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.text}> Real Time Data</Text>
                <TouchableOpacity onPress={toggleFavourite}>
                    <Icon name={isFavourited ? "star" : "star-outlined"} size={25} />
                </TouchableOpacity>
            </View>
            <RealTimeStats symbol={symbol} />
            <Text style={styles.dateText}> {format(currentDate,  "yyyy-MM-dd")}</Text>
            <Graph symbol={symbol} date={currentDate}/>
            <ViewButtons 
                onDayPress={onDayPress}
                onMonthPress={onMonthPress}
                onYearsPress={onYearsPress}
                viewMode={viewMode}/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: Colors.orangeBG,
        paddingBottom: 100
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    dateText: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingLeft: 10,
    }
});

export default StockGraph;
