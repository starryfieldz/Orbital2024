import { View, Text } from "react-native";
import NavigationTab from "../../../components/navigation/navigation";


const Bills = ( {navigation} ) => {
    return (
        <View>
            <Text> Bills</Text>
            <NavigationTab navigation = {navigation} />
        </View>
    );
};

export default Bills;