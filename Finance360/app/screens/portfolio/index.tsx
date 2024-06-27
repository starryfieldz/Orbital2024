import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import axios from 'axios';

const App = () => {
    const [stockData, setStockData] = useState<{
        symbol: string;
        name: string;
        price: number;
        change: number;
    changePercent: number;
    } | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://financialmodelingprep.com/api/v3/quote/AAPL?apikey=KMfksEX2fTXfpdTegzyJ5XbvpKTG2DK5`);
                if (response.data.length > 0) {
                    const data = response.data[0];
                    setStockData({
                        symbol: data.symbol,
                        name: data.name,
                        price: data.price,
                        change: data.change,
                        changePercent: data.changesPercentage,
                    });
                } else {
                    setError('Stock not found');
                }
            } catch (err) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text>Error: {error}</Text>
            </View>
        );
    }

    return (
    <View style={styles.container}>
        <Text style={styles.header}>AAPL Stock Data</Text>
        {stockData && (
        <>

            <Text>Symbol: {stockData.symbol}</Text>
            <Text>Price: ${stockData.price.toFixed(2)}</Text>
            <Text>Change: {stockData.change.toFixed(2)}</Text>
            <Text>Change Percentage: {stockData.changePercent.toFixed(2)}%</Text>
        </>
        )}
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5fcff',
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default App;
