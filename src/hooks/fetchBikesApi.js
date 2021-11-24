// src/hooks/fetchBikesApi.js

import React from 'react';
import fetch from 'node-fetch'
const server = "http://192.168.1.73:1337";

export default function fetchBikesApi() {
  const [data, setData] = React.useState([]);  	
    
  React.useEffect(() => {
    const api_bikes_endpoint = "/api/scooter";
    fetch(server + api_bikes_endpoint, {
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
  }, []);

  return data;
}