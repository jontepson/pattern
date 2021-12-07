/**
 * Karta som visar den som kör
 * En knapp för att lämna tillbaka cykeln 
 * Ska jag ta betalt här med?
 * 
 */
import React, { useEffect, useState } from 'react'
import { theme } from '../core/theme'
import { Text, StyleSheet, Dimensions, Alert } from 'react-native'
import MapView, { Polyline, Polygon } from 'react-native-maps';
import { fetchFromApi } from '../hooks';
import {
  Background,
  Button,
  Footer
} from '../components'
import { returnBike } from '../functions/DriveFunctions';
const server = "http://192.168.1.73:1337";
const { width } = Dimensions.get('window');
const qrSize = width * 0.9;

const DriveScreen = ({ route, navigation }) => {
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [routeCoordinates, setRouteCoordinates] = useState([])
  const [speed, setSpeed] = useState(0)
  //const [trackSpeed, setTrackSpeed] = useState([]);
  const data = fetchFromApi("cities");
  let loggObject;
  let battery;
  let userData;
  
  try {
    userData = route.params.userData
    loggObject = route.params.loggObject;
    battery = route.params.battery;
  } catch (error) {
    userData = {
      username: "tester",
      balance: 100
    }
    loggObject = "tester";
    battery = 10;
  }
  /**
   * update once every 10 sec
   * 
   * 
   */
  
  const MINUTE_MS = 10000;
   useEffect(() => {
    const interval = setInterval(() => {
      const api_updateScooter_endpoint = "/api/scooter";
      battery -= 1;
      let body = {
        _id: loggObject._id,
        battery: battery,
        speed: speed,
        lat: latitude,
        lng: longitude
      }
      //console.log(body)
      fetch(server + api_updateScooter_endpoint, {
        method: "PUT",
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
        }).then((response) => response.json())
      .catch((error) => {
        console.log(error);
      })
    }, MINUTE_MS);
  
    return () => clearInterval(interval);
  }, [])

  /**
   * Get parking zones and charging posts from api
   */

  /**
   * Show charging zones on map
   * @param {Object} data 
   * @returns Polygons to render on map
   */
  const showChargingZone = (data) => {
    if (data) {
      try {
        let array = [];
        for (const property in data) {
          for (let polygonepart in data[property].charging_posts[0].position) {
            // loop all parts of polygone
            array.push({
              "latitude": parseFloat(data[property].charging_posts[0].position[polygonepart].lat),
              "longitude": parseFloat(data[property].charging_posts[0].position[polygonepart].lng),
            })
            // console.log(array)
          }
        }
        return array
      } catch (error) {
        console.log(error)
      }
    }
  }

  /**
   * Show parking zones on map
   * @param {Object} data 
   * @returns Polygons to render on map
   */
  const showParkingZone = (data) => {
    if (data) {
      try {
        let array = [];
        for (const property in data) {
          
          for (let polygonepart in data[property].parking_zones[0].position) {
            // loop all parts of polygone
            array.push({
              "latitude": parseFloat(data[property].parking_zones[0].position[polygonepart].lat),
              "longitude": parseFloat(data[property].parking_zones[0].position[polygonepart].lng),
            })
          }
        }
        return array
      } catch (error) {
        console.log(error)
      }

      // console.log("parkingzone complete")
    }
  }

  /**
   * Function to return a bike
   * @param {Object} loggObject 
   * @param {Float} latitude 
   * @param {Float} longitude
   * @redirect Back to MapScreen2
   */
 

  /**
   * Function to cap speed
   */
/*
  useEffect(() => {
    if (speed >= 30) {
      setSpeed(30)
    }
  },[speed])
*/
  return (
    <Background>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        onUserLocationChange={(e) => {
          setLatitude(e.nativeEvent.coordinate.latitude);
          setLongitude(e.nativeEvent.coordinate.longitude);
          if (longitude && latitude) {
            setRouteCoordinates(routeCoordinates.concat({ latitude: latitude, longitude: longitude }));
            setSpeed(e.nativeEvent.coordinate.speed.toFixed(1));
            //trackSpeed.push(e.nativeEvent.coordinate.speed.toFixed(1));
          }
        }}
        followsUserLocation={true}
      >
        <Polyline
          coordinates={routeCoordinates}>
        </Polyline>
        {/*showChargingZone(data)*/}
        {/*showParkingZone(data)*/}
        {/*showSpeed()*/}
        <Text style={styles.header}>Din hastighet: {speed}</Text>
      </MapView>
      <Button
        mode="contained"
        onPress={() => returnBike(loggObject, latitude, longitude, navigation, userData)}>
        Lämna tillbaka cykel
      </Button>
      <Footer />
    </Background>
  )
}

const styles = StyleSheet.create({
  map: {
    marginTop: '10%',
    marginBottom: '5%',
    width: qrSize,
    height: qrSize,
  },
  header: {
    fontSize: 21,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 12,
    textAlign: 'center'
  },
});

export default DriveScreen;