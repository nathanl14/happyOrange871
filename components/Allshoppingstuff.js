import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import database from '../firebase';
import { useNavigation } from '@react-navigation/native';

export default function Asset() {
  const navigation = useNavigation();
  const [rating, setRating] = useState(4.5); // example rating

  const goToRealEstate = () => {
    navigation.navigate('Realestate');
  };

  const goToCars = () => {
    navigation.navigate('Cars');
  };
  const gotToBank = () => {
    navigation.navigate('Bank');
  };
  const goToshopping = () => {
    navigation.navigate('Shopping');
  };
   const gotoownedhouse = () => {
    navigation.navigate('Ownedhomes');
  };

  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={gotoownedhouse}>
          <Text style={styles.header}>Assets</Text>
    </TouchableOpacity>
  
      <View style={styles.ratingContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={goToRealEstate}
        activeOpacity={0.8}>
        <Text style={styles.buttonText}>Real Estate</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={goToCars}
        activeOpacity={0.8}>
        <Text style={styles.buttonText}>Car Shop</Text>
      </TouchableOpacity>

       <TouchableOpacity
        style={styles.button}
        onPress={goToshopping}
        activeOpacity={0.8}>
        <Text style={styles.buttonText}>Clothing & Jewelry</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
        backgroundColor: 'gold',

  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  button: {
    backgroundColor: 'black',
    padding: 16,
    borderRadius: 8,
    width: '100%', // Set width to 100% to make buttons wider
    marginBottom: 16, // Add margin bottom for spacing between buttons
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
 
  
});
