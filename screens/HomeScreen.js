import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const HomeScreen = () => {
  const handleSearchJobs = () => {
    // Lógica para redirigir a la pantalla de búsqueda de empleo
    console.log('Redirigir a la pantalla de búsqueda de empleo');
  };

  const handleSavedJobs = () => {
    // Lógica para redirigir a la pantalla de empleos guardados
    console.log('Redirigir a la pantalla de empleos guardados');
  };

  const handleProfile = () => {
    // Lógica para redirigir a la pantalla de perfil de usuario
    console.log('Redirigir a la pantalla de perfil de usuario');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido a la app de búsqueda de trabajo!</Text>
      {/* <Image style={styles.image} source={require('../assets/jos_search_image.png')} /> */}
      <TouchableOpacity style={styles.button} onPress={handleSearchJobs}>
        <Text style={styles.buttonText}>Empleos Disponibles </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSavedJobs}>
        <Text style={styles.buttonText}>Empleos guardados</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleProfile}>
        <Text style={styles.buttonText}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4caf50',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 40,
    borderRadius: 100,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginBottom: 20,
    elevation: 3,
  },
  buttonText: {
    color: '#4caf50',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
