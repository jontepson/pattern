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
  const [allParkingZones, setAllParkingZones] = useState([])

  const data = fetchFromApi("cities");
  let loggObject;
  let battery;
  let userData;
  let polygons = []
  useEffect(() => {
    data.forEach(element => {
      setAllParkingZones(element.parking_zones)
      });

      allParkingZones.forEach(parking_zone => {
        polygons.push([
          {"latitude": parking_zone.position.polygonePart1.lat, "longitude": parking_zone.position.polygonePart1.lng },
          {"latitude": parking_zone.position.polygonePart2.lat, "longitude": parking_zone.position.polygonePart2.lng },
          {"latitude": parking_zone.position.polygonePart3.lat, "longitude": parking_zone.position.polygonePart3.lng },
          {"latitude": parking_zone.position.polygonePart4.lat, "longitude": parking_zone.position.polygonePart4.lng }
        ])
      })
  }, [data])
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
            
          }
        }}
        followsUserLocation={true}
      >
        <Polyline
          coordinates={routeCoordinates}>
        </Polyline>
        {polygons.map((parking_zone, index) => {
          <Polygon
          key={index}
          strokeWidth={100}
          coordinates={parking_zone}
          strokeColor={theme.colors.secondary}
          fillColor={theme.colors.secondary}
          tappable={true}
          onPress={() => alert("Parking zone")}>
          </Polygon>
        })}
        <Text style={styles.header}>Din hastighet: {speed}</Text>
      </MapView>
      <Button
        mode="contained"
        onPress={() => returnBike(loggObject, latitude, longitude, navigation, userData)}>
        Lämna tillbaka cykel
      </Button>
      
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