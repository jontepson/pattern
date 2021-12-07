/**
 * Module for startscreen
 */
import React from 'react'
import {
  Background,
  Logo,
  Button,
  Footer
} from '../components'
export default function StartScreen({ navigation }) {
  //console.log(process.env.NODE_ENV)
  return (
    <Background>
      <Logo />

      <Button
        className="login"
        mode="contained"
        onPress={() => {
          try {
            navigation.navigate('LoginScreen')
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Logga in
      </Button>
 {/*
      <Button
        mode="contained"
        onPress={() => navigation.navigate('MapScreen2', { data: {
          "data": {
              "type": "success",
              "message": "User logged in",
              "user": {
                  "id": "61a8abacef9afab6dba1e42a",
                  "username": "jontepson",
                  "tag": "customer"
              },
              "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYThhYmFjZWY5YWZhYjZkYmExZTQyYSIsInVzZXJuYW1lIjoiam9udGVwc29uIiwidGFnIjoiY3VzdG9tZXIiLCJpYXQiOjE2Mzg0NTM0ODcsImV4cCI6MTYzODUzOTg4N30.5UPSUB11gxL5f1TcXJyDHfm9ZC7ugCPXkqDH6M6gzSg"
          }
        }
      })}
      >
        Fortsätt utan att logga in
      </Button>
    */}
      {/*
      <Button
        mode="contained"
        onPress={() => navigation.navigate('DriveScreen')}
      >
        Drive
      </Button>
      */}
      
    </Background>
  )
}
