import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import COLORS from '../temas/colors';
import { Picker } from '@react-native-picker/picker'

const ProfileScreen = () => {
  const [editMode, setEditMode] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('123456789');
  const [gender, setGender] = useState('Masculino');
  const [age, setAge] = useState('25 años');
  const [residenceCity, setResidenceCity] = useState('Ciudad X');
  const [neighborhood, setNeighborhood] = useState('Colonia Y');
  const [postalCode, setPostalCode] = useState('12345');
  const [desiredJobPosition, setDesiredJobPosition] = useState('Desarrollador Web');
  const [education, setEducation] = useState('Licenciatura en Informática');
  const [workExperience, setWorkExperience] = useState('5 años como Desarrollador Frontend');
  const [englishLevel, setEnglishLevel] = useState('Avanzado');
  const [availability, setAvailability] = useState('Tiempo completo');

  const handleEditPersonalInfo = () => {
    setEditMode(true);
  };

  const handleSavePersonalInfo = () => {
    setEditMode(false);
    // Agrega el código para guardar la información personal editada
  };

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
              {editMode ? (
                <TextInput
                  style={styles.infoTextInput}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                />
              ) : (
                <Text style={styles.infoText}>Número de teléfono: {phoneNumber}</Text>
              )}
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="male" size={16} style={styles.infoIcon} />
              {editMode ? (
                <Picker
                  style={styles.infoTextInput}
                  selectedValue={gender}
                  onValueChange={itemValue => setGender(itemValue)}
                >
                  <Picker.Item label="Masculino" value="Masculino" />
                  <Picker.Item label="Femenino" value="Femenino" />
                  <Picker.Item label="Otro" value="Otro" />
                </Picker>
              ) : (
                <Text style={styles.infoText}>Género: {gender}</Text>
              )}
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="calendar" size={16} style={styles.infoIcon} />
              {editMode ? (
                <TextInput style={styles.infoTextInput} value={age} onChangeText={setAge} />
              ) : (
                <Text style={styles.infoText}>Edad: {age}</Text>
              )}
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="home" size={16} style={styles.infoIcon} />
              {editMode ? (
                <TextInput
                  style={styles.infoTextInput}
                  value={residenceCity}
                  onChangeText={setResidenceCity}
                />
              ) : (
                <Text style={styles.infoText}>Ciudad de residencia: {residenceCity}</Text>
              )}
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="pin" size={16} style={styles.infoIcon} />
              {editMode ? (
                <TextInput
                  style={styles.infoTextInput}
                  value={neighborhood}
                  onChangeText={setNeighborhood}
                />
              ) : (
                <Text style={styles.infoText}>Colonia: {neighborhood}</Text>
              )}
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="location" size={16} style={styles.infoIcon} />
              {editMode ? (
                <TextInput
                  style={styles.infoTextInput}
                  value={postalCode}
                  onChangeText={setPostalCode}
                />
              ) : (
                <Text style={styles.infoText}>Código Postal: {postalCode}</Text>
              )}
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="briefcase" size={16} style={styles.infoIcon} />
              {editMode ? (
                <TextInput
                  style={styles.infoTextInput}
                  value={desiredJobPosition}
                  onChangeText={setDesiredJobPosition}
                />
              ) : (
                <Text style={styles.infoText}>Puesto de trabajo deseado: {desiredJobPosition}</Text>
              )}
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="school" size={16} style={styles.infoIcon} />
              {editMode ? (
                <TextInput style={styles.infoTextInput} value={education} onChangeText={setEducation} />
              ) : (
                <Text style={styles.infoText}>Estudios y formación académica: {education}</Text>
              )}
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="business" size={16} style={styles.infoIcon} />
              {editMode ? (
                <TextInput
                  style={styles.infoTextInput}
                  value={workExperience}
                  onChangeText={setWorkExperience}
                />
              ) : (
                <Text style={styles.infoText}>Experiencia laboral: {workExperience}</Text>
              )}
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="language" size={16} style={styles.infoIcon} />
              {editMode ? (
                <TextInput
                  style={styles.infoTextInput}
                  value={englishLevel}
                  onChangeText={setEnglishLevel}
                />
              ) : (
                <Text style={styles.infoText}>Nivel de inglés: {englishLevel}</Text>
              )}
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="time" size={16} style={styles.infoIcon} />
              {editMode ? (
                <TextInput
                  style={styles.infoTextInput}
                  value={availability}
                  onChangeText={setAvailability}
                />
              ) : (
                <Text style={styles.infoText}>Disponibilidad de horario: {availability}</Text>
              )}
            </View>
            <View style={styles.infoDivider} />
            {editMode ? (
              <TouchableOpacity style={styles.saveButton} onPress={handleSavePersonalInfo}>
                <Text style={styles.saveButtonText}>Guardar</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.editButton} onPress={handleEditPersonalInfo}>
                <Text style={styles.editButtonText}>Editar información del perfil</Text>
              </TouchableOpacity>
            )}
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
    marginTop: '25%',
    textAlign: 'center',
    color: COLORS.primary,
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
    textAlign: 'center',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    width: '100%'
  },
  infoDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#C9C9C9',
    marginVertical: 5,
  },
  infoTextInput: {
    flex: 1,
    fontSize: 16,
  },
  editButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 7,
    padding: 10,
    alignItems: 'center',
    marginTop: '10%',
  },
  editButtonText: {
    color: COLORS.white,
    fontSize: 18,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 7,
    padding: 10,
    alignItems: 'center',
    marginTop: '10%',
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 18,
  },
});

export default ProfileScreen;
