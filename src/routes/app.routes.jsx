import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//import { Home } from '../screens/Home';
import { AppStackRoutes } from './app.stack.routes';
import { Profile } from '../screens/Profile';
import { Search } from '../screens/Search';

import { Feather } from '@expo/vector-icons'; 

const { Screen, Navigator } = createBottomTabNavigator();

export function AppRoutes() {
  return(
    <Navigator
      screenOptions={{
        headerShown: false,
        //quando houver input a tab some
        tabBarHideOnKeyboard: true,
        //retira titulos da tab
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'pink',

        tabBarStyle:{
          height: 100,
          padding: 5,
          backgroundColor: '#5790DF',
        }
      }}
      
    >
      <Screen
        name='HomesTab'
        component={AppStackRoutes}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather 
              name="home" 
              color={focused ? '#fff' : '#E9E9EB'} 
              size={focused ? 27 : 25}  />
          ),
        }}
      />

      <Screen
        name='Search'
        component={Search}
        options={{
          tabBarIcon: ({ focused}) => (
            <Feather 
              name="search" 
              color={focused ? '#fff' : '#E9E9EB'}
              size={focused ? 27 : 25}  />
          ),
        }}
      />

      <Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather 
              name="user" 
              color={focused ? '#fff' : '#E9E9EB'}
              size={focused ? 27 : 25} 
            />
          ),
        }}
      />
    </Navigator>
  );
}