
import React from 'react';

import {
    Alert,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { useHabits } from '../../context/HabitsContext';

export default function HabitDetailScreen({ route, navigation }) {

    // Recibimos el hábito seleccionado
    const { habit } = route.params;

    // Accedemos al contexto de hábitos
    const { addHabit } = useHabits();

    // Agregar recomendación a Mis hábitos
    function handleAddHabit() {

        addHabit(
            habit.nombre,
            habit.descripcion,
            habit.fotoUri
        );

        Alert.alert(
            'Hábito agregado',
            `${habit.nombre} fue agregado a Mis hábitos.`,
            [
                {
                    text: 'ACEPTAR',
                    onPress: () => navigation.popToTop(),
                },
            ]
        );
    }

    return (
        <ScrollView style={styles.container}>

            {habit.fotoUri ? (
                <Image
                    source={{ uri: habit.fotoUri }}
                    style={styles.image}
                    resizeMode="cover"
                />
            ) : null}

            <View style={styles.content}>

                <Text style={styles.title}>
                    {habit.nombre}
                </Text>

                <Text style={styles.description}>
                    {habit.descripcion}
                </Text>

                <Text style={styles.subtitle}>
                    ¿Por qué incorporar este hábito?
                </Text>

                <Text style={styles.info}>
                    Incorporar pequeñas acciones saludables a tu rutina
                    puede ayudarte a mejorar tu bienestar y mantener
                    un estilo de vida equilibrado.
                </Text>

                {habit.attribution ? (
                    <Text style={styles.attribution}>
                        Crédito de imagen: {habit.attribution}
                    </Text>
                ) : null}

                <Pressable
                    style={styles.button}
                    onPress={handleAddHabit}
                >
                    <Text style={styles.buttonText}>
                        AGREGAR A MIS HÁBITOS
                    </Text>
                </Pressable>

            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F2F5F9',
    },

    image: {
        width: '100%',
        height: 260,
    },

    content: {
        padding: 20,
    },

    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#243B53',
        marginBottom: 12,
    },

    description: {
        fontSize: 16,
        color: '#52606D',
        lineHeight: 24,
        marginBottom: 25,
    },

    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#243B53',
        marginBottom: 10,
    },

    info: {
        fontSize: 15,
        color: '#52606D',
        lineHeight: 23,
        marginBottom: 20,
    },

    attribution: {
        fontSize: 11,
        color: '#829AB1',
        marginBottom: 18,
    },

    button: {
        backgroundColor: '#2563EB',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 25,
    },

    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 14,
    },

});
