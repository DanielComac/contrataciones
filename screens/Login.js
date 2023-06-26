import { View, Text, Image , Pressable, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../temas/colors';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from '../componentes/Button';
import {Dimensions} from 'react-native';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";



const Login = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    // Dimensiones para fijar flecha de regreso
    const {width, height} = Dimensions.get('window');

    //======================================================================

    const goBack = () => {
        navigation.goBack();
    };
   
    const handleLogin = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // El inicio de sesión fue exitoso
            console.log('Inicio de sesión exitoso', userCredential.user);
    
            // Redirigir al usuario a la siguiente ventana
            navigation.navigate('Home');
          })
          .catch((error) => {
            // Ocurrió un error durante el inicio de sesión
            console.error('Error de inicio de sesión:', error);
            setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
          });
      };
    

      const handleGoogleLogin = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
    
        try {
          const result = await signInWithPopup(auth, provider);
    
          // El inicio de sesión con Google fue exitoso
          console.log('Inicio de sesión con Google exitoso', result.user);
    
          // Redirigir al usuario a la siguiente ventana
          navigation.navigate('InicioUsuario');
        } catch (error) {
          // Ocurrió un error durante el inicio de sesión con Google
          console.error('Error de inicio de sesión con Google:', error);
        }
      };
      
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
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
                        Hola de nuevo! 👋
                    </Text>

                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Correo electrónico</Text>

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
                            value={email}
                            onChangeText={setEmail}
                            placeholder='Ingresa tu correo electrónico'
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            style={{
                              width: "100%"
                            }}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Contraseña</Text>

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
                            value={password}
                            onChangeText={setPassword}
                            placeholder='Ingresa tu contraseña'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={isPasswordShown}
                            style={{
                              width: "100%"
                            }}
                        />

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

                    <Text>Recuérdame</Text>
                </View>

                <Button
                    title="Ingresar"
                    filled
                    style={{
                    marginTop: 18,
                    marginBottom: 4,
                    }}
                    onPress={handleLogin}
                />

                {error ? (
                    <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>
                ) : null}

                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                    <Text style={{ fontSize: 14 }}>O inicia sesión con</Text>
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
                        onPress={handleGoogleLogin}
                        style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        height: 52,
                        borderWidth: 1,
                        borderColor: COLORS.grey,
                        marginRight: 4,
                        borderRadius: 10,
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

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>¿Aún no tienes una cuenta?</Text>
                    <Pressable
                        onPress={() => navigation.navigate("Welcome2")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Regístrate</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Login