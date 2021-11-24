import React from 'react'
import { StyleSheet } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAtlassian } from '@fortawesome/free-brands-svg-icons'
import { theme } from '../core/theme';
import Header from './Header';
import Paragraph from './Paragraph';
export default function Logo() {

  return (
    <>
  <FontAwesomeIcon style={styles.logo} icon={ faAtlassian } size={ 100 } />
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