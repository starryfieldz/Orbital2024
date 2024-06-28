import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LineGraph, GraphPoint } from 'react-native-graph';
import { format, subDays } from 'date-fns';
import Colors from '@/constants/Colors';

const Graph = ( {symbol, date} ) => {
    const [historicalData, setHistoricalData] = useState({});
    // to change date later
    const formattedDate = format(date, "yyyy-MM-dd");

    useEffect(() => {
        const getHistoricalData = async () => {
            if (!symbol) return;

            const apiUrl = `https://gethistoricalchartdata-mykgt7vlwq-uc.a.run.app/` +
                `?symbol=${symbol}&from=${formattedDate}&to=${formattedDate}`;
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
    }, [symbol, date]);

    const points: GraphPoint[] = Object.values(historicalData).map((item) => ({
        date: new Date(item.date),
        value: item.close,
    }));

    const [selectedPoint, setSelectedPoint] = useState<GraphPoint>(points[points.length - 1]);

    const onPointSelected = (point) => {
        setSelectedPoint(point);
    };

    return (
        <View style={styles.container}>
            {historicalData ? 
                (<View>
                    <View style={styles.header}>
                        <Text style={styles.priceText}> ${selectedPoint?.value.toFixed(2)}</Text>
                        <Text style={styles.priceText}> {selectedPoint?.date.toUTCString()}</Text>
                    </View>
                    <LineGraph
                        style={{ width: "100%", height: 300 }}
                        points={points}
                        animated={true}
                        color="#873D48"
                        gradientFillColors={["#873D48", "#FAF3DD"]}
                        enablePanGesture
                        onPointSelected={onPointSelected}
                    />
                </View>
                ) : (
                    <View>
                        <Text> no data available </Text>
                    </View>
                )
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: Colors.orangeBG,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    priceText: {
        fontSize: 15,
    },
    header: {
        flexDirection: "column",
    }

});
export default Graph;