import React from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../temas/colors';
import { getAuth } from 'firebase/auth';

const Ajustes = ({ navigation }) => {

  const auth = getAuth()

  const handleCerrarSesion = async () => {

    try {
      Alert.alert(
        'Cerrar sesión',
        '¿Deseas cerrar sesión?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Aceptar',
            onPress: async () => {
              await auth.signOut()
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {

    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.back }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginBottom: 16 }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#E1E1E1',
            borderRadius: 7,
            paddingHorizontal: 22,
            paddingVertical: 10,
            width: 300
          }}
          onPress={handleCerrarSesion}
        >
          <Text style={{ color: COLORS.black }}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Ajustes;
