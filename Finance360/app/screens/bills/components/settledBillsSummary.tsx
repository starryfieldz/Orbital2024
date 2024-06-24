import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome6";
import { format } from "date-fns";
import { getDatabase, ref, onValue } from 'firebase/database';

const filterSettledBillsForMonth = ({bills, currentMonth}) => {
    return bills ? Object.keys(bills)
        .filter((billId) => bills[billId].settled && bills[billId].dueDate.startsWith(format(currentMonth, 'yyyy-MM')))
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

const SettledBillsSummary = ( {userId, currentMonth} ) => {

    const [bills, setBills] = useState({});

    useEffect(() => {
        const db = getDatabase();
        const billsRef = ref(db, `users/${userId}/bills`);
        
        onValue(billsRef, (snapshot) => {
            const data = snapshot.val();
            const filteredBills = data;
            setBills(filteredBills);
        });
    }, [userId, currentMonth]);

    const filteredBillsForMonth = filterSettledBillsForMonth({bills, currentMonth});
    const totalBillForMonth = totalBill(filteredBillsForMonth);

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Icon name="check-circle" size={30}/>
                <Text style={styles.titleText}> Settled {format(currentMonth, "MMMM yyyy")}</Text>
            </View>
            <Text style={styles.text}> Total Settled Bills: ${totalBillForMonth}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 20,
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
    },
    title: {
        flexDirection: "row",
        paddingVertical: 10,
    },
    titleText : {
        fontSize: 20,
        fontWeight: "bold"
    },
    text : {
        fontSize: 20,
    }
});

export default SettledBillsSummary;
