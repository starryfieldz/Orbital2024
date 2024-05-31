import { ScrollView, Image, StyleSheet, Platform , Text, View, Button, TouchableOpacity} from 'react-native';
import { Link } from 'expo-router';
import Credentials from "./screens/credentials";
import Home from "./screens/home";
import Start from "./screens/start";
import NavigationTab from '../components/navigation/navigation';

export default function Index() {
  return (
      <View>
          <Credentials/>
      </View>
  );
}

const styles = StyleSheet.create({
  container : {
    justifyContent : 'center',
  }
});