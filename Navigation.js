import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, Signup, Welcome, Welcome2, SignupEmpresa, Form, NotificationScreen, Home, Perfil, PerfilEmpresaScreen, Ajustes, HomeScreenEmpresa, AjustesEmpresa, PerfilEmpresa, NotificacionesEmpresa } from "./screens";
import COLORS from "./temas/colors";
import { firestore, auth } from "./firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { userId } from "./screens/Login";
import { idUsuario } from "./screens/Signup";
import { idEmpresa } from "./screens/SignupEmpresa";
import { View, Text, ActivityIndicator } from "react-native";

import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import React, { useEffect, useState } from "react";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function BottomTab() {
  const [privilegio, setPrivilegio] = useState("");
  const [loading, setLoading] = useState(true);
  const id = userId || idUsuario || idEmpresa;

  useEffect(() => {
    const obtenerPrivilegio = async () => {
      try {
        const docSnap = await getDoc(doc(firestore, "users", id));
        if (docSnap.exists()) {
          setPrivilegio(docSnap.data().privilegio);
        } else {
          console.log("El documento no existe.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener el documento:", error);
        setLoading(false);
      }
    };
    obtenerPrivilegio();
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4caf50" />
      </View>
    );
  }

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarActiveTintColor: "#4caf50",
      }}
    >
      {privilegio === "usuario" ? (
        <>
          <Tab.Screen
            name="Perfil"
            component={Perfil}
            options={{
              headerShown: false,
              tabBarLabel: "Perfil",
              tabBarIcon: ({}) => (
                <Ionicons name="person" size={24} color={COLORS.primary} />
              ),
            }}
          />
          <Tab.Screen
            name="HomeScreen"
            component={Home}
            options={{
              headerShown: false,
              tabBarLabel: "Home",
              tabBarIcon: ({}) => (
                <Ionicons name="home" size={24} color={COLORS.primary} />
              ),
            }}
          />
          <Tab.Screen
            name="Notificaciones"
            component={NotificationScreen}
            options={{
              headerShown: false,
              tabBarLabel: "Notificaciones",
              tabBarIcon: ({}) => (
                <Ionicons name="notifications" size={24} color={COLORS.primary} />
              ),
            }}
          />
          
        </>
      ) : null}
          <Tab.Screen
            name="Ajustes"
            component={Ajustes}
            options={{
              headerShown: false,
              tabBarLabel: "Ajustes",
              tabBarIcon: ({}) => (
                <Entypo name="cog" size={24} color={COLORS.primary} />
              ),
            }}
          />
      {privilegio === "empresa" ? (
        <>
          <Tab.Screen
            name="PerfilEmpresa"
            component={PerfilEmpresa}
            options={{
              headerShown: false,
              tabBarLabel: "Perfil",
              tabBarIcon: ({}) => (
                <Ionicons name="person" size={24} color={COLORS.primary} />
              ),
            }}
          />
          <Tab.Screen
            name="HomeScreenEmpresa"
            component={HomeScreenEmpresa}
            options={{
              headerShown: false,
              tabBarLabel: "Home",
              tabBarIcon: ({}) => (
                <Ionicons name="home" size={24} color={COLORS.primary} />
              ),
            }}
          />
          <Tab.Screen
            name="NotificacionesEmpresa"
            component={NotificacionesEmpresa}
            options={{
              headerShown: false,
              tabBarLabel: "Notificaciones",
              tabBarIcon: ({}) => (
                <Ionicons name="notifications" size={24} color={COLORS.primary} />
              ),
            }}
          />
          <Tab.Screen
            name="AjustesEmpresa"
            component={AjustesEmpresa}
            options={{
              headerShown: false,
              tabBarLabel: "Ajustes",
              tabBarIcon: ({}) => (
                <Entypo name="cog" size={24} color={COLORS.primary} />
              ),
            }}
          />
        </>
      ) : null}

    </Tab.Navigator>
  );
}


export function InitialStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Welcome2"
          component={Welcome2}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignupEmpresa"
          component={SignupEmpresa}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export const SignedInStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={BottomTab}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Form"
          component={Form}
          options={{
            headerShown: false,
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
            title: "Información",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
