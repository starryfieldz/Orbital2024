import { View, StyleSheet, Text, TextInput, TouchableOpacity, Modal, Button } from 'react-native';
import PropTypes from 'prop-types';
import { getDatabase, ref, get, set } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import Colors from "../../../../constants/Colors";
import { systemWeights } from 'react-native-typography';

const Title = ({ userId }) => {
    const [username, setUsername] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [newUsername, setNewUsername] = useState("");

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                if (!userId) return; // Exit early if userId is not available

                const database = getDatabase();
                const usernameRef = ref(database, `users/${userId}/username`);
                const snapshot = await get(usernameRef);

                if (snapshot.exists()) {
                    const fetchedUsername = snapshot.val();
                    setUsername(fetchedUsername);
                    setNewUsername(fetchedUsername);
                } else {
                    console.log("Username not found");
                }
            } catch (error) {
                console.error("Error fetching username:", error);
            }
        };

        fetchUsername();
    }, [userId]);

    const saveUsername = async () => {
        try {
            const database = getDatabase();
            const usernameRef = ref(database, `users/${userId}/username`);
            await set(usernameRef, newUsername);
            setUsername(newUsername);
            setModalVisible(false);
        } catch (error) {
            console.error("Error saving username:", error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={styles.text}> Welcome {username} </Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Edit Username</Text>
                        <TextInput
                            style={styles.input}
                            value={newUsername}
                            onChangeText={setNewUsername}
                        />
                        <View style={styles.buttonContainer}>
                            <Button title="Confirm" onPress={saveUsername} />
                            <Button title="Cancel" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        color: 'black',
        fontSize: 20,
        fontStyle: 'italic',
        ...systemWeights.bold,
    },
    container: {
        padding: 10,
        backgroundColor: Colors.mainBG,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        color: 'black',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});


export default Title;
