/**
 * Module for LoggedInScreen
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

export default function LoggedInScreen({ route, navigation }) {
  let user;
  let token;
  try {
    user = route.params.user;
    token = route.params.token;
  } catch (error) {
    user = "tester";
    token = "tester";
  }
  return (
    <Background>
      <Logo />
      <Button
        mode="contained"
        onPress={() => navigation.navigate('CameraScreen', { user: user })}
      >
        Hyr cykel
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('MapScreen')}
      >
        Karta 1
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('MapScreen2')}
      >
        Karta 2
      </Button>

      <Button
        mode="contained"
        onPress={() => Linking.openURL('https://google.com')}
      >
        Mina sidor
      </Button>

      <Button
        mode="contained"
        onPress={() => navigation.navigate('StartScreen')}
      >
        Logga ut
      </Button>
      <Footer />
    </Background>
  )
}