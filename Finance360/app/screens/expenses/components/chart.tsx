import {View, Text, StyleSheet, Dimensions} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get, onValue } from 'firebase/database';


interface ChartProps {
    food: number;
    necessity: number;
    clothes: number;
    subscriptions: number;
}

const Chart: React.FC<ChartProps> = ({ food, necessity, clothes, subscriptions }) => {
    const screenWidth = Dimensions.get('window').width;
    const defaultLegendFontColor =  '#7F7F7F';
    const defaultLegendFontSize = 12;

    const [data, setData] = useState([]);
  
    useEffect(() => {
      const db = getDatabase();
      const expensesByUser = ref(db, `users/${userId}/`);
  
      onValue(expensesByUser, (snapshot) => {
        const expenses = snapshot.val();
        if (expenses) {
            

    const data = [
        {
            name: `Food`,
            value: food,
            color: 'rgb(191, 33, 30)',
            legendFontColor: defaultLegendFontColor, // Custom legend font color
            legendFontSize: defaultLegendFontSize, // Custom legend font size
        },
        {
            name: `Necessity`,
            value: necessity,
            color: 'rgb(233, 206, 44)',
            legendFontColor: defaultLegendFontColor, // Custom legend font color
            legendFontSize: defaultLegendFontSize, // Custom legend font size
        },
        {
            name: `Clothes`,
            value: clothes,
            color: 'rgb(229, 249, 147)',
            legendFontColor: defaultLegendFontColor, // Custom legend font color
            legendFontSize: defaultLegendFontSize, // Custom legend font size
        },
        {
            name: `Subscriptions`,
            value: subscriptions,
            color: 'rgb(105, 161, 151)',
            legendFontColor: defaultLegendFontColor, // Custom legend font color
            legendFontSize: defaultLegendFontSize, // Custom legend font size
        },
    ];

    return (
        <View style={styles.container}>
            <PieChart
                data={data}
                width={screenWidth - 32}
                height={220}
                chartConfig={{
                    backgroundColor: '#1cc910',
                    backgroundGradientFrom: '#eff3ff',
                    backgroundGradientTo: '#efefef',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: '6',
                        strokeWidth: '2',
                        stroke: '#ffa726',
                    },
                }}
                accessor="value"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
            />
        </View>
    );
};

interface ChartProps {
    userId: string;
    month: string;
  }
  
const Chart: React.FC<ChartProps> = ({ userId, month }) => {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const db = getDatabase();
      const expensesRef = ref(db, `users/${userId}/expenses/${month}`);
  
      onValue(expensesRef, (snapshot) => {
        const expenses = snapshot.val();
        if (expenses) {
          const categories = ['food', 'necessity', 'clothes', 'subscriptions'];
          const chartData = categories.map((category) => ({
            key: category,
            value: expenses[category] ? expenses[category].sum : 0,
            svg: { fill: getCategoryColor(category) },
          }));
          setData(chartData);
        }
      });
    }, [userId, month]);
  
    const getCategoryColor = (category: string) => {
      switch (category) {
        case 'food':
          return 'rgb(191, 33, 30)';
        case 'necessity':
          return 'rgb(233, 206, 44)';
        case 'clothes':
          return 'rgb(229, 249, 147)';
        case 'subscriptions':
          return 'rgb(105, 161, 151)';
        default:
          return 'white';
      }
    };
  
    return (
      <View style={styles.container}>
        <PieChart data={data} innerRadius={50} style={styles.chart} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    chart: {
      height: 300,
      width: 300,
    },
  });
  
export default Chart;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Chart;