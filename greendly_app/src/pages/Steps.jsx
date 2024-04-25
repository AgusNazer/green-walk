import { fontScale } from "nativewind";
import React, { useState } from "react";
import { Text, View, ScrollView } from "react-native";
import CircularProgress from 'react-native-circular-progress-indicator';

export default function Steps() {

  const [value, setValue] = useState(0);

  return (
    <View className='flex-1 items-center justify-start bg-[#fff] pt-6' >

      <CircularProgress
        radius={150}
        value={72}
        valueSuffix={'%'}
        progressValueFontSize={60}
        progressValueColor="#8AD400"
        title="10.000 Steps"
        titleFontSize={30}
        titleColor="#81C600"
        inActiveStrokeColor={'#70D07C'}
        activeStrokeColor={'#89D200'}
        activeStrokeWidth={29}
        inActiveStrokeOpacity={0.2}
        inActiveStrokeWidth={25}
        duration={3000}
        onAnimationComplete={() => setValue(50)}
      />
      
      <View className='flex flex-row justify-evenly w-full mt-8  py-3' >

        <View className='' >
          <Text className='text-center text-3xl font-semibold'>
            5,5 Km
          </Text>

          <Text className='text-center text-xl'>
           Total Kms
          </Text>
        </View>

        <View className='' >
          <Text className='text-center text-3xl font-semibold'>
            7.268
          </Text>

          <Text className='text-center text-xl'>
           Total Steps
          </Text>
        </View>

        <View className='' >
          <Text className='text-center text-3xl font-semibold'>
            01h:10m
          </Text>

          <Text className='text-center text-xl'>
            Total time
          </Text>
        </View>  

      </View>

      <ScrollView style={{ flex: 1, width: '100%'}} className='mt-5'>

        <View className='gap-4 px-3 py-4 bg-gray-800'>

          <View className='flex flex-row justify-between border border-white rounded-xl p-3'>
            <Text className='text-2xl text-white'>
              <Text className='font-semibold'>1.000</Text> Steps challenge 
            </Text>

            <Text className='text-xl text-white'>
              Reward
            </Text>
          </View>

          <View className='flex flex-row justify-between border border-white rounded-xl p-3'>
            <Text className='text-2xl text-white'>
              <Text className='font-semibold'>3.000</Text> Steps challenge 
            </Text>

            <Text className='text-xl text-white'>
              Reward
            </Text>
          </View>

          <View className='flex flex-row justify-between border border-white rounded-xl p-3'>
            <Text className='text-2xl text-white'>
              <Text className='font-semibold'>10.000</Text> Steps challenge 
            </Text>

            <Text className='text-xl text-white'>
              
            </Text>
          </View>

          <View className='flex flex-row justify-between border border-white rounded-xl p-3'>
            <Text className='text-2xl text-white'>
              <Text className='font-semibold'>30.000</Text> Steps challenge 
            </Text>

            <Text className='text-xl text-white'>
              
            </Text>
          </View>

          <View className='flex flex-row justify-between border border-white rounded-xl p-3'>
            <Text className='text-2xl text-white'>
              <Text className='font-semibold'>50.000</Text> Steps challenge 
            </Text>

            <Text className='text-xl text-white'>
              
            </Text>
          </View>

          <View className='flex flex-row justify-between border border-white rounded-xl p-3'>
            <Text className='text-2xl text-white'>
              <Text className='font-semibold'>70.000</Text> Steps challenge 
            </Text>

            <Text className='text-xl text-white'>
              
            </Text>
          </View>

          <View className='flex flex-row justify-between border border-white rounded-xl p-3'>
            <Text className='text-2xl text-white'>
              <Text className='font-semibold'>100.000</Text> Steps challenge 
            </Text>

            <Text className='text-xl '>
              
            </Text>
          </View>          

        </View>
      </ScrollView>


    </View>
  );
}


