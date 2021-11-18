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
  import { Dimensions, StyleSheet, PermissionsAndroid, Text } from 'react-native';
  import Button from '../components/Button'
  import Footer from '../components/Footer';

  const { width } = Dimensions.get('window');
  const qrSize = width;
  const server = "http://192.168.1.73:1337";

 export default function MapScreen({ navigation }) {
    const [bike, setBike] = useState(true);
    const [parkingZone, setParkingZone] = useState(false);
    const [chargingPosts, setChargingPosts] = useState(false);
    const [bikeData, setBikeData] = useState([]);
    const [cityData, setCityData] = useState([]);

    // fetch data on init
    useEffect(() => {
      let api_bikes_endpoint = "/api/scooter";
      let api_cities_endpoint = "/api/cities";

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

      // fetch cities
      fetch(server + api_cities_endpoint, {
        method: "GET",
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        }
        }).then((response) => response.json())
      .then((data) => {
          setCityData(data.data)
          
      })
      .catch((error) => {
        console.log(error);
      })

    }, [])

    function showBikes(param, data) { 
      if(param && data) {
        for (const property in data) {
          return (
            <Marker
            key={data[property]._id}
            coordinate={{latitude: parseFloat(data[property].position.lat), longitude: parseFloat(data[property].position.lng)}}
            pinColor="red"
            title={"Bike " + data[property]._id + " " + data[property].city_location}
            description={"Battery: " + data[property].battery.toString()}
          />
          )
        } 
      }
    }
    function showParkingZone(param, data) {
      if(param && data) {
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
      }
    }
    function showChargingPosts(param, data) {
      if(param && data) {
        for (const property in data) {
          let array = [];       
          for (let polygonepart in data[property].charging_posts[0].position) {
            // loop all parts of polygone
                array.push({
                  "latitude": parseFloat(data[property].charging_posts[0].position[polygonepart].lat),
                  "longitude": parseFloat(data[property].charging_posts[0].position[polygonepart].lng),
                })
          }
          return (
            <Polygon
            coordinates={array}
            fillColor="green"
            tappable={true}
            onPress={() => alert("Charging Post")}
          />
          )
        }
      }
    }

    function changeState(variable, func) {
      if(variable) {
        func(false)
      } else {
        func(true)
      }
    }
    
   return (
     <Background>
       <SettingsButton goBack={navigation.goBack}/>
       <MapView
        showsUserLocation={true}
        style={styles.map}
    >
        {showChargingPosts(chargingPosts, cityData)}
        {showBikes(bike, bikeData)}
        {showParkingZone(parkingZone, cityData)}
        </MapView>
        {/*
        <Header>Available bikes</Header>
        */}
        <Button mode="contained"
        onPress={() => changeState(bike, setBike)}
        >
          Bikes
        </Button>
        <Button mode="contained"
        onPress={() => changeState(parkingZone, setParkingZone)}
        >
          Parking Zones
        </Button>
        <Button mode="contained"
        onPress={() => changeState(chargingPosts, setChargingPosts)}
        >
          Charging Posts
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
        width: 100,
        textAlign: 'center'
      }
});