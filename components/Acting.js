import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Modal,
  Button,
  ScrollView,
  Image
} from 'react-native';
import database from '../firebase';
import { atom, useAtom } from 'jotai';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

import { followersatom } from './Instagram';
import { energyAtom } from './Training';

const App = () => {
  const EventModal = ({ visible, onClose, choices, description }) => {
    return (
      <Modal visible={visible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{description}</Text>
            {choices.map((choice, index) => (
              <Button
                key={index}
                title={choice.label}
                onPress={choice.onPress}
              />
            ))}
            <Button title="Close" onPress={onClose} />
          </View>
        </View>
      </Modal>
    );
  };
  const navigation = useNavigation();

  const [movies, setMovies] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [release, setRelease] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [auditionmodalVisible, setAuditionModalVisible] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState(0);
  const [moviesArray, setMoviesArray] = useState([]);
  const [energy, setEnergy] = useAtom(energyAtom);
  const [followers, setFollowers] = useAtom(followersatom);

  const [week, setWeek] = useState(8);
  const [modalChoices, setModalChoices] = useState([]);
  const [modalDescription, setModalDescription] = useState('');
  const [hype, setHype] = useState(0);
  const [compassion, setCompassion] = useState(100);
  const [health, setHealth] = useState(100);

const [starModalVisible, setStarModalVisible] = useState(false);
  const [actorDatingModalVisible, setActorDatingModalVisible] = useState(false);
  const [selectedActorProfile, setSelectedActorProfile] = useState(null);


 const initiateDate = () => {

       setStarModalVisible(false);
    setActorDatingModalVisible(true)
   
  };


const openCharacterModal =(actor)=>{
   setSelectedActorProfile(actor);
   setModalVisible(false);
      setAuditionModalVisible(false);

    setStarModalVisible(true);
}

  const toggleStarModal = () => {
    setStarModalVisible(!starModalVisible);
  };
  const incrementWeek = () => {
    setWeek(week - 1);
    setModalVisible(true);
  };

  const closeModal = () => {
    selectedMovie.weeksUntilRelease--;

    database.ref('movies').child(selectedMovie.id).update({
      movierating: selectedMovie.movierating,
      weeksUntilRelease: selectedMovie.weeksUntilRelease,

    });
  };

  const handleChoice = (label, hypeChange, compassionChange) => {
    setHype(hype + hypeChange);
    setCompassion(compassion + compassionChange);

    // Close the modal
    closeModal();
  };

  const showEventModal = (description, choices) => {
    setModalDescription(description);
    setModalChoices(choices);
    setModalVisible(true);
  };

  useEffect(() => {
    // Fetch movie data from the database


    const dbRef = database.ref('movies')
    dbRef.once('value', (snapshot) => {
      const movieData = snapshot.val();
      if (movieData) {
        const movieArray = Object.values(movieData);
        setMovies(movieArray);
      }
    });
  }, []);


  if (selectedMovie && selectedMovie.weeksUntilRelease === 45) {
    return (
      <View style={styles.container}>
        <EventModal
          visible={modalVisible}
          onClose={closeModal}
          description="What was the best part about filming??"
          choices={[
            {
              label: 'The stunts',
              onPress: () => handleChoice('The stunts', 10, 20),
            },
            {
              label: 'Leaving the country to film',
              onPress: () =>
                handleChoice('Leaving the country to film', -5, -10),
            },
            {
              label: 'Everything',
              onPress: () => handleChoice('Everything', 5, 10),
            },
            {
              label: 'Sex scenes',
              onPress: () => handleChoice('Sex scenes', -10, -20),
            },
          ]}
        />
      </View>
    );
  }

  const navback = () => {
    navigation.navigate('BottomNavigator');
  };

  const navtoacting = () => {
    navigation.navigate('Acting');
  };

  const yo = () => {
    if (selectedMovie.movierating < 100) {
        selectedMovie.movierating += Math.floor(Math.random() * 5) + 1;
        database.ref('movies').child(selectedMovie.id).update({
          movierating: selectedMovie.movierating,
        });
    }


//still editing this one right here so keep that in mind. Right nbow the selectedMovie.movierating is becoming too high
   if (selectedMovie.movierating < 100) {
        const spendMovieRating = selectedMovie.movierating+ Math.floor(Math.random() * 5) + 1;
    if (energy>=spendMovieRating){
      selectedMovie.movierating += spendMovieRating
      energy-selectedMovie.movierating
        database.ref('movies').child(selectedMovie.id).update({
          movierating: selectedMovie.movierating,
        });

        
    }
    }


  };


  const handleAccept = (movie) => {
    // Assign a random number of weeks until release to the movie
  

    // Set the `selectedMovie` value to the movie that was just accepted


    setSelectedMovie(movie);
if (movie.auditionchance===0){
    // Set the `modalVisible` value to true
    setModalVisible(true);


    // Alert the user that the movie has been accepted and will be released in the specified number of weeks
    Alert.alert(
      'Success',
      `You accepted ${movie.title}! It will be released in ${movie.weeksUntilRelease} weeks.`,
      [{ text: 'OK' }]
    );
} 

if(movie.auditionchance>0){
     setAuditionModalVisible(true);

    // Alert the user that the movie has been accepted and will be released in the specified number of weeks
    Alert.alert(
      'Success',
      `You accepted ${movie.title}! It will be released in ${movie.weeksUntilaudition} weeks.`,
      [{ text: 'OK' }]
    );
}

  };

 
  const advanceWeeksForAllMovies = () => {
    database.ref('movies').once('value', (snapshot) => {
      const movies = snapshot.val();
      if (movies) {
        Object.values(movies).forEach((movie) => {
          const updatedWeeksUntilRelease = movie.weeksUntilRelease - 1;
          if (updatedWeeksUntilRelease >= 0) {
            database.ref('movies').child(movie.id).update({
              weeksUntilRelease: updatedWeeksUntilRelease,
            });
          }
        });
      }
    });
  };

  const finishedMoviesRef = database.ref('finishedmovies');

   if (movies) {
  Object.values(movies).forEach((movieData) => {

  
    if (movieData.weeksUntilRelease === 16) {
      database.ref('text').update({
        releasedText: `${movieData.title} was released!`,
      });
    }
  });
}

  const handleAdvanceWeek = () => {
    database.ref('movies').once('value', (snapshot) => {
      const movies = snapshot.val();
      if (movies) {
        Object.values(movies).forEach((movie) => {
          if (movie.weeksUntilRelease > 0) {
            movie.weeksUntilRelease--;
          }
 if (movie.auditionchance > 0) {
          if (movie.weeksUntilRelease === 0) {
            // Remove auditionchance for the movie
            database.ref('movies').child(movie.id).update({
              auditionchance: 0,
            });
          }

           
        }
       
        });
      }
    });

    if (selectedMovie && release > 0) {
      setRelease(release - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navback}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Bookings</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {movies.map((movie, index) => (
          <TouchableOpacity onPress={() => handleAccept(movie)}>
            <View style={styles.movieRow} key={index}>
              <View style={styles.movieBox}>
                <Text style={styles.movieName}>{movie.title}</Text>
                <View
                  style={{
                    height: 10,
                    width: `${movie.movierating}%`,
                    backgroundColor: 'black',
                    color: 'black',
                    borderRadius: 5,
                    marginTop: 10,
                  }}
                />
              </View>

              

              {movie && movie.weeksUntilaudition >0 && (
                <Text style={styles.weeksUntilRelease}>
                {movie.weeksUntilaudition}
              </Text>
      )}

      {movie && movie.auditionchance ===0  && (
                <Text style={styles.weeksUntilRelease}>
                {movie.weeksUntilRelease}
              </Text>
      )}

              <View>
                

                 {movie && movie.weeksUntilaudition >0 && (
                <TouchableOpacity atyle={styles.shootingbutton}>
                  <Text style={styles.shootingtext}> Audition </Text>
                </TouchableOpacity>
      )}


                 {movie && movie.auditionchance ===0  && (
                <TouchableOpacity atyle={styles.shootingbutton}>
                  <Text style={styles.shootingtext}> Shooting </Text>
                </TouchableOpacity>
      )}
              </View>

              <View>
                <Text style={styles.weekstext}>weeks</Text>
              </View>
            </View>
            {movie && movie.weeksUntilRelease === 16 && (
        <Text>{movie.title} was released!</Text>
      )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Modal visible={modalVisible} animationType="slide">
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>{selectedMovie?.title}</Text>
      <Text style={styles.modalGenre}>{selectedMovie?.genre}</Text>
      <Text style={styles.modalBio}>{selectedMovie?.bio}</Text>
      <Text style={styles.modalActing}>
        Acting Level: {selectedMovie?.actingLevel}
      </Text>
      <Text style={styles.modalWeeks}>
        Weeks Until Release: {selectedMovie?.weeksUntilRelease}
      </Text>

      <TouchableOpacity style={styles.advanceButton} onPress={handleAdvanceWeek}>
        <Text style={styles.advanceButtonText}>ADVANCE</Text>
      </TouchableOpacity>

      <View style={styles.ratingBarContainer}>
        <View
          style={[
            styles.ratingBar,
            { width: `${selectedMovie?.movierating}%` },
          ]}
        />
        <Text style={styles.performanceText}>
          Performance: {selectedMovie?.movierating}%
        </Text>
      </View>

      <View style={styles.modalButtonContainer}>
        <TouchableOpacity
          style={styles.modalButton}
          onPress={() => {
            setModalVisible(false);
            setSelectedMovie(null);
          }}
        >
          <Text style={styles.modalButtonText}>Close</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalButton} onPress={() => yo()}>
          <Text style={styles.modalButtonText}>Improve</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.energyText}>
        Energy: {energy}
      </Text>
    </View>
  </View>
</Modal>


       <Modal visible={auditionmodalVisible} animationType="slide">
  <View style={styles.modalContainer}>
  {/* Display Cast Members */}
    <View style={styles.castMembersContainer}>
      <Text style={styles.castMembersTitle}>Cast Members:</Text>
      {selectedMovie?.castmembers && selectedMovie.castmembers.length > 0 ? (
        selectedMovie.castmembers.map((actor, index) => (

        <TouchableOpacity  onPress={() => openCharacterModal(actor)}>
          <Text key={index} style={styles.castMemberName}>
            {actor.name}
          </Text>
        </TouchableOpacity>

        ))
      ) : (
        <Text style={styles.noCastMembers}>No cast members added</Text>
      )}
    </View>
    <Text>Audition</Text>
    <Text>{selectedMovie?.imbdrating}</Text>
    <Text style={styles.modalTitle}>{selectedMovie?.title}</Text>
    <Text style={styles.modalGenre}>{selectedMovie?.genre}</Text>
    <Text style={styles.modalBio}>{selectedMovie?.bio}</Text>
    <Text style={styles.modalActing}>
      Acting Level: {selectedMovie?.actingLevel}
    </Text>
    <Text style={styles.modalWeeks}>
      Weeks Until Release: {selectedMovie?.weeksUntilaudition}
    </Text>
    
    
    
    <TouchableOpacity onPress={handleAdvanceWeek}>
      <Text>ADVANCE</Text>
    </TouchableOpacity>
    <View
      style={{
        height: 10,
        width: `${selectedMovie?.movierating}%`,
        backgroundColor: 'yellow',
        borderRadius: 5,
      }}
    />
    <Text style={styles.modalButtonText}>
      Performance: {selectedMovie?.movierating}
    </Text>
    <View style={styles.modalButtonContainer}>
      <TouchableOpacity
        style={styles.modalButton}
        onPress={() => {
          setAuditionModalVisible(false);
          setSelectedMovie(null);
        }}>
        <Text style={styles.modalButtonText}>Close</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.modalButton} onPress={() => yo()}>
        <Text style={styles.modalButtonText}>Improve</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>



<Modal
        animationType="slide"
        transparent={true}
        visible={starModalVisible}
        onRequestClose={toggleStarModal}>


        
        <View style={styles.overlayDimBackground}>
           {selectedActorProfile && (
          <View style={styles.starModalContainer}>
            <Text style={styles.actorHeader}>Co-star: {selectedActorProfile.name}</Text>
            
            <View style={styles.matchedProfileWrapper}>
            <Image
              source={require('../assets/tomholland.png')}
              style={styles.costarImage}
            />
              <Text style={styles.profileNameDisplay}>{selectedActorProfile.name}</Text>
              <View style={styles.progressIndicator} />
            </View>

            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>🎁 Gift</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>💬 Have a Conversation</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>🎬 Rehearse Lines</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>🍔 Get Food</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>👏 Compliment Acting</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>❤️ Flirt</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.dateButton} onPress={initiateDate}>
              <Text style={styles.dateButtonText}>Ask Out</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeModalButton} onPress={toggleStarModal}>
              <Text style={styles.closeModalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>

           )}
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={actorDatingModalVisible}
        onRequestClose={() => setActorDatingModalVisible(false)}
      >
        {selectedActorProfile && (
          <View style={styles.dateModalOverlay}>
            <View style={styles.actorProfileContainer}>
              <Text style={styles.datingStatusText}>You Are Now Dating {selectedActorProfile.name}</Text>
                <Image
              source={require('../assets/tomholland.png')}
              style={styles.childImageInModal}
            />
              <Text style={styles.actorDetailText}>Name: {selectedActorProfile.name}</Text>
              <Text style={styles.actorDetailText}>Age: {selectedActorProfile.age}</Text>

              <Text style={styles.actorDetailText}>Looks:</Text>
              <View style={styles.statBarBackground}>
                <View
                  style={{
                    height: 10,
                    width: `${selectedActorProfile.looks}%`,
                    backgroundColor: 'green',
                    borderRadius: 5,
                  }}
                />
              </View>

              <Text style={styles.actorDetailText}>Charisma:</Text>
              <View style={styles.statBarBackground}>
                <View
                  style={{
                    height: 10,
                    width: `${selectedActorProfile.charisma}%`,
                    backgroundColor: 'blue',
                    borderRadius: 5,
                  }}
                />
              </View>

              <Text style={styles.actorDetailText}>Fame:</Text>
              <View style={styles.statBarBackground}>
                <View
                  style={{
                    height: 10,
                    width: `${selectedActorProfile.fame}%`,
                    backgroundColor: 'gold',
                    borderRadius: 5,
                  }}
                />
              </View>

              <Text style={styles.actorDetailText}>Relationship:</Text>
              <View style={styles.statBarBackground}>
                <View
                  style={{
                    height: 10,
                    width: `${selectedActorProfile.relationshipStat}%`,
                    backgroundColor: 'green',
                    borderRadius: 5,
                  }}
                />
              </View>

              <TouchableOpacity
                onPress={() => setActorDatingModalVisible(false)}
                style={styles.closeProfileButton}
              >
                <Text style={styles.closeProfileButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3D3D3D',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#444444',
    padding: 10,
    marginBottom: 10,
    height: 100,
  },
  backButton: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    color: 'white',
    marginTop: 35,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 105,
    marginBottom: -30,
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  movieRow: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 0,
    paddingRight: 22,
  },
  movieBox: {
    backgroundColor: 'yellow',
    borderRadius: 10,
    padding: 25,
    width: 380,
  },
  movieName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'end',
  },
  weeksUntilRelease: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: -55,
  },
  shootingtext: {
    fontWeight: 'bold',
    marginTop: -40,
    marginLeft: -50,
    backgroundColor: 'black',
    color: 'yellow',
  },
  shootingbutton: {
    borderRadius: 40,
  },
  weekstext: {
    marginTop: 40,
    marginLeft: -55,
    fontWeight: 'bold',
  },
  backtext: {
    marginRight: 300,
    marginTop: 20,
  },
  weekText: {
    fontSize: 24,
    color: 'black',
    marginBottom: 20,
  },
  happinessText: {
    fontSize: 18,
    color: 'yellow',
    marginBottom: 10,
  },
  compassionText: {
    fontSize: 18,
    color: 'gold',
    marginBottom: 10,
  },
  healthText: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Slightly darker background for better contrast
  },
  modalContent: {
    width: '90%', // Responsive width
    backgroundColor: '#222', // Dark background for better contrast
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalTitle: {
    color: 'gold',
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 10,
  },
  modalGenre: {
    color: 'lightgray',
    fontSize: 18,
    marginBottom: 10,
  },
  modalBio: {
    color: 'lightgray',
    fontSize: 16,
    marginBottom: 15,
  },
  modalActing: {
    color: 'lightgray',
    fontSize: 14,
    marginBottom: 10,
  },
  modalWeeks: {
    color: 'lightgray',
    fontSize: 14,
    marginBottom: 20,
  },
  advanceButton: {
    backgroundColor: 'gold',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  advanceButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  ratingBarContainer: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  ratingBar: {
    height: 10,
    backgroundColor: 'gold',
    borderRadius: 5,
  },
  performanceText: {
    color: 'lightgray',
    fontSize: 16,
    marginTop: 5,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: 'black',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'gold',
    fontWeight: 'bold',
    fontSize: 16,
  },
  energyText: {
    color: 'lightgray',
    fontWeight: 'bold',
    fontSize: 16,
  },

   mainScreenWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  initiateButton: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 10,
  },
  initiateButtonText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  overlayDimBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '100%',
  },
  starModalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
    height: '75%',
  },
  actorHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    borderBottomWidth: 2,
    borderBottomColor: '#FFD700',
    paddingBottom: 10,
    marginBottom: '20%',
  },
  matchedProfileWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    width: '112%',
    height: 100,
    marginTop: '-15%',
    marginBottom: '25%',
  },
  profileNameDisplay: {
    fontSize: 24,
    fontWeight: 'bold',
    flexDirection: 'flex-start',
    marginTop: '-3%',
  },
  progressIndicator: {
    height: 10,
    width: '80%',
    backgroundColor: 'green',
    borderRadius: 5,
    marginTop: 30,
    marginLeft: '-46%',
  },
  actionButton: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    width: '100%',
  },
  actionButtonText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
  },
  dateButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
  },
  dateButtonText: {
    fontSize: 18,
    color: '#FFD700',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  closeModalButton: {
    marginTop: 20,
  },
  closeModalButtonText: {
    color: '#FFD700',
    fontSize: 18,
  },
  childImageInModal: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  dateModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  actorProfileContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: 300,
    alignItems: 'center',
  },
  datingStatusText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  actorDetailText: {
    fontSize: 18,
    marginBottom: 10,
  },
  statBarBackground: {
    backgroundColor: '#ddd',
    width: '100%',
    borderRadius: 5,
    marginBottom: 10,
  },
  closeProfileButton: {
    marginTop: 20,
  },
  closeProfileButtonText: {
    color: '#FFD700',
    fontSize: 18,
  },
  costarImage:{ 
    height:"62%",
    width:"20%"
  }
});

export default App;
