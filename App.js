
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HabitsProvider } from './context/HabitsContext';

import HomeScreen from './screens/HomeScreen';
import HabitsScreen from './screens/HabitsScreen';
import AddHabitScreen from './screens/AddHabitScreen';
import StatsScreen from './screens/StatsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <HabitsProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#243B53',
            },
            headerTintColor: '#FFFFFF',
            tabBarActiveTintColor: '#2563EB',
            tabBarInactiveTintColor: '#829AB1',
          }}
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
