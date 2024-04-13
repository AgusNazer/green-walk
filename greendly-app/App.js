import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
// import Landing from "./src/pages/Landing";
// import NavBar from "./src/components/NavBar";
// import AboutUs from "./src/pages/AboutUs";
// import Account from "./src/pages/Account";
// import Blockchain from "./src/pages/Blockchain";
// import Rewards from "./src/pages/Reward";
// import "react-native-gesture-handler";
// import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "./src/navigation/BottomTab";

// const Menu = createDrawerNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      {/* <NavigationContainer>
        <Menu.Navigator>
          <Menu.Screen name="Start" options={{
            headerTitle: "Greendly",
            headerTintColor: 'black',
            headerTitleAlign: 'center',
            headerTitleStyle: {fontWeight: 'bold'},
            drawerLabel: "Start",
            drawerStyle: {backgroundColor: '#EEEEEE'},
            drawerContentContainerStyle: {backgroundColor: '#EEEEEE'},
            drawerActiveBackgroundColor: '#e0efff',
            drawerActiveTintColor: 'black',
          }}
          component={Landing} />
          <Menu.Screen name="About Us" component={AboutUs} />
          <Menu.Screen name="Account" component={Account} />
          <Menu.Screen name="Blockchain" component={Blockchain} />
          <Menu.Screen name="Rewards" component={Rewards} />
        </Menu.Navigator>
      </NavigationContainer> */}

      <NavigationContainer>
        <BottomTab />
      </NavigationContainer>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingTop: 45,
  },
});
