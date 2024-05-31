import Logo from "./components/logo";
import {View, StyleSheet} from 'react-native';
import Quote from "./components/quote";
import Button from "./components/button";


const Start = ( { navigation }) => {
    return (
        <View>
            <Logo />
            <Quote />
            <Button navigation = {navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'darkgreen',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignSelf: 'center',
        
    },

    container2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
});

export default Start;
