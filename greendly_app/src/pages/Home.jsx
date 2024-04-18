import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, BackHandler, ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Location from 'expo-location';
import MapView, { Marker, Polyline  } from 'react-native-maps';


const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3;
  const phi1 = lat1 * (Math.PI / 180);
  const phi2 = lat2 * (Math.PI / 180);
  const deltaPhi = (lat2 - lat1) * (Math.PI / 180);
  const deltaLambda = (lon2 - lon1) * (Math.PI / 180);

  const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) *
    Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return distance;
};

const formatTime = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export default function Home() {
 
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locations, setLocations] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0); 
  const [backPressCount, setBackPressCount] = useState(0);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    const backAction = () => {
      if (backPressCount === 0) {
        setBackPressCount(1);
        ToastAndroid.show('Presiona de nuevo para salir', ToastAndroid.SHORT);
        const id = setTimeout(() => {
          setBackPressCount(0);
        }, 3000);
        setTimeoutId(id);
        return true;
      } else {
        clearTimeout(timeoutId); 
        return false;
      }
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      backHandler.remove();
      clearTimeout(timeoutId); // Limpia el temporizador al desmontar el componente
    };
  }, [backPressCount, timeoutId]);


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

  const handleStartRecording = async () => {
    try {
      setIsRecording(true);
      setIsTimerRunning(true);
      setStartTime(new Date().getTime());

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Permission to access location was denied.');
        setIsRecording(false);
        setIsTimerRunning(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocations([...locations, location.coords]);

      const id = setInterval(async () => {
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocations(prevLocations => [...prevLocations, currentLocation.coords]);
      }, 10000);
      setTimerId(id);
    } catch (error) {
      Alert.alert('Error', error.message);
      setIsRecording(false);
      setIsTimerRunning(false);
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsTimerRunning(false);
    clearInterval(timerId);
    setTimerId(null);
  };

  useEffect(() => {
    let intervalId;
    if (isTimerRunning) {
      intervalId = setInterval(() => {
        const now = new Date().getTime();
        const elapsed = now - startTime;
        setElapsedTime(elapsed);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isTimerRunning, startTime]);

  const calculateTotalDistance = () => {
    let calculatedDistance = 0;
    for (let i = 1; i < locations.length; i++) {
      const prevLocation = locations[i - 1];
      const currentLocation = locations[i];
      const distance = calculateDistance(
        prevLocation.latitude,
        prevLocation.longitude,
        currentLocation.latitude,
        currentLocation.longitude
      );
      if (isRecording && distance >= 5) {
        calculatedDistance += distance;
      }
    }
    return calculatedDistance;
  };

  useEffect(() => {
    if (isRecording) {
      const distance = calculateTotalDistance();
      setTotalDistance(distance);
    }
  }, [locations, isRecording]);

  return (
    <View style={styles.container}>
     
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: locations.length > 0 ? locations[0].latitude : 0,
          longitude: locations.length > 0 ? locations[0].longitude : 0,
          latitude: 4.6279183, 
          longitude: -74.1375032,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
      >
        {locations.length > 0 && (
          <>
            <Polyline
              coordinates={locations.map(loc => ({
                latitude: loc.latitude,
                longitude: loc.longitude,
              }))}
              strokeWidth={4}
              strokeColor="#3AA940"
            />
            <Marker
              coordinate={{
                latitude: locations[0].latitude,
                longitude: locations[0].longitude,
              }}
              title="Inicio"
              description="Inicio del recorrido"
              pinColor="#1D57CB"
            />
            {locations.length > 1 && (
              <Marker
                coordinate={{
                  latitude: locations[locations.length - 1].latitude,
                  longitude: locations[locations.length - 1].longitude,
                }}
                title="Fin"
                description="Fin del recorrido"
                pinColor="red"
              />
            )}
          </>
        )}
      </MapView>

      <TouchableOpacity 
        style={[styles.button, isRecording ? styles.finishButton : styles.startButton]}
        onPress={isRecording ? handleStopRecording : handleStartRecording}
      >
        <Text style={styles.buttonText}>
          {isRecording ? 'FINISH' : 'START'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.distanceText}>
        {(totalDistance / 1000).toFixed(2) + ' Km'}
      </Text>

      <Text style={styles.timeText}>
        {formatTime(elapsedTime)}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff'
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    width: '50%'
  },
  startButton: {
    backgroundColor: '#007bff',
  },
  finishButton: {
    backgroundColor: '#D93535',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.5,    
  },
  map: {
    flex: 1,
    width: '100%',
    height: '80%'
  },
  distanceText:{
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 10,
  },
  timeText:{
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 10,
  },
});
