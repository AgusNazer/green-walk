import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTab from "./src/navigation/BottomTab";
import Login from "./src/pages/Login";

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
  
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Login" component={Login} options={{
           headerShown: false,
          }} />
          <Stack.Screen name="BottomTab" component={BottomTab} options={{
            headerShown: false,
          }}/>
        </Stack.Navigator>
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
  }
});
