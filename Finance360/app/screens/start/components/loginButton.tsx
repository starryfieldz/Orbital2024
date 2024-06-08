import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const LoginButton = ( { navigation }) => {
    return (
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.buttonText}>Sign In</Text>
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
});

export default LoginButton;
