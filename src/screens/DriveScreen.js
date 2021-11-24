/**
 * Karta som visar den som kör
 * En knapp för att lämna tillbaka cykeln 
 * Ska jag ta betalt här med?
 * 
 */
import React, { useEffect, useState } from 'react'
import Background from '../components/Background'
import Button from '../components/Button'
import Footer from '../components/Footer';
import { theme } from '../core/theme'
import { Text, StyleSheet, Dimensions, Alert } from 'react-native'
import MapView, { Polyline, Polygon } from 'react-native-maps';
import fetchCitiesApi from '../hooks/fetchCitiesApi';

const { width } = Dimensions.get('window');
const qrSize = width * 0.9;


export default function DriveScreen({ route, navigation }) {
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [routeCoordinates, setRouteCoordinates] = useState([])
  const [speed, setSpeed] = useState(0)
  //const [trackSpeed, setTrackSpeed] = useState([]);
  const data = fetchCitiesApi();
  let loggObject;
  let battery;
  try {
    loggObject = route.params.loggObject;
    battery = route.params.battery;
  } catch (error) {
    loggObject = "tester";
    battery = 10;
  }
  /**
   * update once every 10 sec
   * 
   * KOORDINATER
   */
  /*
  const MINUTE_MS = 10000;
   useEffect(() => {
    const interval = setInterval(() => {
      const api_updateScooter_endpoint = "/api/scooter";
      let body = {
        id: loggObject.id,
        battery: battery - 0.1,
        speed: speed
      }
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
*/
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
        for (const property in data) {
          let array = [];
          for (let polygonepart in data[property].charging_posts[0].position) {
            // loop all parts of polygone
            array.push({
              "latitude": parseFloat(data[property].charging_posts[0].position[polygonepart].lat),
              "longitude": parseFloat(data[property].charging_posts[0].position[polygonepart].lng),
            })
            // console.log(array)
          }
          return (
            <Polygon
              key={"1"}
              strokeWidth={2}
              coordinates={array}
              fillColor="green"
              tappable={true}
              onPress={() => alert("Charging Post")}
            />
          )
        }
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
        for (const property in data) {
          let array = [];

          for (let polygonepart in data[property].parking_zones[0].position) {
            // loop all parts of polygone
            array.push({
              "latitude": parseFloat(data[property].parking_zones[0].position[polygonepart].lat),
              "longitude": parseFloat(data[property].parking_zones[0].position[polygonepart].lng),
            })
          }
          return (
            <Polygon
              coordinates={array}
              fillColor="lightblue"
              tappable={true}
              onPress={() => alert("Parking Zone")}
            />
          )
        }
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
  const returnBike = (loggObject, latitude, longitude) => {
    /***
     * lämna tillbaka cykel
     */
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    loggObject.end_lat = latitude;
    loggObject.end_lng = longitude;
    loggObject.end_time = dateTime;
    let sum = 0;
    //let averageSpeed = trackSpeed.forEach(n => sum += n) / trackSpeed.length;

    Alert.alert(
      "Åter",
      "Tack för den här gången!",
      [
        {
          text: "Cancel",
          onPress: () => console.log("cancel alert"),
          style: "cancel"
        }
      ]
    );
    navigation.navigate('MapScreen2')
    //console.log("return bike")
  }
  /**
   * Function to show speed 
   * @returns Header to show speed
   */
  
  const showSpeed = () => {
    if (speed >= 30) {
      setSpeed(30)
    }
    return <Text style={styles.header}>Din hastighet: {speed}</Text>
    
  }

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
        {showChargingZone(data)}
        {showParkingZone(data)}
        {showSpeed()}
      </MapView>
      <Button
        mode="contained"
        onPress={() => returnBike(loggObject, latitude, longitude)}>
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