import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* <Image
        source={require('./assets/profile_picture.png')}
        style={styles.profilePicture}
      /> */}
      <Text style={styles.name}>Nombre del Aplicante</Text>
      <Text style={styles.position}>Desarrollador Web</Text>
      <Text style={styles.location}>Ciudad X</Text>
      <Text style={styles.bio}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod
        magna eu pharetra elementum. Vivamus dapibus purus nec libero ultrices
        cursus. Nulla facilisi.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  position: {
    fontSize: 18,
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
    marginBottom: 20,
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ProfileScreen;
