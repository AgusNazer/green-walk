import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Landing from "./pages/Landing";
import NavBar from "./src/components/NavBar";
import AboutUs from "./pages/AboutUs";
import Account from "./pages/Account";
import Blockchain from "./pages/Blockchain";
import Rewards from "./pages/Reward";
import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

const Menu = createDrawerNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Menu.Navigator>
          <Menu.Screen name="Start" options={{
            headerTitle: "Greendly",
            headerTintColor: 'black',
            headerTitleAlign: 'center',
            headerTitleStyle: {fontWeight: 'bold'},
            drawerLabel: "Start",
            drawerStyle: {backgroundColor: '#EEEEEE'},
            drawerContentContainerStyle: {backgroundColor: '#EEEEEE'},
            drawerActiveBackgroundColor: '#D5F2FD',
            drawerActiveTintColor: 'black',
          }}
          component={Landing} />
          <Menu.Screen name="About Us" component={AboutUs} />
          <Menu.Screen name="Account" component={Account} />
          <Menu.Screen name="Blockchain" component={Blockchain} />
          <Menu.Screen name="Rewards" component={Rewards} />
        </Menu.Navigator>
      </NavigationContainer>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff879",
    paddingTop: 45,
  },
});
