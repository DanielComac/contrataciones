import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable, TextInput, ScrollView, Animated, Alert, BackHandler, Modal } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth} from 'firebase/auth';

import COLORS from '../temas/colors';

const EmpresasEspera = () => {
    const auth = getAuth();

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
                  await auth.signOut();
                },
              },
            ],
            { cancelable: false }
          );
        } catch (error) {
          console.log('Error al cerrar sesión:', error);
        }
      };

    return(
        <View style={styles.container}>
            <Text style={styles.aviso}>
                Estamos validando la información que proporcionaste, espera a ser aceptado en la aplicación
            </Text>

            <View style={styles.cerrarSesionContainer}>
                 <TouchableOpacity
                     style={styles.botonLogout}
                    onPress={handleCerrarSesion}
                >
             <Text style={styles.textoBotonLogout}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>   
        </View>

        
    )

}

const styles = StyleSheet.create({
    aviso: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20, 
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      cerrarSesionContainer: {
        marginTop: 20, 
        width: '100%', 
        alignItems: 'center',
      },
      botonLogout: {
        backgroundColor: '#E1E1E1',
        borderRadius: 7,
        paddingHorizontal: 22,
        paddingVertical: 10,
        width: '100%', 
        alignItems: 'center',
      },
      textoBotonLogout: {
        color: COLORS.black,
      },

});

export default EmpresasEspera;