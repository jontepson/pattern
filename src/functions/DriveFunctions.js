 import moment from "moment";
 import { Alert } from "react-native";
 import fetch from 'node-fetch'
 /**
   * Function to return a bike
   * @param {Object} loggObject 
   * @param {Float} latitude 
   * @param {Float} longitude
   * @param {Function} navigation
   * @param {Object} userData
   * @redirect Back to MapScreen2
   */
  const server = "http://192.168.1.73:1337";
  export const returnBike = (loggObject, latitude, longitude, navigation, userData) => {
    /***
     * lämna tillbaka cykel
     */
    var dateTime = moment().format('hh:mm');
    /*
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    */
    loggObject.end_lat = latitude;
    loggObject.end_lng = longitude;
    loggObject.end_time = dateTime;
    console.log(loggObject)
    // insert Logg to bike
    const api_insertLogg_endpoint = "/api/scooter/insertLogg";
    fetch(server + api_insertLogg_endpoint, {
      method: "PUT",
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        "x-access-token": global.token
      },
      body: JSON.stringify(loggObject)
      }).then((response) => response.json())
      .catch((error) => {
      console.log(error);
    })
    //Change status of bike
    const api_setuser_endpoint = "/api/scooter/setuser";
    const setUser_body = {
      _id: loggObject._id
    }
    fetch(server + api_setuser_endpoint, {
      method: "PUT",
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        "x-access-token": global.token
      },
      body: JSON.stringify(setUser_body)
      }).then((response) => response.json())
      .catch((error) => {
      console.log(error);
    })

    //Insert trip for this user
    const api_insertTrip_endpoint = "/api/customers/trip";
    const setTrip_body = {
      _id: userData._id,
      trip_id: 1,
      date: dateTime,
      price: 25,
      start_lat: loggObject.start_lat,
      start_lng: loggObject.start_lng,
      start_time: loggObject.start_time,
      stop_lat: loggObject.end_lat,
      stop_lng: loggObject.end_lng,
      stop_time: loggObject.end_time
    }
    fetch(server + api_insertTrip_endpoint, {
      method: "PUT",
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        "x-access-token": global.token
      },
      body: JSON.stringify(setTrip_body)
      }).then((response) => response.json())
      .catch((error) => {
      console.log(error);
    })

    //Update balance for this user
    const api_setBalance_endpoint = "/api/customers/balance";
    const setBalance_body = {
      _id: userData._id,
      balance: userData.balance - setTrip_body.price
    }
    fetch(server + api_setBalance_endpoint, {
      method: "PUT",
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        "x-access-token": global.token
      },
      body: JSON.stringify(setBalance_body)
      }).then((response) => response.json())
      .catch((error) => {
      console.log(error);
    })
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
      if (process.env.NODE_ENV !== "test") {
        navigation.navigate('MapScreen2')
      }
      
    }