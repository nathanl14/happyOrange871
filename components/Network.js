import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView, Image } from 'react-native';
import database from '../firebase';

const PartyScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [job, setJob] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [attendParty, setAttendParty] = useState(true);
  const [networkedPeople, setNetworkedPeople] = useState([]);
  const [currentPerson, setCurrentPerson] = useState([]);
  const [playerModalVisible, setPlayerModalVisible] = useState(false) 
  const [randmodalcounter, setRandModalCounter] = useState(0) 
  const [workquestionmodal, setworkquetionmodal] = useState(false) 




const boyprofileImages = [
 require('../assets/skin1.png'),
   require('../assets/skin2.png'),
   require('../assets/skin3.png'),
    require('../assets/whitemanbeard.png'),
   require('../assets/whitemanbeardorange.png'),
   require('../assets/whitemangraybeard.png'),
]
 
   const girlprofileImages = [
  
   require('../assets/blackbigbrownhair.png'),
   require('../assets/blackcurlybrownhair.png'),
   require('../assets/darkbigblackhair.png'),
   require('../assets/darkskincurlyblackhair.png'),
   require('../assets/darkwhiteblondponytailhair.png'),
   require('../assets/lightskinbigbrownhair.png'),
   require('../assets/lightskincurlybrownhair.png'),
   require('../assets/whitebigblondehair.png'),
   require('../assets/whitebighair.png'),
   require('../assets/whiteblondeponytailhair.png'),
   require('../assets/whitecurlyblackhair.png'),
   require('../assets/whitecurlyblondehair.png'),
   ]

  
 const handlePartyDecision = () => {
  if (attendParty) {
    const jobs = ['director', 'producer', 'actor'];
    const randomJob = jobs[Math.floor(Math.random() * jobs.length)];

    const boyfirstNames = ['John', 'Michael', 'William'];
    const girlfirstNames = ['Emma', 'Sophia'];

    const gender = Math.random() < 0.5 ? 'boy' : 'girl'; // Randomly assign a gender
    const firstNames = gender === 'boy' ? boyfirstNames : girlfirstNames; // Use gender-specific names

    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastNames = ['Smith', 'Johnson', 'Brown', 'Lee', 'Wilson'];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    // Choose the profile image based on the gender
    const profileImages = gender === 'boy' ? boyprofileImages : girlprofileImages;
    const randomProfileImage = profileImages[Math.floor(Math.random() * profileImages.length)];

    setJob(randomJob);
    setFirstName(randomFirstName);
    setLastName(randomLastName);

    const newProfile = {
      firstnameindatabase: randomFirstName,
      lastnameindatabase: randomLastName,
      relationshipstat: 50,
      profileImage: randomProfileImage,
      gender: gender, // Store the gender
    };

    setCurrentPerson(newProfile); // Set the current person
    setModalVisible(true);
  }
};
 const handleBefriendillusethislater = () => {
    if (currentPerson) {
      // Add the current person to the networked people
      setNetworkedPeople([...networkedPeople, currentPerson]);
      setCurrentPerson(null); // Reset the current person
    }
    setModalVisible(false);



    

  };
const alertmodal = ()=>{

}
const handlerandommodal = ()=>{
  randmodal= Math.floor(Math.random() * 4) + 1;
    setRandModalCounter(randmodalcounter+1)

    if (randmodal<=1){
    }
      setworkquetionmodal(true)

}
  const handleBefriend = () => {
    handlerandommodal()
    setModalVisible(false); 



    

  };


  
  useEffect(() => {
handlePartyDecision()
  }, []);

  return (
    <View style={styles.container}>
    <View style={styles.header}>
        <TouchableOpacity>
        </TouchableOpacity>
        <Text style={styles.networkingtitle}>Networking</Text>
      </View>
   
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.persontext}>{`While At A Party You meet a ${job} Named ${firstName} ${lastName}` }</Text>
          {currentPerson && (
            <View style={styles.networkedPerson}>
              <Image source={currentPerson.profileImage} style={styles.profileImage} />
            </View>
          )}
          <TouchableOpacity
            style={styles.befriendButton}
            onPress={handleBefriend}
          >
            <Text style={styles.befriendButtonText}>Talk</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.closebutton}
            onPress={()=>setModalVisible(false)}
          >
            <Text style={styles.befriendButtonText}>Ignore</Text>
          </TouchableOpacity>
        </View>
      </Modal>
        <Modal visible={workquestionmodal} transparent animationType="slide">
                  {currentPerson && (

        <View style={styles.modalContainer}>
          <Text style={styles.optionmodaltitletext}>{`You Have An Opportunity To Start A Conversation With${firstName} ${lastName}. What Will You Say` }</Text>
          {currentPerson && (
            <View style={styles.networkedPerson}>
              <Image source={currentPerson.profileImage} style={styles.profileImage} />
            </View>
          )}
          <TouchableOpacity
            style={styles.option}
            onPress={handleBefriend}
          >
            <Text style={styles.optiontext}>Ask About Job</Text> 
          </TouchableOpacity>
           <TouchableOpacity
            style={styles.option}
            onPress={handleBefriend}
          >
            <Text style={styles.optiontext}>Confess Love</Text>
          </TouchableOpacity>
           <TouchableOpacity
            style={styles.option}
            onPress={handleBefriend}
          >
            <Text style={styles.optiontext}>Ask For A Role</Text>
          </TouchableOpacity>
           <TouchableOpacity
            style={styles.option}
            onPress={handleBefriend}
          >
            <Text style={styles.optiontext}>Talk</Text>
          </TouchableOpacity>

         
        </View>
      )}
      </Modal>
       <Modal
      animationType="slide"
      transparent={false}
      visible={playerModalVisible}
    >
    {networkedPeople.map((person, index) => (

        <View style={styles.modal2Container}>
          <View style={styles.matchedPersonContainer2}>
            <Image
              source={person.profileImage}
              style={styles.matchedPersonImage}
            />
            <Text style={styles.matchedPersonName}>
              {person.firstnameindatabase} {person.lastnameindatabase}
            </Text>
            <View
               style={{
                height: 8,
                width: `${person.relationshipstat}%`,
                backgroundColor: 'green',
                borderRadius: 5,
                marginTop: 35,
                marginLeft: '-23%',
              }}
            />
          </View>
          <View style={styles.activitiescontainer}>
            <Text style={styles.activitiestext}>Activities</Text>
          </View>

    
          


    
        </View>
         ))}

    </Modal>
      {networkedPeople.length > 0 && (

      
  <ScrollView style={styles.networkedList}>
    {networkedPeople.map((person, index) => (
      <TouchableOpacity onPress={()=>setPlayerModalVisible(true)}> 
      <View key={index} style={styles.networkedPerson2}>
        <Image source={person.profileImage} style={styles.profileImage2} />
        <View style={styles.personInfo}>
          <Text style={styles.personName}>{`${person.firstnameindatabase} ${person.lastnameindatabase}`}</Text>
          <Text style={styles.relationshipStat}>Relationship: {person.relationshipstat}</Text>
          <View style={styles.graybar}>
            <View
              style={{
                height: 10,
                width: `${person.relationshipstat}%`,
                backgroundColor: 'green',
                borderRadius: 5,
                marginTop: 0,
                marginLeft: '-0%',
              }}
            />
          </View>
          {/* Add other partner information you want to display */}
        </View>
      </View>
      </TouchableOpacity>
    ))}
  </ScrollView>
)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
   header: {
    marginTop:30,
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    padding: 10,
    marginBottom: 10,
    height: 100,
    width:"100%"
  },
  networkingtitle:{
    justifyContent:'center',
    textAlign:"center",
    alignSelf:"center",
    fontWeight:"bold",
    fontSize:25,
    marginTop:15
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    marginTop:5
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    
  },
  modalContainer: {
    width: 350,
    height: 650,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
    alignSelf: 'center',
    marginTop: '15%',
    borderRadius:10,
    borderWidth:3,
    borderColor:"black",
    
  },
  befriendButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    width:"65%",

  },
  befriendButtonText: {
    color: 'white',
    alignSelf:"center",
    fontSize:16,
    fontWeight:"bold"

  },
  persontext: {
    textAlign: 'center',
    marginBottom: '20%',
    fontWeight:"bold",
    fontSize:18
  },
  networkedList: {
    height: "100%",
    width:"100%"
  },
  networkedPerson: {
    backgroundColor: 'lightyellow',
    borderRadius: 5,
    marginBottom:"5%",
    
  },
  networkedPerson2:{
    backgroundColor: 'lightyellow',
    borderRadius: 5,
    marginBottom:"1%",
 flexDirection: 'row',
    alignItems: 'center',
    width:"100%",
    height:90
  },
  profileImage: {
    width: 105,
    height: 105,
    borderRadius: 50,
    marginBottom: 10,
  },
  personContainer: {
   
    marginBottom: 20,
  },
  profileImage2: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  personInfo: {
    flex: 1,
  },
  personName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  relationshipStat: {
    fontSize: 18,
  },
  graybar: {
    height: 10,
    width: 150,
    backgroundColor: 'lightgray',
    borderRadius: 0,
    marginTop: 0,
    marginLeft: '-0%',
  },
  closebutton:{
    backgroundColor:"red",
    padding: 10,
    borderRadius: 5,
    width:"65%",
    alignSelf:"center",
    marginTop:"1%"
    
  },

    askoutcontainer:{
flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white', // Background color
    borderRadius: 5, // Add border radius for rounded corners
    borderWidth: 1.3, // Add border width to create borders
    borderColor: '#ddd', // Border color
    padding: 10, // Add some padding for spacing
    marginTop:0,
    width:420,
    height:80
  },
   askOutButtonText: {
    color: 'green',
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft:"5%"
  },
   heartimage2:{
     width: 45,
    height: 40,
    borderRadius: 25,
    marginLeft:"2%",
    color:"gray"
 },
 closeButton: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
 matchedPersonContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2', // Background color
    borderRadius: 5, // Add border radius for rounded corners
    borderWidth: 1, // Add border width to create borders
    borderColor: '#ddd', // Border color
    padding: 10, // Add some padding for spacing
    marginTop:-600, 
    width:420,
    height:100
  },
   modal2Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, 
  },
  matchedPersonImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: "2%", // Move the profile picture to the far left
  },
   matchedPersonName: {
    fontSize: 16,
    marginLeft:"2%"
  },
   activitiescontainer:{
flexDirection: 'row',
    alignItems: 'center',
    height: 20,
    backgroundColor:"gray",
    width:450,
     textAlign:"center",
   justifyContent:"center"
 },
 activitiestext:{
   color:"white",
   textAlign:"center",
   alignItems:"center",
   justifyContent:"center",
   fontSize:15,
   fontWeight:"bold"
 },
 option:{
    backgroundColor: 'black',
    borderRadius: 5,
    width:"80%",
    height:"10%",
    marginBottom:5
 },
 optiontext:{
    color: 'yellow',
    alignSelf:"center",
    fontSize:16,
    fontWeight:"bold",
    marginTop:"7%"
 },
 optionmodaltitletext:{
   textAlign: 'center',
    marginBottom: '5%',
    fontWeight:"bold",
    fontSize:18

 }
});

export default PartyScreen;

      
