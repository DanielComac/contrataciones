import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import COLORS from '../temas/colors';
import { firestore } from "../firebase-config";
import { setDoc, doc, addDoc, collection, onSnapshot, query, updateDoc } from "firebase/firestore";
import { auth } from '../firebase-config';
import { userId } from './Login.js'

const PerfilEmpresa = () => {
  const [editMode, setEditMode] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedNombre, setSelectedNombre] = useState('');
  const [infoEmpresa, setInfoEmpresa] = useState([]);


  const [infoUsuario, setInfoUsuario] = useState([]);

  useEffect(() => {
    const collectionRef = collection(firestore, 'users');
    const q = query(collectionRef);

    const unsuscribe = onSnapshot(q, (querySnapshop) => {
      setInfoEmpresa(
        querySnapshop.docs.map((doc) => ({
          id: doc.id,
          nombreEmpresa: doc.data().nombreEmpresa,
          numeroCelularEmpresa: doc.data().numeroCelularEmpresa,
        }))
      );
    });

    return unsuscribe;
  }, []);


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
            nombreEmpresa: doc.data().nombreEmpresa,
            numeroCelularEmpresa: doc.data().numeroCelularEmpresa,
          },
        ]);
      } else {
        // El documento no existe
        console.log('El documento no existe.');
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    // Mantener la información seleccionada al entrar en el modo de edición
    if (infoUsuario.length > 0) {
      setSelectedNombre(infoUsuario[0].nombreEmpresa);
      setPhoneNumber(infoUsuario[0].numeroCelularEmpresa);
    }
  }, [infoUsuario]);

  const onSend = () => {
    try {
      let id = userId;
      const refDoc = doc(firestore, 'users', id);
      updateDoc(refDoc, {
        nombreEmpresa: selectedNombre,
        numeroCelularEmpresa: phoneNumber,
      });

      setEditMode(false);
    } catch (error) {
      console.log('Error al enviar la información', error);
    }
  };

  const handleEditPersonalInfo = () => {
    setEditMode(true);
  };

  const handleSavePersonalInfo = () => {
    setEditMode(false);
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
                <Text style={styles.name}>{dato.nombreEmpresa}</Text>
              </View>
              <Text style={styles.infoTitle}>Información personal:</Text>
              <View style={styles.infoDivider} />
              <View style={styles.infoRow}>
                <Ionicons name="person-circle" size={16} style={styles.infoIcon} />
                {editMode ? (
                  <TextInput
                    placeholder="Escribe el nombre de la empresa"
                    style={styles.infoTextInput1}
                    value={selectedNombre}
                    onChangeText={setSelectedNombre}
                  />  
                ) : (
                  <Text style={styles.infoText}>Nombre: {dato.nombreEmpresa} </Text>
                )}
              </View>
              <View style={styles.infoDivider} />
              <View style={styles.infoRow}>
                <Ionicons name="call" size={16} style={styles.infoIcon} />
                {editMode ? (
                  <TextInput
                    placeholder="Escribe tu numero de telefono"
                    style={styles.infoTextInput1}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                  />
                ) : (
                  <Text style={styles.infoText}>Número de teléfono: {dato.numeroCelularEmpresa} </Text>
                )}
              </View>

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

export default PerfilEmpresa;
