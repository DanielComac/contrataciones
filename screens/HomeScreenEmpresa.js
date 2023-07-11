import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable, TextInput, ScrollView, Animated, Alert, BackHandler } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
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
  const [saludo, setSaludo] = useState('');

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

  useEffect(() => {
    // Obtiene la hora actual
    const currentHour = new Date().getHours();

    // Define el saludo según la hora actual
    if (currentHour < 12) {
      setSaludo('Buenos días');
    } else if (currentHour < 18) {
      setSaludo('Buenas tardes');
    } else {
      setSaludo('Buenas noches');
    }

  }, []);

  return (
    <ScrollView>
      <LinearGradient style={{ flex: 1 }} colors={[COLORS.back, COLORS.back]}>
        <Text style={styles.titulo}>Inicio</Text>
        <Text style={styles.saludo}>Hola, {saludo}</Text>

        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              placeholder='Buscar Candidatos'
            />
          </View>

          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons name="search-outline" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <Text style={styles.populares}>Candidatos</Text>

        <View style={styles.tarjetasContainer}>
          {infoEmpresa.map((dato) => (
            <View key={dato.id} style={styles.cartaEmpresa}>
              <Image
                source={require('../assets/persona1.jpg')}
                style={styles.imagenEmpresa}
                resizeMode='cover'
              />
              <Text style={styles.nombreEmpresa}>{dato.nombre}</Text>
              <Text style={styles.descripcionEmpresa}>{dato.descripcion}</Text>
              <Text style={styles.descripcionEmpresa}>{dato.correoElectronico}</Text>
              <Text style={styles.descripcionEmpresa}>{dato.telefono}</Text>
              <Text style={styles.descripcionEmpresa}>{dato.sitioWeb}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>
    </ScrollView>
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
  descripcionEmpresa: {
    fontSize: 17,
    color: COLORS.black,
    marginBottom: 8,
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
});

export default HomeScreenEmpresa;
