/**
 * Module for starting app
 * creates a stack with routes
 * Sets startscreen to startup screen
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {
  StartScreen,
  LoginScreen,
  CameraScreen,
  LoggedInScreen,
  MapScreen,
  DriveScreen,
  MapScreen2,
  SettingsScreen
} from './src/screens'


const Stack = createStackNavigator()

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="CameraScreen" component={CameraScreen} />
          <Stack.Screen name="LoggedInScreen" component={LoggedInScreen} />
          <Stack.Screen name="MapScreen" component={MapScreen} />
          <Stack.Screen name="DriveScreen" component={DriveScreen} />
          <Stack.Screen name="MapScreen2" component={MapScreen2} />
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}