/**
 * Module for startscreen
 */
import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import { Platform, StyleSheet } from 'react-native'
import Footer from '../components/Footer';

export default function StartScreen({ navigation }) {
  //console.log(Platform.OS)
  return (
    <Background>
      <Logo />

      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Logga in
      </Button>

      <Button
        mode="contained"
        onPress={() => navigation.navigate('SettingsScreen', {
          token: "none",
          user: 'tester'
        })}
      >
        Fortsätt utan att logga in
      </Button>

      <Footer />
    </Background>
  )
}
