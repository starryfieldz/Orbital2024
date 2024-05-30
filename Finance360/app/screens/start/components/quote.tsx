import {Text, View, StyleSheet} from 'react-native';

const Quote = () => {
    return (
        <View style = {styles.container}> 
            <Text style= {styles.slogan}> Own Your Finance Today</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    slogan: {
      color: 'black',
      fontSize: 20,
      fontWeight: 'bold', 
      fontStyle: 'italic',
      textAlign: 'center',
    },

    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      },
});
export default Quote;