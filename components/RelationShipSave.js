import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from 'react-native';
import database from '../firebase';

export default function App() {
  const [partner, setPartner] = useState(null);
  const [playerModalVisible, setPlayerModalVisible] = useState(false);
  const [childModalVisible, setChildModalVisible] = useState(false);
  const [newChild, setNewChild] = useState(null);
  const [child, setChild] = useState(null);

  useEffect(() => {
    // Fetch the partner data from the "partner" section in the database
    database.ref('partner').once('value', (snapshot) => {
      const partnerData = snapshot.val();
      if (partnerData) {
        const [partnerKey, partnerValue] = Object.entries(partnerData)[0];
        if (partnerKey && partnerValue) {
          setPartner(partnerValue);
        }
      } else {
        setPartner(null);
      }
    });




    database.ref('children').once('value', (snapshot) => {
      const childrenData = snapshot.val();
      let selectedChild = null;

      if (childrenData) {
        Object.keys(childrenData).forEach(key => {
          if (childrenData[key].age == 0) {
            selectedChild = childrenData[key];
          }
        });
      }
  
      if (selectedChild) {
        setChild(selectedChild);
      } else {
      }
    });   
  }, []);

  const generateChild = () => {
    return {
      name: 'Jaden Smith',
      age: -1,
      looks: Math.floor(Math.random() * 101), // Random value between 0 and 100
      charisma: Math.floor(Math.random() * 101),
      naturalTalent: Math.floor(Math.random() * 101),
      relationshipStat: 100,
    };
  };

  const handleTryForBaby = () => {
    const child = generateChild();
    setNewChild(child);

    // Save the child to the database under "children"
    const newChildKey = database.ref().child('children').push().key;
    database.ref(`children/${newChildKey}`).set(child);

    console.log("Generated child:", child);
    console.log("Setting child modal visible.");
    
    // Show the modal
    setChildModalVisible(true);
  };

  const handleAskOut = () => {
    // Implement your logic here
  };

  const handleGoOnDate = () => {
    // Implement your logic here
  };

  return (
    <View style={styles.container}>
      <View style={styles.redheader} />
      <Text style={styles.tindrtext}>Relationships</Text>
      {partner ? (
        <TouchableOpacity onPress={() => setPlayerModalVisible(true)}>
          <View style={styles.partnerContainer}>
            <Image source={partner.profileImage} style={styles.profileImage} />
            <View style={styles.partnerInfo}>
              <Text style={styles.partnerName}>{partner.name}</Text>
              <Text style={styles.g}>Relationship</Text>

              <View style={styles.graybar}>
                <View
                  style={{
                    height: 10,
                    width: `${partner.relationshipStat}%`,
                    backgroundColor: 'green',
                    borderRadius: 5,
                  }}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <Text>No partner found.</Text>
      )}
    {child ? (
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.partnerContainer}>
            <Image source={require('../assets/mediumSkinToneCurlyHairTeen.png')} style={styles.profileImage} />
            <View style={styles.partnerInfo}>
              <Text style={styles.partnerName}>{child.name}</Text>
              <Text style={styles.g}>Relationship</Text>

              <View style={styles.graybar}>
                <View
                  style={{
                    height: 10,
                    width: `${child.relationshipStat}%`,
                    backgroundColor: 'green',
                    borderRadius: 5,
                  }}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <Text>No partner found.</Text>
      )}


      <Modal
        animationType="slide"
        transparent={false}
        visible={playerModalVisible}
      >
        {partner ? (
          <View style={styles.modalContainer}>
            <View style={styles.matchedPersonContainer2}>
              <Image
                source={partner.profileImage}
                style={styles.matchedPersonImage}
              />
              <Text style={styles.matchedPersonName}>{partner.name}</Text>
              <View
                style={{
                  height: 10,
                  width: `${partner.relationshipStat}%`,
                  backgroundColor: 'green',
                  borderRadius: 5,
                  marginTop: 30,
                  marginLeft: '-17%',
                }}
              />
            </View>
            <View style={styles.activitiescontainer}>
              <Text style={styles.activitiestext}>Activities</Text>
            </View>

            <TouchableOpacity onPress={handleAskOut} style={styles.askoutcontainer}>
              <Image
                source={require('../assets/heart2.png')}
                style={styles.heartimage2}
              />
              <Text style={styles.askOutButtonText}>Ask Out</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleGoOnDate} style={styles.askoutcontainer}>
              <Image
                source={require('../assets/dataimage.png')}
                style={styles.heartimage2}
              />
              <Text style={styles.askOutButtonText}>Go On Date</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleTryForBaby()} style={styles.askoutcontainer}>
              <Image
                source={require('../assets/heart2.png')}
                style={styles.heartimage2}
              />
              <Text style={styles.askOutButtonText}>Try For Baby</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setPlayerModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text>Loading or No Matched Person Selected</Text>
        )}
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={childModalVisible}
        onRequestClose={() => setChildModalVisible(false)}
      >
        <SafeAreaView style={styles.childModalOverlay}>
          {newChild ? (
            <View style={styles.childModalContainer}>
              <Image
                source={require('../assets/mediumSkinToneBaby.png')}
                style={styles.childModalImage}
              />
              <Text style={styles.childModalText}>A child has been born!</Text>
              <Text style={styles.childAttribute}>Name: {newChild.name}</Text>
              <Text style={styles.childAttribute}>Age: {newChild.age}</Text>
              <Text style={styles.childAttribute}>Looks: {newChild.looks}</Text>
              <Text style={styles.childAttribute}>Charisma: {newChild.charisma}</Text>
              <Text style={styles.childAttribute}>Natural Talent: {newChild.naturalTalent}</Text>
              <Text style={styles.childAttribute}>Relationship Stat: {newChild.relationshipStat}</Text>
              <TouchableOpacity
                onPress={() => setChildModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text>Loading or No Child Data</Text>
          )}
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  redheader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: -805,
    height: 250,
    backgroundColor: 'gray',
  },
  tindrtext: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 30,
    marginTop: -40,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  partnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  partnerInfo: {
    flex: 1,
  },
  partnerName: {
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  matchedPersonContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginTop: 5,
    width: 420,
    height: 100,
  },
  matchedPersonImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: "2%",
  },
  matchedPersonName: {
    fontSize: 16,
    marginLeft: "2%",
  },
  activitiescontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
    backgroundColor: "gray",
    width: 450,
    textAlign: "center",
    justifyContent: "center",
  },
  activitiestext: {
    color: "white",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  askoutcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1.3,
    borderColor: '#ddd',
    padding: 10,
    marginTop: 0,
    width: 420,
    height: 80,
  },
  askOutButtonText: {
    color: 'green',
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: "5%",
  },
  heartimage2: {
    width: 45,
    height: 40,
    borderRadius: 25,
    marginLeft: "2%",
    color: "gray",
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
  childModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  childModalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: 300,
    alignItems: 'center',
  },
  childModalText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  childAttribute: {
    fontSize: 18,
    marginBottom: 10,
  },
  childModalImage: { 
    width: 60,
    height: 60,
    marginBottom: 20,
  },
});
