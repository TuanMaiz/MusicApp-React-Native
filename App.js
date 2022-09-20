import PlayListScreen from './src/components/PlayListScreen';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/components/Login.js'
import Search from './src/components/Search.js'
import NavBar from './src/components/NavBar.js';
import Register from './src/components/Register.js'
import Home from './src/components/Home.js';
import HorizontalLists from './src/components/HorizontalLists.js'
import ListItem from './src/components/ListItem.js'


const Stack = createNativeStackNavigator();
export default function App() {
  return (

    <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Search" component={Search} />
                <Stack.Screen name="Playlist" component={PlayListScreen} />
                <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
    </NavigationContainer>
  );
}


