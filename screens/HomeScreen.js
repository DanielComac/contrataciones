import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable, TextInput, ScrollView } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';



import COLORS from '../temas/colors';
import Button from '../componentes/Button';


const HomeScreen = () => {
  const navigation = useNavigation();


  const handleEmpresaPress = (empresa) => {
    // Navegar a la pantalla de perfil de la empresa y pasar la información de la empresa seleccionada
    navigation.navigate('PerfilEmpresa', { empresa });
  };

  const empresaData = {
    foto: require('../assets/empresa1.png'),
    nombre: 'Empresa 1',
    descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    contacto: [
      { etiqueta: 'Teléfono', valor: '123-456-7890', tipo: 'telefono' },
      { etiqueta: 'Correo electrónico', valor: 'empresa1@ejemplo.com', tipo: 'email' },
      { etiqueta: 'Sitio web', valor: 'https://www.empresa1.com', tipo: 'sitioWeb' },
    ],
  };
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView>
      <LinearGradient
        style={{
          flex: 1
        }}
        colors={[COLORS.white, COLORS.white]}
      >
        <Text style={styles.titulo}>Inicio</Text>
        
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
        
        {/* Tarjetas de presentación de las empresas */}
        
        <View style={styles.contenedorCarta}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('PerfilEmpresa', { empresa: empresaData })
            }
          >
            {/* Tarjeta de presentación de la empresa 1 */}
            <View style={styles.cartaEmpresa}>
              {/* Imagen de la empresa */}
              <Image
                source={require('../assets/empresa1.png')}
                style={styles.imagenEmpresa}
              />
              {/* Nombre de la empresa */}
              <Text style={styles.nombreEmpresa}>Empresa 1</Text>
              {/* Descripción de la empresa */}
              <Text style={styles.descripcionEmpresa}>Descripción de la Empresa 1</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleEmpresaPress(empresaData)} // Pasa la información de la empresa seleccionada aquí
          >
            {/* Tarjeta de presentación de la empresa 2 */}
            <View style={styles.cartaEmpresa}>
              <Image
                source={require('../assets/empresa1.png')}
                style={styles.imagenEmpresa}
              />
              <Text style={styles.nombreEmpresa}>Empresa 2</Text>
              <Text style={styles.descripcionEmpresa}>Descripción de la Empresa 2</Text>
            </View>
            </TouchableOpacity>
        </View>
      </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginLeft: 16,
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.grey2,
    marginRight: "0%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    height: "100%",
    marginLeft: "2.5%"
  },
  searchInput: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 10,
  },
  searchBtn: {
    width: 48,
    height: 48,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: "1%",
    marginRight: "2%"
  },
  contenedorCarta: {
    marginTop: 16,
    paddingHorizontal: "2.5%",
  },
  cartaEmpresa: {
    backgroundColor: COLORS.back,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    padding: 16,
  },
  imagenEmpresa: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  nombreEmpresa: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descripcionEmpresa: {
    color: COLORS.black,
  },
});

export default HomeScreen;