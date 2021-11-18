/**
 * Module for LoggedInScreen
 * Needs params for active user and ?token?
 */
import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import BackButton from '../components/BackButton'
import Footer from '../components/Footer';
export default function LoggedInScreen({ route, navigation }) {
  let user;
  let data;
  try {
    user = route.params.user;
    data = route.params.user;
  } catch (error) {
    user = "tester";
    data = "tester"; 
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
       {/*
      <Button
        mode="contained"
        onPress={() => navigation.navigate('DriveScreen', { data: data, user: user})}
        >
        Drive
      </Button>
       */}
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