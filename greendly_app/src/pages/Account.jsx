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
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
// import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
// import CountryFlag from "react-native-country-flag";
import CountryPicker from "react-native-country-picker-modal";
import { StatusBar } from "expo-status-bar";
// import { ActivityIndicator } from "react-native";
// import storage from '@react-native-firebase/storage';
import CustomText from "../components/CustomText";

export default function UserProfile() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    country: "Argentina",
    objective: "Reducir la huella de carbono en un 15% este año",
    tokensEarned: "1500",
    carbonFootprint: "Carbon footsprint",
    photoUrl: "https://via.placeholder.com/150",
    level: "5",
  });
  const [loading, setLoading] = useState(false);

  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [editableField, setEditableField] = useState("");
  const auth = getAuth();

  // Solicitar permisos de cámara y galería
  async function requestMediaLibraryPermissions() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera roll permissions to make this work!");
    }
  }

  useEffect(() => {
    const loadUserData = async () => {
      const storedUserInfo = await AsyncStorage.getItem("userInfo");
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
      }
      const mongoUserId = await AsyncStorage.getItem("@mongoUserId");
      if (mongoUserId) {
        setUserId(mongoUserId);
        const response = await axios.get(`${API_URL}/users/${mongoUserId}`);
        if (response.data) {
          setUserInfo((current) => ({ ...current, ...response.data }));
          setUserEmail(response.data.email.split("@")[0]);
        }
      }
    };
    async function requestMediaLibraryPermissions() {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Sorry, we need camera roll permissions to make this work!"
        );
      }
    }

    requestMediaLibraryPermissions();
    loadUserData();
  }, []);
  

  // Subir imagen de perfil
  const pickImage = async () => {
    // permisos par lanzar el selector de imágenes
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log('Result from Image Picker:', result);

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri; // Acceso correcto al URI
      const newUserInfo = { ...userInfo, photoUrl: uri };
      setUserInfo(newUserInfo);
      await AsyncStorage.setItem("userInfo", JSON.stringify(newUserInfo));
      console.log("Image URI set to: ", uri);
    } else {
      console.log("Image picker was cancelled or no image was selected");
    }
  };

  // Actualizar
  const handleUpdateProfile = async () => {
    if (!userId) {
      Alert.alert("Error", "No se pudo identificar al usuario");
      return;
    }
    const url = `${API_URL}/users/${userId}`;
    try {
      const response = await axios.put(url, userInfo);
      if (response.status === 200) {
        Alert.alert(
          "Perfil Actualizado",
          "Tu perfil ha sido actualizado con éxito."
        );
        await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
      } else {
        Alert.alert("Error", "No se pudo actualizar el perfil.");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar el perfil.");
    }
  };

  const updateUserInfo = async (field, value) => {
    const updatedInfo = { ...userInfo, [field]: value };
    console.log(`Updating ${field}: ${value}`);
    setUserInfo(updatedInfo);
    await AsyncStorage.setItem("userInfo", JSON.stringify(updatedInfo));
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
      source={{
        uri: "https://img.freepik.com/free-vector/colorful-abstract-background_53876-93088.jpg?size=338&ext=jpg&ga=GA1.1.553209589.1714089600&semt=ais",
      }}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <ScrollView className="flex-1 bg-transparent p-4 m-2">
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <View
            style={{
              position: "relative",
              height: 128,
              width: 128,
              borderRadius: 64,
              overflow: "hidden",
              backgroundColor: "#eee",
            }}
          >
            <Image
              source={{ uri: userInfo.photoUrl }}
              style={{ width: "100%", height: "100%" }}
              key={userInfo.photoUrl}
            />
            <View
              style={{
                position: "absolute",
                right: 10,
                bottom: 10,
                backgroundColor: "#fff",
                borderRadius: 10,
                padding: 5,
              }}
            >
              <TouchableOpacity onPress={pickImage}>
                <Icon name="edit" size={20} color="#4B5563" />
              </TouchableOpacity>
            </View>
          </View>
          <CustomText style={{ fontSize: 20, marginTop: 8 }}>
            {" "}
            Username:
            {userEmail}
          </CustomText>
          {/* Banderas */}
          <View style={{ alignItems: "center" }} className="m-2">
            <CountryPicker
              withFilter
              withCallingCode
              withCurrency
              onSelect={onSelectCountry}
              countryCode={userInfo.countryCode}
              withFlag
              withCountryNameButton
            />
            <StatusBar style="auto" />
          </View>
        </View>

        <View
          style={{ flexDirection: "row", alignItems: "center" }}
          className="m-2"
        >
          <CustomText
            style={{ fontSize: 20, marginRight: 10 }}
            className="mt-4"
          >
            Objective:
          </CustomText>
          <TouchableOpacity onPress={() => setEditableField("objective")}>
            <Icon name="edit" size={20} color="#4B5563" />
          </TouchableOpacity>
        </View>
        <TextInput
          className="mt-2 p-2 border border-gray-600 rounded"
          onChangeText={(text) => setUserInfo({ ...userInfo, objective: text })}
          value={
            editableField === "objective"
              ? userInfo.objective
              : userInfo.objective
          }
          placeholder="objective"
          editable={editableField === "objective"} 
        />

        <View
          style={{ flexDirection: "row", alignItems: "center" }}
          className="m-2"
        >
          <CustomText style={{ fontSize: 20, marginRight: 10 }}>
            Earned Tokens:
          </CustomText>
          <TouchableOpacity onPress={() => setEditableField("tokensEarned")}>
            <Icon name="edit" size={20} color="#4B5563" />
          </TouchableOpacity>
        </View>
        <TextInput
          className="mt-2 p-2 border border-gray-600 rounded"
          onChangeText={(text) =>
            setUserInfo({ ...userInfo, tokensEarned: parseInt(text) })
          }
          value={userInfo.tokensEarned ? userInfo.tokensEarned.toString() : ""}
          placeholder="Earned Tokens"
          editable={editableField === "tokensEarned"}
        />

        <View
          style={{ flexDirection: "row", alignItems: "center" }}
          className="m-2"
        >
          <CustomText style={{ fontSize: 20, marginRight: 10 }}>
            Carbon Footprint (CO2):
          </CustomText>
          <TouchableOpacity onPress={() => setEditableField("carbonFootprint")}>
            <Icon name="edit" size={20} color="#4B5563" />
          </TouchableOpacity>
        </View>
        <TextInput
          className="mt-2 p-2 border border-gray-600 rounded"
          onChangeText={(text) => {
            const num = parseFloat(text);
            if (!isNaN(num)) {
              setUserInfo({ ...userInfo, carbonFootprint: num });
            }
          }}
          value={
            userInfo.carbonFootprint !== undefined
              ? userInfo.carbonFootprint.toString()
              : ""
          }
          placeholder="Carbon Footprint"
          editable={editableField === "carbonFootprint"}
          keyboardType="numeric" 
        />

        {/* NFT level */}
        <View
          style={{ flexDirection: "row", alignItems: "center" }}
          className="m-2"
        >
          <CustomText style={{ fontSize: 20, marginRight: 10 }}>
            Level:
          </CustomText>
          <TouchableOpacity onPress={() => setEditableField("level")}>
            <Icon name="edit" size={20} color="#4B5563" />
          </TouchableOpacity>
        </View>
        <TextInput
          className="mt-2 p-2 mb-2 border border-gray-600 rounded"
          onChangeText={(text) => {
            const num = parseFloat(text);
            if (!isNaN(num)) {
              setUserInfo({ ...userInfo, level: num });
            }
          }}
          value={userInfo.level ? userInfo.level.toString() : ""}
          placeholder="level"
          editable={editableField === "level"} 
          keyboardType="numeric"
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
