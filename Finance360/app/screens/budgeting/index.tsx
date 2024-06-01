import { View, Text, StyleSheet, ScrollView } from "react-native";
import NavigationTab from "../../../components/navigation/navigation";

const Budgeting = ({navigation}) => {
    return (
        <View style = {styles.container}>
            <View>
                <Text> Budgeting</Text>
            </View>
            <ScrollView contentContainerStyle = {styles.scrollViewContent}>
                <Text> to be done up </Text>
            </ScrollView>
            <View style = {styles.navigationTab}>
                <NavigationTab navigation = {navigation} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    navigationTab: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },

    addExpenseButton: {
        position: 'absolute',
        bottom : 80,
        right: 30, 
    }
});
export default Budgeting;