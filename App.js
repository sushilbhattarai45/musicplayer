
import 'react-native-gesture-handler';
import { Foundation } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
import React,{useEffect} from 'react';
import { LogBox, StatusBar, ScrollView, Text, Image } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator }     from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons'; 
import Signup from './pages/signup';
import Home from './pages/HomeScreen';   
import DetailsScreen from './pages/DetailsScreen';
import ProfileScreen from './pages/ProfileScreen';
import SettingsScreen from './pages/SettingsScreen';
import PlayMusic from './pages/playmusic';
import {
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import Playlist from './pages/playlist';
import AppLoading from "expo-app-loading";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const MyStack = () => {

  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Welcome' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};



function App() {
    useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);
  // use the fonts
  let [fontsLoaded] = useFonts({
    200: Poppins_200ExtraLight,
    300: Poppins_300Light,
    400: Poppins_400Regular,
    500: Poppins_500Medium,
    600: Poppins_600SemiBold,
    700: Poppins_700Bold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (<NavigationContainer>
       <Stack.Navigator
    
      initialRouteName="Home"
    screenOptions={{
          tabBarStyle:  {height: 120 },

    headerShown: false
  }}
      
      >
      <Stack.Screen
       screenOptions={{
    headerShown: false
  }}
        name="Home"
        component={Home}
        options={{ title: 'Home Page' }}
      />
      <Stack.Screen
        name="Music"
        component={PlayMusic}
        options={{ title: 'Details Page' }}
      />
        <Stack.Screen
        name="Playlist"
        component={Playlist}
        options={{ title: 'Details Page' }}
      />
              <Stack.Screen
        name="SignUp"
        component={Signup}
        options={{ title: 'SignUp Page' }}
      />
         <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'SignUp Page' }}
      />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
