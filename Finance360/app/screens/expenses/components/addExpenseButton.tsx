import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';

// const addingExpense = () => {
//     console.log("User clicked the adding expense button.");
// }

const AddingExpenseButton = ( {navigation} ) => (
    <View style = {styles.container}>
        <TouchableOpacity onPress = {() => navigation.navigate('addExpenseDetails')}>
            <Text style = {styles.text}> + </Text>
        </TouchableOpacity>  
    </View>
);

const styles = StyleSheet.create({
    text: {
        color : "white",
        fontSize : 50,
        fontFamily : 'calibri',
    },

    container : { 
        backgroundColor: 'black',
        paddingVertical: 0,
        paddingHorizontal: 2,
        borderRadius: 20,
        alignSelf: 'center',

    }
});

export default AddingExpenseButton;
