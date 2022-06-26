import * as Google from 'expo-google-app-auth';
import React,{useEffect,useState,useRef} from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Slider,
  Platform,
  Pressable
} from "react-native";
async function signInWithGoogleAsync() {
  try {
    const result = await Google.logInAsync({
      androidClientId: '',
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      name=result.user.name;
      alert(name)
    } else {   
      return { cancelled: true };
    }
  } catch (e) {
alert(e);
  }
}
export default function Goolesign()
{
return (


  <Text  style={{margin:50}}onPress={signInWithGoogleAsync}>
  Hello
  
  </Text>
)
}