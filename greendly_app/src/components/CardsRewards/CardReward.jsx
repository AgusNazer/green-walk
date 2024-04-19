import React from 'react';
import { View, Text, Image, TouchableOpacity,Alert } from 'react-native';
import NativeWind from 'nativewind';

const Card = () => {
    const test = ()=>{
        Alert.alert("Hola")
    }
  return (
    <View className="relative flex-1 flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 ">
      <View className="relative h-56 mt-2 mx-4  overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
        <Image
          source={{uri: 'https://images.unsplash.com/photo-1477332552946-cfb384aeaf1c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>
      <View className="p-6">
        <Text className="block text-center mb-2 text-2xl antialiased leading-snug tracking-normal text-blue-gray-900">
        Tokens Earned
        </Text>
        <Text className="block text-xl font-semibold text-center antialiased  leading-relaxed text-inherit">
            250 Greens
        </Text>
      </View>
      <View className="p-6 pt-0">
        <TouchableOpacity onPress={test} className="align-middle w-full select-none font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">

          <Text className="text-xs text-center py-3 px-6 text-white">
            Claim Tokens
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Card;
