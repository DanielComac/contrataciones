import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../temas/colors';

const PerfilCandidato = ({ route }) => {
  const candidato = route.params.candidato;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        {/* Foto de perfil */}
        <Image
          source={require('../assets/persona1.jpg')} // Cambia la ruta de la imagen por la del candidato
          style={styles.fotoPerfil}
          resizeMode="cover"
        />
        <Text style={styles.nombreCandidato}>{candidato.nombre}</Text>
      </View>
      {/* División */}
      <View style={styles.division} />
      <View style={styles.infoPersonalContainer}>
        <ItemConIcono icono="call-outline" texto={`Número de teléfono: ${candidato.numeroCelular}`} />
        <ItemConIcono icono="transgender-outline" texto={`Género: ${candidato.genero}`} />
        <ItemConIcono icono="location-outline" texto={`Ciudad: ${candidato.ciudad}`} />
        <ItemConIcono icono="home-outline" texto={`Colonia: ${candidato.colonia}`} />
        <ItemConIcono icono="map-outline" texto={`Código Postal: ${candidato.codigoPostal}`} />
      </View>
      {/* Contenedor de información de trabajo */}
      <View style={styles.infoTrabajoContainer}>
        <ItemConIcono icono="business-outline" texto={`Campo de trabajo: ${candidato.campoTrabajo}`} />
        <ItemConIcono icono="briefcase-outline" texto={`Puesto a aplicar: ${candidato.puestoTrabajo}`} />
        <ItemConIcono icono="school-outline" texto={`Estudios: ${candidato.estudios}`} />
        <ItemConIcono icono="briefcase-outline" texto={`Experiencia laboral (en general): ${candidato.experiencia}`} />
        <ItemConIcono icono="language-outline" texto={`Inglés: ${candidato.ingles}`} />
        <ItemConIcono icono="time-outline" texto={`Disponibilidad: ${candidato.disponibilidad}`} />
      </View>
      <View style={styles.botonesContainer}>
        <TouchableOpacity style={styles.botonGuardar}>
          <Ionicons name="bookmark-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonEnviar}>
          <Text style={styles.textoBotonEnviar}>Enviar oferta de empleo</Text>
        </TouchableOpacity>
        </View>
    </ScrollView>
  );
};

const ItemConIcono = ({ icono, texto }) => {
  return (
    <View style={styles.itemContainer}>
      <Ionicons name={icono} size={24} color="black" style={styles.icono} />
      <Text style={styles.textoItem}>{texto}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  fotoPerfil: {
    width: 110,
    height: 110,
    borderRadius: 30,
  },
  nombreCandidato: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  division: {
    height: 1,
    backgroundColor: 'gray',
    marginTop: 0,
    bottom: 10
  },
  infoPersonalContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  infoTrabajoContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    paddingRight: 50,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icono: {
    marginRight: 10,
    color: COLORS.primary,
  },
  textoItem: {
    fontSize: 16,
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  botonEnviar: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    flexDirection: 'row',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  textoBotonEnviar: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  botonGuardar: {
    backgroundColor: COLORS.primary,
    width: 55,
    height: 55,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PerfilCandidato;
