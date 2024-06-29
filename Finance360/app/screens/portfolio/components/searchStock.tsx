import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import Colors from '../../../../constants/Colors';
import { systemWeights } from 'react-native-typography';

const SearchStock = ({ navigation }) => {
    const [symbol, setSymbol] = useState('');

    const searchStock = async () => {
        if (!symbol) {
            Alert.alert('Please enter a stock symbol');
            return;
        }

        const apiUrl = `https://getstockdata-mykgt7vlwq-uc.a.run.app/?symbol=${symbol}`;

        try {
            const response = await axios.get(apiUrl);
            if (response.data) {
                navigation.navigate('StockGraph', { symbol: symbol });
            } else {
                Alert.alert('Stock symbol not found');
            }
        } catch (error) {
            Alert.alert('Error fetching stock data. Please try again.');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter stock symbol"
                value={symbol}
                onChangeText={setSymbol}
                placeholderTextColor="gray"
            />
            <Button title="Search" onPress={searchStock} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "80%",
        padding: 10,
        backgroundColor: Colors.mainBG,
        borderRadius: 15,
        paddingHorizontal: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.darkOrangeBG,
        backgroundColor: "white",
        padding: 10,
        marginBottom: 10,
        ...systemWeights.bold,
        color: 'black',
    },
});

export default SearchStock;
