
import React, { useState, useRef } from 'react';
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
  Image,
} from 'react-native';

import { CameraView, useCameraPermissions } from 'expo-camera';

import { useHabits } from '../context/HabitsContext';
import AppLayout from '../components/AppLayout';

export default function AddHabitScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  // Estados de la cámara
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [fotoUri, setFotoUri] = useState(null);

  const cameraRef = useRef(null);

  const { addHabit } = useHabits();

  // Abrir cámara y solicitar permisos
  async function abrirCamara() {
    try {
      if (!permission?.granted) {
        const resultado = await requestPermission();

        if (!resultado.granted) {
          Alert.alert(
            'Permiso denegado',
            'Necesitás permitir el acceso a la cámara para tomar una fotografía.'
          );
          return;
        }
      }

      setShowCamera(true);

    } catch (error) {
      Alert.alert('Error', 'No se pudo acceder a la cámara.');
      console.error(error);
    }
  }

  // Capturar fotografía
  async function tomarFotografia() {
    try {
      if (!cameraRef.current) return;

      const foto = await cameraRef.current.takePictureAsync({
        quality: 0.5,
      });

      setFotoUri(foto.uri);
      setShowCamera(false);

    } catch (error) {
      Alert.alert('Error', 'No se pudo tomar la fotografía.');
      console.error(error);
    }
  }

  // Eliminar fotografía
  function eliminarFotografia() {
    setFotoUri(null);
  }

  // Guardar hábito
  function guardarHabito() {
    if (!nombre.trim()) {
      Alert.alert(
        'Campo obligatorio',
        'Ingresá el nombre del hábito.'
      );
      return;
    }

    // Guardar nombre, descripción y fotografía
    addHabit(nombre.trim(), descripcion.trim(), fotoUri);

    setNombre('');
    setDescripcion('');
    setFotoUri(null);

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

  // Pantalla de cámara
  if (showCamera) {
    return (
      <AppLayout>
        <View style={styles.cameraContainer}>
          <CameraView
            style={styles.cameraView}
            ref={cameraRef}
          />

          <View style={styles.cameraControls}>
            <TouchableOpacity
              style={styles.botonCapturar}
              onPress={tomarFotografia}
              activeOpacity={0.8}
            >
              <Text style={styles.textoBotonCamara}>
                Tomar fotografía
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botonCancelar}
              onPress={() => setShowCamera(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.textoBotonCamara}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </AppLayout>
    );
  }

  // Formulario principal
  return (
    <AppLayout>
      <KeyboardAvoidingView
        style={styles.contenedorPrincipal}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.contenedor}
          style={styles.scrollView}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.titulo}>Crear un hábito</Text>

          <Text style={styles.subtitulo}>
            Elegí una actividad que quieras incorporar a tu rutina.
          </Text>

          <Text style={styles.etiqueta}>
            Nombre del hábito *
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ej.: Leer 20 minutos"
            value={nombre}
            onChangeText={setNombre}
            maxLength={80}
            autoCapitalize="sentences"
          />

          <Text style={styles.etiqueta}>
            Descripción
          </Text>

          <TextInput
            style={[styles.input, styles.inputDescripcion]}
            placeholder="¿Qué querés lograr con este hábito?"
            value={descripcion}
            onChangeText={setDescripcion}
            multiline
            maxLength={250}
            textAlignVertical="top"
          />

          {/* Fotografía del hábito */}
          <Text style={styles.etiqueta}>
            Fotografía del hábito
          </Text>

          <TouchableOpacity
            style={styles.botonCamara}
            onPress={abrirCamara}
            activeOpacity={0.8}
          >
            <Text style={styles.textoBoton}>
              📷 Tomar fotografía
            </Text>
          </TouchableOpacity>

          {/* Vista previa de la fotografía */}
          {fotoUri && (
            <View style={styles.contenedorFoto}>
              <Image
                source={{ uri: fotoUri }}
                style={styles.fotoPreview}
                resizeMode="cover"
              />

              <TouchableOpacity
                style={styles.botonEliminarFoto}
                onPress={eliminarFotografia}
                activeOpacity={0.8}
              >
                <Text style={styles.textoBoton}>
                  ✕ Eliminar fotografía
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Guardar hábito */}
          <TouchableOpacity
            style={styles.boton}
            onPress={guardarHabito}
            activeOpacity={0.8}
          >
            <Text style={styles.textoBoton}>
              Guardar hábito
            </Text>
          </TouchableOpacity>

          <Text style={styles.nota}>
            * El nombre del hábito es obligatorio.
          </Text>

        </ScrollView>
      </KeyboardAvoidingView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  contenedorPrincipal: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  scrollView: {
    backgroundColor: 'transparent',
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
    marginTop: 20,
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

  // Camera button
  botonCamara: {
    backgroundColor: '#334E68',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },

  // Photo preview
  contenedorFoto: {
    alignItems: 'center',
    marginBottom: 15,
  },

  fotoPreview: {
    width: 180,
    height: 180,
    borderRadius: 12,
    marginBottom: 10,
  },

  botonEliminarFoto: {
    backgroundColor: '#DC3545',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },

  // Camera screen
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },

  cameraView: {
    flex: 1,
  },

  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000000',
  },

  botonCapturar: {
    backgroundColor: '#2563EB',
    padding: 15,
    borderRadius: 10,
  },

  botonCancelar: {
    backgroundColor: '#DC3545',
    padding: 15,
    borderRadius: 10,
  },

  textoBotonCamara: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
