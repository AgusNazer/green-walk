import React from "react";
import { View, StyleSheet, TouchableOpacity, Text , Button , Alert } from "react-native";
import { Video } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios'

export default function Landing() {
  const handleGetRequest = async () => {
    try {
      const response = await axios.get('http://192.168.1.51:3002/hola');
      Alert.alert('Respuesta:', JSON.stringify(response.data));
    } catch (error) {
      Alert.alert('Error:', error.message);
    }
  };
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

    <TouchableOpacity 
      style={styles.contButton}
      onPress={() => navigation.navigate('Blockchain')}
    >
      <Text>
        Go to Blockchain 
      </Text>
    </TouchableOpacity>

    <TouchableOpacity 
      style={styles.contButton}
      onPress={handleGetRequest}
    >
      <Text>
        Make GET Request 
      </Text>
    </TouchableOpacity>

  </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff'
  },
  video: {
    // position: "absolute",
    height: 270,
    left: 0,
    right: 0,
  },
  contButton: {
    // position: "absolute",
    alignSelf: 'center',
    height: 50,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    backgroundColor: '#3AA940',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    top: 40
  }
});
