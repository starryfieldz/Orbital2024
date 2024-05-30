import { Image, StyleSheet, Platform , Text, View, Button, TouchableOpacity} from 'react-native';
import { Link } from 'expo-router';
import Credentials from "./screens/credentials";
import Home from "./screens/home";
import Start from "./screens/start";



export default function Index() {
  return (
      <View>
          <Start /> 
      </View>
  );
}