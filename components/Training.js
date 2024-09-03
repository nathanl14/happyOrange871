import * as React from 'react';
import { Text, View, StyleSheet, Image, ScrollView, Alert} from 'react-native';
import { TouchableOpacity,} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import  { useState, useEffect } from 'react';
import { atom, useAtom } from 'jotai';
import { useNavigation } from '@react-navigation/native';
const Tab = createMaterialBottomTabNavigator();
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../Home";
import OtherScreen from  "./OtherScreen";
import StartCareerScreen from "./StartCareerScreen"
import Teams from "./Teams"
import Character from "../components/Character"
import BottomTabNavigator from "./BottomNavigator"
import firebase from 'firebase';

import database from '../firebase';






export const energyAtom = atom(100);






export default function Training() {





  

 const navigation = useNavigation();
  const collegenavigate = () => {
    navigation.navigate('College');
  };


  const [uidKeeper, setUidKeeper] = useState('');

const user = firebase.auth().currentUser;
     


       useEffect(() => {
  if (user) {
  const uid = user.uid; // Get the uid
  console.log('User UID:', uid);
  setUidKeeper(uid);
} else {
  // No user is signed in
  console.log('No user is signed in');
}
  }, []); 

 const improvisationsetting = () => {
    const newSpendImprovisation = spendimprovization;
    if (spendimprovization <= energy) {
      setEnergy(energy - newSpendImprovisation);
      setSpendimprovization(newSpendImprovisation + 1);
      setImprovization(newSpendImprovisation);

      database.ref(`users/${uidKeeper}/improvization`).set(newImprovization)
        .then(() => setImprovization(spendimprovization))
        .catch(alert);

      const newSpendimprovization = spendimprovization + 1;
      database.ref(`users/${uidKeeper}/spendimprovization`).set(newSpendimprovization)
        .then(() => setSpendimprovization(spendimprovization + 1))
        .catch(alert);
    }
  };

  const memorizationsetting = () => {
    const newSpendMemorization = spendmemorization;
    if (spendmemorization <= energy) {
      setEnergy(energy - newSpendMemorization);
      setSpendmemorization(newSpendMemorization + 1);
      setMemorization(newSpendMemorization);

      database.ref(`users/${uidKeeper}/memorization`).set(newMemorization)
        .then(() => setMemorization(spendmemorization))
        .catch(alert);

      const newSpendmemorization = spendmemorization + 1;
      database.ref(`users/${uidKeeper}/spendmemorization`).set(newSpendmemorization)
        .then(() => setSpendmemorization(spendmemorization + 1))
        .catch(alert);
    }
  };

  const voiceandspeechsetting = () => {
    const newSpendVoiceandspeech = spendvoiceandspeech;
    if (newSpendVoiceandspeech <= energy) {
      setEnergy(energy - newSpendVoiceandspeech);
      setSpendvoiceandspeech(newSpendVoiceandspeech + 1);
      setVoiceandspeech(newSpendVoiceandspeech);

      database.ref(`users/${uidKeeper}/voiceandspeech`).set(newVoiceandspeech)
        .then(() => setVoiceandspeech(spendvoiceandspeech))
        .catch(alert);

      const newSpendvoiceandspeech = spendvoiceandspeech + 1;
      database.ref(`users/${uidKeeper}/spendvoiceandspeech`).set(newSpendvoiceandspeech)
        .then(() => setSpendvoiceandspeech(spendvoiceandspeech + 1))
        .catch(alert);
    }
  };

  const [improvization, setImprovization] = useState(0);
  const [spendimprovization, setSpendimprovization] = useState(improvization + 2);

  const newImprovization = spendimprovization;

  const [memorization, setMemorization] = useState(0);
  const [spendmemorization, setSpendmemorization] = useState(memorization + 2);
  const newMemorization = spendmemorization;

  const [voiceandspeech, setVoiceandspeech] = useState(0);
  const [spendvoiceandspeech, setSpendvoiceandspeech] = useState(improvization + 1);

  const newVoiceandspeech = spendvoiceandspeech;

  const [energy, setEnergy] = useAtom(energyAtom);
  const [experience, setExperience] = useState(50);
  const [year, setYear] = useState(2023);
  const [money, setMoney] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [college, setCollege] = useState(false);

  useEffect(() => {
    const ratingRef = database.ref(`users/${uidKeeper}/rating`);
    const rating = (improvization + memorization + voiceandspeech) / 3;
    ratingRef.set(rating)
      .catch(error => {
        alert('Failed to update rating value in the database');
      });
  }, [improvization, memorization, voiceandspeech]);

  useEffect(() => {
    const ratingRef = database.ref(`users/${uidKeeper}/rating`);
    const rating = (improvization + memorization + voiceandspeech) / 3;
    ratingRef.set(rating);

    const improvizationRef = database.ref(`users/${uidKeeper}/improvization`);
    improvizationRef.on('value', (snapshot) => {
      setImprovization(snapshot.val());
    });

    const spendimprovizationRef = database.ref(`users/${uidKeeper}/spendimprovization`);
    spendimprovizationRef.on('value', (snapshot) => {
      setSpendimprovization(snapshot.val());
    });

    const memorizationRef = database.ref(`users/${uidKeeper}/memorization`);
    memorizationRef.on('value', (snapshot) => {
      setMemorization(snapshot.val());
    });

    const spendmemorizationRef = database.ref(`users/${uidKeeper}/spendmemorization`);
    spendmemorizationRef.on('value', (snapshot) => {
      setSpendmemorization(snapshot.val());
    });

    const voiceandspeechRef = database.ref(`users/${uidKeeper}/voiceandspeech`);
    voiceandspeechRef.on('value', (snapshot) => {
      setVoiceandspeech(snapshot.val());
    });

    const spendvoiceandspeechRef = database.ref(`users/${uidKeeper}/spendvoiceandspeech`);
    spendvoiceandspeechRef.on('value', (snapshot) => {
      setSpendvoiceandspeech(snapshot.val());
    });

    setIsLoading(false);

  }, []);

  const handleUpButtonPress = () => {
    // Your code here
  };

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (

    

    <View style={styles.container}>
      



    <Text style={styles.actingabilities}>
Acting Abilities
</Text>




<View>

      <Image style={styles.box} source={require('../assets/box.jpeg')} />
    <TouchableOpacity style={styles.improvisationbutton} onPress={improvisationsetting}>
    <Image style={styles.goldarrow} source={require('../assets/goldarrow.png')}/>
    
    </TouchableOpacity>
      <Image style={styles.box} source={require('../assets/whitebox.jpeg')} />
     <TouchableOpacity style={styles.memorizationbutton} onPress={memorizationsetting}>
    <Image style={styles.goldarrow} source={require('../assets/goldarrow.png')}/>
    </TouchableOpacity>




          <Image style={styles.box} source={require('../assets/creambox.jpeg')} />
            <TouchableOpacity style={styles.voiceandspeechbutton}onPress={voiceandspeechsetting}>
    <Image style={styles.goldarrow} source={require('../assets/goldarrow.png')}/>
    </TouchableOpacity>



    

</View>
<Text style={styles.improvisation}>
{improvization}    Improvization 
</Text>


<Text style={styles.memorizationtext}>
{memorization}    Memorization 
</Text>

<Text style={styles.voiceandspeechtext}>
      {voiceandspeech}   Voice & Speech 
</Text>





    <Image style={styles.energyicon} source={require('../assets/energyicon.png')} />

<Text style={styles.energytext}>
 {energy}    
</Text>

<Text style={styles.spendimprovizationtext}>
{spendimprovization}
</Text>

<Text style={styles.spendmemorizationtext}>
{spendmemorization}
</Text>

<Text style={styles.spendvoiceandspeechtext}>
{spendvoiceandspeech}
</Text>




      <View style={styles.viewbox}>
    <Text style={styles.experiencetext}>
{experience}
</Text>

<Text  style={{
 marginTop:-35,
color:"black",
 marginLeft:60,
 fontSize:20,
            }}>
Experience
</Text>


 <View
            style={{
              height: 8,
              width: `${experience}%`,
              backgroundColor: 'black',
              color:"black", 
              borderRadius: 5,
              marginLeft:60, 
              marginTop:0 
            }}
          />
</View>

      <View style={styles.viewbox2}>
    <Text style={styles.experiencetext}>
{(improvization + memorization + voiceandspeech + experience) / 4}  
</Text>

<Text  style={{
 marginTop:-35,
color:"black",
 marginLeft:80,
 fontSize:15,
            }}>
Rating 
</Text>


 <View
            style={{
              height: 8,
              width: `${(improvization + memorization + voiceandspeech + experience) / 4}%`,
              backgroundColor: 'black',
              color:"black", 
              borderRadius: 5,
              marginLeft:80, 
              marginTop:0 
            }}
          />
</View>

<View>
<Text style={styles.actingeducationtext}> Acting Education
</Text>



 <Image style={styles.boxcollege} source={require('../assets/box.jpeg')} />
</View>

    <TouchableOpacity style={styles.collegebutton} onPress={collegenavigate}>
        <Image style={styles.goldarrowgo} source={require('../assets/yellowarrow.png')}/>

    </TouchableOpacity>


    
<Text style={styles.collegetext}>
         College 
</Text>



<View>




 <Image style={styles.boxagent} source={require('../assets/creambox.jpeg')} />
</View>



<View>
<Text style={styles.actingteamtext}> Team
</Text>   
</View>



<View>
<TouchableOpacity style={styles.agentbutton} onPress={collegenavigate}>
        <Image style={styles.goldarrowgoagent} source={require('../assets/yellowarrow.png')}/>

    </TouchableOpacity>


</View>

<View>
<Text style={styles.agentteamtext}> Agent
</Text>  
</View>

    </View>



  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 4450,
        backgroundColor: '#444444',
        marginTop:-50
  },
  actingabilities:{
    fontSize:25,
    marginTop:-3150,
    marginRight:220,
    color:"white",
  },
  box:{
    marginTop:20,
    borderRadius:10,
    marginRight:10,
    width:390,
    height:60
  },
  viewbox:{
    marginTop:30,
    borderRadius:10,
    marginRight:10,
    width:390,
    height:60,
    backgroundColor:"gray"
  },
  viewbox2:{
    marginTop:15,
    borderRadius:10,
    marginRight:10,
    width:390,
    height:60,
    backgroundColor:"white"
  },
  boxagent:{
    borderRadius:10,
    marginRight:10,
    width:390,
    height:60,
    marginVertical:140
  },
  boxcollege:{
 marginTop:15,
    borderRadius:10,
    marginRight:10,
    width:390,
    height:60
  },
  actingteamtext:{
marginVertical:-240,
marginRight:335,
   fontSize:25,
    color:"white",
  },
  agentteamtext:{
marginRight:315,
   fontSize:25,
    color:"black",
    marginVertical:-185
  },
  goldarrow:{
    height:45,
    width:45,
  marginTop:-53,
  marginLeft:330
  },
  goldarrow1:{
height:45,
    width:45,
  marginLeft:330,
  marginTop:6
  },

goldarrowgo:{
   
     transform: [{ rotate: '180deg' }],
height:52,
    width:52,
  marginTop:-56,
  marginLeft:328,
 },
 goldarrowgoagent:{
 transform: [{ rotate: '180deg' }],
height:52,
    width:52,
  marginTop:-197,
  marginLeft:330,

 },
  improvisation:{
marginTop:-200,
color:"white",
 marginRight:200,
 fontSize:20
  },
  memorizationtext:{
    marginTop:54,
color:"black",
 marginRight:187,
 fontSize:22,
  },
  voiceandspeechtext:{
        marginTop:54,
color:"black",
 marginRight:190,
 fontSize:20,
  },
   experiencetext:{
    marginTop:12,
color:"black",
 marginLeft:13,
 fontSize:23,
  },
  collegetext:{
    color:"white",
    marginLeft:-295,
 fontSize:25,
 fontWeight:"bold", 
 marginTop:-45,
  },
  actingeducationtext:{
fontSize:25,
    marginTop:100,
    marginRight:2,
    color:"white",
  },
  energyicon:{
    marginRight:-270,
   height:25,
   width:25,
   marginTop:-330
  },
  energytext:{
    marginLeft:340,
    color:"yellow",
    marginTop:-25,
    fontSize:20
  },
  spendimprovizationtext:{
    color:"lightgray",
    marginTop:130,
    marginLeft:180,
    fontSize:22
  },
  spendmemorizationtext:{
    marginTop:50,
    marginLeft:180,
    fontSize:22
  },
  spendvoiceandspeechtext:{
     marginTop:50,
    marginLeft:180,
    fontSize:22
  }
});
