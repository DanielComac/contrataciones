import { View, Text, Image, Pressable, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../temas/colors';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from '../componentes/Button';
import {Dimensions} from 'react-native';
import { getAuth, fetchSignInMethodsForEmail } from 'firebase/auth';



//FIREBASE imports
import { 
    createUserWithEmailAndPassword
 } from 'firebase/auth';

 import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import firebaseConfig, { auth, firestore } from '../firebase-config';
import { setDoc, doc } from 'firebase/firestore';




const Signup = ({ navigation }) => {


    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    // Variable de estado para el mensaje de error de la contraseña
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');


    const [termsError, setTermsError] = useState('');


     // Ventanas Modales de ayuda y botones de registro
     const [modalVisible, setModalVisible] = useState(false);
     const [usuarioModalVisible, setUsuarioModalVisible] = useState(false);
 
     const checkExistingEmail = async () => {
        const auth = getAuth();
      
        try {
          const methods = await fetchSignInMethodsForEmail(auth, email);
          if (methods && methods.length > 0) {
            setEmailError('El correo electrónico ya está registrado. Por favor, ingresa otro.');
          } else {
            setUsuarioModalVisible(true);
          }
        } catch (error) {
          console.error('Error al verificar el correo electrónico:', error);
        }
      };

      
      const showUsuarioModal = () => {
        if (!isEmailValid(email)) {
          setEmailError('Ingresa un correo electrónico válido.');
          return; // Detener la ejecución si el correo electrónico no es válido
        }
    
        if (!isPasswordValid(password)) {
          setPasswordError('La contraseña no cumple con los requisitos mínimos. Necesita tener al menos 8 caracteres y 1 número');
          return; // Detener la ejecución si la contraseña no cumple los requisitos
        }
    
        if (!isChecked) {
          setTermsError('Debes aceptar los términos y condiciones.');
          return; // Detener la ejecución si el checkbox no está marcado
        }
    
        // Verificar si el correo electrónico ya está registrado
        checkExistingEmail();
      };

    //Constante para verificar si la cuenta esta creada
    const [isSignIn, setIsSignIn]=useState(false);


    //Funciones de creación de cuenta con FIREBASE

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [userId, setUserId] = React.useState('')

    // Dimensiones para fijar flecha de regreso
    const {width, height} = Dimensions.get('window');

    //======================================================================

    const goBack = () => {
        navigation.goBack();
    };


   

    const handleCreateAccount = async () => {
        try {
          const auth = getAuth();
          const methods = await fetchSignInMethodsForEmail(auth, email);
          if (methods.length > 0) {
            // El correo electrónico ya está registrado, muestra un mensaje de error o realiza la acción correspondiente
            console.log('El correo electrónico ya está registrado');
            return;
          }
      
          // Continuar con la creación de la cuenta si el correo electrónico no está registrado
          if (isPasswordValid(password)) {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            console.log('Se creó la cuenta', user);

            //crear un nuevo documento en la coleccion 'users'
            await setDoc(doc(firestore, 'users', user.user.uid),{
                email: email,
                password: password
            })

            //actualizar el userId con la ID del usuario creado
            setUserId(user.user.uid)

          } else {
            setPasswordError('La contraseña no cumple con los requisitos mínimos.');
          }
        } catch (error) {
          console.log('No se pudo crear la cuenta', error);
        }
      };

      const signInWithGoogle = async () => {
        // try{
        //     await GoogleSignin.hasPlayServices();
        //     const {idToken} = await GoogleSignin.signIn();
        //     const googleCredential = auth.GoogleAuthProvider.credential(idToken)
        //     await auth().signInWithCredential(googleCredential);
        //     setIsSignIn(true);
        // }   catch (error) {
        //     console.log(error);
        // }
        
        const provider = new GoogleAuthProvider();
    
        try {
          const credentials = await signInWithPopup(auth, provider);
          // Redirigir a la ventana "Form.js"
          navigation.navigate('Form');
        } catch (error) {
          console.log(error);
        }
      };

      const signInWithFacebook = async () => {
        const provider = new FacebookAuthProvider();
    
        try {
          const credentials = await signInWithPopup(auth, provider);
          // Redirigir a la ventana "Form.js"
          navigation.navigate('Form');
        } catch (error) {
          console.log(error);
        }
      };

      const isEmailValid = (email) => {
        // Expresión regular para verificar el formato del correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

      const isPasswordValid = (password) => {
        // Define las reglas de validación aquí
        const minLength = 8; // Longitud mínima de la contraseña
      
        // Reglas de validación: contraseña de al menos 8 caracteres y al menos un número
        const regex = /^(?=.*\d).{8,}$/;
      
        return regex.test(password) && password.length >= minLength;
      };

     
      

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <ScrollView>
                {/* flecha hacia atras */}
                <View style={{
                    position: 'relative', left: width * 0.05, top: height * 0.01
                }}>
                    <TouchableOpacity onPress={goBack} >
                        <Ionicons name="arrow-back" size={30} color={COLORS.primary}/>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, marginHorizontal: 22 }}>
                    <View style={{ marginTop: "0%" }}>
                        <Text style={{
                            fontSize: 22,
                            fontWeight: 'bold',
                            marginVertical: 12,
                            color: COLORS.black
                        }}>
                            Crear Cuenta
                        </Text>
                    </View>

                    {/* Input Correo electrónico */}

                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Correo Electrónico*</Text>

                        <View style={{
                            width: "100%",
                            height: 48,
                            borderColor: COLORS.black,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 22
                        }}>
                            <TextInput
                                placeholder='Ingresa tu correo electrónico'
                                placeholderTextColor={COLORS.black}
                                keyboardType='email-address'
                                onChangeText={(text) => setEmail(text)}
                                style={{
                                    width: "100%"
                                }}
                            />
                        </View>
                        {emailError !== '' && <Text style={{ color: 'red' }}>{emailError}</Text>}
                        {/* Mostrar mensaje de error del correo electrónico */}
                            {email !== '' && !isEmailValid(email) && (
                                <Text style={{ color: 'red', fontSize: 12 }}>Ingresa un correo electrónico válido.</Text>
                            )}
                    </View>
                    {/* ==================================================================================== */}



                    {/* Input de Contraseña */}

                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Contraseña*</Text>

                        <View style={{
                            width: "100%",
                            height: 48,
                            borderColor: COLORS.black,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 22
                        }}>
                            <TextInput
                                placeholder='Ingresa tu contraseña'
                                placeholderTextColor={COLORS.black}
                                secureTextEntry={isPasswordShown}
                                onChangeText={(text) => setPassword(text)}
                                style={{
                                    width: "100%"
                                }}
                            />

                            {/* Funcionalidad para mostrar/ocultar contraseña */}
                            <TouchableOpacity
                                onPress={() => setIsPasswordShown(!isPasswordShown)}
                                style={{
                                    position: "absolute",
                                    right: 12
                                }}
                            >
                                {
                                    isPasswordShown == true ? (
                                        <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                    ) : (
                                        <Ionicons name="eye" size={24} color={COLORS.black} />
                                    )
                                }

                            </TouchableOpacity>
                        </View>

                        {/* Mostrar mensaje de error de la contraseña */}
                        {passwordError !== '' && (
                            <Text style={{ color: 'red', fontSize: 12 }}>{passwordError}</Text>
                        )}
                    </View>

                    {/* ====================================================================================== */}

                    {/*  */}

                    <View style={{
                            flexDirection: 'row',
                            marginVertical: 6
                        }}>
                        <Checkbox
                            style={{ marginRight: 8 }}
                            value={isChecked}
                            onValueChange={setIsChecked}
                            color={isChecked ? COLORS.primary : undefined}
                        />
                        <Text>Aceptar Términos y Condiciones</Text>
                    </View>
                    
                    {/* Mostrar mensaje de error de términos y condiciones */}
                    {termsError !== '' && (
                        <Text style={{ color: 'red', fontSize: 12 }}>{termsError}</Text>
                    )}

                        <Button
                        title="Registrarse"
                        filled
                        onPress={showUsuarioModal}
                        disabled={!isPasswordValid(password) || !isEmailValid(email)} // Actualiza la condición
                        style={{
                            marginTop: 18,
                            marginBottom: 4,
                        }}
                        />
                    {/* ====================================================================================== */}
                    {/* Ventana modal de botón de registrar como usuario */}
                    <Modal
                        visible={usuarioModalVisible}
                        animationType="fade"
                        transparent={true}
                        onRequestClose={() => setUsuarioModalVisible(false)}
                    >
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            padding: 22
                        }}>
                            <View style={{
                                backgroundColor: 'white',
                                padding: 20,
                                borderRadius: 8
                            }}>
                                <Text style={{
                                    fontSize: 15,
                                    marginBottom: 10,
                                    textAlign: 'justify',
                                }}>Al registrate estas aceptando que después vamos a recopilar cierta información personal. Estos datos incluyen tu nombre, edad, ubicación aproximada, fotografías, entre otra. Queremos que estés consciente de que cualquier empresa registrada en nuestra plataforma podrá ver esta información al buscar candidatos.
                                </Text>
                                <Text style={{
                                    fontSize: 15,
                                    marginBottom: 10,
                                    textAlign: 'justify',
                                }}>Nos tomamos muy en serio tu privacidad y seguridad. Todos los datos que proporciones serán tratados de acuerdo con nuestras políticas de privacidad y protección de datos.
                                </Text>
                                {/* <Text style={{
                                    fontSize: 15,
                                    marginBottom: 10,
                                    textAlign: 'center',
                                    fontWeight: 'bold'
                                }}>*En el siguiente formulario se te pedirá que subas dos fotografías tuyas. Una de cuerpo completo y otra del pecho hacia arriba por lo que te aconsejamos las tengas listas*
                                </Text> */}
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: COLORS.primary,
                                        padding: 10,
                                        borderRadius: 6,
                                        alignSelf: 'center',
                                        marginTop: 10,
                                    }}
                                    onPress={() => {
                                        handleCreateAccount();
                                        setUsuarioModalVisible(false);
                                    }}
                                >
                                    <Text style={{
                                        color: 'white',
                                        fontSize: 16,
                                        alignItems: 'center',
                                    }}>Aceptar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{
                                        backgroundColor: COLORS.red,
                                        padding: 10,
                                        borderRadius: 6,
                                        alignSelf: 'center',
                                        marginTop: 10,
                                    }}
                                    onPress={() => {
                                        
                                        setUsuarioModalVisible(false);
                                        
                                    }}
                                >
                                    <Text style={{
                                        color: 'white',
                                        fontSize: 16,
                                        alignItems: 'center',
                                    }}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

{/* ====================================================================================== */}

                    {/* Registrarse con google o facebook */}
                    
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                    <Text style={{ fontSize: 14 }}>O regístrate con</Text>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity
                        onPress={signInWithFacebook}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            borderWidth: 1,
                            borderColor: COLORS.grey,
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >
                        <Image
                            source={require("../assets/facebook.png")}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text>Facebook</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={ () => console.log("Funcionando")}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            borderWidth: 1,
                            borderColor: COLORS.grey,
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >
                        <Image
                            source={require("../assets/google.png")}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text>Google</Text>
                    </TouchableOpacity>
                </View>



                    {/* Footer */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15 }}>
                        <View
                            style={{
                                flex: 1,
                                height: 1,
                                backgroundColor: COLORS.grey,
                                marginHorizontal: 10,
                            }}
                        />

                    </View>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        marginBottom: "6%"
                    }}>
                        <Text style={{ fontSize: 16, color: COLORS.black }}>¿Ya tienes una cuenta?</Text>
                        <Pressable
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Text style={{
                                fontSize: 16,
                                color: COLORS.primary,
                                fontWeight: "bold",
                                marginLeft: 6,
                            }}>Inicia Sesión</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>


    )
}

export default Signup