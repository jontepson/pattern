 
 const server = "http://192.168.1.73:1337";
 import moment from "moment";
 import { Alert } from "react-native";
 import fetch from 'node-fetch'
 /**
   * Try to rent a bike
   * @param {*} data 
   * @param {*} userData 
   * @redirect If everything works it redirect to DriveScreen with arguments (loggObject, battery)
   */
   export const RentABike = (id, userData, navigation) => {
    /**
     * api url för att hyra en cykel, behöver kunna ta emot data (ett id), och user (mail?)
     */
    /**
     * Kolla om cykeln finns eller inte
     * Om den finns ska detta gå igenom, finns den inte så ska den visa något error
     */
    var dateTime = moment().format('YYYY-MM-DD, h:mm:ss');
    /*
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    */
    const specific_bike_endpoint = "/api/scooter/" + id;
    //const specific_bike_endpoint = "/api/scooter/619df218cf19506c715c5c90"
    if(process.env.NODE_ENV !== "test") {
    try {
      if (userData.balance > 0) {
        fetch(server + specific_bike_endpoint, {
          method: "GET",
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          }
        }).then((response) => response.json())
          .then((data) => {
            const loggObject = {
              _id: data.data[0]._id,
              active_user: userData.username,
              event: "Testkörning i App",
              start_lat: data.data[0].position.lat,
              start_lng: data.data[0].position.lng,
              start_time: dateTime,
              end_lat: "",
              end_lng: "",
              end_time: ""
            }
            if (data.data[0].battery > 0) {
                startBike(loggObject, data, userData, navigation);
            } else {
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
      console.log("This user is shady")
    }
    }
  }



  /**
   * Try to start a bike and set user
   * @param {string} id 
   * @param {string} time
   * @param {string} user 
   */
  export const startBike = (loggObject, data, userData, navigation) => {
    // start bike
    // Behöver skicka med användare väl?
    const api_setuser_endpoint = "/api/scooter/setuser";
    const api_startBike_endpoint = "/api/scooter/start";
    const startBike_body = {
      _id: data.data[0]._id,
      start_time: loggObject.start_time
    }
    const setUser_body = {
      _id: data.data[0]._id,
      active_user: userData.username
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
      if(process.env.NODE_ENV !== "test") {
      alert("Cykel med id: " + data.data[0]._id + " är nu din, happy driving")
        navigation.navigate('DriveScreen', { loggObject: loggObject, battery: data.data[0].battery, userData: userData })
      }
  }

  /**
   * Asking the customer to confirm the order
   * @param {string} id bike id 
   */
   export const rentBikeAlert = (id, userData, navigation) => {
    Alert.alert(
      "Bekräfta",
      "Bekräfta beställning",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Hyr", onPress: () => RentABike(id, userData, navigation) }
      ]
    );
  }
