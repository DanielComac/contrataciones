import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable, TextInput, ScrollView, Animated, Alert, BackHandler, Modal } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { firestore } from '../firebase-config';
import { collection, query, onSnapshot } from 'firebase/firestore';

import COLORS from '../temas/colors';
import Button from '../componentes/Button';


const HomeScreenEmpresa = () => {
  const navigation = useNavigation();
  const [mostrarFormulario, setMostrarFormulario] = useState(null);
  const [animacion] = useState(new Animated.Value(0));
  const [saludo, setSaludo] = useState('');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [filtrosSeleccionados, setFiltrosSeleccionados] = useState([]);
  const [infoEmpresa, setInfoEmpresa] = useState([]);
  const [valorBusqueda, setValorBusqueda] = useState('');

  useEffect(() => {
    const collectionRef = collection(firestore, 'empresa');
    const q = query(collectionRef);

    const unsuscribe = onSnapshot(q, (querySnapshop) => {
      setInfoEmpresa(
        querySnapshop.docs.map((doc) => ({
          id: doc.id,
          nombre: doc.data().nombre,
          descripcion: doc.data().descripcion,
          correoElectronico: doc.data().correoElectronico,
          telefono: doc.data().telefono,
          disponibilidad: doc.data().disponibilidad,
          genero: doc.data().genero,
          edad: doc.data().edad,
          estudios: doc.data().estudios,
          experienciaLaboral: doc.data().experienciaLaboral,
          categoria: doc.data().categoria,
          puestoTrabajo: doc.data().puestoTrabajo,
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
  };

  const filtrarCandidatos = () => {
    let candidatosFiltrados = infoEmpresa;

    if (filtrosSeleccionados.length > 0) {
      candidatosFiltrados = candidatosFiltrados.filter((candidato) => {
        return filtrosSeleccionados.every((filtro) => {
          if (filtro === 'Medio tiempo' || filtro === 'Tiempo completo') {
            return candidato.disponibilidad === filtro;
          } else if (filtro === 'Masculino' || filtro === 'Femenino') {
            return candidato.genero === filtro;
          } else if (filtro === 'Restaurantería') {
            return candidato.categoria === filtro;
          } else if (filtro === 'Chef o cocinero' || filtro === 'Sous chef' || filtro === 'Maitre' || filtro === 'Camarero o mesero' || filtro === 'Bartender' || filtro === 'Barista' || filtro === 'Recepcionista' || filtro === 'Auxiliar de cocina' || filtro === 'Personal de limpieza') {
            return candidato.puestoTrabajo === filtro;
          }
          return false;
        });
      });
    }

    if (valorBusqueda.trim() !== '') {
      const busquedaMinuscula = valorBusqueda.toLowerCase();
      candidatosFiltrados = candidatosFiltrados.filter((candidato) => {
        const nombreMinuscula = candidato.nombre.toLowerCase();
        return nombreMinuscula.includes(busquedaMinuscula);
      });
    }

    return candidatosFiltrados;
  };

  
  const candidatosFiltrados = filtrarCandidatos();

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
                      styles.filtroOption,
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
                      styles.filtroOption,
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
                      styles.filtroOption,
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
                      styles.filtroOption,
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
                      styles.filtroOption,
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
                      styles.filtroOption,
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
                      styles.filtroOption,
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
                      styles.filtroOption,
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
                      styles.filtroOption,
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
            </View>
          )}
        </View>

        <Text style={styles.populares}>Candidatos</Text>

        <View style={styles.tarjetasContainer}>
          {candidatosFiltrados.map((dato) => (
            <View key={dato.id} style={styles.cartaEmpresa}>
              <Image
                source={require('../assets/persona1.jpg')}
                style={styles.imagenEmpresa}
                resizeMode="cover"
              />
              <Text style={styles.nombreEmpresa}>{dato.nombre}</Text>
              <Text style={styles.descripcionTituloPuesto}>Puesto a aplicar:</Text>
              <Text style={styles.descripcionPuesto}>{dato.puestoTrabajo}</Text>
            </View>
          ))}
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
