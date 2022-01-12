/**
 * Module for login screen
 * Use github login
 */
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { theme } from '../core/theme';
import { AntDesign } from '@expo/vector-icons';
import { warmUpBrowser } from '../hooks';
import fetch from 'node-fetch'
import {
  Background,
  BackButton,
  Header,
  ErrorBoundary
} from '../components'

const server = "http://192.168.1.73:1337";
let config;

try {
  config = require("../config/config.json");
  if (process.env.NODE_ENV === "development") {
    config = require("../config/configDev.json")
  }
} catch (error) {
  console.log(error)
}
let clientId = process.env.CLIENTID || config.clientId;
let clientSecret = process.env.CLIENTSECRET || config.clientSecret
//alert(process.env.NODE_ENV)
const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: 'https://github.com/settings/connections/applications/' + clientId,
};

WebBrowser.maybeCompleteAuthSession();
let isProxy = false

export default function LoginScreen({ navigation }) {
 warmUpBrowser()
  
    const [request, response, promptAsync] = useAuthRequest(
      {
        clientId: clientId,
        scopes: ['identity'],
        redirectUri: makeRedirectUri({ useProxy: isProxy })
      },
      discovery
    );
    useEffect(() => {
      if (response?.type === 'success') {
        const { code } = response.params;
        const body = {
          client_id: clientId,
          client_secret: clientSecret,
          code: code,
        }
  
        const url = "https://github.com/login/oauth/access_token";
        fetch(url, {
          method: "POST",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        }).then((response) => response.json())
          .then((data) => {
    
            const authUrl = "https://api.github.com/user";
            fetch(authUrl, {
              method: "GET",
              headers: {
                Authorization: "token " + data.access_token
              }
            }).then((response) => response.json())
              .then((data) => {
        
                LoginUser(data.login)
              })
              .catch((error) => {
                console.error(error);
              })
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }, [response]);
  
 
  
  /**
   * Do some check if user is in register or not. 
   * 
 */
  /**
   * 
   * @param {*} username 
   * @param {*} id
   */
  function LoginUser(username) {
    const createUserEndpoint = "/api/customers/login"; //endpoint for creating and login user
    let body = {
      "username": username,
    }
    fetch(server + createUserEndpoint, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then((response) => response.json())
      .then((data) => {
        global.token = data.data.token;
        navigation.navigate('MapScreen2', { data: data })
      })
      .catch((error) => {
        console.log(error);
      })
  }


  let redirectUri = makeRedirectUri({ useProxy: isProxy })
  //console.log(redirectUri)
  return (
    <ErrorBoundary>
    <Background>
      <BackButton goBack={navigation.goBack} />
      <AntDesign className="loginImage" style={styles.link} name="github" size={130} onPress={() => promptAsync({ redirectUri })}/>
      <Header className="loginHeader" onPress={() => promptAsync({ redirectUri })}>Logga in med github</Header>
      
    </Background>
    </ErrorBoundary>
  )
}


const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
    paddingTop: 4,
    paddingBottom: 4
  },
})