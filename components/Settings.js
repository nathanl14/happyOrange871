import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import firebase from "firebase";

const ProfileScreen = ({ navigation }) => {
  // State declaration
  const [email, setEmail] = useState("");
  const [uidKeeper, setUidKeeper] = useState('');


const user = firebase.auth().currentUser;
     
  // Effect hook to handle componentDidMount logic
  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      setEmail(user.email);
    }
  }, []); // Empty dependency array ensures this runs only once on mount


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
  // Function to handle logout
  const handleLogout = () => {
    firebase.auth().signOut()
      .then(() => {
        navigation.navigate("LoginScreen");
      })
      .catch(error => {
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.emailText}></Text>
            <Text style={styles.emailText}>Anonymous Uid:{uidKeeper}</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  emailText: {
    fontSize: 20,
    marginBottom: 20
  },
  logoutButton: {
    width: "50%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F48D20",
    borderRadius: 10
  },
  logoutButtonText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontFamily: "Rajdhani_600SemiBold"
  }
});

export default ProfileScreen;
