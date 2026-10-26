
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import { useHabits } from '../context/HabitsContext';

export default function HabitsScreen() {
  const { habits, toggleHabit, deleteHabit } = useHabits();

  function confirmarEliminacion(habito) {
    Alert.alert(
      'Eliminar hábito',
      `¿Querés eliminar "${habito.nombre}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => deleteHabit(habito.id),
        },
      ]
    );
  }

  function renderHabito({ item }) {
    return (
      <View style={styles.tarjeta}>
        <View style={styles.contenido}>
          <Text
            style={[
              styles.nombre,
              item.completadoHoy && styles.nombreCompletado,
            ]}
          >
            {item.nombre}
          </Text>

          {item.descripcion ? (
            <Text style={styles.descripcion}>
              {item.descripcion}
            </Text>
          ) : null}

          <Text
            style={[
              styles.estado,
              item.completadoHoy
                ? styles.estadoCompletado
                : styles.estadoPendiente,
            ]}
          >
            {item.completadoHoy
              ? 'Completado hoy'
              : 'Pendiente'}
          </Text>
        </View>

        <View style={styles.botones}>
          <TouchableOpacity
            style={[
              styles.botonCompletar,
              item.completadoHoy && styles.botonDesmarcar,
            ]}
            onPress={() => toggleHabit(item.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.textoBoton}>
              {item.completadoHoy ? 'Desmarcar' : 'Completar'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botonEliminar}
            onPress={() => confirmarEliminacion(item)}
            activeOpacity={0.8}
          >
            <Text style={styles.textoEliminar}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Mis hábitos</Text>

      <Text style={styles.subtitulo}>
        Registrá tus avances y mantené la constancia.
      </Text>

      <View style={styles.resumen}>
        <Text style={styles.textoResumen}>
          Total de hábitos: {habits.length}
        </Text>

        <Text style={styles.textoResumen}>
          Completados: {
            habits.filter((habito) => habito.completadoHoy).length
          }
        </Text>
      </View>

      <FlatList
        data={habits}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderHabito}
        contentContainerStyle={
          habits.length === 0 ? styles.listaVacia : styles.lista
        }
        ListEmptyComponent={
          <View style={styles.mensajeVacio}>
            <Text style={styles.iconoVacio}>📋</Text>

            <Text style={styles.tituloVacio}>
              Todavía no tenés hábitos
            </Text>

            <Text style={styles.textoVacio}>
              Entrá en la pestaña Nuevo hábito para registrar
              tu primera actividad.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    backgroundColor: '#F5F7FB',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#243B53',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 15,
    color: '#627D98',
    marginBottom: 20,
  },
  resumen: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    backgroundColor: '#E8EFFC',
    padding: 14,
    borderRadius: 10,
    marginBottom: 18,
    gap: 8,
  },
  textoResumen: {
    fontSize: 14,
    fontWeight: '600',
    color: '#243B53',
  },
  lista: {
    paddingBottom: 24,
  },
  listaVacia: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 30,
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },
  contenido: {
    marginBottom: 14,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#243B53',
    marginBottom: 6,
  },
  nombreCompletado: {
    textDecorationLine: 'line-through',
    color: '#829AB1',
  },
  descripcion: {
    fontSize: 14,
    color: '#627D98',
    lineHeight: 20,
    marginBottom: 8,
  },
  estado: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
  },
  estadoCompletado: {
    color: '#15803D',
  },
  estadoPendiente: {
    color: '#B45309',
  },
  botones: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  botonCompletar: {
    backgroundColor: '#2563EB',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  botonDesmarcar: {
    backgroundColor: '#64748B',
  },
  textoBoton: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  botonEliminar: {
    borderWidth: 1,
    borderColor: '#DC2626',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  textoEliminar: {
    color: '#DC2626',
    fontWeight: '600',
    fontSize: 13,
  },
  mensajeVacio: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconoVacio: {
    fontSize: 42,
    marginBottom: 12,
  },
  tituloVacio: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#243B53',
    marginBottom: 8,
    textAlign: 'center',
  },
  textoVacio: {
    fontSize: 14,
    color: '#627D98',
    textAlign: 'center',
    lineHeight: 21,
  },
});
