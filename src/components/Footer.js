import React from 'react'
import { StyleSheet } from 'react-native'
import Paragraph from './Paragraph'

export default function Header(props) {
  return <Paragraph style={styles.footer}>
  By Svenska Elsparkcyklar AB
  </Paragraph>
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute', left: 0, right: 0, bottom: 10, textAlign: 'center'
  }
})