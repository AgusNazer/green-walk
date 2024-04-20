import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getAuth, signOut } from "firebase/auth";

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
      <Text style={styles.title}>Configuración</Text>
      
      <Text style={styles.sectionHeader}>Información de la Cuenta</Text>
      <Text style={styles.sectionContent}>{userEmail}</Text>
      
      <Text style={styles.sectionHeader}>Preferencias de Notificaciones</Text>
      <TouchableOpacity style={styles.buttonSmall}>
        <Text style={styles.buttonText}>Configurar Notificaciones</Text>
      </TouchableOpacity>
      
      <Text style={styles.sectionHeader}>Privacidad y Seguridad</Text>
      <TouchableOpacity style={styles.buttonSmall}>
        <Text style={styles.buttonText}>Gestionar Privacidad</Text>
      </TouchableOpacity>

      <Text style={styles.sectionHeader}>Acerca de Greenly</Text>
      <Text style={styles.sectionContent}>Versión 1.0.1 - Conectando tus pasos a un mundo mejor.</Text>
      
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
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
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  }
});

export default Settings;
