// src/hooks/logDataHook
// Uses a express server with a route to log in console. Using this to see whats happening in production

import React from 'react';
import fetch from 'node-fetch'
const server = "http://192.168.1.73:3000";

export default function logDataHook( data ) {
  React.useEffect(() => {
    const log_endpoint = "/log"
    fetch(server + log_endpoint, {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then((response) => response.json())
        .then((data) => {
          console.log(data)
        })
        .catch((error) => {
          console.log(error);
        })
  }, []);
}