import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Home';
import { useNavigation } from '@react-navigation/native';
import database from '../firebase';
import Pacifico from '../assets/fonts/Pacifico-Regular.ttf';
import { ageAtom } from '../Home';
import { atom, useAtom } from 'jotai';
import { genderAtom } from '../Home';

const Driverslicense = () => {
  const navigation = useNavigation();
  const [skinImageURL, setSkinImageURL] = useState(null);
  const [name, setName] = useState('');
  const [age, setAge] = useAtom(ageAtom);
  const [gender, setGender] = useAtom(genderAtom); 




  const navback = () => {
    navigation.navigate('BottomNavigator');
  };

  useEffect(() => {
    const skinImageRef = database.ref('user/skinImageURL');
    skinImageRef.on('value', (snapshot) => {
      const imageURL = snapshot.val();
      setSkinImageURL(imageURL);
    });

    const nameref = database.ref('user/name');
    nameref.on('value', (snapshot) => {
      const nameref2 = snapshot.val();
      setName(nameref2);
    });
    return () => {
      skinImageRef.off('value');
    };
  }, []);

  const renderSkinImage = () => {
    if (skinImageURL === 19) {
      return require('../assets/skin1.png');
    } else if (skinImageURL === 20) {
      return require('../assets/skin2.png');
    } else if (skinImageURL === 21) {
      return require('../assets/skin3.png');
    } else if (skinImageURL === 22) {
      return require('../assets/skin4.png');
    } else if (skinImageURL === 23) {
      return require('../assets/skin5.png');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/drivinglicense.png')}
        style={styles.driverslicenseimage}
      />
      <Image source={renderSkinImage()} style={styles.image2} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.gendertext}>{gender}</Text> 
      <Text style={styles.agetext}>{age} Years Old</Text> 
      <Text style={styles.sig}>{name}</Text>
          <View>
    <TouchableOpacity onPress={navback}>
      <Text style={styles.backtext}> BACK</Text>
      </TouchableOpacity>
      </View> 
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
    height: '100%',
  },
  driverslicenseimage: {
    width: '95%',
    height: '50%',
    marginTop: '30%',
  },
  image2: {
    marginTop: '-65%',
    marginLeft: '-65%',
    width: '22%',
    height: '12%',
  }, 
  name: {
    marginTop: '-19.2%',
    marginLeft: '4%',
  },
  gendertext:{
  marginTop: '-4.2%',
    marginLeft: '60%',
  },
  agetext:{
      marginLeft: '0%',
      marginTop:'12.5%'

  },
  sig: {
    marginTop: '5.5%',
    marginLeft: '49%',
  },
  backtext:{
    marginTop: '69.2%',
    fontSize:"25"  

  }
});

export default Driverslicense;
