import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { format } from 'date-fns';
import { View, Text } from 'react-native';

function calculateTotalPerMonth({data, currentMonth}) {
    let total = 0.0;
    for (let date in data) {
        if (date.startsWith(format(currentMonth, "yyyy-MM"))) {
            Object.values(data[date]).forEach(category => {
                Object.values(category).forEach(item => {
                    total += item.amount;
                });
            });
        }
    }
    return total;
};

const IncomeByMonth = ({ userId, currentMonth }) => {
    const [totalIncomePerMonth, setTotalIncomePerMonth] = useState(0.0);
    
    useEffect(() => {
        const db = getDatabase();
        const incomesRef = ref(db, `users/${userId}/income`);
        
        onValue(incomesRef, (snapshot) => {
            const data = snapshot.val();
            const newTotalExpensesPerMonth = calculateTotalPerMonth({data, currentMonth});
            setTotalIncomePerMonth(newTotalExpensesPerMonth);
        });
    }, [userId, currentMonth]);

    return (
        <View>
            <Text>Monthly Income: {totalIncomePerMonth}</Text>
        </View>
    )
};
 
export default IncomeByMonth;