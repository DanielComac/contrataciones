import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import COLORS from '../temas/colors';
import { Picker } from '@react-native-picker/picker'
import { firestore } from "../firebase-config";
import { setDoc, doc, addDoc, collection, onSnapshot, query, updateDoc } from "firebase/firestore";
import { auth } from '../firebase-config';
import { userId } from './Login.js'

const ProfileScreen = () => {
  const [editMode, setEditMode] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedNombre, setSelectedNombre] = useState('');
  const [selectedGenero, setSelectedGenero] = useState('');
  const [selectedCiudad, setSelectedCiudad] = useState('');
  const [selectedColonia, setSelectedColonia] = useState('');
  const [selectedCP, setSelectedCP] = useState('');
  const [selectedEdad, setSelectedEdad] = useState('');
  const [selectedTrabajo, setSelectedTrabajo] = useState('');
  const [selectedEducacion, setSelectedEducacion] = useState('');
  const [selectedExperiencia, setSelectedExperiencia] = useState('');
  const [selectedIngles, setSelectedIngles] = useState('');
  const [selectedDisponibilidad, setSelectedDisponibilidad] = useState('');


  const [infoUsuario, setInfoUsuario] = useState([]); // Inicializar como array vacío

useEffect(() => {
  const id = userId;
  const collectionRef = collection(firestore, 'users');
  const q = doc(collectionRef, id);

  const unsubscribe = onSnapshot(q, (doc) => {
    if (doc.exists()) {
      // Convertir los datos en un array y luego establecer el estado
      setInfoUsuario([
        {
          id: doc.id,
          nombre: doc.data().nombre,
          numeroCelular: doc.data().numeroCelular,
          genero: doc.data().genero,
          edad: doc.data().edad,
          ciudad: doc.data().ciudad,
          colonia: doc.data().colonia,
          codigoPostal: doc.data().codigoPostal,
          puestoTrabajo: doc.data().puestoTrabajo,
          estudios: doc.data().estudios,
          experiencia: doc.data().experiencia,
          ingles: doc.data().ingles,
          disponibilidad: doc.data().disponibilidad,
          categoria: doc.data().categoria,
        },
      ]);
    } else {
      // El documento no existe
      console.log('El documento no existe.');
    }
  });

  return unsubscribe;
}, []);

  console.log(infoUsuario)

    const onSend = () => {
      try{
        let id = userId;
        const refDoc = doc(firestore, 'users', id)
        updateDoc(refDoc, {
          nombre: selectedNombre,
          numeroCelular: phoneNumber,
          genero: selectedGenero,
          edad: selectedEdad,
          ciudad: selectedCiudad,
          colonia: selectedColonia,
          codigoPostal: selectedCP,
          puestoTrabajo: selectedTrabajo,
          estudios: selectedEducacion,
          experiencia: selectedExperiencia,
          ingles: selectedIngles,
          disponibilidad: selectedDisponibilidad

        })
  
        setEditMode(false);

      } catch (error) {
        console.log('Error al enviar la información', error)

      }
      
    }
    
  
  const handleEditPersonalInfo = () => {
    setEditMode(true);
  };

  const handleSavePersonalInfo = () => {
    setEditMode(false);
    setSelectedGenero(selectedGenero)
    // Agrega el código para guardar la información personal editada
  };

  // Ciclo para las opciones de seleccion de edad
  const renderOptions = () => {
    const options = [];
    for (let i = 18; i <= 100; i++) {
      options.push(<Picker.Item key={i} label={i.toString()} value={i.toString()} />);
    }
    return options;
  };

  return (
    
    <ScrollView>
      {infoUsuario.map((dato) => (  
        <View key={dato.id} style={{ flex: 1, backgroundColor: COLORS.back }}>
        <Text style={styles.headerTitle}>Mi perfil</Text>
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <View style={styles.profileContainer}>
              <Image
                source={require('../assets/persona1.jpg')}
                style={styles.profilePicture}
              />
              <Text style={styles.name}>{dato.nombre}</Text>
            </View>
            <Text style={styles.infoTitle}>Información personal:</Text>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
            <Ionicons name="person-circle" size={16} style={styles.infoIcon} />
              {editMode ? (
                <TextInput
                  placeholder= "Escribe tu nombre"
                  style={styles.infoTextInput1}
                  value={selectedNombre}
                  onChangeText={setSelectedNombre}
                />
              ) : (
                <Text style={styles.infoText}>Nombre: {dato.nombre} </Text>
              )}
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="call" size={16} style={styles.infoIcon} />
              {editMode ? (
                <TextInput
                  placeholder= "Escribe tu numero de telefono"
                  style={styles.infoTextInput1}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                />
              ) : (
                <Text style={styles.infoText}>Número de teléfono: {dato.numeroCelular} </Text>
              )}
            </View>

{/* ---------------------------------------------------------------------------------------- */}

            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="male" size={16} style={styles.infoIcon} />
              {editMode ? (
                <Picker
                  style={styles.infoTextInput}
                  selectedValue={selectedGenero}
                  onValueChange={itemValue => setSelectedGenero(itemValue)}
                >

                  <Picker.Item label="--" value="--" />
                  <Picker.Item label="Masculino" value="Masculino" />
                  <Picker.Item label="Femenino" value="Femenino" />
                  <Picker.Item label="Prefiero no decir" value="Prefiero no decir" />
                  <Picker.Item label="Otro" value="Otro" />
                </Picker>
              ) : (
                <Text style={styles.infoText}>Género: {dato.genero}</Text>
              )}
            </View>

{/* ---------------------------------------------------------------------------------------- */}

            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="calendar" size={16} style={styles.infoIcon} />
              {editMode ? (
                <Picker
                style={styles.infoTextInput}
                selectedValue={selectedEdad}
                onValueChange={(itemValue, itemIndex) => setSelectedEdad(itemValue)}
                >
                <Picker.Item label="--" value="--" />
                {renderOptions()}
                </Picker>
              ) : (
                <Text style={styles.infoText}>Edad: {dato.edad}</Text>
              )}
            </View>

{/* ---------------------------------------------------------------------------------------- */}

            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="home" size={16} style={styles.infoIcon} />
              {editMode ? (
                <Picker
                style={styles.infoTextInput}
                selectedValue={selectedCiudad}
                onValueChange={(itemValue, itemIndex) => setSelectedCiudad(itemValue)}
                >
                <Picker.Item label="Victoria de Durango" value="Victoria de Durango"/>
                </Picker>
              ) : (
                <Text style={styles.infoText}>Ciudad de residencia: {dato.ciudad} </Text>
              )}
            </View>

{/* ---------------------------------------------------------------------------------------- */}

            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="pin" size={16} style={styles.infoIcon} />
              {editMode ? (
                <TextInput
                  placeholder='Escribe tu colonia'
                  style={styles.infoTextInput1}
                  value={selectedColonia}
                  onChangeText={setSelectedColonia}
                />
              ) : (
                <Text style={styles.infoText}>Colonia: {dato.colonia} </Text>
              )}
            </View>
           
{/* ---------------------------------------------------------------------------------------- */}

            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="location" size={16} style={styles.infoIcon} />
              {editMode ? (
                <TextInput
                  placeholder='Escribe tu Código Postal'
                  style={styles.infoTextInput1}
                  value={selectedCP}
                  onChangeText={setSelectedCP}
                />
              ) : (
                <Text style={styles.infoText}>Código Postal: {dato.codigoPostal}</Text>
              )}
            </View>

{/* ---------------------------------------------------------------------------------------- */}

            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="briefcase" size={16} style={styles.infoIcon} />
              {editMode ? (
                <TextInput
                  placeholder='Escribe tu trabajo deseado'
                  style={styles.infoTextInput1}
                  value={selectedTrabajo}
                  onChangeText={setSelectedTrabajo}
                />
              ) : (
                <Text style={styles.infoText}>Puesto de trabajo deseado: {dato.puestoTrabajo}</Text>
              )}
            </View>

{/* ---------------------------------------------------------------------------------------- */}

            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="school" size={16} style={styles.infoIcon} />
              {editMode ? (
                <Picker
                style={styles.infoTextInput}
                selectedValue={selectedEducacion}
                onValueChange={(itemValue, itemIndex) => setSelectedEducacion(itemValue)}
                
                >
                <Picker.Item label="--" value="--" />
                <Picker.Item label='Primaria o secundaria' value="Primaria o secundaria" />
                <Picker.Item label="Bachillerato o equivalente" value="Bachillerato o equivalente" />
                <Picker.Item label="Técnico o diplomado" value="Técnico o diplomado" />
                <Picker.Item label="Grado universitario" value="Grado universitario" />
                <Picker.Item label="Maestría o posgrado" value="Maestría o posgrado" />
                <Picker.Item label="Doctorado o equivalente" value="Doctorado o equivalente" />
                </Picker>
              ) : (
                <Text style={styles.infoText}>Estudios y formación académica: {dato.estudios}</Text>
              )}
            </View>

{/* ---------------------------------------------------------------------------------------- */}

            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="business" size={16} style={styles.infoIcon} />
              {editMode ? (
                <Picker
                style={styles.infoTextInput}
                selectedValue={selectedExperiencia}
                onValueChange={(itemValue, itemIndex) => setSelectedExperiencia(itemValue)}
                
                >
                <Picker.Item label="--" value="--" />
                <Picker.Item label='Sin experiencia' value="Sin experiencia" />
                <Picker.Item label="1 a 2 años de experiencia" value="1 a 2 años de experiencia" />
                <Picker.Item label="2 a 4 años de experiencia" value="2 a 4 años de experiencia" />
                <Picker.Item label="Más de 4 años de experiencia" value="Más de 4 años de experiencia" />
                </Picker>
              ) : (
                <Text style={styles.infoText}>Experiencia laboral: {dato.experiencia}</Text>
              )}
            </View>

{/* ---------------------------------------------------------------------------------------- */}

            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="language" size={16} style={styles.infoIcon} />
              {editMode ? (
                <Picker
                style={styles.infoTextInput}
                selectedValue={selectedIngles}
                onValueChange={(itemValue, itemIndex) => setSelectedIngles(itemValue)}
                
                >
                {dato.ingles === "" ? 
                <Picker.Item label={dato.ingles} value={dato.ingles} /> : 
                <Picker.Item label="SELECCIONA TU NIVEL DE INGLES" value="" /> 
                }
                <Picker.Item label="No sé ingles" value="No sé ingles" />
                <Picker.Item label="Hablo lo básico" value="Hablo lo básico" />
                <Picker.Item label="Lo hablo fluido" value="Lo hablo fluido" />
                <Picker.Item label="Entiendo lo básico" value="Entiendo lo básico" />
                <Picker.Item label="Entiendo todo (no lo hablo)" value="Entiendo todo (no lo hablo)" />
                <Picker.Item label="Lo entiendo y lo hablo" value="Lo entiendo y lo hablo" />
                </Picker>
              ) : (
                <Text style={styles.infoText}>Nivel de inglés: {dato.ingles} </Text>
              )}
            </View>

{/* ---------------------------------------------------------------------------------------- */}

            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="time" size={16} style={styles.infoIcon} />
              {editMode ? (
                <Picker
                style={styles.infoTextInput}
                selectedValue={selectedDisponibilidad}
                onValueChange={(itemValue, itemIndex) => setSelectedDisponibilidad(itemValue)}
                
                >
                <Picker.Item label="--" value="--" />
                <Picker.Item label="Tiempo Completo" value="Tiempo Completo" />
                <Picker.Item label="Medio tiempo" value="Medio tiempo" />
                </Picker>
              ) : (
                <Text style={styles.infoText}>Disponibilidad de horario: {dato.disponibilidad}</Text>
              )}
            </View>

{/* ---------------------------------------------------------------------------------------- */}

            <View style={styles.infoDivider} />
            {editMode ? (
              <TouchableOpacity style={styles.saveButton} onPress={onSend}>
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
       
       ))} 
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
    width: '100%',
  },
  infoDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#C9C9C9',
    marginVertical: 5,
  },
  infoTextInput1: {
    flex: 1,
    fontSize: 16,
    marginLeft: '5%',
    paddingVertical: 10
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
