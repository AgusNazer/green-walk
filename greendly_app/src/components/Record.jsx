import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

export default function Record() {

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
  
    return `${hours.toString().padStart(2, '')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    return `${day}-${month}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem('id');
        const response = await fetch(`${API_URL}/activity?userId=${userId}`);
        if (!response.ok) {
          throw new Error('Error al obtener actividades del usuario');
        }
        const data = await response.json();
        setActivities(data.reverse());
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (

    <View className='w-[100%]'>

      <ScrollView >
        {activities.map((activity, index) => (
          <View key={index} className="flex flex-row justify-evenly mb-[1] bg-zinc-900 py-2 w-full">

            <View className="flex flex-col justify-center items-center" >
              <Text style={styles.distanceText}>
                {(activity.distance / 1000).toFixed(3) + ' Km'}
              </Text>

              <Text className="text-white">
                Distance
              </Text>
            </View>

            <View className="flex flex-col justify-center items-center">
              <Text style={styles.timeText}>
                {formatTime(activity.duration)}
              </Text>

              <Text className="text-white" >
                Time
              </Text>
            </View>          

            <View className="flex flex-col justify-center items-center">
              <Text style={styles.timeText}>
                {formatDate(activity.date)}
              </Text>

              <Text className="text-white" >
                Date
              </Text>
            </View>

          </View>
        ))}
      </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  distanceText:{
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  timeText:{
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
});