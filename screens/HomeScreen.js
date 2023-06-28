import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable, TextInput, ScrollView, Animated } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import Form from './Form'; // Importa la pantalla de formulario


import COLORS from '../temas/colors';
import Button from '../componentes/Button';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [saludo, setSaludo] = useState('');
  // const [mostrarFormulario, setMostrarFormulario] = useState(false);
  // const [animacion] = useState(new Animated.Value(0));

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

    // Mostrar el formulario después de 5 segundos
    // const timer = setTimeout(() => {
    //   setMostrarFormulario(true);
    // }, 3000);

    // // Iniciar la animación
    // Animated.timing(animacion, {
    //   toValue: 1,
    //   duration: 900,
    //   useNativeDriver: true,
    // }).start();

    // return () => clearTimeout(timer);
  }, []);

  // const translateY = animacion.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [500, 0],
  // });

  // Renderizar el formulario si mostrarFormulario es verdadero
  // if (mostrarFormulario) {
  //   return (
  //     <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
  //       <Form />
  //     </Animated.View>
  //   );
  // }

  // const handleEmpresaPress = (empresa) => {
  //   navigation.navigate('PerfilEmpresa', { empresa });
  // };

  // const empresaData = {
  //   foto: require('../assets/empresa1.jpg'),
  //   nombre: 'Empresa 1',
  //   descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  //   contacto: [
  //     { etiqueta: 'Teléfono', valor: '123-456-7890', tipo: 'telefono' },
  //     { etiqueta: 'Correo electrónico', valor: 'empresa1@ejemplo.com', tipo: 'email' },
  //     { etiqueta: 'Sitio web', valor: 'https://www.empresa1.com', tipo: 'sitioWeb' },
  //   ],
  // };

  return (
      <ScrollView>
        <LinearGradient
          style={{ flex: 1 }}
          colors={[COLORS.back, COLORS.back]}
        >
          <Text style={styles.titulo}>Inicio</Text>

          {/* Mostrar el mensaje de saludo */}
          <Text style={styles.saludo}>Hola, {saludo}</Text>

          <View style={styles.searchContainer}>
            <View style={styles.searchWrapper}>
              <TextInput
                style={styles.searchInput}
                placeholder='Buscar Empresas'
              />
            </View>

            <TouchableOpacity style={styles.searchBtn}>
              <Ionicons name="search-outline" size={24} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          {/* Sección de "Empresas populares" */}
          <Text style={styles.populares}>Empresas populares</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            {/* Tarjeta de presentación de la empresa 1 */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PerfilEmpresa', { empresa: empresaData })
              }
            >
              <View style={styles.cartaEmpresa}>
                <Image
                  source={require('../assets/empresa1.jpg')}
                  style={styles.imagenEmpresa}
                />
                <Text style={styles.nombreEmpresa}>Empresa 1</Text>
                <Text style={styles.descripcionEmpresa}>
                  Descripción de la Empresa 1
                </Text>
                <TouchableOpacity style={styles.corazonBtn}>
                  <Ionicons name="heart-outline" size={24} color={COLORS.black} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            {/* Tarjeta de presentación de la empresa 2 */}
            <TouchableOpacity
              onPress={() => handleEmpresaPress(empresaData)}
            >
              <View style={styles.cartaEmpresa}>
                <Image
                  source={require('../assets/empresa1.png')}
                  style={styles.imagenEmpresa}
                />
                <Text style={styles.nombreEmpresa}>Empresa 2</Text>
                <Text style={styles.descripcionEmpresa}>
                  Descripción de la Empresa 2
                </Text>
                <TouchableOpacity style={styles.corazonBtn}>
                  <Ionicons name="heart-outline" size={24} color={COLORS.black} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </ScrollView>
          {/* Sección de "Empresas populares" */}
          <Text style={styles.populares}>Empresas cerca de ti</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            {/* Tarjeta de presentación de la empresa 1 */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PerfilEmpresa', { empresa: empresaData })
              }
            >
              <View style={styles.cartaEmpresa}>
                <Image
                  source={require('../assets/empresa1.jpg')}
                  style={styles.imagenEmpresa}
                />
                <Text style={styles.nombreEmpresa}>Empresa 1</Text>
                <Text style={styles.descripcionEmpresa}>
                  Descripción de la Empresa 1
                </Text>
                <TouchableOpacity style={styles.corazonBtn}>
                  <Ionicons name="heart-outline" size={24} color={COLORS.black} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            {/* Tarjeta de presentación de la empresa 2 */}
            <TouchableOpacity
              onPress={() => handleEmpresaPress(empresaData)}
            >
              <View style={styles.cartaEmpresa}>
                <Image
                  source={require('../assets/empresa1.png')}
                  style={styles.imagenEmpresa}
                />
                <Text style={styles.nombreEmpresa}>Empresa 2</Text>
                <Text style={styles.descripcionEmpresa}>
                  Descripción de la Empresa 2
                </Text>
                <TouchableOpacity style={styles.corazonBtn}>
                  <Ionicons name="heart-outline" size={24} color={COLORS.black} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </LinearGradient>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: "13%",
    marginLeft: 16,
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
    marginRight: 16,
    width: 250,
    padding: 16,
  },
  imagenEmpresa: {
    width: 65,
    height: 65,
    borderRadius: 15,
    marginBottom: 15,
  },
  nombreEmpresa: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descripcionEmpresa: {
    fontSize: 14,
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

export default HomeScreen;
