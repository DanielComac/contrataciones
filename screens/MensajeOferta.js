import React, { useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import COLORS from '../temas/colors';

const MensajeOferta = ({ route, navigation }) => {
  const { mensaje } = route.params;
  const mensajeRef = useRef(null);

  const handleMensajeChange = (text) => {
    navigation.setParams({ mensaje: text });
  };

  const handleTouchablePress = () => {
    // Cerrar el teclado cuando se haga clic fuera del TextInput
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleTouchablePress}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Mensaje para el candidato:</Text>
        <Text style={styles.label}>A continuación redacta el mensaje que será enviado al candidato.</Text>
        <Text style={styles.label}>Nos tomamos la molestia de redactar este mensaje de ejemplo pero puedes editarlo completamnete de acuerdo a tus necesidades</Text>
        <ScrollView style={styles.mensajeContainer}>
          <TextInput
            ref={mensajeRef}
            style={styles.mensajeEditable}
            value={mensaje}
            onChangeText={handleMensajeChange}
            multiline
          />
        </ScrollView>
        <TouchableOpacity style={styles.botonEnviar} onPress={() => console.log('Mensaje enviado:', mensaje)}>
          <Text style={styles.textoBotonEnviar}>Enviar oferta de empleo</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 0,
    top: -15
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    top: -10
  },
  mensajeContainer: {
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 10,
    maxHeight: 450,
    padding: 10,
  },
  mensajeEditable: {
    flex: 1,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  botonEnviar: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    top: '1.5%',
  },
  textoBotonEnviar: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MensajeOferta;
