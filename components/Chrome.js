import * as React from 'react';
import { Text, View, StyleSheet, Image,TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Chrome() {
 const navigation = useNavigation();


  const phonenavigate = () => {
    navigation.navigate('Phone');
  };



  return (

    <View style={styles.container}>
    
      <Text style={styles.paragraph}>
       
    </Text>
      <Image style={styles.logo} source={require("../assets/google.png")} />

        

      <TextInput
       style={styles.input}
       placeholder="Search or type URL"
       
       onChangeText={""}
     />

      <TouchableOpacity style={styles.boxbutton}>
          <Image style={styles.box} source={require('../assets/box.png')} />
            <Image style={styles.imdbbox} source={require('../assets/imdb.png')} />
          </TouchableOpacity>


<View>

    
     <TouchableOpacity style={styles.buttons} onPress={phonenavigate}>
 <Image style={styles.homebutton} source={require("../assets/homebutton.png")} />
     </TouchableOpacity>

</View>
            
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor:"#ACADA8",
    height:900
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
    boxbutton:{


  },
  box:{
marginTop:-170,
borderRadius:15,
height:57,
width:57
  },
  imdbbox:{
  height:47,
    width:47,
    marginTop:-52,
    marginLeft:4.85

  },
  logo: {
    height: 70,
    width:129
  },
  input: {
height: 40,
width:250,
borderColor: 'gray',
borderWidth: 1,
borderRadius: 20,
paddingHorizontal: 10,
marginBottom: 200,
textAlign:'center',
backgroundColor:"lightgray",
color:"#EE9EB"
},
buttons:{
  backgroundColor:"ACADA8",
  
},
homebutton:{
  
  borderRadius:100,
marginTop:250,
width:180,
height:20,
borderRadius:50,
justifyContent:"center"

}
});
