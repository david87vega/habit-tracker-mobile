
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { useHabits } from '../context/HabitsContext';

export default function HomeScreen({ navigation }) {
  const { habits } = useHabits();

  const total = habits.length;

  const completados = habits.filter(
    (habito) => habito.completadoHoy
  ).length;

  const pendientes = total - completados;

  const porcentaje =
    total > 0 ? Math.round((completados / total) * 100) : 0;

  const habitosPendientes = habits.filter(
    (habito) => !habito.completadoHoy
  );

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.contenedor}
    >
      <Text style={styles.saludo}>¡Hola!</Text>

      <Text style={styles.titulo}>
        Tu progreso de hoy
      </Text>

      <Text style={styles.subtitulo}>
        Cada pequeño paso cuenta para construir buenos hábitos.
      </Text>

      <View style={styles.tarjetaPrincipal}>
        <Text style={styles.etiquetaProgreso}>
          Cumplimiento diario
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

        <Text style={styles.textoProgreso}>
          {completados} de {total} hábitos completados
        </Text>
      </View>

      <View style={styles.resumen}>
        <View style={styles.tarjetaResumen}>
          <Text style={styles.numero}>{total}</Text>
          <Text style={styles.etiqueta}>Total</Text>
        </View>

        <View style={styles.tarjetaResumen}>
          <Text style={[styles.numero, styles.verde]}>
            {completados}
          </Text>
          <Text style={styles.etiqueta}>Completados</Text>
        </View>

        <View style={styles.tarjetaResumen}>
          <Text style={[styles.numero, styles.naranja]}>
            {pendientes}
          </Text>
          <Text style={styles.etiqueta}>Pendientes</Text>
        </View>
      </View>

      <View style={styles.seccion}>
        <Text style={styles.tituloSeccion}>
          Hábitos pendientes
        </Text>

        {habitosPendientes.length === 0 ? (
          <View style={styles.mensaje}>
            <Text style={styles.mensajeTitulo}>
              {total === 0
                ? 'Todavía no registraste hábitos'
                : '¡Excelente trabajo!'}
            </Text>

            <Text style={styles.mensajeTexto}>
              {total === 0
                ? 'Creá tu primer hábito para comenzar.'
                : 'Completaste todos tus hábitos registrados.'}
            </Text>
          </View>
        ) : (
          habitosPendientes.slice(0, 3).map((habito) => (
            <View key={habito.id} style={styles.itemHabito}>
              <View style={styles.punto} />

              <Text style={styles.nombreHabito}>
                {habito.nombre}
              </Text>
            </View>
          ))
        )}
      </View>

      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate('Nuevo hábito')}
        activeOpacity={0.8}
      >
        <Text style={styles.textoBoton}>
          + Registrar nuevo hábito
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botonSecundario}
        onPress={() => navigation.navigate('Mis hábitos')}
        activeOpacity={0.8}
      >
        <Text style={styles.textoBotonSecundario}>
          Ver todos mis hábitos
        </Text>
      </TouchableOpacity>
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
  saludo: {
    fontSize: 16,
    color: '#627D98',
    marginBottom: 5,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#243B53',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 14,
    lineHeight: 21,
    color: '#627D98',
    marginBottom: 24,
  },
  tarjetaPrincipal: {
    backgroundColor: '#243B53',
    borderRadius: 16,
    padding: 22,
    marginBottom: 18,
  },
  etiquetaProgreso: {
    fontSize: 15,
    color: '#D9E2EC',
  },
  porcentaje: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginVertical: 10,
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
  textoProgreso: {
    color: '#FFFFFF',
    fontSize: 13,
    marginTop: 12,
  },
  resumen: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 26,
  },
  tarjetaResumen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 17,
    paddingHorizontal: 5,
    alignItems: 'center',
    elevation: 2,
  },
  numero: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#243B53',
    marginBottom: 5,
  },
  etiqueta: {
    fontSize: 12,
    color: '#627D98',
    textAlign: 'center',
  },
  verde: {
    color: '#15803D',
  },
  naranja: {
    color: '#B45309',
  },
  seccion: {
    marginBottom: 22,
  },
  tituloSeccion: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#243B53',
    marginBottom: 13,
  },
  mensaje: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 18,
  },
  mensajeTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#243B53',
    marginBottom: 6,
  },
  mensajeTexto: {
    fontSize: 14,
    color: '#627D98',
    lineHeight: 21,
  },
  itemHabito: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 9,
  },
  punto: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#F59E0B',
    marginRight: 12,
  },
  nombreHabito: {
    flex: 1,
    fontSize: 15,
    color: '#334E68',
  },
  boton: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  botonSecundario: {
    borderWidth: 1,
    borderColor: '#2563EB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotonSecundario: {
    color: '#2563EB',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
