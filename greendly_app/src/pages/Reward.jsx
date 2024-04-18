import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import axios from 'axios'


export default function Rewards() {

  const handleGetRequest = async () => {
    try {
      const response = await axios.post('http://192.168.0.51:3002/hola',{
        "addresLocal": "5HTJkawMqHSvVRi2XrE7vdTU4t5Vq1EDv2ZDeWSwNxmmQKEK",
        "accountTo": "5G8mzxiCCW4VALGRGdaqGPfrMLp7CeaVfk5XwPhDDaDyGEgE",
        "quantity": 10
      });
      Alert.alert('Respuesta:', JSON.stringify(response.data));
    } catch (error) {
      Alert.alert('Error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>
        <TouchableOpacity 
          style={styles.contButton}
          onPress={handleGetRequest}
        >
          <Text>
            Make GET Request 
          </Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
    top: 40,
    paddingVertical: 15
  },
});