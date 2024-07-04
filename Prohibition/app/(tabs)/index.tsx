import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Verification from './src/screens/Verification';

import NewScreen from './src/screens/NewScreen';
import { Provider } from 'react-redux';
import Store from './src/store/Store';
import AddItem from './src/screens/AddItem';
import { View } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      
      <Provider store={Store}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
        <Stack.Screen name="Verify" component={Verification} options={{headerShown: false}} />
        <Stack.Screen name="new" component={NewScreen} options={{headerShown: false}} />
        <Stack.Screen name="add" component={AddItem} options={{headerShown: false}} />
      </Stack.Navigator>
      </Provider>
    
   
  );
}
