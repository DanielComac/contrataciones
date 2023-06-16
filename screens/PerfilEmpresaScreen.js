import React from 'react';
import { View, Text, StyleSheet, Image, Linking } from 'react-native';

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

  return (
    <View style={styles.container}>
      <Image source={empresa.foto} style={styles.imagenEmpresa} />
      <Text style={styles.nombreEmpresa}>{empresa.nombre}</Text>
      <Text style={styles.descripcionEmpresa}>{empresa.descripcion}</Text>
      <Text style={styles.tituloContacto}>Información de Contacto</Text>
      <View style={styles.contactoContainer}>
        {empresa.contacto.map((contacto, index) => (
          <Text
            key={index}
            style={styles.contacto}
            onPress={() => handleContactoPress(contacto)}
          >
            {contacto.etiqueta}: {contacto.valor}
          </Text>
        ))}
      </View>
    </View>
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
    marginBottom: 8,
  },
  nombreEmpresa: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descripcionEmpresa: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
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
  },
});

export default PerfilEmpresaScreen;
