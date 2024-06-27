import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Entypo';
import Colors from '../../../../constants/Colors';

const StockData = ({ symbol }) => {
    const [stock, setStock] = useState(null);

    useEffect(() => {
        const getStockPrice = () => {
            if (!symbol) return;

            const apiUrl = `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=KMfksEX2fTXfpdTegzyJ5XbvpKTG2DK5`;

            axios.get(apiUrl)
                .then(response => {
                    if (response.data && response.data.length > 0) {
                        const stockData = response.data[0];
                        setStock(stockData);
                    } else {
                        alert('Stock symbol not found.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching stock price:', error);
                    alert('Error fetching stock price. Please try again.');
                });
        };

        getStockPrice();
    }, [symbol]);

    const getColor = (stock) => {
        if (stock.price > stock.open) {
            return "green";
        }
        return "red";
    };

    return (
        <View style={styles.container}>
            {stock ? (
                <View>
                    <View style={styles.header}>
                        <Text style={styles.symbolText}>{stock.symbol}</Text>
                        <Text style={styles.nameText}>{stock.name}</Text>
                    </View>
                    <View style={styles.details}>
                        <View style={styles.detailRow}>
                            <View style={styles.detailItem}>
                                <Text style={styles.detailText}>High:</Text>
                                <Text style={styles.detailValue}>${stock.dayHigh.toFixed(2)}</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.detailText}>Low:</Text>
                                <Text style={styles.detailValue}>${stock.dayLow.toFixed(2)}</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.detailText}>Volume:</Text>
                                <Text style={styles.detailValue}>{(stock.volume / 1000000).toFixed(2)}M</Text>
                            </View>
                        </View>
                        <View style={styles.priceContainer}>
                            <Text style={[styles.priceText, { color: getColor(stock) }]}>${stock.price.toFixed(2)}</Text>
                            {stock.price > stock.open ? (
                                <Icon name="arrow-bold-up" color="green" size={35} />
                            ) : (
                                <Icon name="arrow-bold-down" color="red" size={35} />
                            )}
                        </View>
                    </View>
                </View>
            ) : (
                <Text style={styles.loadingText}>Loading...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: Colors.mainBG,
        padding: 10,
        borderRadius: 10,
        marginVertical: 15,
        marginHorizontal: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        width: '100%',
    },
    symbolText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    nameText: {
        fontSize: 14,
        color: '#666',
    },
    details: {
        flexDirection: 'column',
        width: '100%',
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        width: '100%',
    },
    detailItem: {
        flexDirection: 'row',
    },
    detailText: {
        fontSize: 14,
        color: '#888',
        marginRight: 5,
    },
    detailValue: {
        fontSize: 14,
        color: '#333',
    },
    priceContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    priceText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 10,
    },
    loadingText: {
        fontSize: 16,
        color: '#999',
    },
});

export default StockData;
