import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { differenceInDays, format } from 'date-fns';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import MyCheckBox from '../../../../components/MyCheckBox/MyCheckBox';

const filterBillsForMonth = ({ bills, currentMonth }) => {
  return bills
    ? Object.keys(bills)
        .filter((billId) => bills[billId].dueDate.startsWith(format(currentMonth, 'yyyy-MM')))
        .map((billId) => ({ id: billId, ...bills[billId] }))
    : [];
};

const sortBills = (bills) => {
  return bills.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
};

const BillsList = ({ userId, currentMonth }) => {
  const [bills, setBills] = useState({});
  const [selectedBills, setSelectedBills] = useState({});

  useEffect(() => {
    const db = getDatabase();
    const billsRef = ref(db, `users/${userId}/bills`);

    onValue(billsRef, (snapshot) => {
      const data = snapshot.val();
      setBills(data || {});
    });
  }, [userId, currentMonth]);

  const handleSelectBill = (billId, selected) => {
    setSelectedBills(prevSelected => {
      const updatedSelected = {
        ...prevSelected,
        [billId]: selected,
      };
      console.log("Selected bills:", updatedSelected); // Log updated selected bills
      return updatedSelected;
    });
  };

  const handleSettleBills = () => {
    // Remove deselected bills from selectedBills state
    const selectedIds = Object.keys(selectedBills).filter(id => selectedBills[id]);
  
    console.log('Settling bills:', selectedIds);
    // Implement logic to settle bills in the database or perform other actions
  };
  
  const handleDeleteBills = () => {
    // Remove deselected bills from selectedBills state
    const selectedIds = Object.keys(selectedBills).filter(id => selectedBills[id]);
  
    console.log('Deleting bills:', selectedIds);
  }

  const getColorByDaysUntilDue = (daysUntilDue) => {
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
            {daysUntilDue <= 3 && <Icon name="circle-exclamation" color="white" size={25} />}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Icon name="table-list" size={30} />
        <Text style={styles.titleText}> UPCOMING BILLS </Text>
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
          {sortBills(filterBillsForMonth({ bills, currentMonth })).map((bill) => renderItem(bill))}
        </ScrollView>
      )}

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.settleButton} onPress={handleSettleBills}>
          <Text style={styles.buttonText}>Settle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteBills}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleText: {
    fontSize: 18,
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
    padding: 20,
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
