import { ScrollView, View, Text } from "react-native";
import NavigationTab from "../../../components/navigation/navigation";


const Stock = ( {navigation} ) => {
    return (
        <ScrollView>
            <Text> Stock</Text>
            <NavigationTab navigation = {navigation}/>
        </ScrollView>
    );
};

export default Stock;