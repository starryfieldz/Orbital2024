import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set, get, child} from 'firebase/database';
import { DATABASE } from '../../firebaseConfig';


const Login = ( { navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    const DB = DATABASE;

    const getCustomErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 'auth/email-already-in-use':
                return 'This email address is already in use.';
            case 'auth/invalid-email':
                return 'Please enter a valid email-address.';
            case 'auth/user-disabled':
                return 'This user has been disabled.';
            case 'auth/user-not-found':
                return 'There is no user corresponding to this email.';
            case 'auth/invalid-credential':
                return 'The username/password is invalid.';
            case 'auth/weak-password':
                return 'Please enter at least 6 characters.';
            case 'auth/missing-password':
                return "Please enter a password."
            default:
                return 'An unknown error occurred. Please try again.';
        }
    };

    const signIn = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            /*NEW*/
            const uid = response.user.uid;
            console.log('User UID:', uid);
            const userRef = ref(DB, `users/${uid}`);
            const snapshot = await get(child(userRef, '/'));
            if (snapshot.exists()) {
                console.log('User data:', snapshot.val());
            } else {
                console.log('No user data available');
            }
            /*NEW*/
            console.log(response);
            navigation.navigate('Expenses');
        } catch (error) {
            setError(getCustomErrorMessage(error.code))
            console.log(error);
        } finally { 
            setLoading(false);
        }
    };

    const signUp = async () => {
        setLoading(true);
        setError('');
        
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError('Please enter a valid email address.');
            setLoading(false);
            return;
        }
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            /*NEW*/
            const uid = response.user.uid;
            console.log('User UID:', uid);

            // Example: Write user data to the database
            const userRef = ref(DB, `users/${uid}`);
            await set(userRef, {
                email, password,
                createdAt: new Date().toISOString(),
            });
            /*NEW*/
            console.log(response);
            navigation.navigate('Expenses');
        } catch (error) {
            setError(getCustomErrorMessage(error.code));
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
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
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
        marginTop: 20,
    },
});

export default Login;
