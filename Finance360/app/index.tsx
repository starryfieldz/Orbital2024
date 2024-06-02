import { ScrollView, Image, StyleSheet, Platform , Text, View, Button, TouchableOpacity} from 'react-native';
import { Link } from 'expo-router';
import Login from "./screens/login";
import Expenses from "./screens/expenses";
import Start from "./screens/start";
import Portfolio from "./screens/portfolio";
import Bills from "./screens/bills";
import Stock from './screens/stock';
import Budgeting from './screens/budgeting';
import AddExpenseDetails from "./screens/addExpenseDetails";
import NavigationTab from '../components/navigation/navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



const Stack = createStackNavigator();

export default function Index() {
    return (
        <Stack.Navigator initialRouteName="Start">
            <Stack.Screen name="Start" component={Start} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Expenses" component={Expenses} />
            <Stack.Screen name="Bills" component={Bills} />
            <Stack.Screen name="Budgeting" component={Budgeting} />
            <Stack.Screen name="Stock" component={Stock} />
            <Stack.Screen name="Portfolio" component={Portfolio} />
            <Stack.Screen name="AddExpenseDetails" component={AddExpenseDetails} />
        </Stack.Navigator>
        // <Stack.Navigator initialRouteName = "NavigationTab">
        //   <Stack.Screen name="NavigationTab" component={NavigationTab} />
        // </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
  container : {
    justifyContent : 'center',
  }
});