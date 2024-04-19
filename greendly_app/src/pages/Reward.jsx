import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import axios from 'axios'
import {Notifications} from 'expo'
import * as Permissions from 'expo-permissions'

import CardReward from '../components/CardsRewards/CardReward'

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
      <TouchableOpacity 
        style={styles.contButton}
      >
        <Text style={styles.buttonText}>
          Make GET Request 
        </Text>
      </TouchableOpacity>

      <View className="items-center justify-start">
        <CardReward/>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
  },
  contButton: {
    alignSelf: 'center',
    height: 50,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3AA940',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});