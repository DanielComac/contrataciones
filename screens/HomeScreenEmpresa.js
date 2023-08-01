import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable, TextInput, ScrollView, Animated, Alert, BackHandler, Modal } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { firestore } from '../firebase-config';
import { collection, query, onSnapshot } from 'firebase/firestore';


import COLORS from '../temas/colors';


const HomeScreenEmpresa = () => {
  const navigation = useNavigation();
  const [mostrarFormulario, setMostrarFormulario] = useState(null);
  const [animacion] = useState(new Animated.Value(0));
  const [saludo, setSaludo] = useState('');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [filtrosSeleccionados, setFiltrosSeleccionados] = useState([]);
  const [infoEmpresa, setInfoEmpresa] = useState([]);
  const [valorBusqueda, setValorBusqueda] = useState('');

  const verPerfilCandidato = (candidato) => {
    // Navega a la pantalla de perfil del candidato y pasa el objeto candidato como parámetro
    navigation.navigate('PerfilCandidato', { candidato });
  };

  useEffect(() => {
    const collectionRef = collection(firestore, 'users');
    const q = query(collectionRef);

    const unsuscribe = onSnapshot(q, (querySnapshop) => {
      setInfoEmpresa(
        querySnapshop.docs.map((doc) => ({
          id: doc.id,
          nombre: doc.data().nombre,
          numeroCelular: doc.data().numeroCelular,
          genero: doc.data().genero,
          ciudad: doc.data().ciudad,
          colonia: doc.data().colonia,
          codigoPostal: doc.data().codigoPostal,
          puestoTrabajo: doc.data().puestoTrabajo,
          estudios: doc.data().estudios,
          experiencia: doc.data().experiencia,
          ingles: doc.data().ingles,
          disponibilidad: doc.data().disponibilidad,
          campoTrabajo: doc.data().campoTrabajo,
          privilegio: doc.data().privilegio,
        }))
      );
    });

    return unsuscribe;
  }, []);

  useEffect(() => {
    // Obtiene la hora actual
    const currentHour = new Date().getHours();

    // Define el saludo según la hora actual
    if (currentHour < 12) {
      setSaludo('Buenos días');
    } else if (currentHour < 18) {
      setSaludo('Buenas tardes');
    } else {
      setSaludo('Buenas noches');
    }
  }, []);

  const toggleFiltros = () => {
    setMostrarFiltros(!mostrarFiltros);
  };

  const handleFiltroSeleccionado = (filtro) => {
    if (filtro === 'Restaurantería' && filtrosSeleccionados.includes('Restaurantería')) {
      // Si "Restaurantería" ya está seleccionado, eliminamos los filtros de las subcategorías
      setFiltrosSeleccionados((prevFiltros) =>
        prevFiltros.filter((f) => !f.startsWith('Restaurantería'))
      );
    } else {
      const index = filtrosSeleccionados.indexOf(filtro);
      if (index !== -1) {
        // Si el filtro ya está seleccionado, lo removemos de la lista de filtros seleccionados
        setFiltrosSeleccionados((prevFiltros) => [
          ...prevFiltros.slice(0, index),
          ...prevFiltros.slice(index + 1),
        ]);
      } else {
        // Si el filtro no está seleccionado, lo agregamos a la lista de filtros seleccionados
        setFiltrosSeleccionados((prevFiltros) => [...prevFiltros, filtro]);
      }
    }
  };

  const filtrarCandidatos = () => {
    let candidatosFiltrados = infoEmpresa;


    if (valorBusqueda.trim() !== '') {
      const busquedaMinuscula = valorBusqueda.toLowerCase();
      candidatosFiltrados = candidatosFiltrados.filter((candidato) => {
        const nombreMinuscula = candidato.nombre?.toLowerCase();
        return nombreMinuscula && nombreMinuscula.includes(busquedaMinuscula);
      });
    }


    if (filtrosSeleccionados.length > 0) {
      candidatosFiltrados = candidatosFiltrados.filter((candidato) => {
        return filtrosSeleccionados.every((filtro) => {
          if (filtro === 'Medio tiempo' || filtro === 'Tiempo completo') {
            return candidato.disponibilidad === filtro;
          } else if (filtro === 'Masculino' || filtro === 'Femenino') {
            return candidato.genero === filtro;
          } else if (filtro === 'Restaurantería') {
            return candidato.campoTrabajo === filtro;
          } else if (filtro === 'Chef o cocinero' || filtro === 'Sous chef' || filtro === 'Maitre' || filtro === 'Camarero o mesero' || filtro === 'Bartender' || filtro === 'Barista' || filtro === 'Recepcionista' || filtro === 'Auxiliar de cocina' || filtro === 'Personal de limpieza') {
            return candidato.puestoTrabajo === filtro;
          } else if (filtro === 'Educación y enseñanza') {
            return candidato.campoTrabajo === filtro;
          } else if (filtro === 'Profesor(a) general' || filtro === 'Profesor(a) de preescolar' || filtro === 'Profesor(a) de primaria' || filtro === 'Profesor(a) de secundaria' || filtro === 'Profesor(a) de universidad' || filtro === 'Tutor o particular' || filtro === 'Instructor de idiomas' || filtro === 'Educación especial') {
            return candidato.puestoTrabajo === filtro;
          } else if (filtro === 'Tecnología e informatica') {
            return candidato.campoTrabajo === filtro;
          } else if (filtro === 'Desarrollador de software' || filtro === 'Ingeniero de sistemas' || filtro === 'Diseñador UX/UI' || filtro === 'Seguridad informática' || filtro === 'Analista de datos' || filtro === 'Soporte técnico') {
            return candidato.puestoTrabajo === filtro;
          } else if (filtro === 'Salud y cuidado personal') {
            return candidato.campoTrabajo === filtro;
          } else if (filtro === 'Enfermería' || filtro === 'Médico general' || filtro === 'Terapeuta físico' || filtro === 'Asistente de cuidado de ancianos' || filtro === 'Nutricionista' || filtro === 'Masajista' || filtro === 'Masajista') {
            return candidato.puestoTrabajo === filtro;
          }
          return false;
        });
      });
    }

    return candidatosFiltrados;
  };

  
  const candidatosFiltrados = filtrarCandidatos();

  const mostrarTarjeta = (dato) => {
    const infoCompleta =
      dato.nombre && dato.puestoTrabajo && dato.campoTrabajo;
    
    if (!infoCompleta) {
      return null;
    }
    return (
      <TouchableOpacity
        key={dato.id}
        style={styles.cartaEmpresa}
        onPress={() => verPerfilCandidato(dato)}
      >
        <View>
          <Image
            source={require('../assets/persona1.jpg')}
            style={styles.imagenEmpresa}
            resizeMode="cover"
          />
          <Text style={styles.nombreEmpresa}>{dato.nombre}</Text>
          <Text style={styles.descripcionTituloPuesto}>Puesto a aplicar:</Text>
          <Text style={styles.descripcionPuesto}>{dato.puestoTrabajo}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      <LinearGradient style={{ flex: 1 }} colors={[COLORS.back, COLORS.back]}>
        <Text style={styles.titulo}>Inicio</Text>
        <Text style={styles.saludo}>Hola, {saludo}</Text>

        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar Candidatos"
              value={valorBusqueda}
              onChangeText={setValorBusqueda}
            />
          </View>

          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons name="search-outline" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.filtrosContainer}>
          <TouchableOpacity onPress={toggleFiltros} style={styles.filtrosBtn}>
            <Text style={styles.filtrosText}>Búsqueda por filtros</Text>
            <Ionicons
              name={mostrarFiltros ? 'chevron-up-outline' : 'chevron-down-outline'}
              size={24}
              color={COLORS.primary}
            />
          </TouchableOpacity>

          {mostrarFiltros && (
            <View style={styles.filtrosLista}>
              <Text style={styles.filtrosCategoria}>Disponibilidad</Text>
              <TouchableOpacity
                style={[
                  styles.filtroOption,
                  filtrosSeleccionados.includes('Medio tiempo') && styles.filtroOptionSelected,
                ]}
                onPress={() => handleFiltroSeleccionado('Medio tiempo')}
              >
                <Text
                  style={[
                    styles.filtroText,
                    filtrosSeleccionados.includes('Medio tiempo') && styles.filtroTextSelected,
                  ]}
                >
                  Medio tiempo
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filtroOption,
                  filtrosSeleccionados.includes('Tiempo completo') && styles.filtroOptionSelected,
                ]}
                onPress={() => handleFiltroSeleccionado('Tiempo completo')}
              >
                <Text
                  style={[
                    styles.filtroText,
                    filtrosSeleccionados.includes('Tiempo completo') && styles.filtroTextSelected,
                  ]}
                >
                  Tiempo completo
                </Text>
              </TouchableOpacity>

              <Text style={styles.filtrosCategoria}>Género</Text>
              <TouchableOpacity
                style={[
                  styles.filtroOption,
                  filtrosSeleccionados.includes('Masculino') && styles.filtroOptionSelected,
                ]}
                onPress={() => handleFiltroSeleccionado('Masculino')}
              >
                <Text
                  style={[
                    styles.filtroText,
                    filtrosSeleccionados.includes('Masculino') && styles.filtroTextSelected,
                  ]}
                >
                  Masculino
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filtroOption,
                  filtrosSeleccionados.includes('Femenino') && styles.filtroOptionSelected,
                ]}
                onPress={() => handleFiltroSeleccionado('Femenino')}
              >
                <Text
                  style={[
                    styles.filtroText,
                    filtrosSeleccionados.includes('Femenino') && styles.filtroTextSelected,
                  ]}
                >
                  Femenino
                </Text>
              </TouchableOpacity>



              <Text style={styles.filtrosCategoria}>Puesto de trabajo</Text>
              <TouchableOpacity
                style={[
                  styles.filtroOption,
                  filtrosSeleccionados.includes('Restaurantería') && styles.filtroOptionSelected,
                ]}
                onPress={() => handleFiltroSeleccionado('Restaurantería')}
              >
                <Text
                  style={[
                    styles.filtroText,
                    filtrosSeleccionados.includes('Restaurantería') && styles.filtroTextSelected,
                  ]}
                >
                  Restaurantería
                </Text>
              </TouchableOpacity>
              {filtrosSeleccionados.includes('Restaurantería') && (
                <View style={styles.subcategoriaContainer}>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Chef o cocinero') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Chef o cocinero')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Chef o cocinero') && styles.filtroTextSelected,
                      ]}
                    >
                      Chef o cocinero
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Sous chef') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Sous chef')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Sous chef') && styles.filtroTextSelected,
                      ]}
                    >
                      Sous chef
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Maitre') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Maitre')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Maitre') && styles.filtroTextSelected,
                      ]}
                    >
                      Maitre
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Camarero o mesero') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Camarero o mesero')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Camarero o mesero') && styles.filtroTextSelected,
                      ]}
                    >
                      Camarero o mesero
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Bartender') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Bartender')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Bartender') && styles.filtroTextSelected,
                      ]}
                    >
                      Bartender
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Barista') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Barista')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Barista') && styles.filtroTextSelected,
                      ]}
                    >
                      Barista
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Recepcionista') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Recepcionista')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Recepcionista') && styles.filtroTextSelected,
                      ]}
                    >
                      Recepcionista
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Auxiliar de cocina') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Auxiliar de cocina')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Auxiliar de cocina') && styles.filtroTextSelected,
                      ]}
                    >
                      Auxiliar de cocina
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Personal de limpieza') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Personal de limpieza')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Personal de limpieza') && styles.filtroTextSelected,
                      ]}
                    >
                      Personal de limpieza
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

{/* -------------------------------------------------------------------------------------------*/}
              <TouchableOpacity
                style={[
                  styles.filtroOption,
                  filtrosSeleccionados.includes('Educación y enseñanza') && styles.filtroOptionSelected,
                ]}
                onPress={() => handleFiltroSeleccionado('Educación y enseñanza')}
              >
                <Text
                  style={[
                    styles.filtroText,
                    filtrosSeleccionados.includes('Educación y enseñanza') && styles.filtroTextSelected,
                  ]}
                >
                  Educación y enseñanza
                </Text>
              </TouchableOpacity>
              {filtrosSeleccionados.includes('Educación y enseñanza') && (
                <View style={styles.subcategoriaContainer}>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Profesor(a) general') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Profesor(a) general')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Profesor(a) general') && styles.filtroTextSelected,
                      ]}
                    >
                      Profesor(a) general
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Profesor(a) de preescolar') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Profesor(a) de preescolar')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Profesor(a) de preescolar') && styles.filtroTextSelected,
                      ]}
                    >
                      Profesor(a) de preescolar
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Profesor(a) de primaria') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Profesor(a) de primaria')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Profesor(a) de primaria') && styles.filtroTextSelected,
                      ]}
                    >
                      Profesor(a) de primaria
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Profesor(a) de secundaria') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Profesor(a) de secundaria')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Profesor(a) de secundaria') && styles.filtroTextSelected,
                      ]}
                    >
                      Profesor(a) de secundaria
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Profesor(a) de universidad') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Profesor(a) de universidad')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Profesor(a) de universidad') && styles.filtroTextSelected,
                      ]}
                    >
                      Profesor(a) de universidad
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Tutor o particular') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Tutor o particular')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Tutor o particular') && styles.filtroTextSelected,
                      ]}
                    >
                      Tutor o particular
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Instructor de idiomas') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Instructor de idiomas')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Instructor de idiomas') && styles.filtroTextSelected,
                      ]}
                    >
                      Instructor de idiomas
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Educación especial') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Educación especial')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Educación especial') && styles.filtroTextSelected,
                      ]}
                    >
                      Educación especial
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

{/* -------------------------------------------------------------------------------------- */}

              <TouchableOpacity
                style={[
                  styles.filtroOption,
                  filtrosSeleccionados.includes('Tecnología e informática') && styles.filtroOptionSelected,
                ]}
                onPress={() => handleFiltroSeleccionado('Tecnología e informática')}
              >
                <Text
                  style={[
                    styles.filtroText,
                    filtrosSeleccionados.includes('Tecnología e informática') && styles.filtroTextSelected,
                  ]}
                >
                  Tecnología e informática
                </Text>
              </TouchableOpacity>
              {filtrosSeleccionados.includes('Tecnología e informática') && (
                <View style={styles.subcategoriaContainer}>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Desarrollador de software') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Desarrollador de software')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Desarrollador de software') && styles.filtroTextSelected,
                      ]}
                    >
                      Desarrollador de software
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Ingeniero de sistemas') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Ingeniero de sistemas')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Ingeniero de sistemas') && styles.filtroTextSelected,
                      ]}
                    >
                      Ingeniero de sistemas
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Diseñador UX/UI') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Diseñador UX/UI')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Diseñador UX/UI') && styles.filtroTextSelected,
                      ]}
                    >
                      Diseñador UX/UI
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Seguridad informática') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Seguridad informática')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Seguridad informática') && styles.filtroTextSelected,
                      ]}
                    >
                      Seguridad informática
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Analista de datos') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Analista de datos')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Analista de datos') && styles.filtroTextSelected,
                      ]}
                    >
                      Analista de datos
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Soporte técnico') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Soporte técnico')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Soporte técnico') && styles.filtroTextSelected,
                      ]}
                    >
                      Soporte técnico
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

{/* -------------------------------------------------------------------------------------- */}

              
              <TouchableOpacity
                style={[
                  styles.filtroOption,
                  filtrosSeleccionados.includes('Salud y cuidado personal') && styles.filtroOptionSelected,
                ]}
                onPress={() => handleFiltroSeleccionado('Salud y cuidado personal')}
              >
                <Text
                  style={[
                    styles.filtroText,
                    filtrosSeleccionados.includes('Salud y cuidado personal') && styles.filtroTextSelected,
                  ]}
                >
                  Salud y cuidado personal
                </Text>
              </TouchableOpacity>
              {filtrosSeleccionados.includes('Salud y cuidado personal') && (
                <View style={styles.subcategoriaContainer}>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Enfermería') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Enfermería')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Enfermería') && styles.filtroTextSelected,
                      ]}
                    >
                      Enfermería
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Médico general') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Médico general')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Médico general') && styles.filtroTextSelected,
                      ]}
                    >
                      Médico general
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Terapeuta físico') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Terapeuta físico')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Terapeuta físico') && styles.filtroTextSelected,
                      ]}
                    >
                      Terapeuta físico
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Asistente de cuidado de ancianos') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Asistente de cuidado de ancianos')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Asistente de cuidado de ancianos') && styles.filtroTextSelected,
                      ]}
                    >
                      Asistente de cuidado de ancianos
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Nutricionista') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Nutricionista')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Nutricionista') && styles.filtroTextSelected,
                      ]}
                    >
                      Nutricionista
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Masajista') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Masajista')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Masajista') && styles.filtroTextSelected,
                      ]}
                    >
                      Masajista
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

{/* -------------------------------------------------------------------------------------- */}

              <TouchableOpacity
                style={[
                  styles.filtroOption,
                  filtrosSeleccionados.includes('Recursos humanos y aministración') && styles.filtroOptionSelected,
                ]}
                onPress={() => handleFiltroSeleccionado('Recursos humanos y aministración')}
              >
                <Text
                  style={[
                    styles.filtroText,
                    filtrosSeleccionados.includes('Recursos humanos y aministración') && styles.filtroTextSelected,
                  ]}
                >
                  Recursos humanos y aministración
                </Text>
              </TouchableOpacity>
              {filtrosSeleccionados.includes('Recursos humanos y aministración') && (
                <View style={styles.subcategoriaContainer}>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Especialista en recursos humanos') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Especialista en recursos humanos')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Especialista en recursos humanos') && styles.filtroTextSelected,
                      ]}
                    >
                      Especialista en recursos humanos
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Asistente administrativo') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Asistente administrativo')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Asistente administrativo') && styles.filtroTextSelected,
                      ]}
                    >
                      Asistente administrativo
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Coordinador de eventos') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Coordinador de eventos')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Coordinador de eventos') && styles.filtroTextSelected,
                      ]}
                    >
                      Coordinador de eventos
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Asistente ejecutivo') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Asistente ejecutivo')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Asistente ejecutivo') && styles.filtroTextSelected,
                      ]}
                    >
                      Asistente ejecutivo
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Analista de reclutamiento') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Analista de reclutamiento')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Analista de reclutamiento') && styles.filtroTextSelected,
                      ]}
                    >
                      Analista de reclutamiento
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

{/* -------------------------------------------------------------------------------------- */}

              <TouchableOpacity
                style={[
                  styles.filtroOption,
                  filtrosSeleccionados.includes('Arte y diseño') && styles.filtroOptionSelected,
                ]}
                onPress={() => handleFiltroSeleccionado('Arte y diseño')}
              >
                <Text
                  style={[
                    styles.filtroText,
                    filtrosSeleccionados.includes('Arte y diseño') && styles.filtroTextSelected,
                  ]}
                >
                  Arte y diseño
                </Text>
              </TouchableOpacity>
              {filtrosSeleccionados.includes('Arte y diseño') && (
                <View style={styles.subcategoriaContainer}>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Diseñador gráfico') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Diseñador gráfico')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Diseñador gráfico') && styles.filtroTextSelected,
                      ]}
                    >
                      Diseñador gráfico
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Ilustrador') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Ilustrador')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Ilustrador') && styles.filtroTextSelected,
                      ]}
                    >
                      Ilustrador
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Fotógrafo') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Fotógrafo')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Fotógrafo') && styles.filtroTextSelected,
                      ]}
                    >
                      Fotógrafo
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Animador') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Animador')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Animador') && styles.filtroTextSelected,
                      ]}
                    >
                      Animador
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Escenógrafo') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Escenógrafo')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Escenógrafo') && styles.filtroTextSelected,
                      ]}
                    >
                      Escenógrafo
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Director') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Director')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Director') && styles.filtroTextSelected,
                      ]}
                    >
                      Director
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

{/* -------------------------------------------------------------------------------------- */}

              <TouchableOpacity
                style={[
                  styles.filtroOption,
                  filtrosSeleccionados.includes('Empleos generales') && styles.filtroOptionSelected,
                ]}
                onPress={() => handleFiltroSeleccionado('Empleos generales')}
              >
                <Text
                  style={[
                    styles.filtroText,
                    filtrosSeleccionados.includes('Empleos generales') && styles.filtroTextSelected,
                  ]}
                >
                  Empleos generales
                </Text>
              </TouchableOpacity>
              {filtrosSeleccionados.includes('Empleos generales') && (
                <View style={styles.subcategoriaContainer}>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Cajero/a') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Cajero/a')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Cajero/a') && styles.filtroTextSelected,
                      ]}
                    >
                      Cajero/a
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Recepcionista') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Recepcionista')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Recepcionista') && styles.filtroTextSelected,
                      ]}
                    >
                      Recepcionista
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Auxiliar administrativo') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Auxiliar administrativo')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Auxiliar administrativo') && styles.filtroTextSelected,
                      ]}
                    >
                      Auxiliar administrativo
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Auxiliar de limpieza') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Auxiliar de limpieza')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Auxiliar de limpieza') && styles.filtroTextSelected,
                      ]}
                    >
                      Auxiliar de limpieza
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Auxiliar de cocina') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Auxiliar de cocina')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Auxiliar de cocina') && styles.filtroTextSelected,
                      ]}
                    >
                      Auxiliar de cocina
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Intendencia o mantenimiento') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Intendencia o mantenimiento')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Intendencia o mantenimiento') && styles.filtroTextSelected,
                      ]}
                    >
                      Intendencia o mantenimiento
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filtroOption2,
                      filtrosSeleccionados.includes('Conserje o portería') && styles.filtroOptionSelected,
                    ]}
                    onPress={() => handleFiltroSeleccionado('Conserje o portería')}
                  >
                    <Text
                      style={[
                        styles.filtroText,
                        filtrosSeleccionados.includes('Conserje o portería') && styles.filtroTextSelected,
                      ]}
                    >
                      Conserje o portería
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

{/* -------------------------------------------------------------------------------------- */}



            </View>
          )}
        </View>

        <Text style={styles.populares}>Candidatos</Text>

        <View style={styles.tarjetasContainer}>
          {candidatosFiltrados.map((dato) => {
            return mostrarTarjeta(dato);
          })}
        </View>
      </LinearGradient>
    </ScrollView>
  );
};




const styles = StyleSheet.create({
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: "8%",
    marginLeft: 16,
  },
  populares: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: "5%",
    marginLeft: "5%",
    marginBottom: "5%"
  },
  tarjetasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  cartaEmpresa: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    width: '48%',
    padding: 16,
    marginBottom: 10,
  },
  nombreEmpresa: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
    alignSelf: 'center'
  },
  descripcionTituloPuesto: {
    fontSize: 13,
    color: COLORS.black,
    marginBottom: 8,
    alignSelf: 'center'
  },
  descripcionPuesto: {
    fontSize: 13,
    color: COLORS.primary,
    marginBottom: 8,
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.back,
  },
  saludo: {
    fontSize: 25,
    marginLeft: 16,
    marginTop: "1%",
    color: COLORS.primary,
  },
  searchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: '0%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    height: '100%',
    marginLeft: '2.5%',
  },
  searchInput: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
  },
  searchBtn: {
    width: 48,
    height: 48,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '2%',
    marginRight: '2%',
  },
  imagenEmpresa: {
    width: 100,
    height: 100,
    borderRadius: 25,
    marginBottom: 8,
    alignSelf: 'center'
  },
  filtrosContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  filtrosBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  filtrosText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  filtrosLista: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 16,
  },
  filtroOption: {
    paddingVertical: 8,
    marginBottom: 8,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  filtroOption2: {
    paddingVertical: 8,
    marginBottom: 8,
    borderRadius: 8,
    paddingHorizontal: 30,
  },
  filtroOptionSelected: {
    backgroundColor: COLORS.primary,
  },
  filtroText: {
    fontSize: 16,
    color: COLORS.black,
  },
  filtroTextSelected: {
    color: COLORS.white,
  },
  filtrosCategoria: {
    fontWeight: 'bold',
    marginBottom: 10
  }
});

export default HomeScreenEmpresa;
