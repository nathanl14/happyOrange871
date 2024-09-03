import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const Tab = createMaterialBottomTabNavigator();
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

export default function ActingDashboard() {
  const navigation = useNavigation();

  const handleActingButtonPress = () => {
    // Navigate to acting.js screen
    navigation.navigate('Auditions');
  };

  const imdb = () => {
    // Navigate to acting.js screen
    navigation.navigate('Actingprofile');
  };

const gotoacting = () => {
    // Navigate to acting.js screen
    navigation.navigate('Acting');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Acting Section!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleActingButtonPress}
        activeOpacity={0.8}>
        <Text style={styles.buttonText}>Go to Auditions</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={gotoacting}
        activeOpacity={0.8}>
        <Text style={styles.buttonText}>Go to Acting</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={imdb}
        activeOpacity={0.8}>
        <Text style={styles.buttonText}>Filmography</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gold',
    padding: 24,
  },
  title: {
    margin: 24,
    marginTop: 0,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
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


