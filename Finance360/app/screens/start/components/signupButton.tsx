import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const SignupButton = ( { navigation }) => {
    return (
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
            <Text style={styles.signupText}>Don't have an account? Sign up now</Text>
          </TouchableOpacity>
        </View>
    );
};

const HandlePress = () => {
    console.log("User signing up");
};

const styles = StyleSheet.create({
    signupText: {
        color: 'gray',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default SignupButton;