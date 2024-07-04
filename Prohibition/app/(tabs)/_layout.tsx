import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import Store from './src/store/Store';
import Home from './src/screens/Home';
import Verification from './src/screens/Verification';
import NewScreen from './src/screens/NewScreen';
import AddItem from './src/screens/AddItem';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

const EmptyScreen = () => {
  return <View />;
};

const TabLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <Provider store={Store}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: 'orange',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'new') {
              iconName = 'gift-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            } else if (route.name === 'add') {
              iconName = 'shopping-cart';
              return <FontAwesome5 name={iconName} size={size} color={color} />;
            } else if (route.name === 'Icon1') {
              iconName = 'home-outline';
              return <MaterialCommunityIcons name="account" size={24} color="gray" />;
            } else if (route.name === 'Icon2') {
              iconName = 'star-outline';
              return <Ionicons name="settings" size={24} color="gray" />;
            } else if (route.name === 'Icon3') {
              iconName = 'heart-outline';
              return <Feather name="menu" size={24} color="gray" />;
            }
            return null;
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarButton: () => null,
            tabBarStyle: { display: 'none' },
          }}
        />
        <Tab.Screen
          name="Verify"
          component={Verification}
          options={{
            tabBarButton: () => null,
            tabBarStyle: { display: 'none' },
          }}
        />
        <Tab.Screen name="new" component={NewScreen} />
        <Tab.Screen name="add" component={AddItem} />
        <Tab.Screen
          name="Icon1"
          component={EmptyScreen}
          options={{
            tabBarLabel: '',
          }}
        />
        <Tab.Screen
          name="Icon2"
          component={EmptyScreen}
          options={{
            tabBarLabel: '',
          }}
        />
        <Tab.Screen
          name="Icon3"
          component={EmptyScreen}
          options={{
            tabBarLabel: '',
          }}
        />
      </Tab.Navigator>
    </Provider>
  );
};

export default TabLayout;
