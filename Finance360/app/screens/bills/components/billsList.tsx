import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { differenceInDays, format } from 'date-fns';
import { getDatabase, ref, onValue, update, push, set } from 'firebase/database';
import MyCheckBox from '../../../../components/MyCheckBox/MyCheckBox';
import ConfirmAddToExpense from './confirmAddToExpense'; // Adjust the import path as per your project structure

const filterBillsForMonth = ({ bills, currentMonth, settled }) => {
  return bills
    ? Object.keys(bills)
      .filter((billId) => bills[billId].settled === settled && bills[billId].dueDate.startsWith(format(currentMonth, 'yyyy-MM')))
      .map((billId) => ({ id: billId, ...bills[billId] }))
    : [];
};

const sortBills = (bills) => {
  return bills.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
};

const BillsList = ({ userId, currentMonth, settled }) => {
  const [bills, setBills] = useState({});
  const [selectedBills, setSelectedBills] = useState({});
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedBillIds, setSelectedBillIds] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const billsRef = ref(db, `users/${userId}/bills`);

    onValue(billsRef, (snapshot) => {
      const data = snapshot.val();
      setBills(data || {});
    });
  }, [userId, currentMonth]);

  const handleSelectBill = (billId, selected) => {
    setSelectedBills((prevSelected) => ({
      ...prevSelected,
      [billId]: selected,
    }));
  };

  const handleSettleBills = () => {
    const selectedIds = Object.keys(selectedBills).filter((id) => selectedBills[id]);

    if (selectedIds.length === 0) {
      Alert.alert('No bills selected', 'Please select a bill to settle.');
      return;
    }

    setSelectedBillIds(selectedIds);
    setShowConfirmationModal(true);
  };

  const handleConfirm = (addToExpense) => {
    setShowConfirmationModal(false);

    const db = getDatabase();
    const currentDate = new Date().toISOString().split('T')[0];
    const expensesBillsRef = ref(db, `users/${userId}/expenses/${currentDate}/Bills`);

    selectedBillIds.forEach((billId) => {
      const billRef = ref(db, `users/${userId}/bills/${billId}`);
      const bill = bills[billId];

      if (addToExpense) {
        update(billRef, { settled: true })
          .then(() => {
            const expenseData = {
              amount: bill.amount,
              name: bill.name,
            };

            const newExpenseRef = push(expensesBillsRef);
            set(newExpenseRef, expenseData);
          })
          .catch((error) => {
            console.error('Error updating/settling bill:', error);
            Alert.alert('Error', 'There was an error settling the bill. Please try again.');
          });
      } else {
        // If not adding to expense, just settle the bill locally
        update(billRef, { settled: true })
          .then(() => {
            const updatedBills = { ...bills };
            updatedBills[billId].settled = true;
            setBills(updatedBills);
          })
          .catch((error) => {
            console.error('Error updating/settling bill:', error);
            Alert.alert('Error', 'There was an error settling the bill. Please try again.');
          });
      }
    });

    setSelectedBillIds([]);
    setSelectedBills({});
  };

  const handleCancel = () => {
    setShowConfirmationModal(false);
    setSelectedBillIds([]);
  };

  const handleDeleteBills = () => {
    const selectedIds = Object.keys(selectedBills).filter((id) => selectedBills[id]);

    if (selectedIds.length === 0) {
      Alert.alert('No bills selected', 'Please select a bill to delete.');
      return;
    }

    const db = getDatabase();
    const updates = {};

    selectedIds.forEach((id) => {
      updates[`users/${userId}/bills/${id}`] = null; // setting to null will remove the entry in Firebase
    });

    update(ref(db), updates)
      .then(() => {
        const updatedBills = { ...bills };
        selectedIds.forEach((id) => {
          delete updatedBills[id];
        });
        setBills(updatedBills);
        setSelectedBills({});
        Alert.alert('Success', 'Selected bills have been deleted.');
      })
      .catch((error) => {
        console.error('Error deleting bills:', error);
        Alert.alert('Error', 'There was an error deleting the selected bills. Please try again.');
      });
  };

  const getColorByDaysUntilDue = (daysUntilDue) => {
    if (settled) {
      return 'green';
    }
    if (daysUntilDue <= 0) {
      return 'crimson'; // overdue
    } else if (daysUntilDue <= 3) {
      return 'orange'; // due within 3 days
    } else if (daysUntilDue <= 7) {
      return 'yellow'; // due within a week
    } else {
      return 'green'; // due later
    }
  };

  const renderItem = (item) => {
    const daysUntilDue = differenceInDays(new Date(item.dueDate), new Date());
    const color = getColorByDaysUntilDue(daysUntilDue);
    return (
      <View key={item.id} style={[styles.billDetails, { backgroundColor: color }]}>
        <View style={styles.row}>
          <View style={styles.cell}>
            <MyCheckBox
              value={selectedBills[item.id]}
              onValueChange={(value) => handleSelectBill(item.id, value)}
            />
          </View>
          <View style={styles.cell}>
            <Text style={styles.billText}>{item.name}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.billText}>${item.amount.toFixed(2)}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.billText}>{format(new Date(item.dueDate), 'dd MMM')}</Text>
          </View>
          <View style={[styles.cell, { alignItems: 'center' }]}>
            {settled && <Icon name="circle-check" color="white" size={25} />}
            {!settled && daysUntilDue <= 3 && <Icon name="circle-exclamation" color="white" size={25} />}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Icon name={settled ? "circle-check" : "table-list"} size={25} />
        <Text style={styles.titleText}> {settled ? 'SETTLED BILLS' : 'UPCOMING BILLS'} </Text>
      </View>

      <View style={styles.header}>
        <View style={styles.cell}>
          <Text style={styles.billText}>Select</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.billText}>Name</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.billText}>Amount</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.billText}>Due Date</Text>
        </View>
        <View style={styles.cell}></View>
      </View>

      {!bills || Object.keys(bills).length === 0 ? (
        <Text style={styles.message}>No bills yet!</Text>
      ) : (
        <ScrollView>
          {sortBills(filterBillsForMonth({ bills, currentMonth, settled })).map((bill) => renderItem(bill))}
        </ScrollView>
      )}

      <View style={styles.actionButtons}>
        {!settled && (
          <TouchableOpacity style={styles.settleButton} onPress={handleSettleBills}>
            <Text style={styles.buttonText}>Settle</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteBills}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>

      <ConfirmAddToExpense
        visible={showConfirmationModal}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingBottom: 100,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  message: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  billDetails: {
    flexDirection: 'row',
    borderRadius: 10,
    margin: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
  },
  billText: {
    fontSize: 15,
    paddingVertical: 5,
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  settleButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#F44336',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BillsList;
