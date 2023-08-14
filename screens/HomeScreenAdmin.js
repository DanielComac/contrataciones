import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable, TextInput, ScrollView, Animated, Alert, BackHandler, Modal } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { firestore } from '../firebase-config';
import { collection, query, onSnapshot, where } from 'firebase/firestore';


import COLORS from '../temas/colors';

const HomeScreenAdmin = () => {

    const navigation = useNavigation();
    const [infoEmpresa, setInfoEmpresa] = useState([]);

    const ValidacionEmpresa = (empresa) => {
      // Navega a la pantalla de perfil del candidato y pasa el objeto candidato como parámetro
      navigation.navigate('ValidacionEmpresa', { empresa });
    };

    useEffect(() => {
        const collectionRef = collection(firestore, 'users');
        const q = query(collectionRef, where('privilegio', '==', ''));
    
        const unsuscribe = onSnapshot(q, (querySnapshop) => {
          setInfoEmpresa(
            querySnapshop.docs.map((doc) => ({
              id: doc.id,
              nombre: doc.data().nombreEmpresa,
              numeroCelular: doc.data().numeroCelularEmpresa,
              correo: doc.data().correo,
              siitioWeb: doc.data().sitioWeb,
              descripcion: doc.data().descripcionEmpresa,
              campo: doc.data().campoDesarrollo,
            }))
          );
        });
    
        return unsuscribe;
      }, []);


      return (
        <View style={styles.tarjetasContainer}>
          <Text style={styles.populares}>Empresas No Aceptadas</Text>
          {infoEmpresa.map((dato) => (
            <TouchableOpacity
              key={dato.id}
              style={styles.cartaEmpresa}
              onPress={() => ValidacionEmpresa(dato)}
            >
              <Image
                // key={dato.idUrl}
                source={require('../assets/persona1.jpg')}
                style={styles.imagenEmpresa}
                resizeMode="cover"
              />
      
              <View>
                <Text style={styles.nombreEmpresa}>{dato.nombre}</Text>
                <Text style={styles.descripcionTituloPuesto}>Campo de desarrollo:</Text>
                <Text style={styles.descripcionPuesto}>{dato.campo}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
  tarjetasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  cartaEmpresa: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    width: '48%',
    padding: 16,
    marginBottom: 10,
  },
  nombreEmpresa: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
    alignSelf: 'center'
  },
  descripcionTituloPuesto: {
    fontSize: 13,
    color: COLORS.black,
    marginBottom: 8,
    alignSelf: 'center'
  },
  descripcionPuesto: {
    fontSize: 13,
    color: COLORS.primary,
    marginBottom: 8,
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.back,
  },
  saludo: {
    fontSize: 25,
    marginLeft: 16,
    marginTop: "1%",
    color: COLORS.primary,
  },
  searchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: '0%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    height: '100%',
    marginLeft: '2.5%',
  },
  searchInput: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
  },
  searchBtn: {
    width: 48,
    height: 48,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '2%',
    marginRight: '2%',
  },
  imagenEmpresa: {
    width: 100,
    height: 100,
    borderRadius: 25,
    marginBottom: 8,
    alignSelf: 'center'
  },
  filtrosContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  filtrosBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  filtrosText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  filtrosLista: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 16,
  },
  filtroOption: {
    paddingVertical: 8,
    marginBottom: 8,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  filtroOption2: {
    paddingVertical: 8,
    marginBottom: 8,
    borderRadius: 8,
    paddingHorizontal: 30,
  },
  filtroOptionSelected: {
    backgroundColor: COLORS.primary,
  },
  filtroText: {
    fontSize: 16,
    color: COLORS.black,
  },
  filtroTextSelected: {
    color: COLORS.white,
  },
  filtrosCategoria: {
    fontWeight: 'bold',
    marginBottom: 10
  }
});

export default HomeScreenAdmin;