import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text , Button , Alert } from "react-native";
import { Video } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios'
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';


export default function Landing() {
  const handleGetRequest = async () => {
    try {
      const response = await axios.post('http://192.168.1.51:3002/hola',{
        "addresLocal": "5HTJkawMqHSvVRi2XrE7vdTU4t5Vq1EDv2ZDeWSwNxmmQKEK",
        "accountTo": "5G8mzxiCCW4VALGRGdaqGPfrMLp7CeaVfk5XwPhDDaDyGEgE",
        "quantity": 10
      });
      Alert.alert('Respuesta:', JSON.stringify(response.data));
    } catch (error) {
      Alert.alert('Error:', error.message);
    }
  };
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
  }


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
    {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Mi ubicación"
            description="Aquí estoy"
          />
        </MapView>
      ) : (
        <Text>Cargando...</Text>
      )}
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
  },
  map: {
    alignSelf: 'center',
    height: 300,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    backgroundColor: '#3AA940',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    top: 40
  },
  containertwo:{
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
