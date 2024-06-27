import React from 'react';
import { View, StyleSheet } from 'react-native';
import Logo from "./components/logo";
import Quote from "./components/quote";
import LoginButton from "./components/loginButton";
import SignupButton from "./components/signupButton";

const Start = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Logo />
            <Quote />
            <LoginButton navigation={navigation} />
            <View style={styles.signupContainer}>
                <SignupButton navigation={navigation} />
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAF3DD',
        flex: 1,
    },
    signupContainer: {
        paddingTop: 10,
        backgroundColor: '#FAF3DD', // Adjust this value to add padding from the bottom
    },
});

export default Start;