import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from 'react';
import Icon from "react-native-vector-icons/FontAwesome6";
import { format } from "date-fns";
import { getDatabase, ref, onValue } from 'firebase/database';
import Colors from '../../../../constants/Colors';

const filterBillsForMonth = ({bills, currentMonth}) => {
    return bills ? Object.keys(bills)
        .filter((billId) => bills[billId].dueDate.startsWith(format(currentMonth, 'yyyy-MM')))
        .map((billId) => ({ id: billId, ...bills[billId] }))
        : [];
};

function totalBill(bills) {
    let output = 0;
    bills.forEach(bill => {
        output += bill.amount;
    });
    return output;
}

const BillSummary = ( {userId, currentMonth} ) => {

    const [bills, setBills] = useState({});

    useEffect(() => {
        const db = getDatabase();
        const billsRef = ref(db, `users/${userId}/bills`);
        
        onValue(billsRef, (snapshot) => {
            const data = snapshot.val();
            // const filteredBills = FilterBillsForMonth({data, currentMonth});
            const filteredBills = data;
            setBills(filteredBills);
        });
    }, [userId, currentMonth]);

    const filteredBillsForMonth = filterBillsForMonth({bills, currentMonth});
    const totalBillForMonth = totalBill(filteredBillsForMonth);
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}> Total Bills </Text>
            </View>
            <Text style={styles.text}>${totalBillForMonth}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 10,
        padding: 10,
        backgroundColor: Colors.mainBG,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        // elevation: 5,
        width: "60%",
    },
    title: {
        flexDirection: "row",
    },
    titleText : {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    text : {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
});

export default BillSummary;