import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import { Auth, getAuth } from "firebase/auth";
import { API_URL } from "@env";
// import * as ImagePicker from "expo-image-picker;"
import RNPickerSelect from "react-native-picker-select";
// import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
// import CountryFlag from "react-native-country-flag";
import CountryPicker from "react-native-country-picker-modal";
import { StatusBar } from "expo-status-bar";

export default function UserProfile() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    country: "Argentina",
    objective: "Reducir la huella de carbono en un 15% este año",
    tokensEarned: "1500",
    carbonFootprint: "Carbon footsprint",
    photoUrl: "https://via.placeholder.com/150",
  });

  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [editableField, setEditableField] = useState("");
  const auth = getAuth();

  // Define countryFlags
  // const countryFlags = {
  //   Argentina: "flag-ar",
  //   Brasil: "flag-br",
  //   Chile: "flag-cl",
  // };

  useEffect(() => {
    const loadUserData = async () => {
      const storedUserInfo = await AsyncStorage.getItem('userInfo');
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
      }
      const mongoUserId = await AsyncStorage.getItem('@mongoUserId');
      if (mongoUserId) {
        setUserId(mongoUserId);
        const response = await axios.get(`${API_URL}/users/${mongoUserId}`);
        if (response.data) {
          setUserInfo(current => ({ ...current, ...response.data }));
          setUserEmail(response.data.email.split("@")[0]);
        }
      }
    };
    loadUserData();
  }, []);

  const handleUpdateProfile = async () => {
    if (!userId) {
      Alert.alert("Error", "No se pudo identificar al usuario");
      return;
    }
    const url = `${API_URL}/users/${userId}`;
    try {
      const response = await axios.put(url, userInfo);
      if (response.status === 200) {
        Alert.alert("Perfil Actualizado", "Tu perfil ha sido actualizado con éxito.");
        await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
      } else {
        Alert.alert("Error", "No se pudo actualizar el perfil.");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar el perfil.");
    }
  };

  const updateUserInfo = async (field, value) => {
    const updatedInfo = { ...userInfo, [field]: value };    console.log(`Updating ${field}: ${value}`)
    setUserInfo(updatedInfo);
    await AsyncStorage.setItem('userInfo', JSON.stringify(updatedInfo));

  };

  // Función para manejar la selección del país
  const onSelectCountry = (country) => {
    setUserInfo({
      ...userInfo,
      country: country.name,
      countryCode: country.cca2,
    });
  };

  // Subir imagen con expo picker image

  // Funcionalidad de flags

  return (
    <ImageBackground 
    source={{ uri: "https://tu-url-de-imagen.com/imagen.jpg" }} // Coloca aquí la URL de tu imagen de fondo
    style={{ flex: 1 }}
    resizeMode="cover" // Puedes cambiar esto a "contain" si prefieres
  >
    <ScrollView className="flex-1 bg-transparent p-4 m-2">
      <View style={{ alignItems: "center" }}>
        <View style={{ position: "relative" }}>
          <Image
            source={{ uri: userInfo.photoUrl }}
            style={{ width: 128, height: 128, borderRadius: 64 }}
          />
          <View style={{ position: "absolute", right: 10, bottom: 10 }}>
            <View
              style={{ backgroundColor: "#fff", borderRadius: 10, padding: 5 }}
            >
              <TouchableOpacity onPress={() => setEditableField("2")}>
                <Icon name="edit" size={20} color="#4B5563" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text style={{ fontSize: 20, fontWeight: "", marginTop: 8 }}>
          {" "}
          Username:
          {userEmail}
        </Text>
        {/* Banderas */}
        <View style={{ alignItems: "center" }}>
          <CountryPicker
            withFilter
            withCallingCode
            withCurrency
            onSelect={onSelectCountry}
            countryCode={userInfo.countryCode}
            withFlag
            withCountryNameButton
          />
          {/* {userInfo.countryCode && (
            <Text style={{ fontSize: 30 }}>
              {countryToFlag(userInfo.countryCode)}
            </Text>
          )} */}
          <StatusBar style="auto" />
        </View>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }} className='m-2'>
        <Text style={{ marginRight: 10 }}>Objective:</Text>
        <TouchableOpacity onPress={() => setEditableField("objective")}>
          <Icon name="edit" size={20} color="#4B5563" />
        </TouchableOpacity>
      </View>
      <TextInput
        className="mt-2 p-2 border border-gray-300 rounded"
        onChangeText={(text) => setUserInfo({ ...userInfo, objective: text })}
        value={
          editableField === "objective" ? userInfo.objective : userInfo.objective
        }
        placeholder="objective"
        editable={editableField === "objective"} // Hacer editable este campo basado en el estado
      />

      <View style={{ flexDirection: "row", alignItems: "center" }} className='m-2'>
        <Text style={{ marginRight: 10 }}>Earned Tokens:</Text>
        <TouchableOpacity onPress={() => setEditableField("tokensEarned")}>
          <Icon name="edit" size={20} color="#4B5563" />
        </TouchableOpacity>
      </View>
      <TextInput
        className="mt-2 p-2 border border-gray-300 rounded"
        onChangeText={(text) =>
          setUserInfo({ ...userInfo, tokensEarned: text })
        }
        value={
          editableField === "tokensEarned"
            ? userInfo.tokensEarned
            : userInfo.tokensEarned
        }
        placeholder="Earned Tokens"
        editable={editableField === "Earned Tokens"}
      />

      <View style={{ flexDirection: "row", alignItems: "center" }} className='m-2'>
        <Text style={{ marginRight: 10 }}>Carbon footsprint (CO2):</Text>
        <TouchableOpacity onPress={() => setEditableField("carbonFootprint")}>
          <Icon name="edit" size={20} color="#4B5563" />
        </TouchableOpacity>
      </View>
      <TextInput
        className="mt-2 mb-8 p-2 border border-gray-300 rounded"
        onChangeText={(text) =>
          setUserInfo({ ...userInfo, carbonFootprint: text })
        }
        value={
          editableField === "carbonFootprint"
            ? userInfo.carbonFootprint
            : userInfo.carbonFootprint
        }
        placeholder="Carbon footsprint"
        editable={editableField === "carbonFootprint"}
      />

      <Button
        title="Actualizar Perfil"
        color="#3AA940"
        onPress={handleUpdateProfile}
      />
    </ScrollView>
  </ImageBackground>
  );
}
// Función para convertir código de país a emoji de bandera
function countryToFlag(isoCode) {
  return typeof String.fromCodePoint !== "undefined"
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char) =>
          String.fromCodePoint(char.charCodeAt(0) + 127397)
        )
    : isoCode;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  countryLabel: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});
