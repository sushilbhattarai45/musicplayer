
import React,{useEffect,useState} from 'react';
import { View, Text, SafeAreaView ,ScrollView,Image,Animated,  Easing,AsyncStorage
} from 'react-native';
import { Card } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';


function ProfileScreen({navigation}) {
  const [name,setName]=useState(null)
    const [email,setEmail]=useState(null)
   const [gid,setGid]=useState(null)
    const [photo,setPhoto]=useState(null)

async function logout()
{
await AsyncStorage.removeItem("name");
await AsyncStorage.removeItem("photo");

await AsyncStorage.removeItem("fgid");

await AsyncStorage.removeItem("email");

alert("Successfulled Logged Out")
 navigation.navigate("Home")


}
     async function getdata()
    {

const name = await AsyncStorage.getItem("name")
const email = await AsyncStorage.getItem("email")
const photo = await AsyncStorage.getItem("photo")
const fgid = await AsyncStorage.getItem("fgid")



if(fgid==null)
{
 navigation.navigate("SignUp")


    }
    else
    {
      setName(name)
    setEmail(email)
     setPhoto(photo)
      setGid(gid)
      startImageRotateFunction()


    }
  
    }


 
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

React.useEffect(async() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getdata(); 
      startImageRotateFunction()
      //Put your Data loading function here instead of my loadData()
    });

    return unsubscribe;     
  }, [navigation]);
 
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16,backgroundColor:"black" }}>
      <ScrollView style={{marginLeft:5}}>
<View>
<View style={{marginTop:30,backgroundColor:"white",width:165,height:165,borderRadius:100,alignSelf:"center",  justifyContent: 'center',
    alignItems: 'center',}}>
   <Animated.Image
   
          style={{
            width: 150,
            height: 150,
            borderRadius:100,
            alignSelf:"center",
            transform: [{rotate: RotateData}],
          }}
        source={{uri:photo}}

        />
        </View>
      <Text style={{marginTop:20,fontSize:20,color:"white",textAlign:"center",fontFamily:"600",fontWeight:"300",}} onPress={()=>{  
          navigation.navigate('Home')

      }}>{name}</Text>
      <View styel={{display:"flex",flexDirection:"row",flex:1}}>
            <Text style={{color:"white",textAlign:"center",fontFamily:"400",fontWeight:"300",}}>{email}</Text>
          
            <AntDesign name="logout"  onPress={()=>logout()} style={{position:"absolute",right:10}}size={24} color="#A231FE" />
</View>

</View>
<View style={{marginTop:20,borderTopColor:"white",borderTopWidth:2}}>
<Text style={{marginTop:20,fontSize:16,color:"white",}}>Quick Info</Text>



<Card  style={{padding:10,marginTop:15,backgroundColor:"black",height:60,borderRadius:20,}}>
<View style={{dsiplay:"flex",flex:1,flexDirection:"row",alignContent:"center",marginVertical:7}}>
 <Image
        style={{width:40,height:40,alignSelf:"center",borderRadius:50,}}
        source={require('../assets/upload.jpg')}
      /> 
 <Text style={{marginLeft:15,color:"white",fontSize:16,fontFamily:"400"}} >Uploads</Text>
  <Text style={{position:"absolute",right:10,color:"white",fontWeight:"bold",fontFamily:"400",fontSize:20}}>0</Text>

    </View>
</Card>     
<Card  style={{padding:10,marginTop:15,backgroundColor:"black",height:60,borderRadius:20,}}>
<View style={{dsiplay:"flex",flex:1,flexDirection:"row",alignContent:"center",marginVertical:7}}>
 <Image
        style={{width:40,height:40,alignSelf:"center",borderRadius:50,}}
        source={require('../assets/moni.jpg')}
      /> 
 <Text style={{marginLeft:15,color:"white",fontSize:16,fontFamily:"400"}} >Monitization</Text>
  <Text style={{position:"absolute",right:10,color:"white",fontWeight:"bold",fontFamily:"400",fontSize:20}}>0</Text>

    </View>
</Card>     

<Card  style={{padding:10,marginTop:5,backgroundColor:"black",height:60,borderRadius:20,}}>
<View style={{dsiplay:"flex",flex:1,flexDirection:"row",alignContent:"center",marginVertical:7}}>
 <Image
        style={{width:40,height:40,alignSelf:"center",borderRadius:50,}}
        source={require('../assets/playlist.png')}
      /> 
 <Text style={{marginLeft:15,color:"white",fontSize:16,fontFamily:"400"}} >In Playlist</Text>
  <Text style={{position:"absolute",right:10,color:"white",fontWeight:"bold",fontFamily:"400",fontSize:20}}>0</Text>

    </View>
</Card>     
<Card  style={{padding:10,marginTop:15,backgroundColor:"black",height:60,borderRadius:20,}}>
<View style={{dsiplay:"flex",flex:1,flexDirection:"row",alignContent:"center",marginVertical:7}}>
 <Image
        style={{width:40,height:40,alignSelf:"center",borderRadius:50,}}
        source={require('../assets/terms.jpg')}
      /> 
 <Text style={{marginLeft:15,color:"white",fontSize:16,fontFamily:"400"}} >Terms And Condition</Text>

    
    </View>
</Card>   
<Card  style={{padding:10,marginTop:15,backgroundColor:"black",height:60,borderRadius:20,}}>
<View style={{dsiplay:"flex",flex:1,flexDirection:"row",alignContent:"center",marginVertical:7}}>
 <Image
        style={{width:40,height:40,alignSelf:"center",borderRadius:50,}}
        source={require('../assets/help.png')}
      /> 
 <Text style={{marginLeft:15,color:"white",fontSize:16,fontFamily:"400"}} >Help</Text>


    </View>
</Card>  
<Card  style={{padding:10,marginTop:15,backgroundColor:"black",height:60,borderRadius:20,}}>
<View style={{dsiplay:"flex",flex:1,flexDirection:"row",alignContent:"center",marginVertical:7}}>
 <Image
        style={{width:40,height:40,alignSelf:"center",borderRadius:50,}}
        source={require('../assets/log.jpg')}
      />     
 <Text style={{marginLeft:15,color:"white",fontSize:16,fontFamily:"400"}} >Logout</Text>


    </View>
</Card>  
<Card  style={{padding:10,marginTop:15,backgroundColor:"#074366",height:60,borderRadius:20,opacity:0.7}}>
<View style={{dsiplay:"flex",flex:1,flexDirection:"row",alignContent:"center",marginVertical:7}}>

<MaterialCommunityIcons name="playlist-music" size={24} color="#A231FE" /> 
<Text style={{marginLeft:10,color:"white",fontSize:16}} >In Playlist</Text>
  <Text style={{position:"absolute",right:10,color:"white",fontWeight:"bold",fontSize:20}}>9</Text>

    </View>
</Card>     
<Card  style={{padding:10,marginTop:15,backgroundColor:"#074366",height:60,borderRadius:20,opacity:0.7}}>
<View style={{dsiplay:"flex",flex:1,flexDirection:"row",alignContent:"center",marginVertical:7}}>

<MaterialCommunityIcons name="playlist-music" size={24} color="#A231FE" /> 
<Text style={{marginLeft:10,color:"white",fontSize:16}} >Help</Text>
  <Text style={{position:"absolute",right:10,color:"white",fontWeight:"bold",fontSize:20}}>9</Text>

    </View>
</Card>     

<Card  style={{padding:10,marginTop:15,backgroundColor:"#074366",height:60,borderRadius:20,opacity:0.7}}>
<View style={{dsiplay:"flex",flex:1,flexDirection:"row",alignContent:"center",marginVertical:7}}>

<FontAwesome name="dollar" size={24} color="#A231FE" />
 <Text style={{marginLeft:10,color:"white",fontSize:16}} >Monitization</Text>
  <Text style={{position:"absolute",right:10,color:"white",fontWeight:"bold",fontSize:20}}></Text>

    </View>
</Card>



<Card  style={{padding:10,marginTop:15,backgroundColor:"#074366",height:60,borderRadius:20,opacity:0.7}}>
<View style={{dsiplay:"flex",flex:1,flexDirection:"row",alignContent:"center",marginVertical:7}}>

<Octicons name="law" size={24} color="#A231FE" />
 <Text style={{marginLeft:10,color:"white",fontSize:16}} >Terms and Conditions</Text>
  <Text style={{position:"absolute",right:10,color:"white",fontWeight:"bold",fontSize:20}}></Text>

    </View>
</Card>  
</View>

      </ScrollView>
      </View>
    </SafeAreaView>
  );
}
export default ProfileScreen;
