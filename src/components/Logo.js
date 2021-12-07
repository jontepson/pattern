import React from 'react'
import { StyleSheet } from 'react-native'
//import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../core/theme';
import Header from './Header';
import Paragraph from './Paragraph';
export default function Logo() {

  return (
    <>
  {/*<FontAwesome5 name="atlassian" size={100} style={styles.logo}/>*/}
  <MaterialIcons name="electric-scooter" size={100} style={styles.logo} />
  <Header>Svenska Elsparkcyklar</Header>
  <Paragraph>
        No more walking
  </Paragraph>
  </>
  )
}

const styles = StyleSheet.create({
  logo: {
    color: theme.colors.primary
  },
})