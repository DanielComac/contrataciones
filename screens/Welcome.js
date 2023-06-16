import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import COLORS from '../temas/colors';
import Button from '../componentes/Button';


const Welcome = ({ navigation }) => {

    return (
        <LinearGradient
            style={{
                flex: 1
            }}
            colors={[COLORS.secondary, COLORS.primary]}
        >
            {/* Imagenes */}

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

                {/* ======================================================================== */}

                {/* Texto y botones de la página de inicio */}
                <View style={{
                    paddingHorizontal: 22,
                    position: "relative",
                    top: "46%",
                    width: "100%"
                }}>
                    <Text style={{
                        fontSize: 50,
                        fontWeight: "bold",
                        color: COLORS.white,
                    }}>Bienvenido</Text>
                    
                    <View style={{ marginTop: "1%" }}>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.white,
                            marginVertical: 10,
                        }}>Busca al empleado ideal para tu negocio</Text>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.white,
                        }}>O regístrate para encontrar</Text>
                    </View>
                    <Button
                        title="Unirme Ahora"
                        onPress={() => navigation.navigate("Home")}
                        style={{
                            marginTop: "10%",
                            width: "100%"
                        }}
                    />

                    <View style={{
                        flexDirection: "row",
                        marginTop: 12,
                        justifyContent: "center"
                    }}>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.white
                        }}>¿Ya tienes cuenta?</Text>
                        <Pressable
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Text style={{
                                fontSize: 16,
                                color: COLORS.white,
                                fontWeight: "bold",
                                marginLeft: 4
                            }}>Inicia Sesión</Text>
                        </Pressable>

                    </View>
                </View>
            </View>
        </LinearGradient>
    )
}

export default Welcome