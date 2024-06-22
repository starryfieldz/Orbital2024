import { StyleSheet } from 'react-native';
import Login from "./screens/login";
import Expenses from "./screens/expenses";
import Start from "./screens/start";
import Portfolio from "./screens/portfolio";
import Bills from "./screens/bills";
import Stock from './screens/stock';
import Budgeting from './screens/budgeting';
import SignupScreen from "./screens/signupScreen";
import AddExpenseDetails from "./screens/addExpenseDetails";
import AddIncomeDetails from './screens/addIncomeDetails';
import EditExpenseDetails from './screens/editExpenseDetails';
import EditIncomeDetails from './screens/editIncomeDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function Index() {
    return (
            <Stack.Navigator initialRouteName="Start">
                <Stack.Screen name="Start" component={Start} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignupScreen" component={SignupScreen} />
                <Stack.Screen name="Expenses" component={Expenses} />
                <Stack.Screen name="Bills" component={Bills} />
                <Stack.Screen name="Budgeting" component={Budgeting} />
                <Stack.Screen name="Stock" component={Stock} />
                <Stack.Screen name="Portfolio" component={Portfolio} />
                <Stack.Screen name="AddExpenseDetails" component={AddExpenseDetails} />
                <Stack.Screen name="AddIncomeDetails" component={AddIncomeDetails} />
                <Stack.Screen name="EditExpenseDetails" component={EditExpenseDetails} />
                <Stack.Screen name="EditIncomeDetails" component={EditIncomeDetails} />
            </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
});
