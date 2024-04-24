import React, { useState, useEffect } from "react";
import {
  View,
  Text,
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
import { API_URL } from '@env';
// import * as ImagePicker from "expo-image-picker;"

export default function UserProfile() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    country: "Argentina",
    objetivo: "Reducir la huella de carbono en un 15% este año",
    tokensEarned: "1500",
    carbonFootprint: "0.5 de CO2",
    photoUrl: "https://via.placeholder.com/150",
  });

  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState("")
  const [editableField, setEditableField] = useState("");
  const auth = getAuth();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid);
      setUserEmail(user.email.split('@')[0]);  
      AsyncStorage.setItem("userId", user.uid);
      console.log("Usuario cargado:", user.email);
      // Actualizar el estado con la información del usuario
      setUserInfo({
        ...userInfo,
        name: user.displayName || "",
        email: user.email || "",
        photoUrl: user.photoUrl || "https://via.placeholder.com/150",
      });
    }
  }, [auth]);

  const handleUpdateProfile = async () => {
    if (!userId) {
      Alert.alert("Error", "No se pudo identificar al usuario");
      return;
    }
  
    const url = `${API_URL}/users/profile/${userId}`;
    try {
      const response = await axios.put(url, userInfo);
      Alert.alert("Perfil Actualizado", "Tu perfil ha sido actualizado con éxito.");
      AsyncStorage.setItem("userInfo", JSON.stringify(userInfo)); // Asegúrate de actualizar también el AsyncStorage después de una actualización exitosa
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      Alert.alert("Error", "No se pudo actualizar el perfil.");
    }
  };

  // Subir imagen con expo picker image
  
  

  return (
    <ScrollView className="flex-1 bg-transparent p-4">
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
        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 8 }}> Username: 
          {userEmail}
        </Text>
        <Text style={{ fontSize: 14, color: "#666", marginTop: 4 }}>
          País: {userInfo.country}
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ marginRight: 10 }}>Objetivo:</Text>
        <TouchableOpacity onPress={() => setEditableField("objetivo")}>
          <Icon name="edit" size={20} color="#4B5563" />
        </TouchableOpacity>
      </View>
      <TextInput
        className="mt-2 p-2 border border-gray-300 rounded"
        onChangeText={(text) => setUserInfo({ ...userInfo, objetivo: text })}
        value={
          editableField === "objetivo" ? userInfo.objetivo : userInfo.objetivo
        }
        placeholder="Objetivo"
        editable={editableField === "objetivo"} // Hacer editable este campo basado en el estado
      />

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ marginRight: 10 }}>Tokens Ganados:</Text>
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
        placeholder="Tokens Ganados"
        editable={editableField === "tokensEarned"}
      />

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ marginRight: 10 }}>Huella de Carbono:</Text>
        <TouchableOpacity onPress={() => setEditableField("carbonFootprint")}>
          <Icon name="edit" size={20} color="#4B5563" />
        </TouchableOpacity>
      </View>
      <TextInput
        className="mt-2 p-2 border border-gray-300 rounded"
        onChangeText={(text) =>
          setUserInfo({ ...userInfo, carbonFootprint: text })
        }
        value={
          editableField === "carbonFootprint"
            ? userInfo.carbonFootprint
            : userInfo.carbonFootprint
        }
        placeholder="Huella de Carbono"
        editable={editableField === "carbonFootprint"}
      />

      <Button
        title="Actualizar Perfil"
        color="#3AA940"
        onPress={handleUpdateProfile}
      />
    </ScrollView>
  );
}
