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
                Descripción de la empresa
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabBoton, selectedTab === 'descripcionPuesto' && styles.tabBotonActivo]}
              onPress={() => setSelectedTab('descripcionPuesto')}
            >
              <Text style={[styles.tabTextoBoton, selectedTab === 'descripcionPuesto' && styles.tabTextoBotonActivo]}>
                Descripción del puesto
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
              <Text style={styles.ubicacionText}>Ubicación de la empresa:</Text>

              <View style={styles.mapContainer}>
                
                <MapView
                  style={styles.map}
                  initialRegion={empresa.ubicacion}
                >
                  <Marker coordinate={empresa.ubicacion} />
                </MapView>
              </View>
            </>
          ) : selectedTab === 'descripcionPuesto' ? (
            <View style={styles.infoContainer}>
              <Text style={styles.descripcionPuesto}>
                {/* {empresa.descripcionPuesto} */}
                Estimado [Nombre del Candidato],
                </Text>
                <Text style={styles.descripcionPuesto}>
                Espero que  te encuentres bien. Me complace informarte que, después de revisar tu perfil, hemos identificado que cumples con los requisitos necesarios para una oportunidad laboral en nuestra empresa.
                </Text>
                <Text style={styles.descripcionPuesto}>
                Estamos interesados en conocerte mejor y explorar la posibilidad de que te unas a nuestro equipo. Tu experiencia y habilidades son altamente valoradas y creemos que podrías aportar mucho a nuestro proyecto.
                </Text>
                <Text style={styles.descripcionPuesto}>
                A continuación, te brindo más detalles sobre la oferta de empleo:
                </Text>
                <Text style={styles.descripcionPuesto}>
                Nombre del puesto: [Nombre del Puesto]
Descripción: [Breve descripción de las responsabilidades y funciones del puesto]
Requisitos: [Menciona los requisitos clave que el candidato debe cumplir]
Ubicación: [Ubicación del empleo]
Tipo de contrato: [Indica si es contrato temporal, a tiempo completo, medio tiempo, etc.]
Expectativas salariales: [Indica las expectativas salariales o menciona que se discutirán durante el proceso de entrevista]
                </Text>
                <Text style={styles.descripcionPuesto}>

                </Text>
            </View>
          ) : (
            <View style={styles.infoContainer}>
              <Text style={styles.redesSocialesTitulo}>Contacto:</Text>
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
              
              <View style={styles.redesSocialesContainer}>
                <Text style={styles.redesSocialesTitulo}>Redes Sociales:</Text>
                <TouchableOpacity onPress={() => Linking.openURL(empresa.facebook)}>
                  <View style={styles.redSocialContainer}>
                    <Ionicons name="logo-facebook" size={24} color={COLORS.primary} />
                    <Text style={styles.redSocialText}>{empresa.nombre}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(empresa.whatsapp)}>
                  <View style={styles.redSocialContainer}>
                    <Ionicons name="logo-whatsapp" size={24} color={COLORS.primary} />
                    <Text style={styles.redSocialText}>{empresa.nombre}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(empresa.instagram)}>
                  <View style={styles.redSocialContainer}>
                    <Ionicons name="logo-instagram" size={24} color={COLORS.primary} />
                    <Text style={styles.redSocialText}>{empresa.nombre}</Text>
                  </View>
                </TouchableOpacity>
              </View>
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
    width: "100%"
  },
  descripcionEmpresa: {
    fontSize: 16,
  },
  descripcionPuesto: {
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
  redesSocialesContainer: {
    marginTop: "5%",
    alignItems: 'center'
  },
  redesSocialesTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  redSocialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  redSocialText: {
    marginLeft: 5,
    fontSize: 16,
    color: COLORS.secondary,
  },
  descripcionPuesto: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.black,
    marginTop: "4%"
  },
});

export default PerfilEmpresaScreen;
