import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, Signup, Welcome, Welcome2, SignupEmpresa, Form, NotificationScreen, Home, Perfil, PerfilEmpresaScreen, Ajustes } from "./screens";
import React from "react";
import COLORS from "./temas/colors";


import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarActiveTintColor: '#4caf50',
      }}>
        <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          headerShown: false,
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ }) => (
            <Ionicons name="person" size={24} color={COLORS.primary} />
          ),
        }}
      />
      <Tab.Screen
        name="HomeScreen"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ }) => (
            <Ionicons name="home" size={24} color={COLORS.primary} />
          ),
        }}
      />
      <Tab.Screen
        name="Notificaciones"
        component={NotificationScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Notificaciones',
          tabBarIcon: ({ }) => (
            <Ionicons name="notifications" size={24} color={COLORS.primary} />
          ),
        }}
      />
      <Tab.Screen
        name="Ajustes"
        component={Ajustes}
        options={{
          headerShown: false,
          tabBarLabel: 'Ajustes',
          tabBarIcon: ({ }) => (
            <Entypo name="cog" size={24} color={COLORS.primary} />
          ),
        }}
      />
      
    </Tab.Navigator>
  )
}

export function InitialStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Welcome'>
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
          name="SignupEmpresa"
          component={SignupEmpresa}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export const SignedInStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'>
        <Stack.Screen
          name="Home"
          component={BottomTab}
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
          name="Perfil"
          component={Perfil}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PerfilEmpresa"
          component={PerfilEmpresaScreen}
          options={{
            headerShown: true,
            title: 'Información'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
