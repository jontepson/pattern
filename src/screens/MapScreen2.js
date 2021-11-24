/**
 * Module for mapscreen
 * Functions show pins
 * Buttons changings state using changeState function
 */

import React, { useState, useEffect } from 'react';
import Background from '../components/Background'
import SettingsButton from '../components/SettingsButton';
import MapView, { Marker } from 'react-native-maps'
import { Dimensions, StyleSheet, PermissionsAndroid } from 'react-native';
import Button from '../components/Button'
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAtlassian } from '@fortawesome/free-brands-svg-icons'
import { theme } from '../core/theme';
import * as Location from 'expo-location';
import fetchBikesApi from '../hooks/fetchBikesApi';
import fetchUserApi from '../hooks/fetchUserApi';

const { width, height } = Dimensions.get('window');

export default function MapScreen2({ navigation }) {

  const bikeData = fetchBikesApi();
  
  let userData;
  
  try {
    userData = fetchUserApi( route.params.user );
  } catch (error) {
    userData = fetchUserApi( "tester" );
  }

  /**
   * @TODO function to show user location on android. 
   * Use the same function as MapScreen
   * expo-location
   */
  //get location if showsUserPosition not working (ANDROID)
  /* NOT IN USE
  let _getLocationAsync = () => {

  }
  
  useEffect(() => {
    _getLocationAsync = async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('debieeed')
      }
      let location = await Location.watchPositionAsync({ accuracy: Location.Accuracy.High, timeInterval: 10000, distanceInterval: 1 }, (loc) => {
        setLocation(loc)

      });
    }
    _getLocationAsync()
    
  }, [])
  */
  /**
   * fetch user data, return as a object with username and balance
   * fetch data on init
   */

  
  /**
   * Render all bikes as markers on the map
   * @param {Object} data 
   * @returns markers
   * NOT IN USE
   */
  function showBikes(data) {
    if (data) {
      
      for (let i = 0; i < data.length; i++) {
     
        return (
          <Marker
            key={data[i]._id}
            coordinate={{ latitude: parseFloat(data[i].position.lat), longitude: parseFloat(data[i].position.lng) }}
            title={"Bike " + data[i]._id + " " + data[i].city_location}
            description={"Battery: " + data[i].battery.toString()}
          >
            <FontAwesomeIcon style={styles.logo} icon={faAtlassian} size={20} />
          </Marker>
        )
      }
    }
  }



  return (
    <Background>
      <SettingsButton goBack={() => navigation.navigate("SettingsScreen")} />
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
             <FontAwesomeIcon style={styles.logo} icon={faAtlassian} size={20} />
          </Marker>
        ))}
      </MapView>
      {/*
       <Header>Available bikes</Header>
       */}
      <Button mode="contained"
        onPress={() => navigation.navigate("CameraScreen", { userData: userData })}
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