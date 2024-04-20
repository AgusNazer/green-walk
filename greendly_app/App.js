import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTab from "./src/navigation/BottomTab";
import Login from "./src/pages/Login";
import { Text } from "react-native";
import Settings from "./src/pages/Settings";
import {useState, useEffect} from "react"
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';


const fetchFonts = () => {
  return Font.loadAsync({
    // 'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    // 'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    'jersey-25': require('./assets/fonts/Jersey25-Regular.ttf'),
  });
};



export default function App() {
  
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={console.warn}
      />
    );
  }

  const Stack = createStackNavigator();

  function MyStack() {
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ 
          // Aquí puedes establecer las opciones para la pantalla Settings
          // Por ejemplo, si quieres mostrar la cabecera:
          headerShown: true,
          title: 'Configuración' // Esto es opcional, puedes personalizar el título
        }}
      />
      </Stack.Navigator>
    );
  }

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <MyStack />
        <StatusBar style="auto" />
      </NavigationContainer>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingTop: 45,
  },
  fullScreen: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1, // Asegura que Landing esté encima de BottomTab
  },
});
