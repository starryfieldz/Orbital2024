import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';

const Title = ( {name} ) => {
    return (
        <View> 
           <Text style = {styles.text}> Hello {name} !!!!!!</Text>
        </View>
    );
}

Title.propTypes = {
    name: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    text : {
        color : 'black',
        fontSize : 20,
        fontStyle : 'italic',
        fontWeight : 'bold',
    }
});

export default Title;
