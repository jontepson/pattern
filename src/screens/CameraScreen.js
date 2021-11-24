/**
 * Module for camera 
 */

import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Button, Alert } from 'react-native';
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

export default function CameraScreen({ route, navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  let user;
  try {
    user = route.params.userData
  } catch (error) {
    user = "tester"
    user.balance = 100;
  }
  /**
   * Ask for permission to use camera at screen start.
   */
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  
  /**
   * Asking the customer to confirm the order
   * @param {string} id bike id 
   */
  const rentBikeAlert = (id) => {
    Alert.alert(
      "Bekräfta",
      "Bekräfta beställning",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Hyr", onPress: () => RentABike(id, user) }
      ]
    );
  }

  /**
   * 
   * @param {*} param0
   * @param {*} param1 bike id 
   */
  const handleBarCodeScanned = ({ type, data }) => {
    console.log(type);
    setScanned(true);
    rentBikeAlert(data)
  };

  /**
   * Try to rent a bike
   * @param {*} data 
   * @param {*} user 
   * @redirect If everything works it redirect to DriveScreen with arguments (loggObject, battery)
   */
  const RentABike = (id, user) => {
    /**
     * api url för att hyra en cykel, behöver kunna ta emot data (ett id), och user (mail?)
     */
    /**
     * Kolla om cykeln finns eller inte
     * Om den finns ska detta gå igenom, finns den inte så ska den visa något error
     */
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    const specific_bike_endpoint = "/api/scooter/" + id;
    // const specific_bike_endpoint = "/api/scooter/618e2b260039c176514c80fd"
    var battery = "";
    try {
      if (user.balance > 0) {
        fetch(server + specific_bike_endpoint, {
          method: "GET",
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          }
        }).then((response) => response.json())
          .then((data) => {
            battery = data.data[0].battery;
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
            try {
              if (battery > 0) {
                startBike(data.data[0]._id, dateTime, user);
                alert("Cykel med id: " + data.data[0]._id + " är nu din, happy driving")

                navigation.navigate('DriveScreen', { loggObject: loggObject, battery: battery })
              }
            } catch (error) {
              alert("Batterifel")
            }
          })
          .catch((error) => {
            console.log(error);
            alert("Du kan inte hyra denna cykel")
          })
      } else {
        alert("Du har inga pengar på kontot, besök mina sidor för att fylla på")
      }
    } catch (error) {
      alert("This user is shady")
    }
  }



  /**
   * Try to start a bike
   * @param {string} id 
   * @param {string} time
   * @param {string} user 
   */
  const startBike = (id, time, user) => {
    // start bike
    // Behöver skicka med användare väl?

    const api_setuser_endpoint = "/api/scooter/setuser";
    const api_startBike_endpoint = "/api/scooter/start";
    const startBike_body = {
      id: id,
      start_time: time
    }
    const setUser_body = {
      id: id,
      active_user: user
    }

    fetch(server + api_setuser_endpoint, {
      method: "PUT",
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(setUser_body)
    }).then((response) => response.json())
      .catch((error) => {
        console.log(error);
      })

    fetch(server + api_startBike_endpoint, {
      method: "PUT",
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(startBike_body)
    }).then((response) => response.json())
      .catch((error) => {
        console.log(error);
      })
  }
  /**
   * Render functions
   */
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <Background>
      <Logo />

      <BackButton goBack={() => navigation.navigate("MapScreen2")} />

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