import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../temas/colors';
import { getAuth, updatePassword, updateEmail } from 'firebase/auth';

const AjustesAdmin = ({ navigation }) => {
  const auth = getAuth();
  const [showCambiarContraseña, setShowCambiarContraseña] = useState(false);
  const [showCambiarEmail, setShowCambiarEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleCerrarSesion = async () => {
    try {
      Alert.alert(
        'Cerrar sesión',
        '¿Deseas cerrar sesión?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Aceptar',
            onPress: async () => {
              await auth.signOut();
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.log('Error al cerrar sesión:', error);
    }
  };

  const handleChangeContraseña = () => {
    setShowCambiarContraseña(true);
    setShowCambiarEmail(false);
  };

  const handleChangeCorreo = () => {
    setShowCambiarContraseña(false);
    setShowCambiarEmail(true);
  };

  const handleUpdatePassword = async () => {
    try {
      await updatePassword(auth.currentUser, newPassword);
      Alert.alert('Contraseña actualizada', 'Tu contraseña ha sido actualizada correctamente.');
      setNewPassword('');
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar la contraseña. Por favor, inténtalo de nuevo más tarde.');
      console.log('Error al actualizar la contraseña:', error);
    }
  };

  const handleUpdateEmail = async () => {
    try {
      await updateEmail(auth.currentUser, email);
      Alert.alert('Correo electrónico actualizado', 'Tu correo electrónico ha sido actualizado correctamente.');
      setEmail('');
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el correo electrónico. Por favor, inténtalo de nuevo más tarde.');
      console.log('Error al actualizar el correo electrónico:', error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.back }}>
      <Text style={styles.titulo}>Ajustes</Text>
      <View style={styles.optionContainer}>
        <TouchableOpacity
          style={styles.option}
          onPress={handleChangeContraseña}
        >
          <Ionicons name="key-outline" size={24} color={COLORS.black} style={styles.optionIcon} />
          <Text style={styles.optionText}>Cambiar contraseña</Text>
        </TouchableOpacity>
        {showCambiarContraseña && (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Contraseña actual"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Nueva contraseña"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity style={styles.botonGuardar} onPress={handleUpdatePassword}>
              <Text style={styles.textoBoton}>Guardar contraseña</Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity
          style={styles.option}
          onPress={handleChangeCorreo}
        >
          <Ionicons name="mail-outline" size={24} color={COLORS.black} style={styles.optionIcon} />
          <Text style={styles.optionText}>Cambiar correo electrónico</Text>
        </TouchableOpacity>
        {showCambiarEmail && (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nuevo correo electrónico"
              value={email}
              onChangeText={setEmail}
            />
            <TouchableOpacity style={styles.botonGuardar} onPress={handleUpdateEmail}>
              <Text style={styles.textoBoton}>Guardar correo electrónico</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.cerrarSesionContainer}>
        <TouchableOpacity
          style={styles.botonLogout}
          onPress={handleCerrarSesion}
        >
          <Text style={styles.textoBotonLogout}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: '8%',
    marginLeft: 16,
    marginBottom: '5%',
  },
  optionContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 7,
    paddingHorizontal: 22,
    width: 300,
    alignSelf: 'center',
    marginBottom: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionIcon: {
    marginRight: 10,
  },
  optionText: {
    color: COLORS.black,
    fontSize: 16,
  },
  formContainer: {
    padding: 10,
    backgroundColor: '#F8F8F8',
    borderRadius: 7,
    marginTop: 10,
    marginBottom: 15
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  botonGuardar: {
    backgroundColor: COLORS.primary,
    borderRadius: 7,
    paddingVertical: 10,
    alignItems: 'center',
  },
  textoBoton: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  cerrarSesionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  botonLogout: {
    backgroundColor: '#E1E1E1',
    borderRadius: 7,
    paddingHorizontal: 22,
    paddingVertical: 10,
    width: 315,
    alignItems: 'center',
  },
  textoBotonLogout: {
    color: COLORS.black,
  },
});

export default AjustesAdmin;
