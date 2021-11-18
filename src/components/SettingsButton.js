import React from 'react'
import { TouchableOpacity, Image, StyleSheet, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
export default function SettingsButton({ goBack }) {
  return (
    <TouchableOpacity onPress={goBack} style={styles.container}>
    <Image
      style={styles.image}
      source={require('../assets/settings_cog.png')}
    />
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left: 5,
    zIndex:4
  },
  image: {
    width: 32,
    height: 32,
  },
})