import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, BackHandler, ToastAndroid, Image, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Location from 'expo-location';
import MapView, { Marker, Polyline  } from 'react-native-maps';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import themes from '../themeMap';
import CardsHome from '../components/CardsHome';
import CustomText from '../components/CustomText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
import appfirebase from "../../firebase";
import { EXPO_PUBLIC_API_URL } from '@env';
import Record from '../components/Record';

const { themeDark, themeLight } = themes;

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

  return `${hours.toString().padStart(2, '')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
  const [dark, setDark] = useState(false);
  const [locationLoaded, setLocationLoaded] = useState(false);
  const [iamReady, setIamReady] = useState(false)
  const [userId, setUserId] = useState(null);
  const [emailStorage, setEmailStorage] = useState('')
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth(appfirebase);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (currentUser) {
      const { displayName, email, photoURL, uid } = currentUser;
      setEmailStorage(email);
    }
  }, [currentUser]); 
 
  useEffect(() => {
    const fetchUserIdByEmail = async () => {
      try {
        const response = await fetch(`${EXPO_PUBLIC_API_URL}/users/getMongoUserId/${emailStorage}`);
        const data = await response.json();
        // console.log(response.url);
        if (response.ok) {
          setUserId(data.userId);
          // console.log(data.userId);
          if (data.userId) {
            await AsyncStorage.setItem('id', data.userId);
          } else {
            await AsyncStorage.removeItem('id');
          }
        } else {
          console.error('Error fetching user ID res:', data.message);
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };
  
    const timeoutId = setTimeout(() => {
      fetchUserIdByEmail();
    }, 1000);
  
    return () => clearTimeout(timeoutId);
  }, [emailStorage]);

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
      clearTimeout(timeoutId);
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
      setLocationLoaded(true);
    })();
  }, []);  

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
  }

  const calculateTotalDistance = () => {
    let calculatedDistance = 0;
    for (let i = 1; i < locations.length; i++) {
      const prevLocation = locations[i - 1];
      const currentLocation = locations[i];
      let distance = calculateDistance(
        prevLocation.latitude,
        prevLocation.longitude,
        currentLocation.latitude,
        currentLocation.longitude
      );
      if (isRecording && distance >= 0) {
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

  const customMapStyle = dark ? themeDark : themeLight;

  const toggleInputs = () => {
    setIamReady(!iamReady);
  };

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

  const handleStopRecording = async () => {
    setIsRecording(false);
    setIsTimerRunning(false);
    clearInterval(timerId);
    setTimerId(null);
    setElapsedTime(0)   
    try {
      const response = await fetch(`${EXPO_PUBLIC_API_URL}/activity/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          date: new Date().toISOString(),
          distance: totalDistance,
          duration: elapsedTime,
        }),
      });
      await response.json();
      // Reset totalDistance to 0 after successful request
      setTotalDistance(0);
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
    setLocations([]);
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

  return (
    <>
      {!iamReady && (    
        <CardsHome toggleInputs={toggleInputs} />    
      )}

      {!isRecording && (
        <View className=''>
          <Button
            style={{
              fontSize: 35,
            }}
            classNames=''
            onPress={toggleInputs}
            title="Close map"
            color="#5D085D"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      )} 


      <View style={styles.container}>

        {locationLoaded && location ? (
          <MapView
          style={styles.map}
          initialRegion={{
            latitude: location ? location.coords.latitude : 0,
            longitude: location ? location.coords.longitude : 0,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={true}      
          zoomControlEnabled={true}
          zoomEnabled={true}
          showsBuildings={true}
          customMapStyle={customMapStyle}
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
                pinColor="#7BC239"
              />
              {locations.length > 1 && (
                <Marker
                  coordinate={{
                    latitude: locations[locations.length - 1].latitude,
                    longitude: locations[locations.length - 1].longitude,
                  }}
                  title="Fin"
                  description="Fin del recorrido"
                  pinColor="#E56644"
                />
              )}
            </>
          )}
        </MapView>
        ) : (
          <Text>Cargando ubicación...</Text>
        )}            

        <TouchableOpacity
          onPress={() => setDark((prevDark) => !prevDark)}
          style={{
            backgroundColor: "#FFF",
            height: 30,
            borderRadius: 15,
            width: 30,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            marginTop: 70,
            alignSelf: "flex-end",
            right: 15,
          }}
        >
          <FontAwesome name="adjust" size={30} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, isRecording ? styles.finishButton : styles.startButton]}
          onPress={isRecording ? handleStopRecording : handleStartRecording}
        >
          <Text style={styles.buttonText}>
            {isRecording ? 'FINISH' : 'START'}
          </Text>
        </TouchableOpacity>

        <View className="flex flex-row justify-evenly mb-3" >
          <View className="flex flex-col justify-center items-center" >
            <Text style={styles.distanceText}>
              {(totalDistance / 1000).toFixed(2) + ' Km'}
            </Text>

            <Text className="text-xl">
              Distance
            </Text>
          </View>

          <View className="flex flex-col justify-center items-center">
            <Text style={styles.timeText}>
              {formatTime(elapsedTime)}
            </Text>

            <Text className="text-xl" >
              Time
            </Text>
          </View>
        </View>

      {!isRecording && (
        <View className='flex-1'>
          <Text className='text-center text-3xl text-white font-semibold mb-[1] bg-zinc-900 py-2'>
            Recent activities
          </Text>

          <Record />
        </View>
      )}

      </View>
    </>
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
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 10,
    width: '50%'
  },
  startButton: {
    backgroundColor: '#7BC239',
  },
  finishButton: {
    backgroundColor: '#E56644',
  },
  buttonText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 9,    
  },
  map: {
    flex: 1,
    width: '100%',
    height: '80%'
  },
  distanceText:{
    color: 'black',
    fontSize: 27,
    fontWeight: '500',
    textAlign: 'center',
  },
  timeText:{
    color: 'black',
    fontSize: 27,
    fontWeight: '500',
    textAlign: 'center',
  },
});
