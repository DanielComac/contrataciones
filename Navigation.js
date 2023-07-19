import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, Signup, Welcome, Welcome2, SignupEmpresa, Form, NotificationScreen, Home, Perfil, PerfilEmpresaScreen, Ajustes, HomeScreenEmpresa } from "./screens";
import COLORS from "./temas/colors";
import { firestore, auth } from "./firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { userId } from "./screens/Login";
import { idUsuario } from "./screens/Signup";
import { idEmpresa } from "./screens/SignupEmpresa";

import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import React, { useEffect, useState } from "react";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTab() {
  const [privilegio, setPrivilegio] = useState("");
  const id = userId || idUsuario || idEmpresa;
  

  useEffect(() => {
    const obtenerPrivilegio = async () => {
      try {
        const docSnap = await getDoc(doc(firestore, "users", id));
        if (docSnap.exists()) {
          // Establecer el estado con los datos del documento
          setPrivilegio(docSnap.data().privilegio);
        } else {
          // El documento no existe
          console.log("El documento no existe.");
        }
      } catch (error) {
        console.error("Error al obtener el documento:", error);
      }
    };
    obtenerPrivilegio(); // Llamar a la función para obtener el privilegio
    
    
    // No necesitas suscribirte a cambios ya que estás obteniendo solo un documento, no una colección
  }, [id]); // Asegúrate de agregar 'id' como dependencia si es necesario
  
  console.log(privilegio);
  
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
      ) : (
        console.log("No funciona")
      )}


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
      <Tab.Screen
      name="HomeScreenEmpresa"
      component={HomeScreenEmpresa}
      options={{
        headerShown: false,
      }}
    />
    ) : (
      console.log("No funciona")
    )}
        
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
