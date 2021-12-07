import React from 'react'
import { StyleSheet } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'; 
import { theme } from '../core/theme';
import Header from './Header';
import Paragraph from './Paragraph';
export default function Logo() {

  return (
    <>
  <FontAwesome5 name="atlassian" size={100} style={styles.logo}/>
  <Header>Ajjo</Header>
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