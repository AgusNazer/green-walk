import React, {useState, useEffect} from "react";
import { View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  ImageBackground, 
  Button,
  Alert,
  TextInput
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import axios from 'axios'

export default function UserProfile() {
  const [userInfo,setUserInfo] = useState({
    name: "",
    country: "",
    objective: "",
    tokensEarned: 1500,
    carbonFootprint: "0.5  de CO2",
    photoUrl: "https://via.placeholder.com/150"
  });

  const [userId, setUserId] = useState(null);

  const handleUpdateProfile = async () => {

    if (!userId) {
      Alert.alert("Error", "No se puedo identificar al usuario");
      return;
    }

    const url = `http://192.168.1.74:3002/users/profile/${userId}`;
    try {
      const response = await axios.put(url, {
        name: userInfo.name,
        country: userInfo.country,
        objective: userInfo.objective
      });
      Alert.alert("Perfil Actualizado", "Tu perfil ha sido actualizado con éxito.");
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo actualizar el perfil.");
    }
  };

  useEffect(() => {
    const loadUserInfo = async () => {
      const storedUserInfo = await AsyncStorage.getItem('userInfo');
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
      }
      const storedUserId = await AsyncStorage.getItem('userId');
      if (setUserId){
        setUserId(storedUserId);
      }
    };
    loadUserInfo();
  }, []);

  // const backgroundUrl = "https://media.istockphoto.com/id/1081470818/es/foto/verano-en-el-callej%C3%B3n-de-%C3%A1rboles-del-parque.jpg?s=612x612&w=0&k=20&c=9MGPP0f1X0uw3rJj1X2qkEEAdbAVjR1Jqms4pCROaO4=";

  return (
    // <ImageBackground source={{ uri: backgroundUrl }} className="flex-1">
    <ScrollView className="flex-1 bg-transparent p-4">
      <View className="items-center justify-center">
        <Image
          source={{ uri: userInfo.photoUrl }}
          className="w-32 h-32 rounded-full mb-4"
          style={{ width: 128, height: 128, borderRadius: 64 }}
        />
        <TouchableOpacity className="absolute right-0 top-0 m-2">
          <Icon name="edit" size={24} color="#4B5563" />
        </TouchableOpacity>
        <Text className="text-xl font-bold">{userInfo.name}</Text>
        <TouchableOpacity className="m-2">
          <Icon name="edit" size={20} color="#4B5563" />
        </TouchableOpacity>
        <Text className="text-sm text-gray-600">{userInfo.country}</Text>
      </View>
      <TextInput
        className="mt-2 p-2 border border-gray-300 rounded"
        onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
        value={userInfo.name}
      />
      <TextInput
        className="mt-2 p-2 border border-gray-300 rounded"
        onChangeText={(text) => setUserInfo({ ...userInfo, country: text })}
        value={userInfo.country}
      />
      <TextInput
        className="mt-2 p-2 border border-gray-300 rounded"
        onChangeText={(text) => setUserInfo({ ...userInfo, objective: text })}
        value={userInfo.objective}
        multiline
      />
      <Button
        title="Actualizar Perfil"
        color="#4B5563"
        onPress={handleUpdateProfile}
      />
    </ScrollView>
    // </ImageBackground>
  );
}