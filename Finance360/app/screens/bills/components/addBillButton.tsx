import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from '@/constants/Colors';

const AddBillButton = ( {navigation} ) => {
    return (
        <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddBillDetails')}
            >
                <Icon name="plus-circle" size={65} color="black"/>
            </TouchableOpacity>
    );
}

const styles  = StyleSheet.create({
    addButton: {
        borderRadius: 10,
        margin: 20,
        alignItems: 'center',
        position: 'absolute',
        bottom: 70,
        right: 0,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
export default AddBillButton;