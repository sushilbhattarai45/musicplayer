import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import { FontAwesome5 } from '@expo/vector-icons';
import React,{useEffect,useState,useRef} from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  Text,
  Image,
  Slider,
  Platform,
  Animated,  Easing,
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { AsyncStorage } from 'react-native';
import * as Notifications from 'expo-notifications';

import { Audio } from 'expo-av';

import { Feather } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 

import AntD from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";       
import Ionicons from "react-native-vector-icons/Ionicons";
const gray = "#91A1BD";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


async function schedulePushNotification(filename) {

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Currently Playing",
      body: filename,
      data: { data: 'goes here' },
          sound: 'r.wav', // Provide ONLY the base filename

    },
    trigger: { seconds: 2 },              

  });

}


async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;    
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}        


             

export default function PlayMusic({navigation,route}) {
      


 let rotateValueHolder = new Animated.Value(0);

  const startImageRotateFunction = () => {
    rotateValueHolder.setValue(0);
    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => startImageRotateFunction());
  };

  const RotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
const [time,setTime]=useState(null)
const url =route.params.url;    
const name =route.params.name;    
const author =route.params.author;  
const img =route.params.img;        
console.log(img)
 
  const [durationmin, setDurationmin] = useState('00');
    const [durationsec, setDurationsec] = useState('00');
  const [positionmin, setPositionmin] = useState('00');
    const [positionsec, setPositionsec] = useState('00');
  
    const [download, setDownload] = useState(false);

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

function notifi()
{
  registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
}

  const audio = {
  filename: name,
   uri: url,

};
 const stopmusic =(async()=>
{
  var lastwala =await AsyncStorage.getItem("last");
await lastwala.stopAsync();
})
 function  allowbackground()
{
   Audio.setAudioModeAsync({
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      staysActiveInBackground: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playsInSilentModeIOS: true,
    });          
}
async function getplayedtime()
{
 const result = await sound.current.getStatusAsync();

const durationl=(result.positionMillis/(1000*60));
var num = parseFloat(durationl).toFixed(2)
var dmin=num.toString();
var dnumarray=dmin.split('.');
var min=new Array();
min=dnumarray;
setPositionmin(min[0]);
  var seconds = ((result.positionMillis% 60000) / 1000);
var dsec=seconds.toString();
var dsecarray=dsec.split('.');
var sec=new Array();
sec=dsecarray;
setPositionsec(sec[0]);


}



downloadFile = async (url) =>{ 
  setDownload(true)
    let path = url.split('/');
    const file_name = path[path.length-1];
     FileSystem.downloadAsync(
      url,
      FileSystem.documentDirectory + file_name
    )
      .then(({ uri }) => {
        console.log('Finished downloading to ', uri);
          setDownload(false)

        MediaLibrary.createAssetAsync(uri).then(asset => {
          console.log('asset', asset);
          alert("Music has been successfully downloaded.!!")
        MediaLibrary.createAlbumAsync('myfolder', asset)
          .then(() => {
            showMessage({
              message: t('general.success'),
                description: t('download.success'),
              type: 'success'
            });
          })
          .catch(error => {
            showMessage({
              message: t('general.success'),
                description: t('download.failed'),
              type: 'danger'
            });
          });
        });
        
      })
      .catch(error => {
        console.error(error);
      });
  }




async function finish()
{
 const status=await sound.current.getStatusAsync()
if(status.didJustFinish)
{
console.log(status.didJustFinish)}
}
 
  const sound = React.useRef(new Audio.Sound());
const [time1,setTime1]=useState(null)
  React.useEffect(() => {
   setPositionmin("00")   
    let unsubscribe = sound.current;
startImageRotateFunction() 


  this.interval = setInterval(() => {
    if(isPlaying)
    {
    finish()
  }} , 1000);


    return () => unsubscribe.unloadAsync();
  }, []);

  const LoadAudio = async () => {
    const checkLoading = await sound.current.getStatusAsync();
    // Get Loading Status

    if (checkLoading.isLoaded === false) {
      try {
        const result = await sound.current.loadAsync(     
          
          
           {uri:url}, true);
        if (result.isLoaded === false) {
          console.log('Error in Loading Audio');
        } else {
          await playSound();
        }
      } catch (error) {
        console.log('Error in Loading Audio');
      }
    } else {
      console.log('Error in Loading Audio');
    }
  };

 
const [isPlaying,setIsPlaying]=React.useState(null);
  const playSound = async () => {
    try {
        
//
 const result = await sound.current.getStatusAsync();

  this.interval = setInterval(() => getplayedtime());

const durationl=(result.durationMillis/(1000*60));
var num = parseFloat(durationl).toFixed(2)
var dmin=num.toString();
var dnumarray=dmin.split('.');
var min=new Array();
min=dnumarray;
setDurationmin(min[0]);
  var seconds = ((result.durationMillis% 60000) / 1000);
  console.log(seconds)
var dsec=seconds.toString();
var dsecarray=dsec.split('.');
var sec=new Array();
sec=dsecarray;
setDurationsec(sec[0]);





if(isPlaying)
{
  sound.current.pauseAsync();
  setIsPlaying(false)
}
else{
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          sound.current.playAsync();
          setIsPlaying(true)
 
        }
      } else {
        await LoadAudio();
      
      }
}
    } catch (error) {
      console.log('Error in Playing Audio');
    }
  };

async function forward()
{
if(isPlaying)
{

 const result = await sound.current.getStatusAsync();

const position=result.positionMillis;
console.log(position)

sound.current.playFromPositionAsync(position+5000)
}
  
}

async function backward()
{
if(isPlaying)
{

 const result1 = await sound.current.getStatusAsync();

const position1=result1.positionMillis;
console.log(position1)

sound.current.playFromPositionAsync(position1-5000)
}
  
}
  
  

  const NeuMorph = ({ children, size, style }) => {
    return (
      <View style={styles.topShadow}>
        <View style={styles.bottomShadow}>
          <View
            style={[
              styles.inmer,
              {
                width: size || 40,
                height: size || 40,
                borderRadius: size / 2 || 40 / 2,
              },
              style,
            ]}
          >
            {children}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ alignSelf: "stretch" }}>
        <View style={{ marginHorizontal: 32, marginTop: 32 }}>
          <View style={styles.topContainer}>
            <NeuMorph size={48}>
              <AntD onPress={()=>navigation.navigate("Home")} name="arrowleft" size={20} color={gray} />
            </NeuMorph>

            <View>
              <Text style={styles.playing}>NOW PLAYING</Text>
            </View>
            <NeuMorph size={48}>
              <Entypo onPress={()=>alert("Not available for the current user ! Please Upgrade your account to premium to access the feature !!")} name="menu" size={24} color={gray} />
            </NeuMorph>
          </View>

          <View style={styles.songArtContainer}>
            <NeuMorph size={300}>
  <Animated.Image
          style={{ 
    width: 300,
    height: 300,
    borderRadius: 150,
    borderColor: "#D7E1F3",
    borderWidth: 10,
  transform: [{rotate: RotateData}],

  }}
        source={{uri:img}}

        />


            
  
            </NeuMorph>
          </View>   
            
          <View style={styles.songContainer}>      
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.artist}>{author}   
</Text>       
{download ?                  <ActivityIndicator size="large" style={{marginTop:20}}  color="#A231FE" />
:
<FontAwesome5 onPress={()=>{downloadFile(url)}} name="cloud-download-alt" size={26} style={{justifyContent:"center",alignContent:"center",marginTop:20}} color="#A231FE" /> 

}
</View>
          <View style={styles.trackContainer}>     
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.time}>
                            {positionmin}:{positionsec}</Text>
              <Text style={styles.time}>{durationmin}:{durationsec}</Text>

            </View>
            <Slider
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#8AAAFF"
              maximumTrackTintColor="#DAE6FA"
              thumbTintColor="#7B9BFF"
            />
          </View>   

          <View style={styles.controlsContainer}>
            <NeuMorph size={80}>
<Feather onPress={()=>backward()}  name="rewind" size={24} color={gray} />          
  </NeuMorph>
 
            <NeuMorph
              size={80}
              style={{ backgroundColor: "#8AAAFF", borderColor: "#8AAAFF" }}
            >
<AntDesign name={isPlaying ? 'pause' : 'play'} size={24} color="white" 
               onPress={playSound}

 />  
          </NeuMorph>





  
            <NeuMorph size={80}>
<Feather name="fast-forward" size={24} color={gray} onPress={()=>forward()} />   
      </NeuMorph>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inmer: {
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#1D1F3E",
    borderWidth: 1,
  },
  topShadow: {
    shadowOffset: {
      width: -6,
      height: -6,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6,
    elevation: 10,
    shadowColor: "#1D1F3E",
  },
  bottomShadow: {
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6,
    elevation: 10,
    shadowColor: "#1D1F3E",
  },
  playing: {color:'white',fontFamily:'400'    ,

    fontWeight: "800",
  },
  songArtContainer: {
    marginVertical: 32,
    alignItems: "center",
  },
  songContainer: {
    alignItems: "center",
  },
  title: {
color:'white',fontFamily:'400'    ,
    textAlign:"center",
    fontSize: 26,
    fontWeight: "600",
  },
  artist: {
color:'white',fontFamily:'300'    ,

    fontSize: 14,
    fontWeight: "500",
  },
  trackContainer: {
    marginTop: 32,
    marginBottom: 64,
  },
  time: {
    fontSize: 10,
    color: gray,
    fontWeight: "700",
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});