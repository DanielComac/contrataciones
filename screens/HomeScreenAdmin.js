import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { firestore } from '../firebase-config';
import { collection, query, onSnapshot, where } from 'firebase/firestore';

import COLORS from '../temas/colors';

const HomeScreenAdmin = () => {
  const navigation = useNavigation();
  const [infoEmpresa, setInfoEmpresa] = useState([]);
  const [numUsuariosRegistrados, setNumUsuariosRegistrados] = useState(0);
  const [numEmpresasRegistradas, setNumEmpresasRegistradas] = useState(0);
  const [numUsuariosSinPrivilegio, setNumUsuariosSinPrivilegio] = useState(0);

  const ValidacionEmpresa = (empresa) => {
    // Navega a la pantalla de validación de empresa y pasa el objeto empresa como parámetro
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

  useEffect(() => {
    const collectionRef = collection(firestore, 'users');
    
    const usuariosRegistradosQuery = query(collectionRef, where('privilegio', '==', 'usuario'));
    const unsuscribeUsuarios = onSnapshot(usuariosRegistradosQuery, (querySnapshot) => {
      setNumUsuariosRegistrados(querySnapshot.size);
    });

    const empresasRegistradasQuery = query(collectionRef, where('privilegio', '==', 'empresa'));
    const unsuscribeEmpresas = onSnapshot(empresasRegistradasQuery, (querySnapshot) => {
      setNumEmpresasRegistradas(querySnapshot.size);
    });

    const usuariosSinPrivilegioQuery = query(collectionRef, where('privilegio', '==', ''));
    const unsuscribeUsuariosSinPrivilegio = onSnapshot(usuariosSinPrivilegioQuery, (querySnapshot) => {
      setNumUsuariosSinPrivilegio(querySnapshot.size);
    });

    return () => {
      unsuscribeUsuarios();
      unsuscribeEmpresas();
      unsuscribeUsuariosSinPrivilegio();
    };
  }, []);

  const [saludo, setSaludo] = useState('');

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
      <LinearGradient
        style={{ flex: 1 }}
        colors={[COLORS.back, COLORS.back]}
      >
        <Text style={styles.titulo}>Aceptar empresas</Text>
        <Text style={styles.saludo}>Hola, {saludo}</Text>

        <View style={styles.contenedoresContainer}>
          <View style={styles.contenedor}>
            <Ionicons name="people-outline" size={30} color={COLORS.primary} style={styles.iconoContenedor} />
            <Text style={styles.numeroContenedor}>{numUsuariosRegistrados}</Text>
            <Text style={styles.textoContenedor}>Usuarios registrados</Text>
          </View>
          <View style={styles.contenedor}>
            <Ionicons name="business-outline" size={30} color={COLORS.primary} style={styles.iconoContenedor} />
            <Text style={styles.numeroContenedor}>{numEmpresasRegistradas}</Text>
            <Text style={styles.textoContenedor}>Empresas registradas</Text>
          </View>
          <View style={styles.contenedor}>
            <Ionicons name="alert-circle-outline" size={30} color={COLORS.primary} style={styles.iconoContenedor} />
            <Text style={styles.numeroContenedor}>{numUsuariosSinPrivilegio}</Text>
            <Text style={styles.textoContenedor}>Empresas pendientes</Text>
          </View>
        </View>

        <Text style={styles.empresasPorAceptar}>Empresas por aceptar</Text>

        <View style={styles.tarjetasContainer}>
          {infoEmpresa.map((dato) => (
            <TouchableOpacity
              key={dato.id}
              style={styles.cartaEmpresa}
              onPress={() => ValidacionEmpresa(dato)}
            >
              <View style={styles.contenido}>
                <Image
                  source={require('../assets/empresa2.png')}
                  style={styles.imagenEmpresa}
                  resizeMode="cover"
                />
                <View style={styles.contenidoEmpresa}>
                  <Text style={styles.nombreEmpresa}>{dato.nombre}</Text>
                  <Text style={styles.descripcionTituloPuesto}>Campo de desarrollo:</Text>
                  <Text style={styles.descripcionPuesto}>{dato.campo}</Text>
                </View>
              </View>
            </TouchableOpacity>
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
    marginBottom: 20,
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
  saludo: {
    fontSize: 25,
    marginLeft: 16,
    marginTop: "1%",
    color: COLORS.primary,
  },
  imagenEmpresa: {
    width: 100,
    height: 100,
    borderRadius: 25,
  },
  contenedoresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  contenedor: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    width: '30%',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconoContenedor: {
    marginBottom: 8,
  },
  numeroContenedor: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: COLORS.primary,
  },
  textoContenedor: {
    fontSize: 12,
    color: COLORS.black,
    textAlign: 'center',
  },
  empresasPorAceptar: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    color: COLORS.black,
  },
});

export default HomeScreenAdmin;