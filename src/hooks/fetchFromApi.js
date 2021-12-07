// src/hooks/fetchCitiesApi.js

import React from 'react';
import fetch from 'node-fetch'
const server = "http://192.168.1.73:1337";

export default function fetchFromApi(typeOf, user="") {
  const [data, setData] = React.useState([]);  	
    
  React.useEffect(() => {
    const getApiEndpoint = "/api/"+ typeOf + "/" + user;
    fetch(server + getApiEndpoint, {
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

  return data;
}