import React from 'react';
import { View, Text, StyleSheet, Image, Linking, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import COLORS from '../temas/colors';

const PerfilEmpresaScreen = ({ route }) => {
  const { empresa } = route.params;

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
    <ScrollView>
    <View style={styles.container}>
      <Image source={empresa.foto} style={styles.imagenEmpresa} />
      <Text style={styles.nombreEmpresa}>{empresa.nombre}</Text>
      <Text style={styles.descripcionEmpresa}>{empresa.descripcion}</Text>
      <View style={styles.containerSeparacion}><View style={styles.separacion}></View></View>
      <Text style={styles.tituloContacto}>Información de Contacto</Text>
      <View style={styles.contactoContainer}>
        {empresa.contacto.map((contacto, index) => (
          <Text
            key={index}
            style={styles.contacto}
            onPress={() => handleContactoPress(contacto)}
          >
            <Ionicons name={getIconName(contacto.tipo)} size={24} color={COLORS.primary} />{' '}
            {contacto.valor}
          </Text>
        ))}
      </View>
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
  imagenEmpresa: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: "5%",
  },
  nombreEmpresa: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: "5%",
  },
  descripcionEmpresa: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  tituloContacto: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contactoContainer: {
    alignItems: 'center',
  },
  contacto: {
    fontSize: 16,
    marginBottom: 8,
    color: COLORS.primary,
    flexDirection: 'row',
  },
  separacion: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.grey,
    marginHorizontal: 10,
  },
  containerSeparacion: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: 15
  }
});

export default PerfilEmpresaScreen;
