import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { NewPost } from '../screens/NewPost';
import { UserPost } from '../screens/UserPost';

const { Screen, Navigator } = createNativeStackNavigator();

export function AppStackRoutes() {
  return(
    <Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen
        name='Home'
        component={Home}
      />

      <Screen
        name='NewPost'
        component={NewPost}
      />

      <Screen
        name='UserPost'
        component={UserPost}
      />
    </Navigator>
  );
}