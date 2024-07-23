import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet } from 'react-native';
import { LineGraph, GraphPoint } from 'react-native-graph';
import { subMonths, format, startOfMonth, endOfMonth } from 'date-fns';
import Colors from '@/constants/Colors';

const MonthGraph = ({ symbol, month }) => {
    const [historicalData, setHistoricalData] = useState([]);
    const startDate = startOfMonth(month);
    const endDate = endOfMonth(month);
    const formattedEndDate = format(endDate, "yyyy-MM-dd");
    const formattedStartDate = format(startDate, "yyyy-MM-dd");

    useEffect(() => {
        const getMonthHistoricalData = async () => {
            if (!symbol) return;
            // const apiUrl = `https://getmonthhistoricalchartdata-mykgt7vlwq-uc.a.run.app?symbol=AAPL&from=2024-07-01&to=2024-07-30`;
            const apiUrl = `https://getmonthhistoricalchartdata-mykgt7vlwq-uc.a.run.app` + 
            `?symbol=${symbol}&from=${formattedStartDate}&to=${formattedEndDate}`;

            try {
                const response = await axios.get(apiUrl);
                if (response.data && response.data.historical && response.data.historical.length > 0) {
                    setHistoricalData(response.data.historical.reverse());
                } else {
                    alert('No data available for the given stock symbol.');
                }
            } catch (error) {
                console.error('Error fetching stock price:', error);
                alert('Error fetching stock price. Please try again.');
            }
        };
        getMonthHistoricalData();
    }, [symbol, month]);

    const points: GraphPoint[] = historicalData.map(item => ({
        date: new Date(item.date),
        value: item.close,
    }));

    const [selectedPoint, setSelectedPoint] = useState<GraphPoint>(points[points.length - 1]);

    const onPointSelected = (point) => {
        setSelectedPoint(point);
    };
    console.log(historicalData);
    return (
        <View style={styles.container}>
            {historicalData.length > 0 ? (
                <View>
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
                    <Text>No data available</Text>
                </View>
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
    header: {
        flexDirection: "column",
        marginBottom: 10,
    },
    priceText: {
        fontSize: 15,
    },
});

export default MonthGraph;
