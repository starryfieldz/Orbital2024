import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set, get, child } from 'firebase/database';
import { DATABASE } from '../../firebaseConfig';
import { systemWeights } from 'react-native-typography';
import Colors from '../../../constants/Colors';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    const DB = DATABASE;

    const getCustomErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 'auth/too-many-requests':
                return 'Too many failed attempts. Try again later.';
            case 'auth/email-already-in-use':
                return 'This email address is already in use.';
            case 'auth/invalid-email':
                return 'Please enter a valid email address.';
            case 'auth/user-disabled':
                return 'This user has been disabled.';
            case 'auth/user-not-found':
                return 'There is no user corresponding to this email.';
            case 'auth/invalid-credential':
                return 'The username/password is invalid.';
            case 'auth/weak-password':
                return 'Please enter at least 6 characters.';
            case 'auth/missing-password':
                return 'Please enter a password.';
            default:
                return 'An unknown error occurred. Please try again.';
        }
    };

    const signIn = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            const uid = response.user.uid;
            console.log('User UID:', uid);
            const userRef = ref(DB, `users/${uid}`);
            const snapshot = await get(child(userRef, '/'));
            if (snapshot.exists()) {
                console.log('User data:', snapshot.val());
            } else {
                console.log('No user data available');
            }
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
                placeholderTextColor="gray"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="gray"
            />
            {loading ? (
                <ActivityIndicator size="large" color="red" testID="loading-indicator" />
            ) : (
                <TouchableOpacity style={styles.signInButton} onPress={signIn}>
                    <Text style={styles.signInButtonText}>Login</Text>
                </TouchableOpacity>
            )}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingBottom: 200,
        backgroundColor: Colors.mainBG,
    },
    input: {
        ...systemWeights.semibold,
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    signInButton: {
        backgroundColor: Colors.buttonBG,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    signInButtonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        ...systemWeights.bold,
    },
    errorText: {
        color: 'red',
        marginTop: 20,
        ...systemWeights.semibold,
    },
});

export default Login;


