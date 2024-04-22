import React,{useState,useEffect} from "react";
import { Text, StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import axios from 'axios'
import { API_URL } from '@env';


import CardReward from '../components/CardsRewards/CardReward'



const handleGetRequest = async () => {
  try {
    const response = await axios.post(`${API_URL}/claim`,{
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