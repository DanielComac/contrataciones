import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import COLORS from '../temas/colors';

const ProfileScreen = () => {
  return (
    <ScrollView>
      <View style={{ flex: 1, backgroundColor: COLORS.back }}>
        <Text style={styles.headerTitle}>Mi perfil</Text>
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <View style={styles.profileContainer}>
              <Image
                source={require('../assets/persona1.jpg')}
                style={styles.profilePicture}
              />
              <Text style={styles.name}>Nombre del Aplicante</Text>
            </View>
              <Text style={styles.infoTitle}>Información personal:</Text>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="call" size={16} style={styles.infoIcon} />
              <Text style={styles.infoText}>Número de teléfono: 123456789</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="male" size={16} style={styles.infoIcon} />
              <Text style={styles.infoText}>Género: Masculino</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="calendar" size={16} style={styles.infoIcon} />
              <Text style={styles.infoText}>Edad: 25 años</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="home" size={16} style={styles.infoIcon} />
              <Text style={styles.infoText}>Ciudad de residencia: Ciudad X</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="pin" size={16} style={styles.infoIcon} />
              <Text style={styles.infoText}>Colonia: Colonia Y</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="location" size={16} style={styles.infoIcon} />
              <Text style={styles.infoText}>Código Postal: 12345</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="briefcase" size={16} style={styles.infoIcon} />
              <Text style={styles.infoText}>Puesto de trabajo deseado: Desarrollador Web</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="school" size={16} style={styles.infoIcon} />
              <Text style={styles.infoText}>Estudios y formación académica: Licenciatura en Informática</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="business" size={16} style={styles.infoIcon} />
              <Text style={styles.infoText}>Experiencia laboral: 5 años como Desarrollador Frontend</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="language" size={16} style={styles.infoIcon} />
              <Text style={styles.infoText}>Nivel de inglés: Avanzado</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="time" size={16} style={styles.infoIcon} />
              <Text style={styles.infoText}>Disponibilidad de horario: Tiempo completo</Text>
            </View>
            <View style={styles.infoDivider} />
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Editar información del perfil</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
    marginTop: '10%',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: '8%',
    marginLeft: 16,
    marginBottom: '5%',
  },
  infoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#C9C9C9',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 130,
    height: 130,
    borderRadius: 30,
    position: 'absolute',
    top: -80,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: "25%",
    textAlign: 'center',
    color: COLORS.primary
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: 10,
    color: COLORS.primary,
  },
  infoTitle: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center'
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  infoDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#C9C9C9',
    marginVertical: 5,
  },
  editButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 7,
    padding: 10,
    alignItems: 'center',
    marginTop: "10%",
  },
  editButtonText: {
    color: COLORS.white,
    fontSize: 18,
  },
});

export default ProfileScreen;
