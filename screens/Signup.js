import { View, Text, Image, Pressable, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../temas/colors';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from '../componentes/Button';
import {Dimensions} from 'react-native';

//FIREBASE imports
import { 
    createUserWithEmailAndPassword
 } from 'firebase/auth';

 import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { auth } from '../firebase-config';



const Signup = ({ navigation }) => {

    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

     // Ventanas Modales de ayuda y botones de registro
     const [modalVisible, setModalVisible] = useState(false);
     const [usuarioModalVisible, setUsuarioModalVisible] = useState(false);
 
     const showUsuarioModal = () => {
         setUsuarioModalVisible(true);
       };


    //Constante para verificar si la cuenta esta creada
    const [isSignIn, setIsSignIn]=useState(false);


    //Funciones de creación de cuenta con FIREBASE

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    // Dimensiones para fijar flecha de regreso
    const {width, height} = Dimensions.get('window');

    //======================================================================

    const goBack = () => {
        navigation.goBack();
        setIsSignIn(false);
    };

    const handleCreateAccount = async () => {
        try {
          const user = await createUserWithEmailAndPassword(auth, email, password);
          setIsSignIn(true);
          console.log('Se creó la cuenta con:', user);
        } catch (error) {
          console.log('No se pudo crear la cuenta',error);
        }
      };

      const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
          const credentials = await signInWithPopup(auth, provider);
            setIsSignIn(true);
            console.log('Se creó la cuenta con:', credentials);
        } catch (error) {
          console.log(error);
        }
      };

      useEffect( () =>{
        if (isSignIn) {
            navigation.navigate('Form')
        }
      })


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

                    <Button
                        title="Registrarse"
                        filled
                        onPress={showUsuarioModal}
                            
                        
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
                                }}>Al registrate estas aceptando que vamos a recopilar cierta información personal. Estos datos incluyen tu nombre, edad, ubicación aproximada, fotografías, entre otra. Queremos que estés consciente de que cualquier empresa registrada en nuestra plataforma podrá ver esta información al buscar candidatos.
                                </Text>
                                <Text style={{
                                    fontSize: 15,
                                    marginBottom: 10,
                                    textAlign: 'justify',
                                }}>Nos tomamos muy en serio tu privacidad y seguridad. Todos los datos que proporciones serán tratados de acuerdo con nuestras políticas de privacidad y protección de datos.
                                </Text>
                                <Text style={{
                                    fontSize: 15,
                                    marginBottom: 10,
                                    textAlign: 'center',
                                    fontWeight: 'bold'
                                }}>*En el siguiente formulario se te pedirá que subas dos fotografías tuyas. Una de cuerpo completo y otra del pecho hacia arriba por lo que te aconsejamos las tengas listas*
                                </Text>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: COLORS.primary,
                                        padding: 10,
                                        borderRadius: 6,
                                        alignSelf: 'center',
                                        marginTop: 10,
                                    }}
                                    onPress={() => {
                                        setUsuarioModalVisible(false);
                                        handleCreateAccount();
                                        navigation.navigate('Form');
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
                        onPress={() => console.log("Pressed")}
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
                        onPress={signInWithGoogle}
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