import { View, Text, Pressable, Image, Modal, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from "expo-linear-gradient";
import COLORS from '../temas/colors';
import Button from '../componentes/Button';
import { Ionicons } from '@expo/vector-icons';
import {Dimensions} from 'react-native';


const Welcome2 = ({ navigation }) => {

    // Ventanas Modales de ayuda y botones de registro
    const [modalVisible, setModalVisible] = useState(false);
    const [empresaModalVisible, setEmpresaModalVisible] = useState(false);
    const [usuarioModalVisible, setUsuarioModalVisible] = useState(false);

    const showUsuarioModal = () => {
        setUsuarioModalVisible(true);
      };

    const showEmpresaModal = () => {
        setEmpresaModalVisible(true);
      };

    //======================================================================
    // Dimensiones para fijar el boton de ayuda
    const {width, height} = Dimensions.get('window');

    //======================================================================

    return (
        <LinearGradient
            style={{
                flex: 1
            }}
            colors={[COLORS.secondary, COLORS.primary]}
        >
             {/* Imágenes */}

            <View style={{ flex: 1 }}>
            <View>
                    <Image
                        source={require("../assets/persona1.jpg")}
                        style={{
                            height: 80,
                            width: 80,
                            borderRadius: 20,
                            position: "relative",
                            top: '30%',
                            left: '17%',
                            transform: [
                                { translateX: 20 },
                                { translateY: 50 },
                                { rotate: "-15deg" }
                            ]
                        }}
                    />

                    <Image
                        source={require("../assets/persona3.jpg")}
                        style={{
                            height: 70,
                            width: 70,
                            borderRadius: 20,
                            position: "absolute",
                            top: '-25%',
                            left: '43%',
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                { rotate: "-5deg" }
                            ]
                        }}
                    />

                    <Image
                        source={require("../assets/persona3.jpg")}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 20,
                            position: "absolute",
                            top: '160%',
                            left: '-11%',
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                { rotate: "15deg" }
                            ]
                        }}
                    />

                    <Image
                        source={require("../assets/persona2.jpg")}
                        style={{
                            height: 190,
                            width: 190,
                            borderRadius: 20,
                            position: "absolute",
                            top: '150%',
                            left: '35%',
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                { rotate: "-15deg" }
                            ]
                        }}
                    />
                </View>

            {/* ========================================================================== */}
            
            {/* Botón de ayuda */}

                <View style={{
                        position: 'absolute', left: width * 0.89, top: height * 0.04
                    }}>
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <Ionicons name="ios-help-circle-outline" size={35} color="white" />
                        </TouchableOpacity>
                </View>

            {/* Ventana modal del botón de ayuda */}
                <Modal
                    visible={modalVisible}
                    animationType="fade"
                    transparent={true}
                    onRequestClose={() => setModalVisible(false)}
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
                        }}>Registrarse como usuario te permite aprovechar todas las ventajas de nuestra aplicación para encontrar excelentes oportunidades laborales. Podrás crear un perfil con tu información y las empresas registradas podrán ver tu perfil y contactarte directamente si consideran que eres un candidato adecuado para sus vacantes.
                        </Text>
                        <Text style={{ 
                            fontSize: 15, 
                            marginBottom: 10,
                            textAlign: 'justify',
                        }}>Registrarse como empresa te brinda la posibilidad de publicar tus vacantes de empleo y buscar candidatos altamente calificados. Podrás crear un perfil de empresa y proporcionar detalles sobre tu negocio para que los usuarios puedan conocerte. Además, tendrás acceso a nuestra amplia base de usuarios en busca de empleo y podrás contactar a los candidatos que cumplan con tus criterios de búsqueda.
                        </Text>
                            
                        <TouchableOpacity
                            style={{ 
                                backgroundColor: COLORS.primary, 
                                padding: 10, 
                                borderRadius: 6, 
                                alignSelf: 'center' 
                            }}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={{ 
                                color: 'white', 
                                fontSize: 16, 
                                alignItems: 'center' 
                            }}>Aceptar</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
               
            {/* ========================================================================= */}

            {/* Botones de registro (usuario y empresa) */}
                <View style={{
                    paddingHorizontal: 22,
                    marginVertical: "-1%",
                    position: "absolute",
                    top: "55%",
                    width: "100%",
                    flex: 1,
                    bottom: "18%"
                }}>
                    <Text style={{
                        fontSize: 40,
                        fontWeight: "bold",
                        color: COLORS.white,
                        marginTop: "3%"
                    }}>¿Cómo quieres </Text>
                    <Text style={{
                        fontSize: 40,
                        fontWeight: "bold",
                        color: COLORS.white,
                        marginTop: "-1%",
                        marginBottom: "8%"
                    }}>registrate?</Text>
                
                    {/* Botón de registrarse como usuario */}
                    <Button
                        title="Como usuario"
                        onPress={() => {
                            navigation.navigate('Signup'); 
                        }}
                        style={{
                            width: "100%",
                            marginBottom: "3%"
                        }}
                    />

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
                        {/* <Text style={{ 
                            fontSize: 15, 
                            marginBottom: 10,
                            textAlign: 'center',
                            fontWeight: 'bold'
                        }}>*En el siguiente formulario se te pedirá que subas dos fotografías tuyas. Una de cuerpo completo y otra del pecho hacia arriba por lo que te aconsejamos las tengas listas*
                        </Text>  */}
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
                                navigation.navigate('Signup'); 
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
                    {/* ==================================================================== */}

                    {/* Botón de Registrarse cómo empresa */}

                    <Button
                        title="Como empresa"
                        onPress={showEmpresaModal}
                        style={{
                            width: "100%",
                        }}
                    />
                    {/* Ventana modal de botón de registrar como empresa */}
                    <Modal
                        visible={empresaModalVisible}
                        animationType="fade"
                        transparent={true}
                        onRequestClose={() => setEmpresaModalVisible(false)}
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
                        }}>Al registrate estas aceptando que necesitamos recopilar cierta información sobre tu empresa. Esto incluye el nombre, ubicación y documentación que demuestre que eres una empresa o negocio legalmente registrada.
                        </Text>
                        <Text style={{ 
                            fontSize: 15, 
                            marginBottom: 10,
                            textAlign: 'justify',
                        }}>Ten en cuenta que la información general de tu empresa (nombre, ubicación, descripción, etc.) estará visible para los usuarios que se registren en nuestra plataforma.
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
                                setEmpresaModalVisible(false);
                                navigation.navigate('SignupEmpresa'); 
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
                                setEmpresaModalVisible(false);
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
                    </View>
                
            </View>
        </LinearGradient>
    )
}

export default Welcome2;