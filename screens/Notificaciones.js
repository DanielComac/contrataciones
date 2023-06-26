import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, FlatList } from 'react-native';
import COLORS from '../temas/colors';

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Obtener las notificaciones
    const fetchNotifications = async () => {
      // Aquí va la llamada a API o acceder a los datos de notificaciones
      const data = [
        {
          id: 1,
          empresa: 'Empresa 1',
          imagen: require('../assets/empresa1.png'),
          mensaje: 'La empresa quiere contactarte',
        },
        {
          id: 2,
          empresa: 'Empresa 2',
          imagen: require('../assets/empresa1.jpg'),
          mensaje: 'La empresa quiere contactarte',
        },
      ];

      setNotifications(data);
    };

    fetchNotifications();
  }, []);

  const numNotifications = notifications.length;

  const renderItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Image source={item.imagen} style={styles.empresaImagen} />
      <View style={styles.empresaInfo}>
        <Text style={styles.empresaNombre}>{item.empresa}</Text>
        <Text style={styles.mensaje}>{item.mensaje}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.back }}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Notificaciones</Text>
        {numNotifications > 0 && (
          <View style={styles.notificacionesNuevasContainer}>
            <Text style={styles.notificacionesNuevasTexto}>
              Tienes {numNotifications} notificaciones nuevas
            </Text>
          </View>
        )}
      </View>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.notificacionesLista}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginLeft: 16,
  },
  notificacionesNuevasContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  notificacionesNuevasTexto: {
    fontSize: 14,
    color: '#666666',
  },
  notificacionesLista: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  empresaImagen: {
    width: 40,
    height: 40,
    borderRadius: 15,
    marginRight: 12,
  },
  empresaInfo: {
    flex: 1,
  },
  empresaNombre: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  mensaje: {
    fontSize: 14,
    color: '#666666',
  },
});

export default NotificationScreen;
