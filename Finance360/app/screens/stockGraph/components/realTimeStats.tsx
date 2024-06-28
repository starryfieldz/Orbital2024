import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Entypo';
import Colors from '../../../../constants/Colors';
import { systemWeights } from 'react-native-typography';



const RealTimeStats = ({ symbol }) => {
    const [stock, setStock] = useState(null);

    useEffect(() => {
        const getStockData = async () => {
            if (!symbol) return;


            const apiUrl = `https://getstockdata-mykgt7vlwq-uc.a.run.app/?symbol=${symbol}`;
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

        getStockData();
    }, [symbol]);

    const getColor = (stock) => {
        if (!stock) return '#999'; // Handle case where stock data is not loaded yet
        return stock.price > stock.open ? 'green' : 'red';
    };

    return (
        <View style={styles.container}>
            {stock ? (
                <View>
                    <View style={styles.header}>
                        <Text style={styles.symbolText}>
                            {stock.symbol}
                        </Text>
                        <Text style={styles.nameText}>{stock.name}</Text>
                    </View>
                    <View style={styles.lower}>
                        <View style={styles.details}>
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
                                <Text style={styles.detailValue}>
                                    {(stock.volume/100000).toFixed(2)}M
                                </Text>
                            </View>
                        </View>
                        <View style={styles.priceContainer}>
                            <Text
                                style={[
                                    styles.priceText,
                                    { color: getColor(stock) },
                                ]}
                            >
                                ${stock.price.toFixed(2)}
                                {stock.price > stock.open ? (
                                    <Icon
                                        name="arrow-long-up"
                                        color="green"
                                        size={30}
                                    />
                                ) : (
                                    <Icon
                                        name="arrow-long-down"
                                        color="red"
                                        size={30}
                                    />
                                )}
                            </Text>
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
        marginVertical: 5,
        marginHorizontal: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        width: '100%',
    },
    lower: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    },
    detailItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 5,
        width: '100%',
    },
    detailText: {
        fontSize: 14,
        color: '#888',
    },
    detailValue: {
        fontSize: 14,
        color: '#333',
    },
    priceContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
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

export default RealTimeStats;
