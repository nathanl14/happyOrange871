import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Home';

import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
 
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('StartCareerScreen');      
    }, 0);  
  }, []);    
 
  return (
    <View style={styles.container}> 
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.text}>Name Pending</Text>
      <Text style={styles.text2}>Powered By</Text>  
    </View> 
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: 'yellow',
    height: 1000,
    marginBottom: -360,
  },
  logo: {
    width: 200, 
    height: 200,
    marginTop: -200,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    fontFamily: 'Helvetica',
    textAlign: 'center',
  },
  text2: {
    fontSize: 24,
    marginTop: 350,
    fontFamily: 'Helvetica',
    textAlign: 'center',
  },
});

export default SplashScreen;
