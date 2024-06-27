import React from 'react';
import { View, StyleSheet } from 'react-native';
import Logo from "./components/logo";
import Quote from "./components/quote";
import LoginButton from "./components/loginButton";
import SignupButton from "./components/signupButton";
import Colors from "../../../constants/Colors";

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
        backgroundColor: Colors.mainBG,
        flex: 1,
    },
    signupContainer: {
        paddingTop: 10,
        backgroundColor: Colors.mainBG, 
    }, 
});

export default Start;