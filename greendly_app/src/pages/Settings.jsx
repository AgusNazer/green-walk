import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import CustomText from '../components/CustomText';

const Settings = ({ navigation }) => {
  const auth = getAuth();
  const userEmail = auth.currentUser ? auth.currentUser.email : '';

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      Alert.alert("Sesión terminada", "Has cerrado sesión exitosamente.");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
      Alert.alert("Error al cerrar sesión", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>Configuración</CustomText>
      
      <CustomText style={styles.sectionHeader}>Información de la Cuenta</CustomText>
      <CustomText style={styles.sectionContent}>{userEmail}</CustomText>
      
      <CustomText style={styles.sectionHeader}>Preferencias de Notificaciones</CustomText>
      <TouchableOpacity style={styles.buttonSmall}>
        <CustomText style={styles.buttonCustomText}>Configurar Notificaciones</CustomText>
      </TouchableOpacity>
      
      <CustomText style={styles.sectionHeader}>Privacidad y Seguridad</CustomText>
      <TouchableOpacity style={styles.buttonSmall}>
        <CustomText style={styles.buttonCustomText}>Gestionar Privacidad</CustomText>
      </TouchableOpacity>

      <CustomText style={styles.sectionHeader}>Acerca de Greenly</CustomText>
      <CustomText style={styles.sectionContent}>Versión 1.0.1 - Conectando tus pasos a un mundo mejor.</CustomText>
      
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <CustomText style={styles.buttonCustomText}>Cerrar Sesión</CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  sectionContent: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#CB4335',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  buttonSmall: {
    backgroundColor: '#24BB78',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonCustomText: {
    color: '#ffffff',
    fontWeight: 'bold',
  }
});

export default Settings;
