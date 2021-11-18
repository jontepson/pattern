/**
 * Module for mapscreen
 * Functions show pins
 * Buttons changings state using changeState function
 */

 import React, { useState, useEffect } from 'react';
 import Background from '../components/Background'
 import Logo from '../components/Logo';
 import Header from '../components/Header'
 import BackButton from '../components/BackButton'
 import SettingsButton from '../components/SettingsButton';
 import MapView, { Marker, Polygon } from 'react-native-maps'
 import { Dimensions, StyleSheet, PermissionsAndroid } from 'react-native';
 import Button from '../components/Button'
 import Footer from '../components/Footer';
 import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
 import { faAtlassian } from '@fortawesome/free-brands-svg-icons'
 import { theme } from '../core/theme';

 const { width, height } = Dimensions.get('window');
 const server = "http://192.168.1.73:1337";

export default function MapScreen({ navigation }) {
   const [bikeData, setBikeData] = useState([]);
   // fetch data on init
   useEffect(() => {
     let api_bikes_endpoint = "/api/scooter";
     

     // fetch bikes
     fetch(server + api_bikes_endpoint, {
       method: "GET",
       headers: {
         Accept: 'application/json',
         'Content-type': 'application/json'
       }
       }).then((response) => response.json())
     .then((data) => {
         setBikeData(data.data)
         
     })
     .catch((error) => {
       console.log(error);
     })

   }, [])
   function markerIcon() {
    return (
      <FontAwesomeIcon style={styles.logo} icon={ faAtlassian } size={ 20 } />
    )
   }

   function showBikes(data) { 
     if(data) {
       for (const property in data) {
         return (
           <Marker
           key={data[property]._id}
           coordinate={{latitude: parseFloat(data[property].position.lat), longitude: parseFloat(data[property].position.lng)}}
           title={"Bike " + data[property]._id + " " + data[property].city_location}
           description={"Battery: " + data[property].battery.toString()}
         >
           <FontAwesomeIcon style={styles.logo} icon={ faAtlassian } size={ 20 } />
           </Marker>
         )
       } 
     }
   }
 

  
   
  return (
    <Background>
      <SettingsButton goBack={() => navigation.navigate("LoggedInScreen")}/>
      <MapView
       showsUserLocation={true}
       style={styles.map}
       
   >
       {showBikes(bikeData)}
       </MapView>
       {/*
       <Header>Available bikes</Header>
       */}
       <Button mode="contained"
       onPress={() => navigation.navigate("CameraScreen")}
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