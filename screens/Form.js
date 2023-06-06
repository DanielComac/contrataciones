import { View, Text, Image, Pressable, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../temas/colors';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from '../componentes/Button';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import {Dimensions} from 'react-native';



const Signup = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [selectedGenero, setSelectedGenero] = useState('');
    const [selectedEdad, setSelectedEdad] = useState('');
    const [selectedEducacion, setSelectedEducacion] = useState('');
    const [selectedExperiencia, setSelectedExperiencia] = useState('');
    const [selectedIngles, setSelectedIngles] = useState('');
    const [selectedDisponibilidad, setSelectedDisponibilidad] = useState('');
    const [selectedCiudad, setSelectedCiudad] = useState('');

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
        }
    };

    const [selectedImage2, setSelectedImage2] = useState(null);

    const handleImage2Upload = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
        alert('Se requieren permisos para acceder a la galería.');
        return;
        }

        const imageResult = await ImagePicker.launchImageLibraryAsync();
        if (!imageResult.canceled) {
        setSelectedImage2(imageResult.assets[0].uri);
        }
    };

    // Ciclo para las opciones de seleccion de edad
    const renderOptions = () => {
        const options = [];
        for (let i = 18; i <= 100; i++) {
          options.push(<Picker.Item key={i} label={i.toString()} value={i.toString()} />);
        }
        return options;
      };

    // Dimensiones para fijar el boton de ayuda
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
                <View style={{ marginTop: "5%" }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        color: COLORS.black
                    }}>
                        Información Personal
                    </Text>
                </View>


                {/* Input número de teléfono */}

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Número de teléfono*</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='+52'
                            placeholderTextColor={COLORS.black}
                            keyboardType='numeric'
                            style={{
                                width: "12%",
                                borderRightWidth: 1,
                                borderLeftColor: COLORS.grey,
                                height: "100%"
                            }}
                            editable= {false}
                        />
                        <TextInput
                            placeholder='Ingresa tu número de teléfono'
                            placeholderTextColor={COLORS.black}
                            keyboardType='numeric'
                            style={{
                                width: "80%"
                            }}
                        />
                    </View>
                </View>

{/* ==================================================================================== */}

            

                {/* Input de Nombre */}

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Nombre(s)*</Text>

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
                            placeholder='Ingresa tu nombre'
                            placeholderTextColor={COLORS.black}
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>

{/* ====================================================================================== */}

                {/* Input de Primer apellido */}

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Primer apellido*</Text>

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
                            placeholder='Ingresa tu primer apellido'
                            placeholderTextColor={COLORS.black}
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>

{/* ====================================================================================== */}

                {/* Input de Segundo apellido */}

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Segundo apellido*</Text>

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
                            placeholder='Ingresa tu segundo apellido'
                            placeholderTextColor={COLORS.black}
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>

{/* ====================================================================================== */}

                {/* Input de Género */}
                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Género*</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 1,
                        overflow: 'hidden'

                    }}>
                        <Picker
                        selectedValue={selectedGenero}
                        onValueChange={(itemValue, itemIndex) => setSelectedGenero(itemValue)}
                        style={{ width: "100%" }}
                        >
                        <Picker.Item label="Masculino" value="masculino" />
                        <Picker.Item label="Femenino" value="femenino" />
                        <Picker.Item label="Prefiero no decir" value="nodecir" />
                        <Picker.Item label="Otro" value="otro" />
                        </Picker>
                    </View>
                </View>

{/* ==================================================================================== */}

                {/* Input de Edad */}
                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Edad*</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 1
                    }}>
                        <Picker
                        selectedValue={selectedEdad}
                        onValueChange={(itemValue, itemIndex) => setSelectedEdad(itemValue)}
                        style={{width: "100%"}}
                        >
                        {renderOptions()}
                        </Picker>
                    </View>
                </View>

{/* ==================================================================================== */}

                {/* Input de Ciudad */}
                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Ciudad*</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 1,
                        overflow: 'hidden'

                    }}>
                        <Picker
                        selectedValue={selectedCiudad}
                        onValueChange={(itemValue, itemIndex) => setSelectedCiudad(itemValue)}
                        style={{ width: "100%" }}
                        >
                        <Picker.Item label="Victoria de Durango" value="durango" />
                        </Picker>
                    </View>
                </View>

{/* ==================================================================================== */}


                {/* Input de Colonia */}

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Colonia*</Text>

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
                            placeholder='Ej. "Zona Centro"'
                            placeholderTextColor={COLORS.black}
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>

{/* ====================================================================================== */}

                {/* Input de Código Postal */}

                <View style={{ marginBottom: 12 }}>
                    
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8,
                    }}>Código Postal*</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22,
                    }}>
                        <TextInput
                            keyboardType='numeric'
                            placeholder='Ingresa tu Código Postal'
                            placeholderTextColor={COLORS.black}
                            style={{
                                width: "100%",
                            }}
                        />
                    </View>
                </View>

{/* ====================================================================================== */}

                {/* Input de Trabajo a aplicar */}

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Trabajo que te gustaría encontrar*</Text>

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
                            placeholder='Ej. "Cocinero, Mesero"'
                            placeholderTextColor={COLORS.black}
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>

{/* ====================================================================================== */}

                {/* Input de Educación */}
                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Educación y Formación Académica*</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 1,
                        overflow: 'hidden'

                    }}>
                        <Picker
                        selectedValue={selectedEducacion}
                        onValueChange={(itemValue, itemIndex) => setSelectedEducacion(itemValue)}
                        style={{ width: "100%" }}
                        >
                        <Picker.Item label='Primaria o secundaria' value="primariasecundaria" />
                        <Picker.Item label="Bachillerato o equivalente" value="bachillerato" />
                        <Picker.Item label="Técnico o diplomado" value="tecnico" />
                        <Picker.Item label="Grado universitario" value="gradouniversitario" />
                        <Picker.Item label="Maestría o posgrado" value="maestria" />
                        <Picker.Item label="Doctorado o equivalente" value="doctorado" />
                        </Picker>
                    </View>
                </View>

{/* ==================================================================================== */}

                {/* Input de Experiencia laboral */}
                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Experiencia laboral (cualquier campo laboral)*</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 1,
                        overflow: 'hidden'

                    }}>
                        <Picker
                        selectedValue={selectedExperiencia}
                        onValueChange={(itemValue, itemIndex) => setSelectedExperiencia(itemValue)}
                        style={{ width: "100%" }}
                        >
                        <Picker.Item label='Sin experiencia' value="sinexperiencia" />
                        <Picker.Item label="1 a 2 años de experiencia" value="1año" />
                        <Picker.Item label="2 a 4 años de experiencia" value="2años" />
                        <Picker.Item label="Más de 4 años de experiencia" value="mas4años" />
                        </Picker>
                    </View>
                </View>

{/* ==================================================================================== */}

                {/* Input de Nivel de inglés */}
                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Nivel de inglés*</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 1,
                        overflow: 'hidden'

                    }}>
                        <Picker
                        selectedValue={selectedIngles}
                        onValueChange={(itemValue, itemIndex) => setSelectedIngles(itemValue)}
                        style={{ width: "100%" }}
                        >
                        <Picker.Item label="No hablo ingles" value="noingles" />
                        <Picker.Item label="Inglés A1 - A2" value="a1a2" />
                        <Picker.Item label="Inglés A2 - B1" value="a1b1" />
                        <Picker.Item label="Inglés B1 - B2" value="b1b2" />
                        <Picker.Item label="Inglés B2 - C1" value="b2c1" />
                        <Picker.Item label="Inglés C1 - C2" value="c1c2" />
                        </Picker>
                    </View>
                </View>

{/* ==================================================================================== */}

                {/* Input de Disponibilidad de horario */}
                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8,
                    }}>Disponibilidad de horario*</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 1,
                        overflow: 'hidden'

                    }}>
                        <Picker
                        selectedValue={selectedDisponibilidad}
                        onValueChange={(itemValue, itemIndex) => setSelectedDisponibilidad(itemValue)}
                        style={{ width: "100%" }}
                        >
                        <Picker.Item label="Tiempo Completo" value="tiempocompleto" />
                        <Picker.Item label="Medio tiempo" value="mediotiempo" />
                        </Picker>
                    </View>
                </View>

{/* ==================================================================================== */}

                {/* Input para subir fotografías */}
                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8,
                    }}>Fotografía #1 Aspecto 4:3(De pecho para arriba)*</Text>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 4,
                        fontWeight: 'bold',
                        marginBottom: "6%"
                    }}>Esta es la fotografía que se mostrará en tu tarjeta de perfil y la que verán las empresas</Text>

                    <View style={{marginBottom: 12}}>
                        <Button title="Seleccionar imagen" onPress={handleImageUpload} />
                        {selectedImage && <Image source={{ uri: selectedImage }} 
                        style={{
                            width: 200, 
                            height: 200,
                            marginTop: 12,
                            alignItems: 'center'
                        }} />}
                    </View>
                </View>
{/* ==================================================================================== */}

                {/* Input para subir fotografías */}
                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8,
                    }}>Fotografía #2 Aspecto 4:3(De cuerpo completo)*</Text>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 4,
                        fontWeight: 'bold',
                        marginBottom: "6%"
                    }}>Esta fotografía se mostrará en tu perfil al dar clic en tu tarjeta de perfil</Text>

                    <View style={{marginBottom: 12}}>
                        <Button title="Seleccionar imagen" onPress={handleImage2Upload} />
                        {selectedImage2 && <Image source={{ uri: selectedImage2 }} 
                        style={{
                            width: 200,
                            aspectRatio: 9/16,
                            marginTop: 12,
                            alignItems: 'center'
                        }} />}
                    </View>
                </View>
{/* ==================================================================================== */}




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
                    title="Agregar información al perfil"
                    filled
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
                
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Signup