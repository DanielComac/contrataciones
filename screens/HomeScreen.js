import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable, TextInput } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";


import COLORS from '../temas/colors';
import Button from '../componentes/Button';


const HomeScreen = ({navigation}) => {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <LinearGradient
          style={{
          flex: 1
        }}
          colors={[COLORS.white, COLORS.white]}
      >
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: "0.5%",
          marginTop: "18%",
          borderRadius: 8,
          borderWidth: 1,
          borderColor: COLORS.black,
          marginLeft: "1.8%",
          marginRight: "1.8%",
        }}>
          <TextInput
            style={{
              flex: 1,
              height: 40,
              backgroundColor: COLORS.lightGray,
              borderRadius: 8,
              paddingHorizontal: 12,
              marginRight: 8,
              color: COLORS.black,
            }}
            placeholder="Buscar empleo"
            placeholderTextColor={COLORS.gray}
            // Agrega cualquier otra propiedad que necesites para el campo de búsqueda
          />
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              borderRadius: 8,
              paddingVertical: 8,
              paddingHorizontal: 12,
            }}
          >
            <Text style={{
              color: COLORS.white,
              fontWeight: 'bold',
            }}>Buscar</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default HomeScreen;
