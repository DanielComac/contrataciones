import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Image } from 'react-native';

const NotificationCounter = ({ count }) => {
  return (
    <View style={styles.counterContainer}>
      <Text style={styles.counterText}>{count}</Text>
    </View>
  );
};

const NotificationScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [selectedCompany, setSelectedCompany] = useState({
    name: null,
    // logo: require('./assets/persona2.jpg'), // Ruta de la imagen del logo por defecto
  });
  const [notificationCount, setNotificationCount] = useState(4);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleNotificationPress = (company) => {
    setSelectedCompany({
      name: company.name,
      // logo: require('./assets/persona1.jpg'), // Ruta de la imagen del logo de la empresa A
    });
  };

  const handleMoreInfoPress = () => {
    if (selectedCompany.name) {
      console.log(`Mostrar más información de la empresa: ${selectedCompany.name}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificaciones</Text>
      <NotificationCounter count={notificationCount} />
      <Animated.View style={[styles.notification, { opacity: fadeAnim }]}>
        <Text style={styles.notificationText}>Bienvenido aqui se mostrará cuando empresa esté interesada</Text>
      </Animated.View>
      <Animated.View style={[styles.notification, { opacity: fadeAnim, delay: 200 }]}>
        <Text style={styles.notificationText}>Tu solicitud ha sido aceptada</Text>
      </Animated.View>
      <Animated.View style={[styles.notification, { opacity: fadeAnim, delay: 400 }]}>
        <Text style={styles.notificationText}>Se ha actualizado tu perfil</Text>
      </Animated.View>
      <Animated.View style={[styles.notification, { opacity: fadeAnim, delay: 600 }]}>
        <Text style={styles.notificationText}>Esta empresa le interesó tu perfil:</Text>
        <TouchableOpacity onPress={() => handleNotificationPress({ name: 'Empresa A', position: 'Desarrollador Web', location: 'Ciudad X' })}>
          <View style={styles.companyContainer}>
            <Image source={selectedCompany.logo} style={styles.logo} />
            <Text style={styles.notificationText}>Empresa A</Text>
          </View>
        </TouchableOpacity>
        {selectedCompany.name === 'Empresa A' && (
          <TouchableOpacity onPress={handleMoreInfoPress}>
            <Text style={styles.moreInfoText}>Saber más</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
      <Animated.View style={[styles.notification, { opacity: fadeAnim, delay: 800 }]}>
        <Text style={styles.notificationText}>Esta empresa le interesó tu perfil:</Text>
        <TouchableOpacity onPress={() => handleNotificationPress({ name: 'Empresa B', position: 'Diseñador Gráfico', location: 'Ciudad Y' })}>
          <View style={styles.companyContainer}>
            <Image source={selectedCompany.logo} style={styles.logo} />
            <Text style={styles.notificationText}>Empresa B</Text>
          </View>
        </TouchableOpacity>
        {selectedCompany.name === 'Empresa B' && (
          <TouchableOpacity onPress={handleMoreInfoPress}>
            <Text style={styles.moreInfoText}>Saber más</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8e6',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  notification: {
    backgroundColor: '#d4edda',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  notificationText: {
    color: '#155724',
    fontSize: 16,
  },
  moreInfoText: {
    color: '#155724',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  companyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  counterContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'red',
    borderRadius: 50,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  counterText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default NotificationScreen;
