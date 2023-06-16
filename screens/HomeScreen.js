import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable, TextInput, ScrollView } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";


import COLORS from '../temas/colors';
import Button from '../componentes/Button';


const HomeScreen = ({navigation}) => {

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
        
        <View style={styles.barraBusqueda}>
          <TextInput
            style={styles.inputBuscar}
            placeholder="Buscar empresa"
            placeholderTextColor={COLORS.gray}
          />
          <TouchableOpacity
            style={styles.botonBuscar}
            // onPress={BuscarEmpresa}
          >
            <Text style={styles.textoBotonBuscar}>Buscar</Text>
          </TouchableOpacity>
        </View>
        
        {/* Tarjetas de presentación de las empresas */}
        <View style={styles.contenedorCarta}>
          {/* Tarjeta de presentación de la empresa 1 */}
          <View style={styles.cartaEmpresa}>
            {/* Imagen de la empresa */}
            <Image
              source={require('../assets/empresa1.jpeg')}
              style={styles.imagenEmpresa}
            />
            {/* Nombre de la empresa */}
            <Text style={styles.nombreEmpresa}>Empresa 1</Text>
            {/* Descripción de la empresa */}
            <Text style={styles.descripcionEmpresa}>Descripción de la Empresa 1</Text>
          </View>

          {/* Tarjeta de presentación de la empresa 2 */}
          <View style={styles.cartaEmpresa}>
            <Image
              source={require('../assets/empresa1.jpeg')}
              style={styles.imagenEmpresa}
            />
            <Text style={styles.nombreEmpresa}>Empresa 2</Text>
            <Text style={styles.descripcionEmpresa}>Descripción de la Empresa 2</Text>
          </View>
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
  barraBusqueda: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: "1%",
    marginTop: "5%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.black,
    marginLeft: "2.5%",
    marginRight: "2.5%",
  },
  inputBuscar: {
    flex: 1,
    height: 40,
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    color: COLORS.black,
  },
  botonBuscar: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  textoBotonBuscar: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  contenedorCarta: {
    marginTop: 16,
    paddingHorizontal: "2.5%",
  },
  cartaEmpresa: {
    backgroundColor: COLORS.white,
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
    color: COLORS.gray,
  },
});

export default HomeScreen;