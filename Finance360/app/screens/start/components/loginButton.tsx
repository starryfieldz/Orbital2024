import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { systemWeights } from 'react-native-typography';

const LoginButton = ({ navigation }) => {
    return (
        <View style={styles.button}>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#599682',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignSelf: 'center',
    },
    buttonText: {
        ...systemWeights.semibold, // Use the bold font weight from react-native-typography
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default LoginButton;