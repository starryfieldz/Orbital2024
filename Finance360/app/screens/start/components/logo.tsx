import {Image, View, StyleSheet} from 'react-native';

const Logo = ()  => {
    return <View style = {styles.container}>
        <Image source={require('../../../../assets/images/Logo.png')}
        style={{width: 250, height: 250}} />
    </View>;
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 50,
      },
});
export default Logo;