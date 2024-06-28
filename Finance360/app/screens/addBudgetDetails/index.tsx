import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { ref, set } from 'firebase/database';
import { getId } from "../../../components/commoncodes/commoncodes";
import { DATABASE } from '../../firebaseConfig';
import Colors from '../../../constants/Colors';

const AddBudgetDetails = ({ navigation, route }) => {
    const [food, setFood] = useState('');
    const [bills, setBills] = useState('');
    const [groceries, setGroceries] = useState('');
    const [transport, setTransport] = useState('');
    const [social, setSocial] = useState('');
    const [shopping, setShopping] = useState('');
    const [others, setOthers] = useState('');
    const [savings, setSavings] = useState('');
    const userId = getId();
    const currentMonth = route.params.currentMonth.toISOString().slice(0, 7); // Format YYYY-MM

    const saveBudget = async () => {
        if (!userId) {
            console.error('User not authenticated');
            return;
        }

        const budgetData = {
            Needs: {
                Food: parseFloat(food) || 0,
                Social: parseFloat(social) || 0,
                Transport: parseFloat(transport) || 0,
            },
            Savings: {
                Savings: parseFloat(savings) || 0,
            },
            Wants: {
                Others: parseFloat(others) || 0,
                Shopping: parseFloat(shopping) || 0,
            },
        };

        const budgetRef = ref(DATABASE, `users/${userId}/budgets/${currentMonth}`);

        try {
            await set(budgetRef, budgetData);
            console.log("Budget added successfully");
            navigation.navigate('Budgeting'); // Navigate back to Budgeting screen, PlanScreen tab
        } catch (error) {
            console.error("Error adding budget: ", error);
            Alert.alert("Error", "There was a problem saving the budget. Please try again.");
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Food (Needs)</Text>
            <TextInput
                style={styles.input}
                onChangeText={setFood}
                value={food}
                placeholder="Enter amount"
                keyboardType="numeric"
                placeholderTextColor="gray"
            />
            <Text style={styles.label}>Bills (Needs)</Text>
            <TextInput
                style={styles.input}
                onChangeText={setBills}
                value={bills}
                placeholder="Enter amount"
                keyboardType="numeric"
                placeholderTextColor="gray"
            />
            <Text style={styles.label}>Groceries (Needs)</Text>
            <TextInput
                style={styles.input}
                onChangeText={setGroceries}
                value={groceries}
                placeholder="Enter amount"
                keyboardType="numeric"
                placeholderTextColor="gray"
            />
            <Text style={styles.label}>Transport (Needs)</Text>
            <TextInput
                style={styles.input}
                onChangeText={setTransport}
                value={transport}
                placeholder="Enter amount"
                keyboardType="numeric"
                placeholderTextColor="gray"
            />
            <Text style={styles.label}>Social (Needs)</Text>
            <TextInput
                style={styles.input}
                onChangeText={setSocial}
                value={social}
                placeholder="Enter amount"
                keyboardType="numeric"
                placeholderTextColor="gray"
            />
            <Text style={styles.label}>Shopping (Wants)</Text>
            <TextInput
                style={styles.input}
                onChangeText={setShopping}
                value={shopping}
                placeholder="Enter amount"
                keyboardType="numeric"
                placeholderTextColor="gray"
            />
            <Text style={styles.label}>Others (Wants)</Text>
            <TextInput
                style={styles.input}
                onChangeText={setOthers}
                value={others}
                placeholder="Enter amount"
                keyboardType="numeric"
                placeholderTextColor="gray"
            />
            <Text style={styles.label}>Savings (Savings)</Text>
            <TextInput
                style={styles.input}
                onChangeText={setSavings}
                value={savings}
                placeholder="Enter amount"
                keyboardType="numeric"
                placeholderTextColor="gray"
            />

            <View style={styles.buttonContainer}>
                <Button title="Save Budget Plan" onPress={saveBudget} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingBottom: 20,
        backgroundColor: Colors.mainBG,
    },
    label: {
        fontSize: 18,
        marginVertical: 8,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    buttonContainer: {
        marginTop: 16,
    },
});

export default AddBudgetDetails;
