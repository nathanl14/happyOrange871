import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import database from '../firebase';

export default function App() {
  const [partner, setPartner] = useState(null);
  const [playerModalVisible, setPlayerModalVisible] = useState(false);
  const [childModalVisible, setChildModalVisible] = useState(false);
  const [enrollModalVisible, setEnrollModalVisible] = useState(false);
  const [newChild, setNewChild] = useState(null);
  const [child, setChild] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [takeoverModalVisible, setTakeoverModalVisible] = useState(false);

  useEffect(() => {
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
        Object.keys(childrenData).forEach((key) => {
          if (childrenData[key].age === 0) {
            selectedChild = childrenData[key];
          }
        });
      }

      if (selectedChild) {
        setChild(selectedChild);
      }
    });
  }, []);

  const generateChild = () => {
    return {
      name: 'Jaden Smith',
      age: 0,
      looks: Math.floor(Math.random() * 101),
      charisma: Math.floor(Math.random() * 101),
      naturalTalent: Math.floor(Math.random() * 101),
      improvisation: 30,
      memorization: 30,
      physical:30,
      vocal:30,
      emotion:30, 
      relationshipStat: 100,
    };
  };

  const handleTryForBaby = () => {
    const child = generateChild();
    setNewChild(child);

    const newChildKey = database.ref().child('children').push().key;
    database.ref(`children/${newChildKey}`).set(child);

    setChildModalVisible(true);
  };

  const handleEnrollInClasses = () => {
    setEnrollModalVisible(true);
    setChildModalVisible(false);
  };

  const handleClassSelection = (selected) => {
    setSelectedClass(selected);
  };

  const handleCloseEnrollModal = () => {
    setChildModalVisible(true);
    setEnrollModalVisible(false);
  };

  const handleAskOut = () => {
    // Implement your logic here
  };

  const handleGoOnDate = () => {
    // Implement your logic here
  };

  const handleTakeover = () => {
    // Logic to handle the takeover action
    // Example: Update the database and change the main character

    setTakeoverModalVisible(true);
    setChildModalVisible(false);

    // Your custom takeover logic goes here
  };

  // Enhanced list of classes
  const classes = [
    {
      name: 'Method Acting Mastery',
      price: '$16,000',
      effectiveness: 98,
      duration: '25 weeks',
    },
    {
      name: 'Shakespearean Techniques',
      price: '$12,500',
      effectiveness: 92,
      duration: '20 weeks',
    },
    {
      name: 'Improv for Beginners',
      price: '$500',
      effectiveness: 50,
      duration: '8 weeks',
    },
    {
      name: 'On-Camera Auditioning',
      price: '$9,000',
      effectiveness: 85,
      duration: '15 weeks',
    },
    {
      name: 'Voice Projection',
      price: '$7,500',
      effectiveness: 80,
      duration: '12 weeks',
    },
    {
      name: 'Theater Basics',
      price: '$5,000',
      effectiveness: 70,
      duration: '10 weeks',
    },
    {
      name: 'Advanced Scene Study',
      price: '$14,000',
      effectiveness: 95,
      duration: '22 weeks',
    },
    {
      name: 'Cheap Commercial Auditions',
      price: '$200',
      effectiveness: 20,
      duration: '5 weeks',
    },
    {
      name: 'Script Analysis',
      price: '$8,000',
      effectiveness: 88,
      duration: '18 weeks',
    },
  ];

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
        <TouchableOpacity onPress={() => setChildModalVisible(true)}>
          <View style={styles.partnerContainer}>
            <Image
              source={require('../assets/mediumSkinToneCurlyHairTeen.png')}
              style={styles.profileImage}
            />
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
        <Text>No child found.</Text>
      )}

      <Modal
        animationType="slide"
        transparent={false}
        visible={playerModalVisible}>
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
            <TouchableOpacity
              onPress={handleAskOut}
              style={styles.askoutcontainer}>
              <Image
                source={require('../assets/heart2.png')}
                style={styles.heartimage2}
              />
              <Text style={styles.askOutButtonText}>Ask Out</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleGoOnDate}
              style={styles.askoutcontainer}>
              <Image
                source={require('../assets/dataimage.png')}
                style={styles.heartimage2}
              />
              <Text style={styles.askOutButtonText}>Go On Date</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleTryForBaby()}
              style={styles.askoutcontainer}>
              <Image
                source={require('../assets/heart2.png')}
                style={styles.heartimage2}
              />
              <Text style={styles.askOutButtonText}>Try For Baby</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setPlayerModalVisible(false)}
              style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text>Loading or No Matched Person Selected</Text>
        )}
      </Modal>

      <Modal
        animationType="slide"
        transparent={false}
        visible={childModalVisible}
        onRequestClose={() => setChildModalVisible(false)}>
        <SafeAreaView style={styles.childModalOverlay}>
          <Text style={styles.enrollTitle}>Enroll in Classes</Text>
          {child ? (
            <View style={styles.childModalContainer}>
              <Image
                source={require('../assets/mediumSkinToneCurlyHairTeen.png')}
                style={styles.childModalImage}
              />
              <Text style={styles.childModalText}>{child.name}</Text>
              <Text style={styles.childAttribute}>Age: {child.age}</Text>
              <Text style={styles.childAttribute}>Looks: {child.looks}</Text>
              <Text style={styles.childAttribute}>
                Charisma: {child.charisma}
              </Text>
              <Text style={styles.childAttribute}>
                Natural Talent: {child.naturalTalent}
              </Text>
              <Text style={styles.childAttribute}>
                Relationship Stat: {child.relationshipStat}%
              </Text>
              <View style={styles.interactionContainer}>
                <TouchableOpacity
                  onPress={handleEnrollInClasses}
                  style={styles.interactionButton}>
                  <Text style={styles.interactionText}>Enroll in Classes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setTakeoverModalVisible(true)}
                  style={styles.interactionButton}>
                  <Text style={styles.interactionText}>Takeover</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setChildModalVisible(false)}
                  style={styles.interactionButton}>
                  <Text style={styles.interactionText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <Text>No child found.</Text>
          )}
        </SafeAreaView>
      </Modal>

      <Modal
        animationType="slide"
        transparent={false}
        visible={enrollModalVisible}
        onRequestClose={() => handleCloseEnrollModal(false)}>
        <SafeAreaView style={styles.enrollModalOverlay}>
          <Text style={styles.enrollTitle}>
            Enroll in Classes for {child ? child.name : 'Jaden Smith'}
          </Text>

          <ScrollView>
            {classes.map((c, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.classOptionContainer,
                  selectedClass === c.name && styles.selectedClassContainer,
                ]}
                onPress={() => handleClassSelection(c.name)}>
                <View style={styles.circleContainer}>
                  <View
                    style={[
                      styles.circle,
                      selectedClass === c.name && styles.selectedCircle,
                    ]}
                  />
                </View>
                <View style={styles.classDetailsContainer}>
                  <Text style={styles.className}>{c.name}</Text>
                  <Text style={styles.classPrice}>{c.price}</Text>
                  <Text style={styles.classDuration}>{c.duration}</Text>
                  <View style={styles.effectivenessBar}>
                    <View
                      style={{
                        height: 10,
                        width: `${c.effectiveness}%`,
                        backgroundColor: 'orange',
                        borderRadius: 5,
                      }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={handleCloseEnrollModal}
              style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>

    <Modal
  animationType="slide"
  transparent={false}
  visible={takeoverModalVisible}
  onRequestClose={() => setTakeoverModalVisible(false)}
>
  <View style={styles.takeoverModalContainer}>
    <Text style={styles.takeoverTitle}>
      Are you sure you want to take over and play as {child ? child.name : 'this child'}?
    </Text>
    <View style={styles.imageRow}>
      <Image
        source={require('../assets/willsmith.png')} // Replace with your first character image
        style={styles.takeoverPeopleImages}
      />
      <Image
        source={require('../assets/reverseArrows.png')} // Replace with your Uno reverse card or arrows image
        style={styles.takeoverImage}
      />
      <Image
        source={require('../assets/mediumSkinToneCurlyHairTeen.png')} // Replace with your second character image
        style={styles.takeoverPeopleImages}
      />
    </View>
    <Text style={styles.takeoverDescription}>
      This action is <Text style={{ color: 'red', fontWeight: 'bold' }}>irreversible</Text>. Nothing will transfer over, but {child ? child.name : 'the child'} will become the main character, and the current user Will Smith will become an NPC.
    </Text>
    <TouchableOpacity
      onPress={() => handleTakeover()}
      style={[styles.interactionButton, styles.takeoverButton]}
    >
      <Text style={styles.takeoverButtonText}>Confirm Takeover</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => setTakeoverModalVisible(false)}
      style={[styles.interactionButton, styles.cancelButton]}
    >
      <Text style={styles.cancelButtonText}>Cancel</Text>
    </TouchableOpacity>
  </View>
</Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  // Add your styles here

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
    textAlign: 'center',
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
  graybar: {
    height: 10,
    width: 150,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    marginTop: 5,
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
    marginLeft: '2%',
  },
  matchedPersonName: {
    fontSize: 16,
    marginLeft: '2%',
  },
  activitiescontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
    backgroundColor: 'gray',
    width: 450,
    textAlign: 'center',
    justifyContent: 'center',
  },
  activitiestext: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
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
    marginLeft: '5%',
  },
  heartimage2: {
    width: 45,
    height: 40,
    borderRadius: 25,
    marginLeft: '2%',
    color: 'gray',
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

  enrollTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  childModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  childModalContainer: {
    alignItems: 'center',
    padding: 20,
  },
  childModalImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  childModalText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  childAttribute: {
    fontSize: 18,
    marginTop: 10,
  },
  interactionContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  interactionButton: {
    padding: 10,
    backgroundColor: '#f4511e',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  interactionText: {
    color: '#fff',
    fontSize: 16,
  },
  enrollModalOverlay: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  classOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedClassContainer: {
    borderColor: 'blue',
    backgroundColor: '#f0f8ff',
  },
  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
  selectedCircle: {
    backgroundColor: 'blue',
  },
  classDetailsContainer: {
    flex: 1,
  },
  className: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  classPrice: {
    fontSize: 14,
    color: 'green',
  },
  classDuration: {
    fontSize: 14,
    color: 'gray',
  },
  effectivenessBar: {
    height: 10,
    width: '100%',
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginTop: 5,
  },

  takeoverModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff', // Light blue background
    padding: 30,
    borderRadius: 20, // Rounded corners for the modal
    borderWidth: 2,
    borderColor: '#7e57c2', // Purple border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  takeoverTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1e88e5', // Blue color
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  imageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  takeoverImage: {
    width: 80,
    height: 80,
    marginHorizontal: 15,
  },
  takeoverPeopleImages: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#42a5f5', // Blue border for images
  },
  takeoverDescription: {
    fontSize: 18,
    color: '#2e7d32', // Green color for the description text
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
    lineHeight: 24,
  },
 
  takeoverButton: {
    backgroundColor: 'green', // Red background for the confirm button
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  takeoverButtonText: {
    color: '#fff', // White text color
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#78909c', // Gray background for the cancel button
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  cancelButtonText: {
    color: '#fff', // White text color
    fontSize: 18,
    fontWeight: 'bold',
  },
});
