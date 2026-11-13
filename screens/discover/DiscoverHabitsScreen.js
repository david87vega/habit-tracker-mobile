
import React, { useCallback, useEffect, useState } from 'react';

import {
    ActivityIndicator,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

// API de Openverse
const API_URL = 'https://api.openverse.org/v1/images/';

// Recomendaciones de hábitos saludables
const HABITS = [
    {
        id: '1',
        nombre: 'Beber agua',
        descripcion: 'Mantener una buena hidratación durante el día.',
        query: 'drinking water glass',
    },
    {
        id: '2',
        nombre: 'Hacer ejercicio',
        descripcion: 'Realizar actividad física para mejorar la salud.',
        query: 'person exercising fitness',
    },
    {
        id: '3',
        nombre: 'Leer diariamente',
        descripcion: 'Dedicar unos minutos al día a la lectura.',
        query: 'person reading book',
    },
    {
        id: '4',
        nombre: 'Comer saludable',
        descripcion: 'Incorporar frutas y verduras a la alimentación.',
        query: 'healthy fruits vegetables food',
    },
    {
        id: '5',
        nombre: 'Meditar',
        descripcion: 'Dedicar tiempo a la relajación y tranquilidad.',
        query: 'meditation mindfulness',
    },
];

export default function DiscoverHabitsScreen({ navigation }) {

    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Consulta las imágenes de los hábitos en la API

    const loadHabits = useCallback(async () => {

        setLoading(true);
        setError('');

        try {

            // Realizamos una sola consulta a Openverse
            const response = await fetch(
                `${API_URL}?q=healthy%20lifestyle&page_size=20`
            );

            if (!response.ok) {
                throw new Error(`Error HTTP ${response.status}`);
            }

            const json = await response.json();

            // Obtenemos las imágenes devueltas por la API
            const images = json.results || [];

            // Asociamos una imagen a cada hábito
            const results = HABITS.map((habit, index) => {

                const image = images[index];

                return {
                    ...habit,
                    fotoUri: image
                        ? image.thumbnail || image.url || null
                        : null,
                    attribution: image?.attribution || '',
                };

            });

            setHabits(results);

        } catch (e) {

            setHabits([]);
            setError(`No se pudieron cargar los hábitos: ${e.message}`);

        } finally {

            setLoading(false);

        }

    }, []);


    // Ejecuta la consulta cuando se abre la pantalla
    useEffect(() => {
        loadHabits();
    }, [loadHabits]);

    // Estado de carga
    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#2563EB" />
                <Text>Cargando recomendaciones...</Text>
            </View>
        );
    }

    // Estado de error
    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>{error}</Text>

                <Pressable
                    style={styles.button}
                    onPress={loadHabits}
                >
                    <Text style={styles.buttonText}>REINTENTAR</Text>
                </Pressable>
            </View>
        );
    }

    // Lista de hábitos recomendados
    return (
        <FlatList
            style={styles.container}
            contentContainerStyle={styles.list}
            data={habits}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={
                <Text style={styles.subtitle}>
                    Descubrí nuevos hábitos saludables para incorporar a tu rutina.
                </Text>
            }
            ListEmptyComponent={
                <Text style={styles.empty}>
                    No hay recomendaciones disponibles.
                </Text>
            }
            renderItem={({ item }) => (

                <Pressable
                    style={styles.card}
                    onPress={() =>
                        navigation.navigate('HabitDetail', {
                            habit: item,
                        })
                    }
                >

                    {item.fotoUri ? (
                        <Image
                            source={{ uri: item.fotoUri }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    ) : (
                        <View style={styles.noImage}>
                            <Text>Imagen no disponible</Text>
                        </View>
                    )}

                    <View style={styles.cardContent}>

                        <Text style={styles.name}>
                            {item.nombre}
                        </Text>

                        <Text style={styles.description}>
                            {item.descripcion}
                        </Text>

                        <Text style={styles.link}>
                            VER DETALLE →
                        </Text>

                    </View>

                </Pressable>

            )}
        />
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F2F5F9',
    },

    list: {
        padding: 16,
    },

    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F2F5F9',
        padding: 20,
    },

    subtitle: {
        fontSize: 15,
        color: '#52606D',
        marginBottom: 16,
    },

    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 18,
        overflow: 'hidden',
        elevation: 3,
    },

    image: {
        width: '100%',
        height: 180,
    },

    noImage: {
        height: 180,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E4E7EB',
    },

    cardContent: {
        padding: 16,
    },

    name: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#243B53',
        marginBottom: 6,
    },

    description: {
        fontSize: 14,
        color: '#52606D',
        marginBottom: 12,
    },

    link: {
        color: '#2563EB',
        fontWeight: 'bold',
        fontSize: 13,
    },

    error: {
        color: '#C62828',
        textAlign: 'center',
        marginBottom: 12,
    },

    button: {
        backgroundColor: '#2563EB',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 6,
    },

    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },

    empty: {
        textAlign: 'center',
        marginTop: 35,
        color: '#52606D',
    },

});
