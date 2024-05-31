import { View, Text } from "react-native";
import NavigationTab from "../../../components/navigation/navigation";


const Portfolio = ( {navigation} ) => {
    return (
        <View>
            <Text> Portfolio</Text>
            <NavigationTab navigation = {navigation}/>
        </View>
    );
};

export default Portfolio;
