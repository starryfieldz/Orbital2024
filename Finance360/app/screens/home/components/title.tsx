import { View, StyleSheet, Text } from 'react-native';

const Title = ({name}) => {
    return (
        <View> 
           <Text style = {styles.text}> Hello {name} !!!!!!</Text>
        </View>
    );
}

export default Title;

const styles = StyleSheet.create({
    text : {
        color : 'yellow',
        fontSize : 20,
        fontStyle : 'italic',
        fontWeight : 'bold',
    }
});