import {Text, View, StyleSheet} from 'react-native';
import { systemWeights } from 'react-native-typography';

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
      textAlign: 'center',
      ...systemWeights.bold,
    },

    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      },
});
export default Quote;