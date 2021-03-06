/**
 * Module for mapscreen
 * Functions show pins
 * Buttons changings state using changeState function
 */

import React from 'react';
import MapView, { Marker } from 'react-native-maps'
import { Dimensions, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../core/theme';
import {  fetchFromApi } from '../hooks';
import {
  SettingsButton,
  Button,
  Background,
  ErrorBoundary
} from '../components'

const { width, height } = Dimensions.get('window');

export default function MapScreen2({ route, navigation }) {
  //const bikeData = fetchBikesApi();
  const bikeData = fetchFromApi("scooter") 
  let userData;
  try {
    userData = fetchFromApi("customers", route.params.data.data.user.id);
  } catch (error) {
    userData = fetchFromApi( "customers", "tester" );
  }
  return (
    <ErrorBoundary>
    <Background>
      <SettingsButton className="settings" 
      goBack={() => navigation.navigate("SettingsScreen")}
        />
      <MapView
        showsUserLocation={true}
        pitchEnabled={true}
        rotateEnabled={true}
        showsMyLocationButton={true}
        showsPointsOfInterest={true}
        showsTraffic={true}
        style={styles.map}
      >
        {bikeData.map((marker, index) => (
          <Marker
          key={index}
          coordinate={{ latitude: parseFloat(marker.position.lat), longitude: parseFloat(marker.position.lng) }}
          title={"Bike " + marker._id}
          description={"Battery: " + marker.battery.toString()}
          >
               <MaterialIcons name="electric-scooter" size={20} style={styles.logo} />
          </Marker>
        ))}
      </MapView>
      <Button mode="contained"
        className="camera"
        onPress={() => {
          try {
            navigation.navigate("CameraScreen", { userData: userData })
          } catch (error) {
            console.error(error);
          }
        }}
        style={styles.button}
      >
        Scanna och k??r
      </Button>
    
    </Background>
    </ErrorBoundary>
  )
}
const styles = StyleSheet.create({
  map: {
    width: width,
    height: height,
    marginTop: -10
  },
  header: {
    width: 100,
    textAlign: 'center'
  },
  button: {
    position: "absolute",
    bottom: 60
  },
  logo: {
    color: theme.colors.primary
  },

});