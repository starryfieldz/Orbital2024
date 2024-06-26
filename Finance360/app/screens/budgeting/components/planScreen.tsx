import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import {getId} from '@/components/commoncodes/commoncodes';

const PlanScreen = ({ userId, currentMonth }) => {
    const navigation = useNavigation();
    const [budgets, setBudgets] = useState({});
    const db = getDatabase();

    useEffect(() => {
        const budgetRef = ref(db, `users/${userId}/budgets/${currentMonth.toISOString().slice(0, 7)}`);
        const unsubscribe = onValue(budgetRef, (snapshot) => {
            const data = snapshot.val();
            // console.log('Fetched budget from Firebase:', data);  // Debugging log
            setBudgets(data || {});
        });
        return () => unsubscribe();
    }, [currentMonth, userId]);

    const handleAdd = () => {
        navigation.navigate("AddBudgetDetails", { currentMonth });
    };

    const handleEdit = (category, subCategory, amount) => {
        navigation.navigate("EditBudgetDetails", {
            category,
            subCategory,
            amount,
            currentMonth
        });
    };

    return (
        <ScrollView style={styles.container} >
            {Object.keys(budgets).length === 0 ? (
                <View style={styles.noBudgetContainer}>
                    <TouchableOpacity style={styles.createButton} onPress={handleAdd}>
                        <Text style={styles.createButtonText}>Create Budget</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                Object.keys(budgets).map((category) => (
                    <View key={category} style={styles.categoryContainer}>
                        <View style={styles.categoryHeader}>
                            <Text style={styles.categoryTitle}>{category}</Text>
                        </View>
                        {Object.keys(budgets[category]).map((subCategory) => (
                            <TouchableOpacity key={subCategory} onPress={() => handleEdit(category, subCategory, budgets[category][subCategory])}>
                                <View style={styles.subCategoryContainer}>
                                    <Text style={styles.subCategoryText}>{`${subCategory}: ${budgets[category][subCategory]}`}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    noBudgetContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    categoryContainer: {
        marginBottom: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 10,
    },
    categoryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    subCategoryContainer: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 4,
        marginBottom: 5,
    },
    subCategoryText: {
        fontSize: 16,
    },
    createButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
        alignItems: 'center',
    },
    createButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default PlanScreen;
