
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { useHabits } from '../context/HabitsContext';

export default function StatsScreen() {
  const { habits } = useHabits();

  const total = habits.length;

  const completados = habits.filter(
    (habito) => habito.completadoHoy
  ).length;

  const pendientes = total - completados;

  const porcentaje =
    total > 0 ? Math.round((completados / total) * 100) : 0;

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.contenedor}
    >
      <Text style={styles.titulo}>Estadísticas</Text>

      <Text style={styles.subtitulo}>
        Consultá cómo estás avanzando con tus hábitos.
      </Text>

      <View style={styles.tarjetaPrincipal}>
        <Text style={styles.etiquetaPrincipal}>
          Cumplimiento de hoy
        </Text>

        <Text style={styles.porcentaje}>
          {porcentaje}%
        </Text>

        <View style={styles.barraFondo}>
          <View
            style={[
              styles.barraProgreso,
              { width: `${porcentaje}%` },
            ]}
          />
        </View>

        <Text style={styles.textoPrincipal}>
          {completados} de {total} hábitos completados
        </Text>
      </View>

      <Text style={styles.tituloSeccion}>
        Resumen general
      </Text>

      <View style={styles.tarjeta}>
        <View style={styles.fila}>
          <Text style={styles.etiqueta}>Total de hábitos</Text>
          <Text style={styles.valor}>{total}</Text>
        </View>

        <View style={styles.separador} />

        <View style={styles.fila}>
          <Text style={styles.etiqueta}>Completados</Text>
          <Text style={[styles.valor, styles.verde]}>
            {completados}
          </Text>
        </View>

        <View style={styles.separador} />

        <View style={styles.fila}>
          <Text style={styles.etiqueta}>Pendientes</Text>
          <Text style={[styles.valor, styles.naranja]}>
            {pendientes}
          </Text>
        </View>
      </View>

      <Text style={styles.tituloSeccion}>
        Detalle de hábitos
      </Text>

      {habits.length === 0 ? (
        <View style={styles.tarjeta}>
          <Text style={styles.mensajeVacio}>
            Todavía no hay hábitos para mostrar.
            Registrá uno desde la pestaña Nuevo hábito.
          </Text>
        </View>
      ) : (
        habits.map((habito) => (
          <View key={habito.id} style={styles.tarjetaHabito}>
            <View style={styles.filaHabito}>
              <View style={styles.detalleHabito}>
                <Text style={styles.nombreHabito}>
                  {habito.nombre}
                </Text>

                {habito.descripcion ? (
                  <Text style={styles.descripcion}>
                    {habito.descripcion}
                  </Text>
                ) : null}
              </View>

              <View
                style={[
                  styles.etiquetaEstado,
                  habito.completadoHoy
                    ? styles.fondoVerde
                    : styles.fondoNaranja,
                ]}
              >
                <Text
                  style={[
                    styles.textoEstado,
                    habito.completadoHoy
                      ? styles.verde
                      : styles.naranja,
                  ]}
                >
                  {habito.completadoHoy
                    ? 'Completado'
                    : 'Pendiente'}
                </Text>
              </View>
            </View>
          </View>
        ))
      )}

      <Text style={styles.nota}>
        Estas estadísticas representan el estado actual de
        los hábitos. Todavía no se conserva un historial por día.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  contenedor: {
    padding: 22,
    paddingBottom: 35,
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
    lineHeight: 22,
    marginBottom: 22,
  },
  tarjetaPrincipal: {
    backgroundColor: '#243B53',
    borderRadius: 16,
    padding: 22,
    marginBottom: 26,
  },
  etiquetaPrincipal: {
    fontSize: 15,
    color: '#D9E2EC',
  },
  porcentaje: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginVertical: 12,
  },
  barraFondo: {
    height: 9,
    backgroundColor: '#486581',
    borderRadius: 5,
    overflow: 'hidden',
  },
  barraProgreso: {
    height: 9,
    backgroundColor: '#68D391',
    borderRadius: 5,
  },
  textoPrincipal: {
    color: '#FFFFFF',
    fontSize: 13,
    marginTop: 12,
  },
  tituloSeccion: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#243B53',
    marginBottom: 13,
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 18,
    marginBottom: 25,
    elevation: 2,
  },
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  etiqueta: {
    fontSize: 15,
    color: '#486581',
  },
  valor: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#243B53',
  },
  verde: {
    color: '#15803D',
  },
  naranja: {
    color: '#B45309',
  },
  separador: {
    height: 1,
    backgroundColor: '#E6EDF5',
    marginVertical: 6,
  },
  tarjetaHabito: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    elevation: 1,
  },
  filaHabito: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  detalleHabito: {
    flex: 1,
  },
  nombreHabito: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#243B53',
    marginBottom: 5,
  },
  descripcion: {
    fontSize: 13,
    color: '#627D98',
    lineHeight: 19,
  },
  etiquetaEstado: {
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
  fondoVerde: {
    backgroundColor: '#DCFCE7',
  },
  fondoNaranja: {
    backgroundColor: '#FEF3C7',
  },
  textoEstado: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  mensajeVacio: {
    color: '#627D98',
    fontSize: 14,
    lineHeight: 22,
  },
  nota: {
    color: '#829AB1',
    fontSize: 12,
    lineHeight: 19,
    marginTop: 12,
  },
});
