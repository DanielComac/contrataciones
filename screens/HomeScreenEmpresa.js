import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable, TextInput, ScrollView, Animated, Alert, BackHandler } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { firestore } from '../firebase-config';
import { collection, query, onSnapshot } from 'firebase/firestore';

import COLORS from '../temas/colors';
import Button from '../componentes/Button';

const HomeScreenEmpresa = () => {
 const navigation = useNavigation();
  const [mostrarFormulario, setMostrarFormulario] = useState(null);
  const [animacion] = useState(new Animated.Value(0));
  


  const [infoEmpresa, setInfoEmpresa] = useState([])

  useEffect(() => {
    const collectionRef = collection(firestore, 'empresa');
    const q = query(collectionRef)

    const unsuscribe = onSnapshot(q, querySnapshop => {
      setInfoEmpresa(
        querySnapshop.docs.map(doc => ({
          id: doc.id,
          nombre: doc.data().nombre,
          descripcion: doc.data().descripcion,
          correoElectronico: doc.data().correoElectronico,
          sitioWeb: doc.data().sitioWeb,
          telefono: doc.data().telefono 
        }))
      )
    })
    return unsuscribe;
  },[])

  console.log(infoEmpresa)


  return (
 
        <LinearGradient
          style={{ flex: 1 }}
          colors={[COLORS.back, COLORS.back]}
        >
          <Text style={styles.titulo}>Inicio</Text>

        
          <Text style={styles.populares}>Candidatos</Text>


             {infoEmpresa.map((dato) => (
            <View key={dato.id} style={styles.cartaEmpresa}>

            <Text style={styles.nombreEmpresa}>{dato.nombre}</Text>
            <Text style={styles.descripcionEmpresa}>{dato.descripcion}</Text>
            <Text style={styles.descripcionEmpresa}>{dato.correoElectronico}</Text>
            <Text style={styles.descripcionEmpresa}>{dato.telefono}</Text>
            <Text style={styles.descripcionEmpresa}>{dato.sitioWeb}</Text>

          </View>
            ))}

        </LinearGradient>

  );
};

const styles = StyleSheet.create({
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: "8%",
    marginLeft: 16,
  },
  
  populares: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: "5%",
    marginLeft: "5%",
    marginBottom: "5%"
  },
  scrollContainer: {
    paddingHorizontal: '2.5%',
    paddingBottom: 16,
  },
  cartaEmpresa: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    width: 360,
    padding: 16,
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 10
    
  },
  imagenEmpresa: {
    width: 65,
    height: 65,
    borderRadius: 15,
    marginBottom: 15,
  },
  nombreEmpresa: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descripcionEmpresa: {
    fontSize: 17,
    color: COLORS.black,
    marginBottom: 8,
  },
  corazonBtn: {
    position: 'absolute',
    top: "10%",
    right: "5%",
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.back,
  },

});

export default HomeScreenEmpresa;