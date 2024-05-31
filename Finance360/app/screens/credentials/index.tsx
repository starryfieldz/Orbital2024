import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const Credentials = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    /* const [error, setError] = useState(''); */
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);
        // setError('');
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error) {
            // setError(error.message);
            console.log(error);
        } finally { 
            setLoading(false);
        }
    };

    const signUp = async () => {
        setLoading(true);
        //setError('');
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error) {
            //setError(error.message);
            console.log(error);
        } finally { 
            setLoading(false);
        } 
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            {loading ? (
                <ActivityIndicator size="large" color="red" />
            ) : (
                <View style={styles.buttonContainer}>
                    <Button title="Sign In" onPress={signIn} />
                    <View style={styles.buttonSpacing} />
                    <Button title="Sign Up" onPress={signUp} />
                </View>
            )}
        </View>
        // {error ? <Text style={styles.errorText}>{error}</Text> : null}
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        width: '100%',
    },
    buttonSpacing: {
        height: 10,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});

export default Credentials;
