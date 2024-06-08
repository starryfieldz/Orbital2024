import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set, get, child} from 'firebase/database';
import { DATABASE } from '../../firebaseConfig';


const SignupScreen = ( { navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    const DB = DATABASE;

    const getCustomErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 'auth/too-many-requests':
                return 'Too many failed attempts. Try again later.'
            case 'auth/email-already-in-use':
                return 'This account already exists.';
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
                <ActivityIndicator size="large" color="red" />
            ) : (
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonSpacing} />
                    <Button title="Create Account" onPress={signUp} />
                </View>
            )}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <View style={styles.alrHaveAccContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.signinText}>Already have an account? Sign in.</Text>
                </TouchableOpacity>
            </View>
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
    },
    
    alrHaveAccContainer: {
        paddingTop: 10,        
    },
    
    signinText: {
        color: 'gray',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default SignupScreen;
