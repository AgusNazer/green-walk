import { fontScale } from "nativewind";
import React, { useState } from "react";
import { Text, View, ScrollView } from "react-native";
import CircularProgress from 'react-native-circular-progress-indicator';

export default function Steps() {

  const [value, setValue] = useState(0);

  return (
    <View className='flex-1 items-center justify-start bg-[#fff] pt-10' >

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
        activeStrokeColor={'#97E700'}
        activeStrokeWidth={20}
        inActiveStrokeOpacity={0.2}
        inActiveStrokeWidth={25}
        duration={3000}
        onAnimationComplete={() => setValue(50)}
      />
      
      <View className='flex flex-row justify-evenly w-full mt-10' >

        <View className='' >
          <Text className='text-center text-2xl'>
            5,5 Km
          </Text>

          <Text className='text-center text-xl'>
           Total Kms
          </Text>
        </View>

        <View className='' >
          <Text className='text-center text-2xl'>
            7.268
          </Text>

          <Text className='text-center text-xl'>
           Total Steps
          </Text>
        </View>

        <View className='' >
          <Text className='text-center text-2xl '>
            01h:10m:45s
          </Text>

          <Text className='text-center text-xl'>
            Total time
          </Text>
        </View>  

      </View>

      <ScrollView style={{ flex: 1, width: '100%'}} className='mt-7'>
        <View className=''>

          <View className='gap-4'>

            <View className='flex flex-row justify-between bg-gray-100 py-2 px-2'>
              <Text className='text-xl'>
              1.000 Steps Challenge
              </Text>

              <Text className='text-xl '>
                Reward
              </Text>
            </View>

            <View className='flex flex-row justify-between bg-gray-100 py-2 px-2'>
              <Text className='text-xl'>
              3.000 Steps Challenge
              </Text>

              <Text className='text-xl '>
                Reward
              </Text>
            </View>

            <View className='flex flex-row justify-between bg-gray-100 py-2 px-2'>
              <Text className='text-xl'>
              10.000 Steps Challenge
              </Text>

              <Text className='text-xl '>
                
              </Text>
            </View>

            <View className='flex flex-row justify-between bg-gray-100 py-2 px-2'>
              <Text className='text-xl'>
              30.000 Steps Challenge
              </Text>

              <Text className='text-xl '>
                
              </Text>
            </View>

            <View className='flex flex-row justify-between bg-gray-100 py-2 px-2'>
              <Text className='text-xl'>
              50.000 Steps Challenge
              </Text>

              <Text className='text-xl '>
                
              </Text>
            </View>

            <View className='flex flex-row justify-between bg-gray-100 py-2 px-2'>
              <Text className='text-xl'>
              70.000 Steps Challenge
              </Text>

              <Text className='text-xl '>
                
              </Text>
            </View>

            <View className='flex flex-row justify-between bg-gray-100 py-2 px-2'>
              <Text className='text-xl'>
              100.000 Steps Challenge
              </Text>

              <Text className='text-xl '>
                
              </Text>
            </View>          

          </View>
          
        </View> 
      </ScrollView>


    </View>
  );
}


