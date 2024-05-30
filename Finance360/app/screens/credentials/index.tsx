/*import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { firebase } from '../../firebaseConfig';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Handle the login logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter username"
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 6,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});
*/
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    /* const [error, setError] = useState(''); */
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;


    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            /* console.log('User signed in!'); */
            console.log(response);
        } catch (error) {
            console.log(error);
        } finally { 
          setLoading(false);
        }
    };

    const signUp = async () => {
      setLoading(true);
      try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        /* console.log('User signed in!'); */
        console.log(response);
    } catch (error) {
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
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            { loading ? (
                <ActivityIndicator size = "large" color = "red" />
            ) : (
              <>
                <Button title = "Sign In" onPress={signIn} />
                <Button title = "Sign Up" onPress = {signUp} />
              </>
            )}
            </View>
            /*
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <Button
                title="Sign In"
                onPress={signIn}
            />
            */ 
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
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default SignIn;