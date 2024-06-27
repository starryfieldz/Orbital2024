import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import StockData from './stockData'; // Assuming StockData component exists

const SearchStock = ({ navigation }) => {
    const [symbol, setSymbol] = useState('');
    const [stockData, setStockData] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        try {
            // Validate symbol input (optional)

            // Fetch stock data using an API (e.g., financialmodelingprep)
            const apiUrl = `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=KMfksEX2fTXfpdTegzyJ5XbvpKTG2DK5`;
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Stock not found');
            }
            const data = await response.json();
            if (data && data.length > 0) {
                setStockData(data[0]);
                setError('');
            } else {
                setError('Stock not found');
                setStockData(null);
            }
        } catch (error) {
            console.error('Error fetching stock data:', error);
            setError('Error fetching stock data');
            setStockData(null);
        }
    };

    const navigateToStockData = () => {
        if (stockData) {
            navigation.navigate('StockDetails', { symbol: stockData.symbol });
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter Stock Symbol"
                onChangeText={text => setSymbol(text)}
                value={symbol}
            />
            <TouchableOpacity style={styles.button} onPress={handleSearch}>
                <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            {/* Optional: Display StockData */}
            {stockData && <StockData symbol={stockData.symbol} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        width: '100%',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default SearchStock;
