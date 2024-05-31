import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

const Button = ( { navigation }) => {
    /* const keyA = "Login";
    const link = './screens/credentials';
    return (
        <View style={styles.button}>
            <Link href= {link}>
                <Text style={styles.buttonText}>
                    <Text style={styles.buttonText}>Login</Text>
                </Text>
            </Link>
        </View>
    );
    */
    return (
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
    );
};

const HandlePress = () => {
    console.log("User logging in");
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'darkgreen',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignSelf: 'center',
        
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',

    },

    container2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
});

export default Button;
