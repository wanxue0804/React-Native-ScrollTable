/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/index';
import NormalScrollTable from './src/normalScrollTable';
import CustomRefreshScrollTable from './src/customRefreshScrollTable';
import ToggleOperateScrollTable from './src/toggleOperateScrollTable';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="NormalScrollTable" component={NormalScrollTable} />
        <Stack.Screen name="CustomRefreshScrollTable" component={CustomRefreshScrollTable} />
        <Stack.Screen name="ToggleOperateScrollTable" component={ToggleOperateScrollTable} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
