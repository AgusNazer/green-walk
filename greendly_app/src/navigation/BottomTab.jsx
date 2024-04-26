import React from "react";
import Steps from "../pages/Steps";
import Blockchain from "../pages/Blockchain";
import Rewards from "../pages/Reward";
import Account from "../pages/Account";
import Home from "../pages/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Settings from "../pages/Settings";


const HomeStack = createNativeStackNavigator();

function MyStack() {
  return (
    <HomeStack.Navigator>

      <HomeStack.Screen
        name="Greendly"
        component={Home}
        options={({ navigation }) => ({
          headerTintColor: "black",
          headerTitleAlign: "center",
          headerTitleStyle: { fontWeight: "bold" },
          tabBarStyle: { backgroundColor: "#eeeeee" },
          headerRight: () => (
            <MaterialCommunityIcons
              name="account"
              size={28}
              color="black"
              style={{ marginRight: 5 }}
              sharedTransitionTag="tag"
              onPress={() => {
                navigation.navigate("Account");
              }}
              />
            ),
            headerLeft: () => (
            <Feather
            name="settings"
              size={22}
              color="black"
              style={{ marginLeft: 5 }}
              onPress={() => {                
                navigation.navigate("Settings");
              }}
              />
            ),
        })}
        />        

      <HomeStack.Screen
        name="Blockchain"
        component={Blockchain}
        options={{
          headerTintColor: "black",
          headerTitleAlign: "center",
          headerTitleStyle: { fontWeight: "bold" },
          headerBackTitle: 'atras',
          headerBackTitleStyle: { fontWeight: "bold", color: "blue"},
        }}
        />

      <HomeStack.Screen
        name="Account"
        component={Account}
        options={{
          headerTintColor: "black",
          headerTitleAlign: "center",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />

      <HomeStack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerTintColor: "black",
          headerTitleAlign: "center",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />

    </HomeStack.Navigator>
  )
}

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}
    >

      <Tab.Screen
        name="Home"
        component={MyStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home-circle" size={30} color={color} />
          ),         
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",          
          },
          tabBarStyle: { backgroundColor: "#eeeeee" },
        }}
      />

      <Tab.Screen
        name="Rewards"
        component={Rewards}
        options={{
          headerTintColor: "black",
          headerTitleAlign: "center",
          headerTitleStyle: { fontWeight: "bold" },
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="coins" size={22} color={color} />
          ),         
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",          
          },
          tabBarBadge: 2,
          tabBarBadgeStyle: { backgroundColor: "#7DC000"},
          tabBarStyle: { backgroundColor: "#eeeeee" },
        }}
      />

      <Tab.Screen
        name="Steps"
        component={Steps}
        options={{
          headerTintColor: "black",
          headerTitleAlign: "center",
          headerTitleStyle: { fontWeight: "bold" },
          tabBarStyle: { backgroundColor: "#eeeeee" },
          tabBarIcon: ({ color }) => (
            <Ionicons name="footsteps" size={24} color={color} />
          ),         
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",          
          },
        }}
      />

    </Tab.Navigator>
  );
}
