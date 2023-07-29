import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../temas/colors';
import { firestore } from "../firebase-config";
import { setDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { userId } from './Login.js';
import * as ImagePicker from 'expo-image-picker';
import Button from '../componentes/Button';
import { FontAwesome } from '@expo/vector-icons';



const PerfilEmpresa = () => {
  const [editMode, setEditMode] = useState(false);
  const [infoUsuario, setInfoUsuario] = useState({});
  const [tempSelectedNombre, setTempSelectedNombre] = useState('');
  const [tempPhoneNumber, setTempPhoneNumber] = useState('');
  const [tempSitioWeb, setTempSitioWeb] = useState('');
  const [tempCorreo, setTempCorreo] = useState('');
  const [tempDescripcionEmpresa, setTempDescripcionEmpresa] = useState('');
  const [tempCampoDesarrollo, setTempCampoDesarrollo] = useState('');
  const [profileImage, setProfileImage] = useState(require('../assets/persona1.jpg'));
  const [tempFacebook, setTempFacebook] = useState('');
  const [tempWhatsapp, setTempWhatsapp] = useState('');
  const [tempInstagram, setTempInstagram] = useState('');

  const guardarUrlImagen = async (imageUrl) => {
    try {
      let id = userId;
      const refDoc = doc(firestore, 'users', id);
      await updateDoc(refDoc, { imagenPerfil: imageUrl });
    } catch (error) {
      console.log('Error al guardar la imagen en la base de datos', error);
    }
  };
  

  // Función para input de subir imagenes
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async () => {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (permissionResult.granted === false) {
    alert('Se requieren permisos para acceder a la galería.');
    return;
  }

  const imageResult = await ImagePicker.launchImageLibraryAsync();
  if (!imageResult.canceled) {
    setSelectedImage(imageResult.assets[0].uri);
    guardarUrlImagen(imageResult.assets[0].uri);
  }
};

  useEffect(() => {
    const id = userId;
    const docRef = doc(firestore, 'users', id);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setInfoUsuario(docSnap.data());
        setTempSelectedNombre(docSnap.data().nombreEmpresa);
        setTempPhoneNumber(docSnap.data().numeroCelularEmpresa);
        setTempSitioWeb(docSnap.data().sitioWeb || '');
        setTempCorreo(docSnap.data().correo || '');
        setTempDescripcionEmpresa(docSnap.data().descripcionEmpresa || '');
        setTempCampoDesarrollo(docSnap.data().campoDesarrollo || '');
        setProfileImage({ uri: docSnap.data().imagenPerfil });
      } else {
        console.log('El documento no existe.');
      }
    });

    return unsubscribe;
  }, []);

  const onSend = () => {
    try {
      let id = userId;
      const refDoc = doc(firestore, 'users', id);
      updateDoc(refDoc, {
        nombreEmpresa: tempSelectedNombre,
        numeroCelularEmpresa: tempPhoneNumber,
        sitioWeb: tempSitioWeb,
        correo: tempCorreo,
        descripcionEmpresa: tempDescripcionEmpresa,
        campoDesarrollo: tempCampoDesarrollo,
        facebook: tempFacebook,
        whatsapp: tempWhatsapp,
        instagram: tempInstagram,
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
      <View style={{ flex: 1, backgroundColor: COLORS.back }}>
        <Text style={styles.headerTitle}>Mi perfil</Text>
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <View style={styles.profileContainer}>
              <View style={styles.profileImageContainer}>
                <TouchableOpacity onPress={handleImageUpload}>
                  <Image source={{ uri: selectedImage || profileImage.uri }} style={styles.profilePicture} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.editIconContainer} onPress={handleImageUpload}>
                  <FontAwesome name="pencil" size={24} color={COLORS.primary} />
                </TouchableOpacity>
              </View>
              <Text style={styles.name}>{infoUsuario.nombreEmpresa}</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="call" size={16} style={styles.infoIcon} />
              {editMode ? (
                <TextInput
                  placeholder="Escribe el numero de contacto"
                  style={styles.infoTextInput1}
                  value={tempPhoneNumber}
                  onChangeText={setTempPhoneNumber}
                />
              ) : (
                <Text style={styles.infoText}>Número de teléfono: {infoUsuario.numeroCelularEmpresa} </Text>
              )}
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="globe" size={16} style={styles.infoIcon} />
              {editMode ? (
                <TextInput
                  placeholder="Sitio web"
                  style={styles.infoTextInput1}
                  value={tempSitioWeb}
                  onChangeText={setTempSitioWeb}
                />
              ) : (
                <Text style={styles.infoText}>Sitio web: {infoUsuario.sitioWeb || 'N/A'} </Text>
              )}
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="mail" size={16} style={styles.infoIcon} />
              {editMode ? (
                <TextInput
                  placeholder="Correo electrónico"
                  style={styles.infoTextInput1}
                  value={tempCorreo}
                  onChangeText={setTempCorreo}
                />
              ) : (
                <Text style={styles.infoText}>Correo electrónico: {infoUsuario.correo || 'N/A'} </Text>
              )}
            </View>
            
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="hammer-outline" size={16} style={styles.infoIcon} />
              {editMode ? (
                <TextInput
                  placeholder="Campo en el que se desarrolla"
                  style={styles.infoTextInput1}
                  value={tempCampoDesarrollo}
                  onChangeText={setTempCampoDesarrollo}
                />
              ) : (
                <Text style={styles.infoText}>Campo en el que se desarrolla: {infoUsuario.campoDesarrollo || 'N/A'} </Text>
              )}
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="document-text-outline" size={16} style={styles.infoIcon} />
              {editMode ? (
                <TextInput
                  placeholder="Descripción de la empresa"
                  style={styles.infoTextInput1}
                  value={tempDescripcionEmpresa}
                  onChangeText={setTempDescripcionEmpresa}
                />
              ) : (
                <Text style={styles.infoText}>Descripción de la empresa: {infoUsuario.descripcionEmpresa || 'N/A'} </Text>
              )}
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="logo-facebook" size={16} style={styles.infoIcon} />
              {editMode ? (
                <TextInput
                  placeholder="Enlace de Facebook"
                  style={styles.infoTextInput1}
                  value={tempFacebook}
                  onChangeText={setTempFacebook}
                />
              ) : (
                <Text style={styles.infoText}>Facebook: {infoUsuario.facebook || 'N/A'} </Text>
              )}
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="logo-whatsapp" size={16} style={styles.infoIcon} />
              {editMode ? (
                <TextInput
                  placeholder="Enlace de WhatsApp"
                  style={styles.infoTextInput1}
                  value={tempWhatsapp}
                  onChangeText={setTempWhatsapp}
                />
              ) : (
                <Text style={styles.infoText}>WhatsApp: {infoUsuario.whatsapp || 'N/A'} </Text>
              )}
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="logo-instagram" size={16} style={styles.infoIcon} />
              {editMode ? (
                <TextInput
                  placeholder="Enlace de Instagram"
                  style={styles.infoTextInput1}
                  value={tempInstagram}
                  onChangeText={setTempInstagram}
                />
              ) : (
                <Text style={styles.infoText}>Instagram: {infoUsuario.instagram || 'N/A'} </Text>
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
  profileImageContainer: {
    width: 130,
    height: 130,
    borderRadius: 30,
    position: 'absolute',
    top: -80,
  },
  profilePicture: {
    width: '100%',
    height: '100%',
    borderRadius: 30
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderRadius: 50,
    padding: 8,
    elevation: 0,
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
