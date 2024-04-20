import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import axios from 'axios'
import {Notifications} from 'expo'
import * as Permissions from 'expo-permissions'
import sendNotificaiont from "../components/CardsRewards/SendNotification";

import CardReward from '../components/CardsRewards/CardReward'

const getToken = async ()=>{
  const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS)
  if(status !== "granted"){
    return
  }
  const token = await Notifications.getExpoPushTokenAsync()
  console.log(token);
  return token
}

const handleGetRequest = async () => {
  try {
    const response = await axios.post('http://192.168.1.51:3002/claim',{
      "addresLocal": "5G8mzxiCCW4VALGRGdaqGPfrMLp7CeaVfk5XwPhDDaDyGEgE",
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
};
export default class Rewards extends React.Component {
  componentDidMount(){
    getToken()
  }
  render(){
    return (
      <View style={styles.container}>
        <View className="items-center justify-start">
          <CardReward claim={handleGetRequest}/>
          
        </View>
      </View>
    );
  }
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