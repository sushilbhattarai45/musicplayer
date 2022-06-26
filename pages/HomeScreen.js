import  React,{ useEffect,useState } from 'react';
import { Text, View, StyleSheet,ScrollView ,Image,FlatList,AsyncStorage,TextInput} from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import { AntDesign } from '@expo/vector-icons'; 
import { useFonts } from 'expo-font';
import { TrackPlayer } from "react-track-player";
import { Card } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import SearchBar from "react-native-dynamic-search-bar";
import { Feather } from '@expo/vector-icons';
import AppLoading from "expo-app-loading";
import { FontAwesome } from '@expo/vector-icons';

export default function Home({navigation}) {
    async function getdata()
    {
const name = await AsyncStorage.getItem("name")
const email = await AsyncStorage.getItem("email")
console.log(name)
console.log(email)

    }
  const [data, setData] = useState([]);
  const [cat, setCat] = useState('');

const [search,setSearch]=useState('')
 function homemusic()
{
  console.log(search)
   var data = {
      search :search,
      key:key,
    };
    var url = URL;
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
      .then((json) => {
setData(json)

      })
      .catch((error) => console.error(error))
      .finally(() => {
      });
}

React.useEffect(async () => {
    const unsubscribe = navigation.addListener('focus', () => {
      getdata();

   var data = {
      key:key,
    };
    var url = URL;
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
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => {
      });
        getdata();
    });

    return unsubscribe;
  }, [navigation]);


const images =[
  "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?girl",
        "https://source.unsplash.com/1024x768/?tree", // Network image
]


  return (
    <ScrollView style={{backgroundColor: 'black',}}>
    <View style={styles.container}>
      <View style={{marginTop:30}}>
   <View>
     <Text style={{fontSize:24,color:'white',fontFamily:"500"}}>Hello Sushil </Text>
<FontAwesome onPress={()=>navigation.navigate("Profile")} name="user-circle" size={30} color="white" style={{position:"absolute",right:20,top:7}} />
</View>
       <Text style={{fontSize:16,color:'white',fontFamily:"300",opacity:0.8}}>What You Want To Hear Today? </Text>

       <View style={{backgroundColor:"#222451",width:'100%',marginTop:20,display:"flex",flexDirection:"row",justifyContent:"center",borderRadius:15,}}>
       <FontAwesome name="search" size={20} color="white"  style={{marginLeft:45,alignSelf:"center"}} />
<TextInput
 style={{textColor:"white",width:'100%',height:55,color:"white",paddingLeft:20,borderRadius:10}}   
 placeholder="Search Here" 
 placeholderTextColor="white"
 onChangeText={(text) =>{
    setSearch(text)
    homemusic();
  }}
/>
  </View> 

<ScrollView 
horizontal={true}
style={{marginTop:20}}
showsHorizontalScrollIndicator={false}
>
<View style={{flex:1,flexDirection:'row'}}>
<View>
<Text style={{marginRight:20,fontSize:16,color:'white',fontFamily:'400'}} 

onPress={()=>{
  setSearch(null)
  homemusic()
}}
>Recommended</Text>
</View>
<View>
<Text style={{marginRight:20,fontSize:16,color:'white',fontFamily:'400'}} 

onPress={()=>{
  setSearch('trending')
  homemusic()
}}
>Trending</Text>
</View>
<View>
<Text style={{marginRight:20,fontSize:16,color:'white',fontFamily:'400'}} 

onPress={()=>{
  
  setSearch('nepali')
  homemusic()
}}
>Nepali</Text>
</View>

<View>
<Text style={{marginRight:20,fontSize:16,color:'white',fontFamily:'400'}}

onPress={()=>{
  setSearch('hindi')
  homemusic()
}}
>Hindi</Text>
</View>

<View>
<Text style={{marginRight:20,fontSize:16,color:'white',fontFamily:'400'}}
onPress={()=>{
  setSearch('english')
  homemusic()
}}

>English</Text>
</View>
</View>

</ScrollView>
<View style={{right:20,marginTop:20}}>
<SliderBox
  images={images}
  sliderBoxHeight={200}
  dotColor="#FFEE58"
  inactiveDotColor="#90A4AE"
  paginationBoxVerticalPadding={20}
  autoplay
  circleLoop
  resizeMethod={'resize'}
  resizeMode={'cover'}
  paginationBoxStyle={{
    position: "absolute",
    bottom: 0,
    padding: 0,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 10
  }}
  dotStyle={{
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
    backgroundColor: "rgba(128, 128, 128, 0.92)"
  }}
  ImageComponentStyle={{borderRadius: 15, width: '90%', right:10,marginTop: 5}}
  imageLoadingColor="#2196F3"
/>
</View>
<View style={{marginTop:30}}>
<Text style={{color:'#ADAEC0',fontSize:16}}>Play Audio</Text>
 <FlatList
          data={data.data}            
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
<Card  style={{padding:10,marginTop:15,backgroundColor:"#074366",borderRadius:20,opacity:0.7}}>
<View style={{}}>
 <Image   
        style={{width:50,height:50}}
        source={require('@expo/snack-static/react-native-logo.png')}
      /> 
      <Text style={{position:'absolute',color:"white",left:70,fontSize:14,fontFamily:"500"}}>{item.title} </Text>
        <Text style={{position:'absolute' ,fontFamily:"300",color:'#ADAEC0',fontSize:12,top:25,left:70}}>By {item.author} </Text>
         
    <View style={{position:'absolute',right:10 ,top:15}}>
    <AntDesign name="play" style={{}} size={24} color="#A231FE"  
 onPress={() =>
        navigation.navigate('Music',{
        url:item.url,
        name:item.title,
        author:item.author,
                img:item.image,

     
        })
      }
    />
    </View>
      </View>
</Card>     
  )}
        /> 
</View>

    </View>
  
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:20,
    justifyContent: 'center',
    
    padding: 8,
  },

});
