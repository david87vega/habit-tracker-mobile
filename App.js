
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import { HabitsProvider } from './context/HabitsContext';

import HomeScreen from './screens/HomeScreen';
import HabitsScreen from './screens/HabitsScreen';
import AddHabitScreen from './screens/AddHabitScreen';
import StatsScreen from './screens/StatsScreen';

import DiscoverNavigator from './screens/discover/DiscoverNavigator';

const Tab = createBottomTabNavigator();

// Devuelve el icono correspondiente a cada pantalla
function getTabIcon(routeName, focused) {
  switch (routeName) {
    case 'Inicio':
      return focused ? 'home' : 'home-outline';

    case 'Mis hábitos':
      return focused ? 'checkbox' : 'checkbox-outline';

    case 'Nuevo hábito':
      return focused ? 'add-circle' : 'add-circle-outline';

    case 'Estadísticas':
      return focused ? 'bar-chart' : 'bar-chart-outline';

    case 'Descubrir':
      return focused ? 'compass' : 'compass-outline';

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

          <Tab.Screen
            name="Descubrir"
            component={DiscoverNavigator}
            options={{
              headerShown: false,
            }}
          />

        </Tab.Navigator>
      </NavigationContainer>
    </HabitsProvider>
  );
}
