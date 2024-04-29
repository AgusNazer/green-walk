import React from "react";
import { useState, useEffect } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import axios from 'axios'
import { EXPO_PUBLIC_API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';


import CardReward from '../components/CardsRewards/CardReward'


export default function Rewards(){
  
  const [emailStorage, setEmailStorage] = useState(null)
  const [userLog, setUserLog] = useState('')

useEffect(() => {
  const getData = async () => {
    const value = await AsyncStorage.getItem('email');
    setEmailStorage(value)
     console.log(emailStorage)   
  };    
  getData();

}, [])


const handleGetRequest = async () => {
  try {
    const request = await axios.get(`${EXPO_PUBLIC_API_URL}/users/getAllUsers`)
    const response = request.data
    const foundUser = response.find(user => user.email === emailStorage);
    if (foundUser.wallet !== null) {
      console.log(foundUser.wallet);
      try {
        const response = await axios.post(`${EXPO_PUBLIC_API_URL}/claim`,{
          "addresLocal": foundUser.wallet,
           "id": "1",
           "name": "Nicolas",
           "km_travelled": "12",
           "time": "14",
           "city": "Cartagena",
           "date": "2024-12-24",
           "tokens":12
       });
        Alert.alert('Respuesta:', JSON.stringify(response.data));
      } catch (error) {
        Alert.alert('Error:', error.message);
      }
    }
    else if (foundUser.wallet === null){
      Alert.alert("No hay una billetera registrada")
    }
  } catch (error) {
    console.log(error);
  }

};
console.log(emailStorage);

console.log(userLog);

    return (
      <View style={styles.container}>
        <View className="items-center justify-start">
          <CardReward claim={handleGetRequest}/>
          
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