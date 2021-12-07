/**
 * Module for mapscreen
 * Functions show pins
 * Buttons changings state using changeState function
 */

import React from 'react';
import MapView, { Marker } from 'react-native-maps'
import { Dimensions, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { theme } from '../core/theme';
import { logDataHook, fetchFromApi } from '../hooks';
import {
  Background,
  SettingsButton,
  Button,
  Footer
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
    _id = "ThisIsA_IdThatIsUsedIfUserAintLogginin"
  }

  return (
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
          title={"Bike " + marker._id + " " + marker.city_location}
          description={"Battery: " + marker.battery.toString()}
          >
               <FontAwesome5 name="atlassian" size={20} style={styles.logo}/>
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
        Scanna och kör
      </Button>
      <Footer />
    </Background>
  )
}
const styles = StyleSheet.create({
  map: {
    width: width,
    height: height,
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