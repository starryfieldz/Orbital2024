import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import StockData from './stockData';

const StocksList = ({ userId }) => {
    const [stocks, setStocks] = useState({});

    useEffect(() => {
        const db = getDatabase();
        const stocksRef = ref(db, `users/${userId}/stocks`);

        onValue(stocksRef, (snapshot) => {
            const data = snapshot.val();
            setStocks(data || {}); // Set data or an empty object if data is null
            console.log('Fetched stocks:', data); // Logging data
        });
    }, [userId]);

    return (
        <View style={styles.container}>
            <View>
                <Text> Favourited Stocks </Text>
            </View>
            <ScrollView>
                {Object.keys(stocks).length === 0 ? (
                    <Text style={styles.noStocksText}>No stocks</Text>
                ) : (
                    Object.keys(stocks).map((symbol) => (
                        <StockData key={symbol} symbol={symbol} />
                    ))
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    noStocksText: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default StocksList;
