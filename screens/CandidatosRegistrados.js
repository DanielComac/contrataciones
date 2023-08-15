import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable, TextInput, ScrollView, Animated, Alert, BackHandler, Modal } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { firestore } from '../firebase-config';
import { collection, query, onSnapshot, where } from 'firebase/firestore';


import COLORS from '../temas/colors';

const CandidatosRegistrados = () => {

    const navigation = useNavigation();
    const [infoCandidatos, setInfoCandidatos] = useState([]);
    const [valorBusqueda, setValorBusqueda] = useState('');
    const [orden, setOrden] = useState('default');


    const ValidacionEmpresa = (empresa) => {
      // Navega a la pantalla de perfil del candidato y pasa el objeto candidato como parámetro
      navigation.navigate('ValidacionEmpresa', { empresa });
    };

    useEffect(() => {
        const collectionRef = collection(firestore, 'users');
        const q = query(collectionRef, where('privilegio', '==', 'usuario'));
    
        const unsuscribe = onSnapshot(q, (querySnapshop) => {
          setInfoCandidatos(
            querySnapshop.docs.map((doc) => ({
              id: doc.id,
              nombre: doc.data().nombre,
              numeroCelular: doc.data().numeroCelular,
              genero: doc.data().genero,
              ciudad: doc.data().ciudad,
              colonia: doc.data().colonia,
              codigoPostal: doc.data().codigoPostal,
              puestoTrabajo: doc.data().puestoTrabajo,
              estudios: doc.data().estudios,
              experiencia: doc.data().experiencia,
              ingles: doc.data().ingles,
              disponibilidad: doc.data().disponibilidad,
              campoTrabajo: doc.data().campoTrabajo,
              privilegio: doc.data().privilegio,
            }))
          );
        });
    
        return unsuscribe;
      }, []);

      const ordenarEmpresas = () => {
        let empresasOrdenadas = [...infoCandidatos];
    
        if (orden === 'A-Z') {
          empresasOrdenadas.sort((a, b) => a.nombre.localeCompare(b.nombre));
        } else if (orden === 'Z-A') {
          empresasOrdenadas.sort((a, b) => b.nombre.localeCompare(a.nombre));
        }
    
        return empresasOrdenadas;
      };
    
      const empresasOrdenadas = ordenarEmpresas();

      return (
        <ScrollView>
          <Text style={styles.titulo}>Candidatos registrados</Text>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar Candidatos"
            value={valorBusqueda}
            onChangeText={setValorBusqueda}
          />
        </View>
        <TouchableOpacity style={styles.searchBtn}>
          <Ionicons name="search-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <Text style={styles.empresas}>Todas los candidatos registrados</Text>
      <ScrollView
      horizontal
    >
      <View style={styles.ordenarContainer}>
        <Text style={styles.ordenarTexto}>Ordenar:</Text>
        <TouchableOpacity
          style={[
            styles.ordenarOpcion,
            orden === 'A-Z' && styles.ordenarOpcionSeleccionada
          ]}
          onPress={() => setOrden('A-Z')}
        >
          <Text
            style={[
              styles.ordenarTextoOpcion,
              orden === 'A-Z' && styles.ordenarTextoOpcionSeleccionada
            ]}
          >
            de la A - Z
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.ordenarOpcion,
            orden === 'Z-A' && styles.ordenarOpcionSeleccionada
          ]}
          onPress={() => setOrden('Z-A')}
        >
          <Text
            style={[
              styles.ordenarTextoOpcion,
              orden === 'Z-A' && styles.ordenarTextoOpcionSeleccionada
            ]}
          >
            de la Z - A
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.ordenarOpcion,
            orden === 'default' && styles.ordenarOpcionSeleccionada
          ]}
          onPress={() => setOrden('default')}
        >
          <Text
            style={[
              styles.ordenarTextoOpcion,
              orden === 'default' && styles.ordenarTextoOpcionSeleccionada
            ]}
          >
            Por defecto
          </Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
        <View style={styles.tarjetasContainer}>
        {ordenarEmpresas().map((dato) => {
        if (valorBusqueda.trim() === '' || dato.nombre.toLowerCase().includes(valorBusqueda.toLowerCase())) {
          return (
            <TouchableOpacity
              key={dato.id}
              style={styles.cartaEmpresa}
              onPress={() => ValidacionEmpresa(dato)}
            >
              <View style={styles.contenido}>
                <Image
                  source={require('../assets/personaejemplo.png')}
                  style={styles.imagenEmpresa}
                  resizeMode="cover"
                />
      
              <View>
                <Text style={styles.nombreEmpresa}>{dato.nombre}</Text>
                <Text style={styles.descripcionTituloPuesto}>Campo de desarrollo:</Text>
                <Text style={styles.descripcionPuesto}>{dato.puestoTrabajo}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        } else {
          return null;
        }
      })}
      </View>
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
    width: '100%',
    padding: 16,
    marginBottom: 10,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  contenido: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contenidoEmpresa: {
    flex: 1,
    marginLeft: 16,
  },
  nombreEmpresa: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: COLORS.black,
  },
  descripcionTituloPuesto: {
    fontSize: 14,
    color: COLORS.black,
    marginBottom: 4,
  },
  descripcionPuesto: {
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: 8,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.back,
  },
  imagenEmpresa: {
    width: 100,
    height: 100,
    borderRadius: 25,
    marginBottom: 8,
    alignSelf: 'center'
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
  empresas: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    color: COLORS.black,
  },
  ordenarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  ordenarTexto: {
    fontSize: 16,
    marginRight: 10,
  },
  ordenarOpcion: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginRight: 10,
  },
  ordenarOpcionSeleccionada: {
    backgroundColor: COLORS.primary,
  },
  ordenarTextoOpcionSeleccionada: {
    color: COLORS.white,
  },
  ordenarTextoOpcion: {
    color: COLORS.primary,
  },
});

export default CandidatosRegistrados;