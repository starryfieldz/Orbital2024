import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, ScrollView } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import StockData from './stockData';
import Icon from 'react-native-vector-icons/Entypo';

const StocksList = ({ navigation, userId }) => {
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

    const renderItem = ({ item }) => (
        <StockData key={item} navigation={navigation} symbol={item} />
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    Favourited Stocks
                    <Icon name="star-outlined" size={18} />
                </Text>
            </View>
            {Object.keys(stocks).length === 0 ? (
                <Text style={styles.noStocksText}>No stocks</Text>
            ) : (
                <FlatList
                    data={Object.keys(stocks)}
                    renderItem={renderItem}
                    keyExtractor={(item) => item}
                    contentContainerStyle={styles.listContainer}
                />                
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 10,
        width: "95%",
        borderRadius: 15,
        marginVertical: 30,

    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
        width: "80%",
    },
    headerText: {
        color: "black",
        fontSize: 18,
        fontWeight: 'bold',
    },
    listContainer: {
        flexGrow: 1,
        paddingBottom: 50,
    },
    noStocksText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default StocksList;