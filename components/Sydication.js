import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
} from 'react-native';
import database from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';


const App = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
    const [skinImageURL, setSkinImageURL] = useState(null);
  const [name, setName] = useState("");
      const [filmographymodalvisible, setFilmographymodalvisible] = useState(false);  
  const [boxofficemodalvisible, setBoxofficemodalvisible] = useState(false);  
 

const boxofficefunction = ()=>{
  setModalVisible(false)
  setBoxofficemodalvisible(true)
}

  const navigation = useNavigation();

  const Card = ({ title, onPress, person }) => (
    <TouchableOpacity onPress={onPress} style={styles.card1}>
      <Image style={styles.profileImage2} source={person?.profileImage} />
      <Text style={styles.cardText1}>{title}</Text>
    </TouchableOpacity>
  );

  
  const navback = () => {
    navigation.navigate('BottomNavigator');
  };
  const gotomoviefromlisthingy = (movie)=>{ 
    setFilmographymodalvisible(false)
    handleMoviePress(movie)

  }

  useEffect(() => {

    const dbRef = database.ref('finishedmovies');

    // Subscribe to real-time updates
    dbRef.on('value', (snapshot) => {
      const movieData = snapshot.val();
      if (movieData) {
        const movieArray = Object.values(movieData);
        setMovies(movieArray);
      }
    });

    // Clean up the subscription when the component unmounts
    return () => {
      dbRef.off('value');
    };
  }, []);

    useEffect(() => {
const nameref3 = database.ref('user/name');
    nameref3.on('value', (snapshot) => {
      setName(snapshot.val());
    });





  
  }, []);

  const handleMoviePress = (movie) => {
    setSelectedMovie(movie);
    setModalVisible(true);
  };

    return (
    <View style={styles.container}>
      <View style={styles.space}>
        <Text style={styles.headerText}>Syndication: {name}</Text>
        <TouchableOpacity onPress={() => setFilmographymodalvisible(false)} style={styles.backButton}>
          <Text style={styles.backtext}>BACK</Text>
        </TouchableOpacity>
      </View>
          <ScrollView style={styles.container}>
      {movies.map((movie, index) => (
        <TouchableOpacity onPress={() => handleMoviePress(movie)} style={styles.longCard} key={index}>
        <View style={styles.cardtext}>
        
          <Image style={styles.pImage} source={movie?.posterImage} />
          <View style={styles.movieInfo}>
            <Text style={styles.movieText}>{movie.title}</Text>
            <View style={styles.ratingContainer}>
              <Image style={styles.starImage} source={require('../assets/star.png')} />
              <Text style={styles.ratingText}>{movie.imbdrating.toFixed(1)}</Text>
              <Image style={styles.calendarimage} source={require('../assets/calendar.png')} />
              <Text style={styles.yearText}>{movie.year}</Text>

            </View>


           <Text style={styles.syndicationText}>
  {movie.syndication.replace(/['"]+/g, '')} {movie.season1 && Math.round(movie.season1.annualSyndication).toLocaleString()}
</Text>


 <TouchableOpacity style={styles.netflixbackground}>
             <Text style={styles.netflixtext}>
  M
</Text>

            </TouchableOpacity>

            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
    </View>
  );
};



const styles = StyleSheet.create({

  space: {
    marginTop: 50,
    height: 50
  },
  headerText: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: -15,
  },
  backButton: {
    fontSize: 25
  },
  backtext: {
    fontSize: 15
  },

  card: {
    backgroundColor: '#ECECEC',
    padding: 10,
    borderRadius: 5,
    margin: 5,
    width: 105,
    height: 130,
    alignItems: 'center',
  },
  cardText: {
    fontSize: 12.5,
    fontWeight: 'bold',
    marginTop: 10
  },

  rImage: {
    height: 20,
    width: 20,
    marginBottom: -32,
    marginRight: 45,
  },
  cardRating: {
    fontSize: 12,
    marginTop: 10
  },

   container: {
    flex: 1,
    backgroundColor: 'white'
  },
  longCard: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#eaeaea',
    alignItems: 'center',
    height:110
  },
  cardtext:{
 flexDirection: 'row',
    alignItems: 'center',
    marginLeft:"-30%",
    marginBottom:50
    
  },
  pImage: {
    width: 100,
    height: 150,
    borderRadius: 10
  },
  movieInfo: {
    flex: 1,
    marginLeft: 10
  },
  movieText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  starImage: {
    width: 20,
    height: 20,
  },
  calendarimage:{
    width: 17,
    height: 17,
    marginLeft:5
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600'
  },
  yearText:{
  fontSize: 16,
    fontWeight: '600',
    marginLeft:2
  },
  syndicationText: {
    marginTop: 5,
    fontSize: 14,
  },
  netflixbackground:{
backgroundColor:"black",
height:"90%",
width:"10%",
alignSelf:"flex-end",
borderRadius:"3%",
marginTop:"-20%"     
  },
  netflixtext:{
    color:"red",
    fontWeight:"bold",
    fontSize:30,
    textAlign:"center",
    marginTop:0
  }
});

export default App;

