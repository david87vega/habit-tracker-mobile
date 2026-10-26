
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { useHabits } from '../context/HabitsContext';

export default function AddHabitScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const { addHabit } = useHabits();

  function guardarHabito() {
    if (!nombre.trim()) {
      Alert.alert(
        'Campo obligatorio',
        'Ingresá el nombre del hábito.'
      );
      return;
    }

    addHabit(nombre, descripcion);

    setNombre('');
    setDescripcion('');

    Alert.alert(
      'Registro exitoso',
      'El hábito se agregó correctamente.',
      [
        {
          text: 'Aceptar',
          onPress: () => navigation.navigate('Mis hábitos'),
        },
      ]
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.contenedorPrincipal}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.contenedor}>
        <Text style={styles.titulo}>Crear un hábito</Text>

        <Text style={styles.subtitulo}>
          Elegí una actividad que quieras incorporar a tu rutina.
        </Text>

        <Text style={styles.etiqueta}>Nombre del hábito *</Text>

        <TextInput
          style={styles.input}
          placeholder="Ej.: Leer 20 minutos"
          value={nombre}
          onChangeText={setNombre}
          maxLength={80}
          autoCapitalize="sentences"
        />

        <Text style={styles.etiqueta}>Descripción</Text>

        <TextInput
          style={[styles.input, styles.inputDescripcion]}
          placeholder="¿Qué querés lograr con este hábito?"
          value={descripcion}
          onChangeText={setDescripcion}
          multiline
          maxLength={250}
          textAlignVertical="top"
        />

        <TouchableOpacity
          style={styles.boton}
          onPress={guardarHabito}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBoton}>Guardar hábito</Text>
        </TouchableOpacity>

        <Text style={styles.nota}>
          * El nombre del hábito es obligatorio.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  contenedorPrincipal: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  contenedor: {
    padding: 24,
    flexGrow: 1,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#243B53',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 15,
    color: '#627D98',
    lineHeight: 22,
    marginBottom: 28,
  },
  etiqueta: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334E68',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D9E2EC',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 16,
    marginBottom: 22,
  },
  inputDescripcion: {
    minHeight: 110,
  },
  boton: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nota: {
    color: '#829AB1',
    fontSize: 13,
    marginTop: 14,
  },
});
