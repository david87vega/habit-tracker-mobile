
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import { HabitsProvider } from './context/HabitsContext';

import HomeScreen from './screens/HomeScreen';
import HabitsScreen from './screens/HabitsScreen';
import AddHabitScreen from './screens/AddHabitScreen';
import StatsScreen from './screens/StatsScreen';

const Tab = createBottomTabNavigator();

// Devuelve el ícono correspondiente a cada pantalla
function getTabIcon(routeName, focused) {
  switch (routeName) {
    case 'Inicio':
      return focused ? 'home' : 'home-outline'; // se agrega el icono de home

    case 'Mis hábitos':
      return focused ? 'checkbox' : 'checkbox-outline'; // se agrega el icono para visualizar los hábitos

    case 'Nuevo hábito':
      return focused ? 'add-circle' : 'add-circle-outline';// se agrega el icono para registrar un nuevo hábito

    case 'Estadísticas':
      return focused ? 'bar-chart' : 'bar-chart-outline'; // y se visualiza el icono de la navegación hacia el componente de estadistica

    default:
      return 'ellipse-outline';
  }
}

export default function App() {
  return (
    <HabitsProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerStyle: {
              backgroundColor: '#243B53',
            },
            headerTintColor: '#FFFFFF',

            tabBarShowLabel: true,

            tabBarActiveTintColor: '#2563EB',
            tabBarInactiveTintColor: '#829AB1',

            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={getTabIcon(route.name, focused)}
                size={size || 24}
                color={color}
              />
            ),
          })}
        >
          <Tab.Screen
            name="Inicio"
            component={HomeScreen}
          />

          <Tab.Screen
            name="Mis hábitos"
            component={HabitsScreen}
          />

          <Tab.Screen
            name="Nuevo hábito"
            component={AddHabitScreen}
          />

          <Tab.Screen
            name="Estadísticas"
            component={StatsScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </HabitsProvider>
  );
}
