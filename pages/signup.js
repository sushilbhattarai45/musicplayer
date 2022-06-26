import  React,{ useEffect,useState } from 'react';
import { Text, View, StyleSheet,ScrollView,Image,FlatList,ActivityIndicator,Pressable,Alert,AsyncStorage} from 'react-native';
import * as Facebook from 'expo-facebook';
import Logo from "../assets/logo.svg";
import Animation from "react-native-lottie";
import * as Google from 'expo-google-app-auth';
import SvgUri from 'react-native-svg-uri';
import SimpleAnimation from '../animation/girlani.json';
import { Card } from 'react-native-paper';
 import { Animated, Platform,  } from "react-native";
 
 const styles = StyleSheet.create({
  anim: { width: 200, height: 200, },
});
export default function Signup({navigation})
{
  
  const [userData, setUserData] = useState({});
const[download,setDownload]=useState(false)

async function signInWithGoogleAsync() {
setDownload(true)
  try {
    const result = await Google.logInAsync({
      androidClientId: '',
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      const name=result.user.name;  
            const email=result.user.email;
            const photo =result.user.photoUrl;
           const gid =result.user.id;
setDownload(false)

await AsyncStorage.setItem("name",name);
await AsyncStorage.setItem("gid",gid);
await AsyncStorage.setItem("fid",'googlelogin');

await AsyncStorage.setItem("fgid",email);
await AsyncStorage.setItem("photo",photo);
insertuser()
alert("Hi "+name +" Good To See You Here !!")
navigation.navigate("Home")

    } else {   
      return { cancelled: true };
    }
  } catch (e) {
alert(e);
  }
}
function animate()
{
Animated.timing(
        progress,
        { toValue: 1, duration: 15000, useNativeDriver: Platform.OS !== "web" },
      ).start();
   
}
  const [progress] = useState(() => new Animated.Value(0));
 const MINUTE_MS =3000;

useEffect(async() => {
animate() 
var id =userData.id;
var name =userData.name;

console.log(id)
console.log(name)

if(id!==null)
{
  await AsyncStorage.setItem("gid",'fblogin')

await AsyncStorage.setItem("fid",id);
await AsyncStorage.setItem("photo","https://previews.123rf.com/images/butenkow/butenkow1612/butenkow161202014/67425650-design-pattern-di-musica-logo-illustrazione-vettoriale-di-icona.jpg")
  await AsyncStorage.setItem("email",id)
    await AsyncStorage.setItem("name",name)
        await AsyncStorage.setItem("fgid",id)
        insertuser()

alert("Hi "+name +" Good To See You Here !!")

navigation.navigate("Home")
}

}, [userData])   

async function insertuser()
{
    var gid=await AsyncStorage.getItem("gid");
    var fid=await AsyncStorage.getItem("fid");

  var name=await AsyncStorage.getItem("name");
  var photo=await AsyncStorage.getItem("photo");
  var fgid=await AsyncStorage.getItem("fgid");

console.log(name+photo+fgid+gid)

   var data = {
      key:'5485FE5759545A4A',
      photo:photo,
      name:name,
      email:fgid,
      gid:gid,
      fid:fid,
    };
    var url = 'URL';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',    
    };
    fetch(url, {
      method: 'POST',
      headers: headers,   
      body: JSON.stringify(data),
    }) 
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((error) => console.error(error))
      .finally(() => {
      });
    

}

const styles = StyleSheet.create({
  anim: { width: 200, height: 200, alignSelf:"center",top:40 },
});
async function fblogIn() {
  setDownload(true)

  try {
    await Facebook.initializeAsync({
      appId: '',   
    });
    const { type, token, expirationDate, permissions, declinedPermissions } =
      await     Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile','email'],
      });
    if (type === 'success') {     
      console.log("success")

      // const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      // Alert.alert((await response.json()).name);
      // await AsyncStorage.setItem("name",(await response.json()).name )

fetch(`https://graph.facebook.com/me?access_token=${token}`)
          .then(response => response.json())
          .then(data => {
setUserData(data)
setDownload(false)

navigation.navigate("Home")
    })


    } else {
      console.log("unsuccess")
    }
  } catch ({ message }) {
  }
}

return(

<View style={{backgroundColor:"black",flex:1}}>
<View>

       <Animation
      style={styles.anim}
      source={SimpleAnimation}
      progress={progress}
    />

 <Text style={{fontSize:24,bottom:30,textAlign:"center",alignSelf:"center",marginTop:90,color:'white',fontFamily:'400',
}}>Music App</Text>
 </View>
 
 <Text style={{color:"white",fontSize:17,bottom:30,fontFamily:"400",fontWeight:"300",marginLeft:50,marginTop:90}}>SignUp</Text>
<Pressable
onPress={signInWithGoogleAsync}

 style={{
  position: 'absolute',
left: '11.92%',
right: '12.15%',
height:60,
top: '54.08%',      
textColor:"white", 
bottom: '43.27%', 
   display:'flex',
   flexDirection:"row",    
   alignContent:"center",
justifyContent:"center"  ,
borderColor:"white",
borderWidth:2,
borderRadius: 7,
}}>
<Image
        style={{width:30,height:30,marginTop:12,position:"absolute",left:20}}
        source={require('../assets/g.png')}
      /> 
<Text style={{display:"flex",color:"white",left:65,marginTop:16,fontSize:16,fontFamily:"600",fontWeight:"600",position:"absolute",}}>Sign Up with Google</Text>

</Pressable>

<Pressable 

onPress={
  fblogIn
}
 style={{
  position: 'absolute',
  marginTop:70,
left: '11.92%',
right: '12.15%',
height:60,
top: '54.08%',      
textColor:"white", 
bottom: '43.27%', 
   display:'flex',
   flexDirection:"row",    
   alignContent:"center",
justifyContent:"center"  ,
borderColor:"white",
borderWidth:2,
borderRadius: 7,
}}>
<Image
        style={{width:30,height:30,marginTop:12,position:"absolute",left:20}}
        source={require('../assets/f.png')}
      /> 
<Text style={{display:"flex",color:"white",left:65,marginTop:16,fontSize:16,fontFamily:"600",fontWeight:"600",position:"absolute",}}>Sign Up with Facebook</Text>

</Pressable>
<View style={{marginTop:160,}}><Text style={{textAlign:"center",color:"white",fontFamily:"400",fontWeight:"300",}}>Already have an Account ?<Text style={{    textDecorationLine: 'underline',
fontWeight:"bold"}}> Login In</Text></Text>

<Text style={{color:"white",textAlign:"center",alignSelf:"center",fontFamily:"400",fontWeight:"300",    textDecorationLine: 'underline',
}} onPress={()=>navigation.navigate("Home")} >Start Without Login</Text>

{download ?                  <ActivityIndicator size="large" style={{marginTop:20}}  color="#A231FE" />
:null}


</View>
   
 <Text style={{color:"white",position:"absolute",bottom:30,textAlign:"center",alignSelf:"center",fontFamily:"400",fontWeight:"300",}}>By Signing in you agree to our</Text>
  <Text style={{color:"white",position:"absolute",bottom:10,textAlign:"center",alignSelf:"center",fontFamily:"400",fontWeight:"bold",}}>Terms and Conditions</Text>
              </View>
)
}