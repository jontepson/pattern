/**
 * Karta som visar den som kör
 * En knapp för att lämna tillbaka cykeln 
 * Ska jag ta betalt här med?
 * 
 */

 import React, { useEffect, useState } from 'react'
 import Background from '../components/Background'
 import Logo from '../components/Logo'
 import Header from '../components/Header'
 import Button from '../components/Button'
 import Paragraph from '../components/Paragraph'
 import BackButton from '../components/BackButton'
 import Footer from '../components/Footer';
 import { theme } from '../core/theme'
 import { Platform, Text, StyleSheet, Dimensions, Alert } from 'react-native'
 import MapView, { AnimatedRegion, Marker, Polyline, Polygon } from 'react-native-maps';


const { width } = Dimensions.get('window');
const qrSize = width * 0.9;
const server = "http://192.168.1.73:1337";

 export default function DriveScreen({ route, navigation }) {
    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()
    const [routeCoordinates, setRouteCoordinates] = useState([])
    const [speed, setSpeed] = useState(0)
    const [trackSpeed, setTrackSpeed] = useState([]);
    const [data, setData] = useState();
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
     * update once every minute
     * vad ska vi uppdatera
     * koordinater
     * hastighet
     * batteri??
     */
    
    const MINUTE_MS = 60000;
     useEffect(() => {
      const interval = setInterval(() => {
        console.log('Logs every 10 sec');
      }, MINUTE_MS);
    
      return () => clearInterval(interval);
    }, [])

    /**
     * Get parking zones and charging posts from api
     */
   useEffect(() => {
     let getCitiesEndpoint = "/api/cities";
    fetch(server + getCitiesEndpoint, {
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      }
      }).then((response) => response.json())
    .then((data) => {
        setData(data.data)
    })
    .catch((error) => {
      console.log(error);
    })
    }, [])

    const showChargingZone = (data) => {
      if(data) {
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

    const showParkingZone = (data) => {
      if(data) {
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
    const returnBike = (loggObject, latitude, longitude) => {
        /***
         * lämna tillbaka cykel
         */
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        loggObject.end_lat = latitude;
        loggObject.end_lng = longitude;
        loggObject.end_time = dateTime;
        let sum = 0;
        let averageSpeed = trackSpeed.forEach(n => sum += n) / trackSpeed.length;
        
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

    const showSpeed = () => {
      if(speed >= 30) {
        setSpeed(30)
      }
      return <Text style={styles.header}>Din hastighet: {speed}</Text>
    }
    
   return (
     <Background>
        <MapView
        style={styles.map}
        showsUserLocation={true}
        onUserLocationChange={(e)=> {
          setLatitude(e.nativeEvent.coordinate.latitude);
          setLongitude(e.nativeEvent.coordinate.longitude);
          if(longitude && latitude) {
            setRouteCoordinates(routeCoordinates.concat({latitude: latitude, longitude: longitude}));
            setSpeed(e.nativeEvent.coordinate.speed.toFixed(1));
            trackSpeed.push(e.nativeEvent.coordinate.speed.toFixed(1));
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
        <Footer/>
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