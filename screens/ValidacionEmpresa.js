import React from 'react';
import { firestore } from "../firebase-config";
import { setDoc, doc, addDoc, collection, onSnapshot, query, updateDoc } from "firebase/firestore";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../temas/colors';


const ValidacionEmpresa = ({route, navigation}) => {
    const empresa = route.params.empresa;

    const id = empresa.id    

const updatePriv = () => {
    // Lógica para guardar la información en la base de datos
     try {
        const refDoc = doc(firestore, 'users', id);
            updateDoc(refDoc, {
            privilegio: "empresa"
          });
        } catch (error) {
          console.log('Error al enviar la información', error);
        }
      };

    return (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            {/* Foto de perfil */}
            <Image
              source={require('../assets/empresa2.png')}
              style={styles.fotoPerfil}
              resizeMode="cover"
            />
            <Text style={styles.nombreCandidato}>{empresa.nombre}</Text>
          </View>
          {/* División */}
          <View style={styles.division} />
          <View style={styles.infoPersonalContainer}>
            <ItemConIcono icono="call-outline" texto={`Número de teléfono: ${empresa.numeroCelular}`} />
            <ItemConIcono icono="mail-outline" texto={`Correo electrónico: ${empresa.correo}`} />
            <ItemConIcono icono="business-outline" texto={`Campo de trabajo: ${empresa.campo}`} />

          </View>
          <View style={styles.infoTrabajoContainer}>
            <TouchableOpacity style={styles.enlacePDF} onPress={() => {}}>
            <Text style={styles.enlacePDFTexto}>Ver Documento PDF para comprobar validez de la empresa</Text>
          </TouchableOpacity>
          </View>
          <View style={styles.botonesContainer}>
            <TouchableOpacity style={styles.botonEnviar} onPress={updatePriv} >
              <Text style={styles.textoBotonEnviar}>Aceptar Empresa</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
      );
}

const ItemConIcono = ({ icono, texto }) => {
    return (
      <View style={styles.itemContainer}>
        <Ionicons name={icono} size={24} color="black" style={styles.icono} />
        <Text style={styles.textoItem}>{texto}</Text>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: '#fff',
      flexGrow: 1,
    },
    header: {
      alignItems: 'center',
      marginBottom: 20,
    },
    fotoPerfil: {
      width: 110,
      height: 110,
      borderRadius: 30,
    },
    nombreCandidato: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 10,
    },
    division: {
      height: 1,
      backgroundColor: 'gray',
      marginTop: 0,
      bottom: 10
    },
    infoPersonalContainer: {
      marginBottom: 20,
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 2,
    },
    infoTrabajoContainer: {
      marginBottom: 20,
      backgroundColor: '#fff',
      padding: 10,
      paddingRight: 50,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 2,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    icono: {
      marginRight: 10,
      color: COLORS.primary,
    },
    textoItem: {
      fontSize: 16,
    },
    botonEnviar: {
      backgroundColor: COLORS.primary,
      borderRadius: 10,
      paddingVertical: 15,
      paddingHorizontal: 30,
      alignItems: 'center',
      flexDirection: 'row',
      width: '100%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 2,
    },
    textoBotonEnviar: {
      color: '#fff',
      fontSize: 15,
      fontWeight: 'bold',
    },
  });

export default ValidacionEmpresa;  

