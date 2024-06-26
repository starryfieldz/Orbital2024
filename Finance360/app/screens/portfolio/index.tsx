// import { View, Text, ScrollView, StyleSheet } from "react-native";
// import NavigationTab from "../../../components/navigation/navigation";
// import React, { useEffect, useState } from 'react';
// import { axios } from 'axios';

// const Portfolio = ({navigation}) => {
//     const [stockData, setStockData] = useState<{
//         symbol: string;
//         price: number;
//         change: number;
//         changePercent: number;
//       } | null>(null);
//       const [loading, setLoading] = useState<boolean>(true);
//       const [error, setError] = useState<string | null>(null);
    
//       useEffect(() => {
//         const fetchData = async () => {
//           try {
//             const response = await axios.post(
//               'https://yahoo-finance160.p.rapidapi.com/info',
//               { stock: 'TSLA' },
//               {
//                 headers: {
//                   'x-rapidapi-key': '788b7741camsh7767c6dff21ebd2p13ba91jsn28e3b0a582fe',
//                   'x-rapidapi-host': 'yahoo-finance160.p.rapidapi.com',
//                   'Content-Type': 'application/json'
//                 }
//               }
//             );
//             setStockData(response.data);
//           } catch (err) {
//             setError(err.message);
//           } finally {
//             setLoading(false);
//           }
//         };
    
//         fetchData();
//       }, []);
    
//       if (loading) {
//         return (
//           <View style={styles.container}>
//             <ActivityIndicator size="large" color="#0000ff" />
//           </View>
//         );
//       }
    
//       if (error) {
//         return (
//           <View style={styles.container}>
//             <Text>Error: {error}</Text>
//           </View>
//         );
//       }
    
//       return (
//         <View style={styles.container}>
//           <Text style={styles.header}>TSLA Stock Data</Text>
//           {stockData && (
//             <>
//               <Text>Symbol: {stockData.symbol}</Text>
//               <Text>Price: ${stockData.price.toFixed(2)}</Text>
//               <Text>Change: {stockData.change.toFixed(2)}</Text>
//               <Text>Change Percentage: {stockData.changePercent.toFixed(2)}%</Text>
//             </>
//           )}
//         </View>
//       );
//     };
    
// // const styles = StyleSheet.create({
// //     container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: '#f5fcff',
// //     },
// //     header: {
// //     fontSize: 24,
// //     marginBottom: 20,
// //     },
// // });

// // const styles = StyleSheet.create({
// // container: {
// //     flex: 1,
// // },
// // scrollViewContent: {
// //     flexGrow: 1,
// // },
// // navigationTab: {
// //     position: 'absolute',
// //     bottom: 0,
// //     left: 0,
// //     right: 0,
// // },
// // });

// export default Portfolio;