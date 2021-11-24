// src/hooks/fetchUserApi.js

import React from 'react';
import fetch from 'node-fetch'
const server = "http://192.168.1.73:1337";

export default function fetchUserApi( user ) {
  const [data, setData] = React.useState([]);  	
    
  React.useEffect(() => {
    const api_user_endpoint = "/api/user/" + user
    fetch(server + api_user_endpoint, {
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