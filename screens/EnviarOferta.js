import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform, DatePickerIOS } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MapView, { Marker } from 'react-native-maps';
import COLORS from '../temas/colors';
import { useNavigation } from '@react-navigation/native';


const EnviarOferta = () => {

    const navigation = useNavigation();


  const [puestoEmpleo, setPuestoEmpleo] = useState('');
  const [requisitos, setRequisitos] = useState('');
  const [horaEntrada, setHoraEntrada] = useState(new Date()); 
  const [horaSalida, setHoraSalida] = useState(new Date());
  const [salario, setSalario] = useState('');
  const [descripcionEmpleo, setDescripcionEmpleo] = useState('');
  const [ubicacion, setUbicacion] = useState({
    latitude: 24.024741259631327, 
    longitude: -104.67021576328153,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  });

  const [mensajeEditable, setMensajeEditable] = useState('');


  const handleEnviarOferta = () => {
    const mensaje = `Estimado [Nombre del Candidato],
  
  Espero que este mensaje te encuentre bien. Me complace informarte que, después de revisar tu perfil en nuestra aplicación de contrataciones de personal, hemos identificado que cumples con los requisitos necesarios para una oportunidad laboral en nuestra empresa.
  
  Estamos interesados en conocerte mejor y explorar la posibilidad de que te unas a nuestro equipo. Tu experiencia y habilidades son altamente valoradas y creemos que podrías aportar mucho a nuestro proyecto.
  
  A continuación, te brindo más detalles sobre la oferta de empleo:
  
  Nombre del puesto: ${puestoEmpleo}
  Requisitos: ${requisitos}
  Expectativas salariales: ${salario}
  Horario de trabajo: ${horaEntrada} a ${horaSalida}
  Ubicación: ${ubicacion.latitude}, ${ubicacion.longitude}
  Descripción: ${descripcionEmpleo}
  
  Si estás interesado en esta oportunidad, nos encantaría conocer más sobre ti y tu interés en nuestra empresa. Por favor, confírmanos tu disponibilidad para una entrevista, y nos pondremos en contacto contigo para programarla.
  
  Si tienes alguna pregunta adicional o necesitas más información, no dudes en contactarnos. Estamos emocionados de explorar esta oportunidad contigo y esperamos conocer tu potencial como parte de nuestro equipo.
  
  ¡Gracias por tu tiempo y consideración!
  
  Atentamente,
  
  [Nombre de la Empresa]
  [Información de Contacto]
  `;
  
  setMensajeEditable(mensaje);
  navigation.navigate('MensajeOferta', { mensaje });
};

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setUbicacion({
      ...ubicacion,
      latitude,
      longitude,
    });
  };

  const renderHorarioPicker = () => {
    if (Platform.OS === 'ios') {
      return (
        <>
          <Text style={styles.pickerLabel}>Hora de entrada:</Text>
          <DatePickerIOS
            date={horaEntrada}
            onDateChange={setHoraEntrada}
            mode="time"
            minuteInterval={15}
          />

          <Text style={styles.pickerLabel}>Hora de salida:</Text>
          <DatePickerIOS
            date={horaSalida}
            onDateChange={setHoraSalida}
            mode="time"
            minuteInterval={15}
          />
        </>
      );
    } else {
        
      return (
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Hora de entrada:</Text>
          <Picker
            selectedValue={horaEntrada}
            onValueChange={(itemValue) => setHoraEntrada(itemValue)}
            style={styles.picker}
          >
            {renderHoras()}
          </Picker>

          <Text style={styles.pickerLabel}>Hora de salida:</Text>
          <Picker
            selectedValue={horaSalida}
            onValueChange={(itemValue) => setHoraSalida(itemValue)}
            style={styles.picker}
          >
            {renderHoras()}
          </Picker>
        </View>
      );
    }
  };

  const renderHoras = () => {
    const horas = [];
    for (let i = 1; i <= 12; i++) {
      const horaAM = `${i.toString().padStart(2, '0')}:00 AM`;
      const horaPM = `${i.toString().padStart(2, '0')}:00 PM`;
      horas.push(<Picker.Item label={horaAM} value={horaAM} key={horaAM} />);
      horas.push(<Picker.Item label={horaPM} value={horaPM} key={horaPM} />);
    }
    return horas;
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.titulo}>Redacta la información del empleo</Text>
        <Text style={styles.labelAdvertencia}>Por favor asegurate de que todo esté correctamente redactado y que todos los campos sean correctos</Text>
        <Text style={styles.label}>Puesto de empleo:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ejemplo: Chef auxiliar"
          value={puestoEmpleo}
          onChangeText={setPuestoEmpleo}
        />
        <Text style={styles.label}>Requisitos:</Text>
        <TextInput
          style={styles.input}
          placeholder="Requisitos clave a cumplir"
          value={requisitos}
          onChangeText={setRequisitos}
        />
        <Text style={styles.label}>Horario de trabajo:</Text>
        {renderHorarioPicker()}
        <Text style={styles.label}>Expectativas salariales:</Text>
        <TextInput
          style={styles.input}
          placeholder="Indica las expectativas salariales o menciona que se discutirán durante el proceso de entrevista"
          value={salario}
          onChangeText={setSalario}
          multiline
        />
        <Text style={styles.label}>Descripción del empleo:</Text>
        <TextInput
          style={styles.inputDescripcion}
          placeholder="Breve descripción de las responsabilidades y funciones del puesto"
          value={descripcionEmpleo}
          onChangeText={setDescripcionEmpleo}
          multiline
        />
        <Text style={styles.label}>Ubicación de la empresa o empleo:</Text>
        <Text style={styles.labelUbicacion}>*Presiona sobre el mapa para seleccionar la ubicación*</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: ubicacion.latitude,
            longitude: ubicacion.longitude,
            latitudeDelta: ubicacion.latitudeDelta,
            longitudeDelta: ubicacion.longitudeDelta,
          }}
          onPress={handleMapPress}
        >
          <Marker coordinate={{ latitude: ubicacion.latitude, longitude: ubicacion.longitude }} />
        </MapView>

        <TouchableOpacity style={styles.botonEnviar} onPress={handleEnviarOferta}>
          <Text style={styles.textoBotonEnviar}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',

  },
  labelUbicacion: {
    fontSize: 2,
    marginBottom: 10,
  },
  labelAdvertencia: {
    fontSize: 15,
    marginBottom: 25,
    color: COLORS.primary
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  inputDescripcion: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    height: 100,
    textAlignVertical: 'top',
  },
  botonEnviar: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  textoBotonEnviar: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pickerContainer: {
    marginBottom: 20,
  },
  pickerLabel: {
    fontSize: 15,
    marginBottom: 5,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  map: {
    flex: 1,
    height: 200,
    marginBottom: 20,
    marginTop: 10
  },
});

export default EnviarOferta;
