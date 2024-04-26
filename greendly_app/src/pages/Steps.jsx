import { fontScale } from "nativewind";
import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, Button } from "react-native";
import CircularProgress from 'react-native-circular-progress-indicator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';
import { RefreshControl } from 'react-native';

export default function Steps() {

  const [activities, setActivities] = useState([]);
  const [porcentaje, setPorcentaje] = useState(0);
  const [goal, setGoal] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
  
    return `${hours.toString().padStart(2, '')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const fetchData = async () => {
    try {
      const userId = await AsyncStorage.getItem('id');
      const response = await fetch(`${API_URL}/activity/user/${userId}`);
      if (!response.ok) {
        throw new Error('Error al obtener actividades del usuario');
      }
      const data = await response.json();
      setActivities(data.reverse());
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const totalDistance = activities.reduce((acc, activity) => acc + activity.distance, 0);
  const totalDuration = activities.reduce((acc, activity) => acc + activity.duration, 0);

  const longitudPaso = 0.75; // Longitud aprox de cada paso en metros
  const cantidadPasos = Math.floor(totalDistance / longitudPaso);
  // const cantidadPasos = 299

  const challenge1 = 100
  const challenge2 = 300
  const challenge3 = 500
  const challenge4 = 1000
  const challenge5 = 3000
  const challenge6 = 5000
  const challenge7 = 10000

  useEffect(() => {
    let nuevoPorcentaje = 0;
    let nuevoTitle = 0;

    if (cantidadPasos < challenge1) {
      nuevoPorcentaje = (cantidadPasos / challenge1) * 100;
      nuevoTitle = 100;
    } else if (cantidadPasos < challenge2) {
      nuevoPorcentaje = (cantidadPasos / challenge2) * 100;
      nuevoTitle = 300;
    } else if (cantidadPasos < challenge3) {
      nuevoPorcentaje = (cantidadPasos / challenge3) * 100;
      nuevoTitle = 500;
    } else if (cantidadPasos <= challenge4) {
      nuevoPorcentaje = (cantidadPasos / challenge4) * 100;
      nuevoTitle = 1000;
    } else if (cantidadPasos <= challenge5) {
      nuevoPorcentaje = (cantidadPasos / challenge5) * 100;
      nuevoTitle = 3000;
    } else if (cantidadPasos <= challenge6) {
      nuevoPorcentaje = (cantidadPasos / challenge6) * 100;
      nuevoTitle = 5000;
    } else if (cantidadPasos <= challenge7) {
      nuevoPorcentaje = (cantidadPasos / challenge7) * 100;
      nuevoTitle = 10000;
    }

    setPorcentaje(nuevoPorcentaje);
    setGoal(nuevoTitle);
  }, [cantidadPasos]);


  return (
    <View className='flex-1 items-center justify-start bg-[#fff] pt-6' >

      <View className='flex-1 items-center justify-start '>
        <ScrollView 
          style={{ flex: 1, width: '100%' }}
          refreshControl={
            <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#8AD400']} // Colores de carga
            progressBackgroundColor="#fff" // Fondo de carga
            />
          }
          >
          <CircularProgress
            radius={150}
            value={porcentaje - 2}
            valueSuffix={'%'}
            progressValueFontSize={60}
            progressValueColor="#8AD400"
            title={`Goal: ${goal} Steps`}
            titleFontSize={25}
            titleColor="#81C600"
            inActiveStrokeColor={'#70D07C'}
            activeStrokeColor={'#89D200'}
            activeStrokeWidth={29}
            inActiveStrokeOpacity={0.2}
            inActiveStrokeWidth={25}
            duration={3000}
            />
        </ScrollView>
      </View>
      
      <View className='flex flex-row justify-evenly w-full mt-5 py-3' >

        <View className='' >
          <Text className='text-center text-3xl font-semibold'>
            {(totalDistance / 1000).toFixed(3)}
          </Text>

          <Text className='text-center text-xl'>
           Total Kms
          </Text>
        </View>

        <View className='' >
          <Text className='text-center text-3xl font-semibold'>
            {cantidadPasos}
          </Text>

          <Text className='text-center text-xl'>
           Total Steps
          </Text>
        </View>

        <View className='' >
          <Text className='text-center text-3xl font-semibold'>
            {formatTime(totalDuration)}
          </Text>

          <Text className='text-center text-xl'>
            Total time
          </Text>
        </View>  

      </View>

      <ScrollView style={{ flex: 1, width: '100%'}} className='mt-5'>
        <View className='gap-4 px-3 py-4 bg-zinc-900'>

          <View className='flex flex-row justify-between border border-white rounded-xl p-3'>
            <Text className='text-2xl text-white'>
              <Text className='font-semibold'>100</Text> Steps challenge 
            </Text>

            {(cantidadPasos >= 100) && (
              <Button
                title="Claim"
                color="#7EC200"
                accessibilityLabel="Learn more about this purple button"
              />
            )}
          </View>

          <View className='flex flex-row justify-between border border-white rounded-xl p-3'>
            <Text className='text-2xl text-white'>
              <Text className='font-semibold'>300</Text> Steps challenge 
            </Text>

            {(cantidadPasos >= 300) && (
              <Button
                title="Claim"
                color="#7EC200"
                accessibilityLabel="Learn more about this purple button"
              />
            )}
          </View>

          <View className='flex flex-row justify-between border border-white rounded-xl p-3'>
            <Text className='text-2xl text-white'>
              <Text className='font-semibold'>500</Text> Steps challenge 
            </Text>

            {(cantidadPasos >= 500) && (
              <Button
                title="Claim"
                color="#7EC200"
                accessibilityLabel="Learn more about this purple button"
              />
            )}
          </View>

          <View className='flex flex-row justify-between border border-white rounded-xl p-3'>
            <Text className='text-2xl text-white'>
              <Text className='font-semibold'>1.000</Text> Steps challenge 
            </Text>

            {(cantidadPasos >= 1000) && (
              <Button
                title="Claim"
                color="#7EC200"
                accessibilityLabel="Learn more about this purple button"
              />
            )}
          </View>

          <View className='flex flex-row justify-between border border-white rounded-xl p-3'>
            <Text className='text-2xl text-white'>
              <Text className='font-semibold'>3.000</Text> Steps challenge 
            </Text>

            {(cantidadPasos >= 3000) && (
              <Button
                title="Claim"
                color="#7EC200"
                accessibilityLabel="Learn more about this purple button"
              />
            )}
          </View>

          <View className='flex flex-row justify-between border border-white rounded-xl p-3'>
            <Text className='text-2xl text-white'>
              <Text className='font-semibold'>5.000</Text> Steps challenge 
            </Text>

            {(cantidadPasos >= 5000) && (
              <Button
                title="Claim"
                color="#7EC200"
                accessibilityLabel="Learn more about this purple button"
              />
            )}
          </View>

          <View className='flex flex-row justify-between border border-white rounded-xl p-3'>
            <Text className='text-2xl text-white'>
              <Text className='font-semibold'>10.000</Text> Steps challenge 
            </Text>

            {(cantidadPasos >= 10000) && (
              <Button
                title="Claim"
                color="#7EC200"
                accessibilityLabel="Learn more about this purple button"
              />
            )}
          </View>          

        </View>
      </ScrollView>

    </View>
  );
}


