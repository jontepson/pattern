/**
 * Module for SettingsScreen
 * Needs params for active user and ?token?
 */
import React from 'react'
import { Linking } from 'react-native'
import {
  Background,
  Logo,
  Button,
  Footer
} from '../components'

export default function SettingsScreen({ route, navigation }) {
  let user;
  try {
    user = route.params.user;
  } catch (error) {
    user = "tester";
    token = "tester";
  }
  return (
    <Background>
      <Logo />
      <Button
        className="map"
        mode="contained"
        onPress={() => {
          try {
            navigation.navigate('MapScreen2')
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Karta
      </Button>

      <Button
        className="mypage"
        mode="contained"
        onPress={() => {
          try {
            Linking.openURL('https://google.com')
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Mina sidor
      </Button>

      <Button
        className="logout"
        mode="contained"
        onPress={() => {
          try {
            navigation.navigate('StartScreen')
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Logga ut
      </Button>
      <Footer />
    </Background>
  )
}