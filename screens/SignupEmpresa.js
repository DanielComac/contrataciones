import { View, Text, Image, Pressable, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../temas/colors';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from '../componentes/Button';
import {Dimensions} from 'react-native';

export let idEmpresa;

// //FIREBASE imports
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../firebase-config';
import { setDoc, doc } from 'firebase/firestore';



const SignupEmpresa = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

     // Ventanas Modales de ayuda y botones de registro
     const [usuarioModalVisible, setUsuarioModalVisible] = useState(false);
 
     const showUsuarioModal = () => {
         setUsuarioModalVisible(true);
       };


    //Funciones de creación de cuenta con FIREBASE

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [nombreEmpresa, setNombreEmpresa] = React.useState('');
    const [campoDesarrollo, setCampoDesarrollo] = React.useState('');
    const [userId, setUserId] = React.useState('')

    const handleCreateAccount = async () => {
        try {
          const user = await createUserWithEmailAndPassword(auth, email, password);
          console.log('Se creó la cuenta', user);

          idEmpresa = user.user.uid;

           //crear un nuevo documento en la coleccion 'formEmpresa'
           await setDoc(doc(firestore, 'users', user.user.uid),{
            emailEmpresa: email,
            passwordEmpresa: password,
            privilegio: "empresa",
            nombreEmpresa: nombreEmpresa,
            numeroCelularEmpresa: "",
            campoDesarrollo: campoDesarrollo,
        })

        //actualizar el userId con la ID del usuario creado
        setUserId(user.user.uid)  
        console.log(idEmpresa)
        // navigation.navigate("HomeScreenEmpresa");


        } catch (error) {
          console.log('No se pudo crear la cuenta',error);
        }
      };

      // Dimensiones para fijar flecha de regreso
    const {width, height} = Dimensions.get('window');

    //======================================================================

    const goBack = () => {
        navigation.goBack();
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
{/* ====================================================================================== */}

                    <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Nombre de la empresa*</Text>

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
                            placeholder='Ingresa el nombre de tu empresa'
                            placeholderTextColor={COLORS.black}
                            style={{
                                width: "100%"
                            }}
                            onChangeText={(text) => setNombreEmpresa(text)}
                        />
                    </View>
                </View>

{/* ====================================================================================== */}

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
                    </View>

                    
                    <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Tipo de empresa o campo en el que se desarrolla*</Text>

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
                            placeholder='Ejemplo: Restaurante'
                            placeholderTextColor={COLORS.black}
                            style={{
                                width: "100%"
                            }}
                            onChangeText={(text) => setCampoDesarrollo(text)}
                        />
                    </View>
                </View>

{/* ====================================================================================== */}
                    
                    {/* Términos y condiciones */}

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

                    <Button
                        title="Registrarse"
                        filled
                        onPress={handleCreateAccount}
                            
                        
                        style={{
                            marginTop: 18,
                            marginBottom: 4,
                        }}
                    />

{/* ====================================================================================== */}

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

export default SignupEmpresa;