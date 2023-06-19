import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Linking, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

import COLORS from '../temas/colors';

const PerfilEmpresaScreen = ({ route }) => {
  const { empresa } = route.params;
  const [selectedTab, setSelectedTab] = useState('descripcion');

  const handleContactoPress = (contacto) => {
    // Manejar la acción según el tipo de contacto (teléfono, correo electrónico, sitio web)
    if (contacto.tipo === 'telefono') {
      // Abrir la aplicación de teléfono con el número de teléfono seleccionado
      Linking.openURL(`tel:${contacto.valor}`);
    } else if (contacto.tipo === 'email') {
      // Abrir la aplicación de correo electrónico con la dirección de correo electrónico seleccionada
      Linking.openURL(`mailto:${contacto.valor}`);
    } else if (contacto.tipo === 'sitioWeb') {
      // Abrir el sitio web en el navegador
      Linking.openURL(contacto.valor);
    }
  };

  const getIconName = (tipo) => {
    switch (tipo) {
      case 'telefono':
        return 'call';
      case 'email':
        return 'mail';
      case 'sitioWeb':
        return 'globe';
      default:
        return 'help';
    }
  };

  // Ubicación
  const ubicacionManual = {
    latitude: 24.031152,
    longitude: -104.659892,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  empresa.ubicacion = ubicacionManual;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.back }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={empresa.foto} style={styles.imagenEmpresa} />
          </View>
          <Text style={styles.nombreEmpresa}>{empresa.nombre}</Text>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tabBoton, selectedTab === 'descripcion' && styles.tabBotonActivo]}
              onPress={() => setSelectedTab('descripcion')}
            >
              <Text style={[styles.tabTextoBoton, selectedTab === 'descripcion' && styles.tabTextoBotonActivo]}>
                Descripción
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabBoton, selectedTab === 'contacto' && styles.tabBotonActivo]}
              onPress={() => setSelectedTab('contacto')}
            >
              <Text style={[styles.tabTextoBoton, selectedTab === 'contacto' && styles.tabTextoBotonActivo]}>
                Información de Contacto
              </Text>
            </TouchableOpacity>
          </View>
          {selectedTab === 'descripcion' ? (
            <>
              <View style={styles.infoContainer}>
                <Text style={styles.descripcionEmpresa}>{empresa.descripcion}</Text>
              </View>
              <Text style={styles.ubicacionText}>Ubicación:</Text>

              <View style={styles.mapContainer}>
                
                <MapView
                  style={styles.map}
                  initialRegion={empresa.ubicacion}
                >
                  <Marker coordinate={empresa.ubicacion} />
                </MapView>
              </View>
            </>
          ) : (
            <View style={styles.infoContainer}>
              {empresa.contacto.map((contacto, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.contacto}
                  onPress={() => handleContactoPress(contacto)}
                >
                  <Ionicons name={getIconName(contacto.tipo)} size={18} color={COLORS.primary} />
                  <Text style={styles.contactoText}>{contacto.valor}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  imageContainer: {
    marginBottom: '3%',
  },
  imagenEmpresa: {
    width: 110,
    height: 110,
    borderRadius: 30,
  },
  nombreEmpresa: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: '5%',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: '5%',
  },
  tabBoton: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  tabBotonActivo: {
    backgroundColor: COLORS.primary,
  },
  tabTextoBoton: {
    textAlign: 'center',
    color: COLORS.black,
    fontSize: 15,
  },
  tabTextoBotonActivo: {
    color: COLORS.white,
  },
  infoContainer: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  descripcionEmpresa: {
    fontSize: 16,
  },
  contacto: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactoText: {
    marginLeft: 5,
    fontSize: 16,
    color: COLORS.secondary,
  },
  mapContainer: {
    width: '100%',
    height: 150,
    borderRadius: 20,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  ubicacionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default PerfilEmpresaScreen;
