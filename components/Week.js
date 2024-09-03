import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import database from '../firebase';
import { useNavigation } from '@react-navigation/native';

export default function Asset() {
  const [movies, setMovies] = useState([]);
  const navigation = useNavigation();
  const [eventmodalvisible, setEventmodalvisible] = useState(false); // State for controlling the modal

   const closeModal = () => {
    setEventmodalvisible(false);
  };

const goToNetworkingScreen = ()=>{
    navigation.navigate('Network');

  
}
  const EventModal = () => {
    // Fetch data from Firebase and conditionally render the modal
    
    return (
      <Modal visible={eventmodalvisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Modal content */}
            <Text style={styles.modalText}>Event Modal</Text>
            <TouchableOpacity onPress={closeModal}>
            <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    );
  };

  useEffect(() => {
    // Fetch movie data from the database

    database.ref('movies').once('value', (snapshot) => {
      const movies = snapshot.val();
      if (movies) {
        Object.values(movies).forEach((movie) => {
          if (movie.weeksUntilRelease === 3) {
            setEventmodalvisible(true);
          }
        });
      }
    });

    const dbRef = database.ref('movies');
    dbRef.once('value', (snapshot) => {
      const movieData = snapshot.val();
      if (movieData) {
        const movieArray = Object.values(movieData);
        setMovies(movieArray);
      }
    });
  }, []);

  useEffect(() => {
    if (movies) {
      Object.values(movies).forEach((movieData) => {
        if (movieData.weeksUntilRelease === 0) {
          database.ref('text').update({
            releasedText: `${movieData.title} was released!`,
          });
        }
      });
    }
  }, [movies]);

  return (
    <View style={styles.container}>
       <TouchableOpacity style={styles.button} onPress={goToNetworkingScreen}>
        <Text style={styles.buttonText}>Attend Party</Text>
      </TouchableOpacity>
      {movies.map((movie, index) => (
        <View key={index}>
          {movie && movie.weeksUntilRelease === 1 && (
            <Text>{movie.title} was released!</Text>
          )}
        </View>
      ))}

      <EventModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
