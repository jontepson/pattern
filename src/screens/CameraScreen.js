/**
 * Module for camera 
 */

import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Constants from 'expo-constants';
import { Dimensions } from 'react-native';
import {
  Background,
  Logo,
  BackButton,
  Header,
  Footer,
  ErrorBoundary
} from '../components'
import { rentBikeAlert } from '../functions/CameraFunctions';
import { logDataHook } from '../hooks';
/**
 * Karta
 * Sin egen position
 */
const { width } = Dimensions.get('window');
const qrSize = width * 0.7;
const server = "http://192.168.1.73:1337";

export default function CameraScreen({ route, navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  /**
   * Ask for permission to use camera at screen start.
   */
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  
  /**
   * 
   * @param {*} param0
   * @param {*} param1 bike id 
   */
   const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    rentBikeAlert(data, route.params.userData, navigation)
  };


  /**
   * Render functions
   */
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <ErrorBoundary>
    <Background>
      <Logo />

      <BackButton goBack={() => navigation.navigate("MapScreen2")} />

      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.qr}>

        {scanned && <Button title={'Tryck för att scanna igen'} onPress={() => setScanned(false)} />}
      </BarCodeScanner>
      <Header>Scanna cykel</Header>
      
    </Background>
    </ErrorBoundary>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  qr: {
    marginTop: '10%',
    marginBottom: '10%',
    width: qrSize,
    height: qrSize,
  },
});