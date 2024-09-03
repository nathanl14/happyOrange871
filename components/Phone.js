import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import background from '../assets/background.png';
import { useNavigation } from '@react-navigation/native';



function Phone (){
  const navigation = useNavigation();



  const chromenavigate = () => {
    navigation.navigate('Chrome');
  };
 
 const instanavigate = () => {
   navigation.navigate('Instagram');
  };

const imdbnav = () => {
   navigation.navigate('Actingprofile');
  };

  const beginnerauditionsnav = () => {
   navigation.navigate('Beginnerauditions');
  };
const tindrnav = () =>{
     navigation.navigate('Tindr');

}
  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.container}>
        <View>
          <TouchableOpacity style={styles.instagram} onPress={instanavigate}>
            <Image style={styles.instagramlogo} source={require('../assets/instagram.png')} />
          </TouchableOpacity>


          <TouchableOpacity style={styles.instagram}>
            <Image style={styles.cameralogo} source={require('../assets/camera.png')} />
          </TouchableOpacity>


          <TouchableOpacity style={styles.instagram}>
            <Image style={styles.maillogo} source={require('../assets/mail.png')} />
          </TouchableOpacity>


          <TouchableOpacity style={styles.instagram} onPress={chromenavigate}>
            <Image style={styles.chromelogo} source={require('../assets/chome.png')} />
          </TouchableOpacity>

    
        </View>
<TouchableOpacity style={styles.instagram} onPress={imdbnav}>
            <Image style={styles.imdblogo} source={require('../assets/imdb.png')} />
          </TouchableOpacity>
        <View>
<TouchableOpacity style={styles.instagram} onPress={beginnerauditionsnav}>
            <Image style={styles.castcalllogo} source={require('../assets/castcall.png')} />
          </TouchableOpacity>

        </View>
 
 <View style={styles.tindrapp}>
<TouchableOpacity style={styles.tindrapp} onPress={tindrnav}>
        <Text style={styles.tindrtext}>Tindr</Text> 
          </TouchableOpacity>

        </View>
        
      </View>    
    </ImageBackground>
  );
}

 
const styles = StyleSheet.create({
  background: {
    resizeMode: 'cover',
    height: 880,
    width: 420
  },
  tindrapp:{
    width: 60,
    height: 60,
    backgroundColor:"white",
    borderRadius: 8,
  },
  tindrtext:{
color:"#ff5349",
fontSize:25,
textAlign:"center",
marginTop:12
  },
  instagramlogo: {
    width: 60,
    height: 60,
    marginLeft: 130,
    marginTop: 50
  },
  cameralogo: {
    width: 63,
    height: 63,
    marginLeft: 64,
    marginTop: -60
  },
  maillogo: {
    width: 53,
    height: 53,
    marginLeft: 6,
    marginTop: -60
  },
  chromelogo: {
    borderRadius: 8,
    width: 53,
    height: 53,
    marginLeft: 200,
    marginTop: -60
  },
  imdblogo: {
    borderRadius: 8,
    width: 53,
    height: 53,
    marginLeft: 265,
    marginTop: -60
  },
   castcalllogo: {
    borderRadius: 8,
    width: 53,
    height: 53,
    marginLeft: 330,
    padding:25,
    marginTop: -60
  },
  container: {
    paddingRight:70
  },
 
});

export default Phone



