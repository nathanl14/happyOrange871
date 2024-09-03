import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, Modal,FlatList } from 'react-native';
import database from '../firebase';
import { useNavigation } from '@react-navigation/native';


const DatingScreen = () => {
 const [datingapppeople, setDatingapppeople] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
    const [matchedPeople, setMatchedPeople] = useState([]);
 const [playerModalVisible, setPlayerModalVisible] = useState(false);
  const [selectedMatchedPerson, setSelectedMatchedPerson] = useState(null);
  const navigation = useNavigation();

 
 const navback = () => {
    navigation.navigate('BottomNavigator');    
  };
 firstNamesList = [
   'Sarah',
   'Alexis',
   'Emily',
   'Olivia',
   'Megan',
   'Grace',
   'Emma',
   'Sophia',
   'Abigail',
   'Amelia',
   'Anna',
   'Ava',
   'Beatrice',
   'Brooklyn',
   'Charlotte',
   'Chloe',
   'Claire',
   'Ella',
   'Evelyn',
   'Harper',
   'Isabella',
   'Jasmine',
   'Julia',
   'Kennedy',
   'Lily',
   'Madison',
   'Mia',
   'Olivia',
   'Penelope',
   'Piper',
   'Riley',
   'Sophia',
   'Violet',
   'Willow',
   'Zara',
   'Zoe', 
]
 

lastNamesList = [
   'Smith',
   'Johnson',
   'Williams',
   'Jones',
   'Brown',
   'Davis',
   'Miller',
   'Wilson',
   'Lee',
   'Taylor',
   'Anderson',
   'Thomas',
   'Anderson',
   'Baker',
   'Bell',
   'Bennett',
   'Brooks',
   'Carter',
   'Clark',
   'Davis',
   'Evans',
   'Fisher',
   'Green',
   'Hall',
   'Harrison',
   'Jackson',
   'Johnson',
   'Jones',
   'Kennedy',
   'Miller',
   'Moore',
   'Parker',
   'Peterson',
   'Porter',
   'Reynolds',
   'Scott',
   'Smith',
   'Taylor',
   'Thompson',
   'Walker',
   'Williams',
]


 const profileImages = [
   require('../assets/skin1.png'),
   require('../assets/skin2.png'),
   require('../assets/skin3.png'),
   require('../assets/skin4.png'),
   require('../assets/skin5.png'),
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
 ];

 const handlex = () => {
   handleFind()
 }


 const handlelike = () => {
               handleFind()

    Alert.alert('Alert!', 'You Matched!', [
      {
        text: 'Ok',
        onPress: () => {
          // Save the matched person to the database
          const matchedPerson = datingapppeople[0]; // Get the first person from the array
          const newMatchRef = database.ref('matchedPeople').push(); // Create a new unique reference
          newMatchRef.set(matchedPerson)
            .then(() => {
              console.log('Matched person saved to the database!');
              // If you want to remove the matched person from the list after matching, use the following line:
              setDatingapppeople((prevPeople) => prevPeople.slice(1));
            })
            .catch((error) => {
              console.error('Error saving matched person to the database: ', error);
            });
            handleFind()

        },
      },
    ]);
  };




  useEffect(() => {
   handleFind()
  }, []);
 
  
   
 const getRandomName = () => {
   const randomFirstName = firstNamesList[Math.floor(Math.random() * firstNamesList.length)];
   const randomLastName = lastNamesList[Math.floor(Math.random() * lastNamesList.length)];
   return `${randomFirstName} ${randomLastName}`;
 };


 const handleFind = () => {
   // Randomly select a name and a profile image
   const randomName = getRandomName();
   const randomProfileImage =
      profileImages[Math.floor(Math.random() * profileImages.length)];


   // Create a new profile with the random name and image
   const newProfile = {
     name: randomName,
     relationshipstat: 50,
     dating: false,
     profileImage: randomProfileImage,
    
   };


   // Update the datingapppeople state with the new profile 
   setDatingapppeople([newProfile]);
 };


   const handleViewMatches = () => {
    // Fetch matched people from the database and update the matchedPeople state
    database.ref('matchedPeople').once('value', (snapshot) => {
      const matchedData = snapshot.val();
      if (matchedData) {
        const matchedPeopleArray = Object.values(matchedData);
        setMatchedPeople(matchedPeopleArray);
        setModalVisible(true);
      } else { 
        setMatchedPeople([]);
        setModalVisible(true);
      }
    });
  };
const handleAskOut = () => {
  // Implement the logic for asking out the matched person here
  // For simplicity, we'll just show an alert in this example
  
  if (selectedMatchedPerson?.relationshipstat >= 50) {
    // Move the selected matched person to the "partner" section in the database
    const partnerRef = database.ref('partner').push(); // Create a new unique reference for the partner
    partnerRef.set(selectedMatchedPerson)
      .then(() => {
        console.log('Selected matched person moved to the "partner" section in the database!');
        // Now, remove the selected matched person from the "matchedPeople" section
        database.ref('matchedPeople')
          .orderByChild('name')
          .equalTo(selectedMatchedPerson.name) // Assuming "name" is the unique identifier for matched people
          .once('value')
          .then((snapshot) => {
            const matchedData = snapshot.val();
            if (matchedData) {
              const matchedPersonKey = Object.keys(matchedData)[0]; // Get the key of the matched person to remove
              if (matchedPersonKey) {
                database.ref('matchedPeople').child(matchedPersonKey).remove()
                  .then(() => {
                    console.log('Selected matched person removed from the "matchedPeople" section in the database!');
                    setPlayerModalVisible(false);
                  })
                  .catch((error) => {
                    console.error('Error removing matched person from the "matchedPeople" section: ', error);
                  });
              }
            }
          })
          .catch((error) => {
            console.error('Error finding matched person in the "matchedPeople" section: ', error);
          });
      })
      .catch((error) => {
        console.error('Error moving selected matched person to the "partner" section: ', error);
      });
    
    Alert.alert('Ask Out', 'You have asked out the matched person & Are Now In A Relationship!');
    setPlayerModalVisible(false); 
  } else {
    // For now, show a simple alert if the relationshipstat is less than 50
    Alert.alert('Ask Out', 'Sorry, the relationship stat must be 50 or higher to ask out this person.');
  }
};

    const handleMatchedPersonPress = (person) => {
    setSelectedMatchedPerson(person);
    setPlayerModalVisible(true);
    setModalVisible(false)
  };

const Viewmatchedperson = () =>{
  return(
         <Modal animationType="slide" transparent={false} visible={playerModalVisible}>
        {selectedMatchedPerson && (
          <View style={styles.modalContainer}>

                      <Image source={require("../assets/redheader.png")} style={styles.redheader} />
                                    <Text style={styles.tindrtext}>Tindr</Text>

            
                          <View style={styles.matchedPersonContainer2}>

            <Image source={selectedMatchedPerson.profileImage} style={styles.matchedPersonImage} />
            <Text style={styles.matchedPersonName}>{selectedMatchedPerson.name}</Text>
              <View
            style={{
              height: 10,
              width: `${selectedMatchedPerson.relationshipstat}%`,
              backgroundColor: 'green',
              borderRadius: 5,
              marginTop:30,
              marginLeft:"-17%"
            }}
          />
            </View>
                          <View style={styles.activitiescontainer}>
                            <Text style={styles.activitiestext}>Activities</Text>
                          </View>

            <TouchableOpacity onPress={handleAskOut} style={styles.askoutcontainer}>
                <Image source={require("../assets/heart2.png")} style={styles.heartimage2} />
              <Text style={styles.askOutButtonText}>Ask Out</Text>
            </TouchableOpacity>
          
            <TouchableOpacity onPress={handleAskOut} style={styles.askoutcontainer}>
                <Image source={require("../assets/dataimage.png")} style={styles.heartimage2} />
              <Text style={styles.askOutButtonText}> Go On Date</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setPlayerModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        )}
      </Modal>
  )
}

 return (
   <View style={styles.container}>

                      

            

     <TouchableOpacity onPress={handleFind} style={styles.findButton}>
       <Text style={styles.findButtonText}>Find</Text>
     </TouchableOpacity>
     {/* Render the current profile */}
     {datingapppeople.map((person, index) => (
       <View key={index} style={styles.profileContainer}>
         <Image source={person.profileImage} style={styles.profileImage} />
         <Text style={styles.profileName}>{person.name}</Text> 
       
         <TouchableOpacity onPress={handlex}style={styles.x}>
        <Image source={require("../assets/x.png")} style={styles.ximage} /> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.heart} onPress={handlelike}> 
        <Image source={require("../assets/heart.png")} style={styles.heartimage} />
        </TouchableOpacity>
       </View>
     ))}
     <TouchableOpacity onPress={handleViewMatches} style={styles.matchesButton}>
        <Text style={styles.matchesButtonText}>Matches</Text>
      </TouchableOpacity>
   <Modal animationType="slide" transparent={false} visible={modalVisible}>
      <View style={styles.modalContainer}>
      <Image source={require("../assets/redheader.png")} style={styles.redheader2} />
        <Text style={styles.tindrtext}>Tindr</Text>
      
        <FlatList
          data={matchedPeople}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
           <TouchableOpacity onPress={() => handleMatchedPersonPress(item)}>
          <View style={styles.matchedPersonContainer2}>
                <Image source={item.profileImage} style={styles.matchedPersonImage} />
                <Text style={styles.matchedPersonName}>{item.name}</Text>
            </View>
           </TouchableOpacity>

          )}
        />
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity> 
      </View>
    </Modal> 

      <Viewmatchedperson/>
      <TouchableOpacity onPress={navback} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>BACK</Text>
        </TouchableOpacity> 
   </View> 
 );
}; 


const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
 },
 redheader:{
  flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: -625,
    height: 250,
 },
 redheader2:{
flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: -155,
    height: 250,
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
 heartimage2:{
     width: 45,
    height: 40,
    borderRadius: 25,
    marginLeft:"2%",
    color:"gray"
 },
 tindrtext:{
   fontWeight:"bold",
   color:"white",
   fontSize:30,
   marginTop:-40
 },
 findButton: {
   backgroundColor: 'blue',
   paddingHorizontal: 20,
   paddingVertical: 10,
   borderRadius: 5,
   marginBottom: -4,

 },
 findButtonText: {
   color: 'white',
   fontSize: 16,
   fontWeight: 'bold',
 },
 profileContainer: {
   width: '90%',
   height: 580,
   justifyContent: 'center',
   alignItems: 'center',
   borderRadius: 10,
   backgroundColor: '#f2f2f2',
   marginBottom: 20,
   shadowColor: '#000',
   shadowOffset: {
     width: 0,
     height: 3,
   },
   shadowOpacity: 0.29,
   shadowRadius: 4.65,
   elevation: 7,
 },
 profileImage: {
   width: '60%',
   height: '35%',
   resizeMode: 'cover',
   borderTopLeftRadius: 10,
   borderTopRightRadius: 10,
 },
 profileName: {
   fontSize: 24,
   fontWeight: 'bold',
   marginTop: 10,
 },
 x:{
   width:"17%",
   height:"5%",
   marginRight:"40%",
   marginTop:"20%"
 },
 ximage:{
   borderRadius:100,
        width:80,
   height:80,
 
 },
 heart:{
  
   marginTop:"-8%",
   marginLeft:"40%"

 },
 heartimage:{
     borderRadius:100,
       width:80,
   height:80,
 },

  matchesButton: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  matchesButtonText: {
    color: 'white',
    fontSize: 16, 
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, 
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
 matchedPersonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2', // Background color
    borderRadius: 5, // Add border radius for rounded corners
    borderWidth: 1, // Add border width to create borders
    borderColor: '#ddd', // Border color
    padding: 10, // Add some padding for spacing
    marginTop:5,
  },
   matchedPersonContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2', // Background color
    borderRadius: 5, // Add border radius for rounded corners
    borderWidth: 1, // Add border width to create borders
    borderColor: '#ddd', // Border color
    padding: 10, // Add some padding for spacing
    marginTop:5,
    width:420,
    height:100
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

   askOutButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  askOutButtonText: {
    color: 'green',
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft:"5%"
  },
});


export default DatingScreen;


