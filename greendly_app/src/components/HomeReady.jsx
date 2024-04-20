import * as React from 'react';
import { Image, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeReady(props) {

  const { toggleInputs } = props;

  return (
    <View className="flex-1 bg-[#fff]" style={{ zIndex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      <View className="relative h-56 mt-2 mx-2 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
        <Image
          source={require("../../assets/Landing.jpg")}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      <View className="flex justify-center items-center top-44 p-6 absolute w-full">
        <TouchableOpacity onPress={toggleInputs} className="items-center">
          <LinearGradient
            className="px-10 py-7 m-4 rounded-full"
            colors={['#24B035', '#97E700']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text className="text-3xl text-center text-gray-950 font-semibold">
              I'm Ready!!     
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>         
     
    </View> 
  );
}