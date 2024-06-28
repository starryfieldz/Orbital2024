import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LineGraph, GraphPoint } from 'react-native-graph';
import { format, subDays } from 'date-fns';
import RealTimeStats from './components/realTimeStats';
import Icon from 'react-native-vector-icons/Entypo';
import { getDatabase, ref, set, remove, onValue, get } from 'firebase/database';
import { getId } from '@/components/commoncodes/commoncodes';

const StockGraph = ({ navigation, route }) => {
    const { symbol } = route.params;
    const [historicalData, setHistoricalData] = useState({});
    const ytd = format(subDays(new Date(), 1), "yyyy-MM-dd");
    const [isFavourited, setIsFavourited] = useState(false); // State to track favourited status
    const userId = getId();

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
    }, [userId, symbol]);

    useEffect(() => {
        const getHistoricalData = async () => {
            if (!symbol) return;

            const apiUrl = `https://gethistoricalchartdata-mykgt7vlwq-uc.a.run.app/` +
                `?symbol=${symbol}&from=${ytd}&to=${ytd}`;
            axios.get(apiUrl)
                .then(response => {
                    if (response.data && response.data.length > 0) {
                        const historicalDataFetched = response.data;
                        setHistoricalData(historicalDataFetched);
                    } else {
                        alert('Stock symbol not found.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching stock price:', error);
                    alert('Error fetching stock price. Please try again.');
                });
        };

        getHistoricalData();
    }, [userId, symbol]);

    const points: GraphPoint[] = Object.values(historicalData).map((item) => ({
        date: new Date(item.date),
        value: item.close,
    }));
    const [selectedPoint, setSelectedPoint] = useState<GraphPoint>(points[points.length - 1]);
    const onPointSelected = (point) => {
        setSelectedPoint(point);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.text}>{symbol} Real Time Data</Text>
                <TouchableOpacity onPress={toggleFavourite}>
                    <Icon name={isFavourited ? "star" : "star-outlined"} size={25} />
                </TouchableOpacity>
            </View>
            <RealTimeStats symbol={symbol} />
            <Text> {ytd} </Text>
            <Text> ${selectedPoint?.value.toFixed(2)} </Text>
            <LineGraph
                style={{ width: "100%", height: 300 }}
                points={points}
                animated={true}
                color="#0000FF"
                gradientFillColors={[`#00000FF`, "#87ceeb"]}
                enablePanGesture
                onPointSelected={onPointSelected}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 30
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default StockGraph;
