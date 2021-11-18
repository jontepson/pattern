/**
 * Module for camera 
 */

import React, { useState, useEffect } from 'react';
import { Image, Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Constants from 'expo-constants';
import { Dimensions } from 'react-native';
import Background from '../components/Background'
import Logo from '../components/Logo'
import BackButton from '../components/BackButton';
import Header from '../components/Header';
import Footer from '../components/Footer';
/**
 * Karta
 * Sin egen position
 */
const { width } = Dimensions.get('window');
const qrSize = width * 0.7;
const server = "http://192.168.1.73:1337";

export default function CameraScreen({ route, navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  let user;
  try {
    user = route.params.user
  } catch (error) {
    user = "tester"
  }
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const rentBikeAlert = (data) => {
    Alert.alert(
      "Bekräfta",
      "Bekräfta beställning",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Hyr", onPress: () => RentABike(data, user) }
      ]
    );
  }
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    rentBikeAlert(data)
  };

  const RentABike = (data, user) => {
      /**
       * api url för att hyra en cykel, behöver kunna ta emot data (ett id), och user (mail?)
       */
    /**
     * Kolla om cykeln finns eller inte
     * Om den finns ska detta gå igenom, finns den inte så ska den visa något error
     */
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    const specific_bike_endpoint = "/api/scooter/" + data;
    // const specific_bike_endpoint = "/api/scooter/618e2b260039c176514c80fd"
    var battery = "";
    let start_lat;
    let start_lng;
    fetch(server + specific_bike_endpoint, {
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      }
    }).then((response) => response.json())
    .then((data) => {
        console.log(data)
       
        battery = data.battery;
        const loggObject = {
          id: data.data[0]._id,
          active_user: user,
          start_lat: data.data[0].position.lat,
          start_lng: data.data[0].position.lng,
          start_time: dateTime,
          end_lat: "",
          end_lng: "",
          end_time: ""
        }
        alert("Cykel med id: " + data.data[0]._id + " är nu din, happy driving")
        
        navigation.navigate('DriveScreen', {loggObject: loggObject, battery: battery})
    })
    .catch((error) => {
      console.log(error);
      alert("Du kan inte hyra denna cykel")
    })

    // start bike
    // Behöver skicka med användare väl?
    /*
    const start_bike_endpoint = "/api/scooter/setuser";
    const body = {
      id: data,
      active_user: user
    }
    fetch(server + start_bike_endpoint, {
      method: "PUT",
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then((response) => response.json())
    .then((data) => {
        start_lat = data.position.lat;
        start_long = data.position.long;
    })
    .catch((error) => {
      console.log(error);
    })*/

       
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <Background>
    <Logo/>
    
    <BackButton goBack={navigation.goBack}/>

    <BarCodeScanner
    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
    style={styles.qr}>
        
    {scanned && <Button title={'Tryck för att scanna igen'} onPress={() => setScanned(false)} />}
    </BarCodeScanner>
    <Header>Scanna cykel</Header>
    <Footer />
    </Background>
  );
}

const opacity = 'rgba(0, 0, 0, .6)';
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