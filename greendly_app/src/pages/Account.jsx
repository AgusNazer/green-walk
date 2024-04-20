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
  const [editableField, setEditableField] = useState(""); // Estado para controlar el campo editable
  const auth = getAuth();
  const userEmail = auth.currentUser ? auth.currentUser.email : '';

  const handleUpdateProfile = async () => {
    if (!userId) {
      Alert.alert("Error", "No se pudo identificar al usuario");
      return;
    }

    const url =
      "http://192.168.1.74:3002/users/profile/661496802cde996cc19493c8";
    try {
      const response = await axios.put(url, userInfo);

      // Actualizar el estado con la información modificada por el usuario
      setUserInfo((prevState) => ({
        ...prevState,
        name: response.data.name,
        country: response.data.country,
        objetivo: response.data.objetivo,
        tokensEarned: response.data.tokensEarned,
        carbonFootprint: response.data.carbonFootprint,
      }));

      // Guardar el nuevo userInfo en AsyncStorage
      await AsyncStorage.setItem("userInfo", JSON.stringify(response.data));

      Alert.alert(
        "Perfil Actualizado",
        "Tu perfil ha sido actualizado con éxito."
      );
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar el perfil.");
    }
  };

  useEffect(() => {
    const loadUserInfo = async () => {
      const storedUserInfo = await AsyncStorage.getItem("userInfo");
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
      }
      const storedUserId = await AsyncStorage.getItem("userId");
      if (setUserId) {
        setUserId(storedUserId);
      }
    };
    loadUserInfo();
  }, []);

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
        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 8 }}>
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
