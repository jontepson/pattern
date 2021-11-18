/**
 * Module for login screen
 * Use github login
 */
import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import Background from '../components/Background'
import Button from '../components/Button';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import config from '../config/config.json';
import Header from '../components/Header';

const server = "http://localhost:1337";

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: 'https://github.com/settings/connections/applications/' + config.clientId,
};

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen({ navigation }) {
    /**
     * 
     */
        const [request, response, promptAsync] = useAuthRequest(
            {
              clientId: config.clientId,
              scopes: ['identity'],
              redirectUri: makeRedirectUri({ useProxy: false })
            },
            discovery
          );
          /**
           * Do some check if user is in register or not. 
           * 
           */
          React.useEffect(() => {
            if (response?.type) {
              console.log(response)
              console.log(makeRedirectUri({ useProxy: false }))
            }
            if (response?.type === 'success') {
              const { code } = response.params;
              const body = {
                client_id: config.clientId, 
                client_secret: config.clientSecret,
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
                if (data.access_token) {
                const token = data.access_token
                const authUrl = "https://api.github.com/user";
                  fetch(authUrl, {
                    method: "GET",
                    headers: {
                      Authorization: "token " + data.access_token
                  }}).then((response) => response.json())
                  .then((data) => {
                    console.log(data)
                    //createUser(data.login, data.id)
                  
                    navigation.navigate('MapScreen2', { token: token, user: data.login})
                  })
                  .catch((error) => {
                    console.log(error);
                  })
                } else {
                  alert("Något gick fel med inloggningen")
                }
              })
              .catch((error) => {
                console.error(error);
              });
              }
          }, [response]);
  
  /**
   * 
   * @param {*} username 
   * @param {*} id 
   */
  function createUser(username, id) {
    const createUserEndpoint = "/api/user/"; //endpoint for creating user
    let body = {
      "user": username,
      "id": id
    }

    fetch(server + createUserEndpoint, {
      method: "POST",
      body: JSON.stringify(body)
      }).then((response) => response.json())
    .then((data) => {
      console.log(data)
      
    }).then(() => {
      // redirect till loggedInScreen och skicka med token eller username eller hur vi ska göra med det.
      navigation.navigate('LoggedInScreen')
    })
    .catch((error) => {
      console.log(error);
    })
  }
  let redirectUri = makeRedirectUri({ useProxy: false })
  return (
    <Background>
    <BackButton goBack={navigation.goBack} />
    <Button onPress={() => promptAsync({ redirectUri })}>
        <FontAwesomeIcon style={styles.link} icon={ faGithub } size={ 100 } />
    </Button>
    <Header onPress={() => promptAsync({ redirectUri })}>Logga in med github</Header>
    <Footer />
    </Background>
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
  },
})