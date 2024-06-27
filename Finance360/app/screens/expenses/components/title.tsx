import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { getDatabase, ref, get, onValue } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import Colors from "../../../../constants/Colors";
import { systemWeights } from 'react-native-typography';

const Title = ({userId}) => {
    const [email, setEmail] = useState("");
    /*New*/
    useEffect(() => {
        const fetchEmail = async () => {
            try {
                if (!userId) return; // Exit early if userId is not available

                const database = getDatabase();
                const userEmailRef = ref(database, `users/${userId}/email`);
                const snapshot = await get(userEmailRef);

                if (snapshot.exists()) {
                    const emailAddress = snapshot.val();
                    setEmail(emailAddress);
                } else {
                    console.log("Email address not found");
                }
            } catch (error) {
                console.error("Error fetching email address:", error);
            }
        };

        fetchEmail();
    }, [userId]); 


    return (
        <View style = {styles.container}> 
           <Text style = {styles.text}> Welcome {email} </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text : {
        color : 'black',
        fontSize : 20,
        fontStyle : 'italic',
        // fontWeight : 'bold',
        ...systemWeights.bold,
    },
    container : {
        padding: 10,
        // borderBottomWidth: 1,
        // // borderColor: "black",
        // borderTopWidth: 1,
        backgroundColor: Colors.mainBG,
    },
});

export default Title;
