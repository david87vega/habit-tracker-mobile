
import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DiscoverHabitsScreen from './DiscoverHabitsScreen';
import HabitDetailScreen from './HabitDetailScreen';

const Stack = createNativeStackNavigator();

export default function DiscoverNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#243B53',
                },
                headerTintColor: '#FFFFFF',
            }}
        >
            <Stack.Screen
                name="DiscoverHabits"
                component={DiscoverHabitsScreen}
                options={{
                    title: 'Descubrir hábitos',
                }}
            />

            <Stack.Screen
                name="HabitDetail"
                component={HabitDetailScreen}
                options={{
                    title: 'Detalle del hábito',
                }}
            />
        </Stack.Navigator>
    );
}
