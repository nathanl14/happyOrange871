import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function StartCareerScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [height, setHeight] = useState(68); // Default height is 5'8"
  const [uidKeeper, setUidKeeper] = useState('');  
  const navigation = useNavigation();
  
  useEffect(() => { 
    const checkUserSession = async () => {      
      const storedUid = await AsyncStorage.getItem('userUID');

      if (storedUid) {
        setUidKeeper(storedUid);
        console.log('User UID from storage:', storedUid);
        navigation.navigate('BottomNavigator');
      } else {
        const user = firebase.auth().currentUser; 
        if (user) {
          const uid = user.uid;
          setUidKeeper(uid);  
          await AsyncStorage.setItem('userUID', uid); // Persist UID
          console.log('User UID:', uid);
          navigation.navigate('BottomNavigator');
        } else {  
          console.log('No user is signed in');
        }
      }
    };

    checkUserSession();
  }, []);

  const handleFirstNameChange = (firstName) => {
    setFirstName(firstName);
  };

  const handleLastNameChange = (lastName) => {
    setLastName(lastName);
  };

  const handleHeightIncrease = () => {
    if (height < 79) {
      setHeight(height + 1);
    }
  };

  const handleHeightDecrease = () => {
    if (height > 68) {
      setHeight(height - 1);
    }
  };

  const handleStartCareerPress = async () => {
    try {
      const userCredential = await firebase.auth().signInAnonymously();
      const { uid } = userCredential.user;
      await firebase.database().ref(`/users/${uid}/user`).set({
        firstName: firstName,
        lastName: lastName,
      });
      await AsyncStorage.setItem('userUID', uid); // Persist UID
      console.log('Anonymous sign-in UID:', uid);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleAnonymousLogin = async () => {
    try {
      const userCredential = await firebase.auth().signInAnonymously();
      const { uid } = userCredential.user;
      await firebase.database().ref(`/users/${uid}`).set({
        email: 'anonymous',
        createdAt: new Date().toISOString(),
      });
      await AsyncStorage.setItem('userUID', uid); // Persist UID
      console.log('Anonymous login UID:', uid);
      navigation.navigate('BottomNavigator');
    } catch (error) {
      alert(error.message);
    }
  }; 
   
  return (
    <View style={styles.container}> 
      <Text style={styles.title}>Start Your Career</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={handleFirstNameChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={handleLastNameChange}
        />
        <View style={styles.heightContainer}>
          <Text style={styles.heightLabel}>Height:</Text>
          <TouchableOpacity style={styles.heightButton} onPress={handleHeightDecrease}>
            <Text style={styles.heightButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.heightText}>{Math.floor(height / 12)}'{height % 12}"</Text>
          <TouchableOpacity style={styles.heightButton} onPress={handleHeightIncrease}>
            <Text style={styles.heightButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View> 
      <TouchableOpacity style={styles.button} onPress={handleStartCareerPress}>
        <Text style={styles.buttonText}>Start Career</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#CCCCCC", marginTop: 10 }]}
        onPress={handleAnonymousLogin}
      >
        <Text style={[styles.buttonText, { color: "#000000" }]}>Sign in Anonymously</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  heightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  heightLabel: {
    marginRight: 10,
  },
  heightButton: {
    backgroundColor: '#dcdcdc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  heightButtonText: {
    fontSize: 20,
    color: '#555',
  },
  heightText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StartCareerScreen;
