import { View, Text, Image, Pressable, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../temas/colors';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from '../componentes/Button';
import {Dimensions} from 'react-native';
// import FilePickerManager from 'react-native-file-picker';


// //FIREBASE imports
// import { 
//     createUserWithEmailAndPassword
//  } from 'firebase/auth';

// import { auth } from '../firebase-config';



const SignupEmpresa = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

     // Ventanas Modales de ayuda y botones de registro
     const [usuarioModalVisible, setUsuarioModalVisible] = useState(false);
 
     const showUsuarioModal = () => {
         setUsuarioModalVisible(true);
       };

    //Función de input de texto
       const [textInputValue, setTextInputValue] = useState('');
       const [textInputValueDescricpion, setTextInputValueDescripcion] = useState('');


    //Funciones de creación de cuenta con FIREBASE

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    //    Funcion para seleccionar archivos pdf
   

    const handleCreateAccount = async () => {
        try {
          const user = await createUserWithEmailAndPassword(auth, email, password);
          console.log('Se creó la cuenta', user);
        } catch (error) {
          console.log('No se pudo crear la cuenta',error);
        }
      };

      //Funcionalidad para agregar más numeros de teléfono
      const [numerosTelefono, setNumerosTelefono] = useState(['']); // Inicialmente, un campo de número de teléfono vacío

      const agregarCampoNumeroTelefono = () => {
        const nuevoNumeroTelefono = [...numerosTelefono, '']; // Agrega un campo de número de teléfono vacío a la lista
        setNumerosTelefono(nuevoNumeroTelefono);
      };

      //Funiconalidad para eliminar input de numero de teléfono
      const removePhoneNumberField = (index) => {
        const nuevoNumeroTelefono = [...numerosTelefono];
        nuevoNumeroTelefono.splice(index, 1);
        setNumerosTelefono(nuevoNumeroTelefono);
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
                        }}>Correo Electrónico (para iniciar sesión)*</Text>

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

                  {/* Input de ubicación */}
                  <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Ubicación (Calle, Número, Colonia, C.P)*</Text>

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
                            placeholder='Ej. Victoria Nte. 213, Zona Centro, 34000'
                            placeholderTextColor={COLORS.black}
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>

{/* ====================================================================================== */}
                  
                  {/* Input número de teléfono */}
                  <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Número(s) de contacto de la empresa*</Text>

                    {numerosTelefono.map((number, index) => (
                      <View
                        key={index}
                        style={{
                          width: "100%",
                          height: 48,
                          borderColor: COLORS.black,
                          borderWidth: 1,
                          borderRadius: 8,
                          alignItems: "center",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingLeft: 22,
                          marginTop: index === 0 ? 0 : 8,
                        }}
                      >
                        <TextInput
                          placeholder="+52"
                          placeholderTextColor={COLORS.black}
                          keyboardType="numeric"
                          style={{
                            width: "12%",
                            borderRightWidth: 1,
                            borderLeftColor: COLORS.grey,
                            height: "100%",
                          }}
                          editable={false}
                        />
                        <TextInput
                          placeholder="Ingresa el número de contacto"
                          placeholderTextColor={COLORS.black}
                          keyboardType="numeric"
                          style={{
                            width: "80%",
                            marginHorizontal: "1%"
                          }}
                          value={number}
                          onChangeText={(text) => {
                            const nuevoNumeroTelefono = [...numerosTelefono];
                            nuevoNumeroTelefono[index] = text;
                            setNumerosTelefono(nuevoNumeroTelefono);
                          }}
                        />
                        <TouchableOpacity onPress={() => removePhoneNumberField(index)}>
                          <Text style={{ fontSize: 16, color: COLORS.primary, position: 'relative' }}>Eliminar</Text>
                        </TouchableOpacity>
                      </View>
                    ))}

                    <TouchableOpacity onPress={agregarCampoNumeroTelefono} style={{ marginTop: 8 }}>
                      <Text style={{ fontSize: 16, color: COLORS.primary }}>+ Agregar teléfono de contacto (si lo tiene)</Text>
                    </TouchableOpacity>
                  </View>

{/* ==================================================================================== */}

                    {/* Input Correo electrónico de contacto */}

                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Correo Electrónico de contacto*</Text>

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
                                placeholder='Ingresa el correo electrónico de contacto'
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

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Sitio web de la empresa (si lo tiene)</Text>

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
                            placeholder='Ingresa el sitio web de tu empresa'
                            placeholderTextColor={COLORS.black}
                            onChangeText={setTextInputValue} // Actualiza el estado con el valor ingresado por el usuario
                            value={textInputValue} // Establece el valor del input como el estado actual
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>

{/* -------------------------------------------------------------------------------------- */}

<View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Descripción breve de la empresa</Text>

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
                            placeholder='Escriba una descripcion breve de la empresa'
                            placeholderTextColor={COLORS.black}
                            onChangeText={setTextInputValueDescripcion}
                            value={textInputValueDescricpion}
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>

{/* -------------------------------------------------------------------------------------- */}




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
                        onPress={showUsuarioModal}
                            
                        
                        style={{
                            marginTop: 18,
                            marginBottom: 4,
                        }}
                    />
{/* ====================================================================================== */}

                    {/* Ventana modal de botón de registrar como empresa */}
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
                                }}>El documento que proporcionaste será enviado a nuestro equipo de revisión. El objetivo de este proceso es garantizar la legitimidad y cumplimiento de las regulaciones legales por parte de las empresas registradas en nuestra plataforma.
                                </Text>
                                <Text style={{
                                    fontSize: 15,
                                    marginBottom: 10,
                                    textAlign: 'justify',
                                }}>Una vez que tu documento haya sido revisado, recibirás un correo electrónico de confirmación con los resultados de la revisión. Si tu documento es aceptado, podrás iniciar sesión en la aplicación utilizando el correo electrónico proporcionado durante el registro.
                                </Text>
                                <Text style={{
                                    fontSize: 15,
                                    marginBottom: 10,
                                    textAlign: 'justify',
                                }}>En caso de que tu documento sea rechazado, te informaremos sobre los motivos específicos de la decisión.
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