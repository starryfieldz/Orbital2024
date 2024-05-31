import { View, Text } from "react-native";
import NavigationTab from "../../../components/navigation/navigation";

const Budgeting = ({navigation}) => {
    return (
        <View>
            <Text> Budgeting</Text>
            <NavigationTab navigation = {navigation} />
        </View>
    );
};

export default Budgeting;