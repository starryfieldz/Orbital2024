import Logo from "././components/logo";
import {View, StyleSheet} from 'react-native';
import Quote from "././components/quote";
import Button from "././components/button";

const Start = () => {
    return (
        <View>
            <Logo />
            <Quote />
            <Button />
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
});

export default Start
