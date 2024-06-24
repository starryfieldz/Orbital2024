import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Button, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getDatabase, ref, onValue, set, remove } from 'firebase/database';
import { getId } from '../../../../components/commoncodes/commoncodes'; 

const PlanScreen = () => {
  const [budgets, setBudgets] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('');
  const [currentSubCategory, setCurrentSubCategory] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [newSubCategory, setNewSubCategory] = useState('');
  const [newSubCategoryAmount, setNewSubCategoryAmount] = useState('');
  const userId = getId();

  useEffect(() => {
    const db = getDatabase();
    const budgetsRef = ref(db, `users/${userId}/budget`);
    
    const unsubscribe = onValue(budgetsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setBudgets(data);
      } else {
        console.log('No data available');
      }
    });

    return () => unsubscribe();
  }, [userId]);

  const handleBudgetChange = (category, subCategory, amount) => {
    const db = getDatabase();
    const budgetRef = ref(db, `users/${userId}/budget/${category}/${subCategory}`);
    set(budgetRef, amount);
  };

  const handleAddSubCategory = (category, subCategory, amount) => {
    const db = getDatabase();
    const newSubCategoryPath = `users/${userId}/budget/${category}/${subCategory}`;
    set(ref(db, newSubCategoryPath), amount);
  };

  const handleDeleteSubCategory = (category, subCategory) => {
    const db = getDatabase();
    const subCategoryRef = ref(db, `users/${userId}/budget/${category}/${subCategory}`);
    remove(subCategoryRef).then(() => {
      // Check if the category has any subcategories left
      const categoryRef = ref(db, `users/${userId}/budget/${category}`);
      onValue(categoryRef, (snapshot) => {
        if (!snapshot.exists()) {
          // If no subcategories exist, set a placeholder value
          set(ref(db, `users/${userId}/budget/${category}/placeholder`), 'Click on "+" to add a sub-category');
        }
      }, { onlyOnce: true });
    });
  };

  const openModal = (category, subCategory) => {
    setCurrentCategory(category);
    setCurrentSubCategory(subCategory);
    setCurrentAmount(budgets[category][subCategory]);
    setModalVisible(true);
  };

  const openAddModal = (category) => {
    setCurrentCategory(category);
    setNewSubCategory('');
    setNewSubCategoryAmount('');
    setAddModalVisible(true);
  };

  const saveAmount = () => {
    handleBudgetChange(currentCategory, currentSubCategory, currentAmount);
    setModalVisible(false);
  };

  const saveNewSubCategory = () => {
    if (!newSubCategory || !newSubCategoryAmount) {
      Alert.alert('Error', 'All fields need to be filled in.');
      return;
    }

    if (budgets[currentCategory] && budgets[currentCategory][newSubCategory]) {
      Alert.alert('Error', 'Sub-category already exists.');
    } else {
      handleAddSubCategory(currentCategory, newSubCategory, newSubCategoryAmount);
      setAddModalVisible(false);
    }
  };

  const deleteSubCategory = () => {
    handleDeleteSubCategory(currentCategory, currentSubCategory);
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {Object.keys(budgets).length === 0 ? (
        <Text>No budget data available. Add some categories.</Text>
      ) : (
        Object.keys(budgets).map((category) => (
          <View key={category} style={styles.categoryContainer}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryTitle}>{category}</Text>
              {/* <TouchableOpacity onPress={() => openAddModal(category)}>
                <Ionicons name="add-circle-outline" size={24} color="black" />
              </TouchableOpacity> */}
            </View>
            {Object.keys(budgets[category]).length === 1 && budgets[category].placeholder ? (
              <Text>{budgets[category].placeholder}</Text>
            ) : (
              Object.keys(budgets[category]).map((subCategory) => (
                subCategory !== 'placeholder' && (
                  <TouchableOpacity
                    key={subCategory}
                    style={styles.subCategoryContainer}
                    onPress={() => openModal(category, subCategory)}
                  >
                    <Text style={styles.subCategoryText}>
                      {subCategory}: ${budgets[category][subCategory]}
                    </Text>
                  </TouchableOpacity>
                )
              ))
            )}
          </View>
        ))
      )}

      {/* Modal for editing amounts */}
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
            <Text style={styles.modalText}>Set Amount for {currentSubCategory}</Text>
            
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={currentAmount}
              onChangeText={setCurrentAmount}
            />
            <Button title="Save" onPress={saveAmount} />
            {/* <Button title="Delete" onPress={deleteSubCategory} /> */}
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Modal for adding new subcategory */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addModalVisible}
        onRequestClose={() => {
          setAddModalVisible(!addModalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add New Subcategory to {currentCategory}</Text>
            <TextInput
              style={styles.input}
              placeholder="Subcategory Name"
              value={newSubCategory}
              onChangeText={setNewSubCategory}
            />
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Amount"
              value={newSubCategoryAmount}
              onChangeText={setNewSubCategoryAmount}
            />
            <Button title="Save" onPress={saveNewSubCategory} />
            <Button title="Cancel" onPress={() => setAddModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
});

export default PlanScreen;
