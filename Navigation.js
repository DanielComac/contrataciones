import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, Signup, Welcome, Welcome2, SignupEmpresa, Form, Notificaciones, Home, Perfil, } from "./screens";
import React from "react";
// import Home from "../screens/HomeScreen";
// import Notificaciones from "../screens/Notificaciones";

import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#4caf50',
      }}>

      <Tab.Screen
        name="HomeScreen"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ }) => (
            <Entypo name="home" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Notificaciones"
        component={Notificaciones}
        options={{
          headerShown: false,
          tabBarLabel: 'Notificaciones',
          tabBarIcon: ({ }) => (
            <Ionicons name="notifications" size={24} color="black" />
          ),
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          headerShown: false,
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ }) => (
            <Ionicons name="person" size={24} color="black" />),
        }}
      />


    </Tab.Navigator>
  )

}

function initialStack() {
  return (
    <Stack.Navigator
      initialRouteName='Welcome'
    >
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Welcome2"
        component={Welcome2}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Form"
        component={Form}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="SignupEmpresa"
        component={SignupEmpresa}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="Home"
        component={BottomTab}
        options={{
          headerShown: false
        }}
      />

    </Stack.Navigator>
  );
}

export function Navigation() {
  return (
    <NavigationContainer>
      {initialStack()}
    </NavigationContainer>
  );
}