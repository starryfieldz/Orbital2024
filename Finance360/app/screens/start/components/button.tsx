import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Link} from 'expo-router';

const Button = () => {
    return (
        <View>
            <Link key = 'Login' href= '../../../screens/credentials' asChild>
                <View>
                    <TouchableOpacity style={styles.button} onPress={HandlePress}>
                        <Text style = {styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </Link>
        </View>
    );
}

const HandlePress = () => {
    console.log("User logging in");
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'darkgreen',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignSelf: 'center',
        
      },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',

    },
});

export default Button;
