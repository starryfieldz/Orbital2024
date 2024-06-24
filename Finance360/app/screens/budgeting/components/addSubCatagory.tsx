import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Button, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getDatabase, ref, onValue, set, remove } from 'firebase/database';
import { getId } from '../../../../components/commoncodes/commoncodes'; 

const AddSubCatagory = () => {
    
}