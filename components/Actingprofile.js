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

const MovieCard = ({ movie, onPress }) => (
  <TouchableOpacity onPress={() => onPress(movie)} style={styles.card}>
    <Image style={styles.pImage} source={movie?.posterImage} />
    <Image style={styles.rImage} source={require('../assets/star.png')} />
    <Text style={styles.cardRating}>{movie.imbdrating.toFixed(1)}</Text>
    <Text style={styles.cardText}>{movie.title}</Text>
  </TouchableOpacity>
);

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

  const [people, setPeople] = useState([
    {
      name: 'Zendava',
      followers: 94000000,
      following: false,
      profileImage: require('../assets/skin2.png'),
    },
    {
      name: 'Lupita N',
      followers: 11000000,
      following: false,
      profileImage: require('../assets/skin5.png'),
    },
    {
      name: 'Michael B J',
      followers: 9700000,
      following: false,
      profileImage: require('../assets/skin4.png'),
    },
    {
      name: 'The Rock',
      followers: 380000000,
      following: false,
      profileImage: require('../assets/skin3.png'),
    },
  ]);

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




    const skinImageRef = database.ref('user/skinImageURL');
    skinImageRef.on('value', (snapshot) => {
      const imageURL = snapshot.val();
      setSkinImageURL(imageURL);
    });

    return () => {
      skinImageRef.off('value');
    };
  }, []);

  const handleMoviePress = (movie) => {
    setSelectedMovie(movie);
    setModalVisible(true);
  };

 const renderSkinImage = () => {
    if (skinImageURL === 19) {
      return require('../assets/skin1.png');
    } else if (skinImageURL === 20) {
      return require('../assets/skin2.png');
    } else if (skinImageURL === 21) {
      return require('../assets/skin3.png');
    } else if (skinImageURL === 22) {
      return require('../assets/skin4.png');
    }else if (skinImageURL === 23) {
      return require('../assets/skin5.png');
    }
  };
  return (
    <View style={styles.container}>
        <View style={styles.header}> 
        <Text style={styles.nametext}>{name}</Text>
         <TouchableOpacity onPress={navback}>
          <Image source={require('../assets/arrow.png')} style={styles.arrowimage} />
        </TouchableOpacity>

      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{name}</Text>
       
      </View>
      <Image source={require('../assets/hollywood.jpg')} style={styles.image} />

      <View style={styles.personbackground}>
      <Image source={renderSkinImage()} style={styles.image2} />  
      </View>
      <View>
        <Text style={styles.bio}>
          bio bio bio bio bio bio bio bio bio, bio bio bio bio bio. Bio, bio bio
          bio bio bio bio bio bio bio bio bio bio bio bio bio.
        </Text>
      </View>
      <TouchableOpacity style={styles.addto}>
        <Text style={styles.addtotext}>+ Add to favorites</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Awards</Text>
      <ScrollView style={styles.awardsContainer}>
        {/* Awards Section */}
        <View style={styles.awardItemContainer}>
          <Text style={styles.awardTitle}>Best Actor</Text>
          <Text style={styles.awardWinner}>Winner: Me</Text>
          <Text style={styles.awardNominees}>
            Nominees: Jane Doe, Michael Johnson
          </Text>
        </View>
        <View style={styles.awardItemContainer}>
          <Text style={styles.awardTitle}>Best Actor</Text>
          <Text style={styles.awardWinner}>Winner: Me</Text>
          <Text style={styles.awardNominees}>
            Nominees: Sarah Johnson, David Brown
          </Text>
        </View>
        {/* Add more award items here */}
      </ScrollView>

      <Text style={styles.title}>Filmography</Text>
      <TouchableOpacity onPress={() =>setFilmographymodalvisible(true)}>
        <Text style={styles.seeall}>See All</Text>
      </TouchableOpacity>
      <View style={styles.moviesContainer}> 
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} onPress={handleMoviePress} />
        ))}
      </View>

      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.container2}>
          {selectedMovie && (
            <View style={styles.headerContainer2}>
              <Text style={styles.headerText2}>{selectedMovie.title}</Text>
              <Text style={styles.selectedMovieGenre}>
                {selectedMovie.genre}
              </Text>
               <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.button2}>
              <Text style={styles.backtext2}>BACK</Text>
            </TouchableOpacity>
            </View>
          )}
          <View>
          <ScrollView>
            {selectedMovie && (
              <View style={styles.block}>
                

              


                <Image
                  source={require('../assets/hollywood.jpg')}
                  style={styles.imagemodal}
                />
                <Text style={styles.selectedMovieBio}>{selectedMovie.bio}</Text>
                <Text style={styles.selectedMovieBudget}>
                </Text>
                {/* Add more selected movie data to be displayed */}
              </View>
            )}
            
            <View style={styles.seperater}></View>
            <View style={styles.seperater2}>
              <View>
                <Image
                  style={styles.starimageunfilled}
                  source={require('../assets/unfilledstar.png')}
                />
              </View>

              <Image
                style={styles.starimage2}
                source={require('../assets/star.png')}
              />
              <Text style={styles.imbdratingtext}>
                {selectedMovie?.imbdrating.toFixed(1)}

                <Text style={styles.imbdratingtext10}>/10</Text>
              </Text>

              <Text style={styles.imbdratingtext101}>
                {selectedMovie?.imbdstars1.toLocaleString()}
              </Text>

              <View>
                <Text style={styles.bluestartext}>Rate this</Text>
              </View>

              <View>
                <TouchableOpacity style={styles.metascorethingybutton}>
                  <Text style={styles.metascorethingy}>
                    {selectedMovie?.metascore}
                  </Text>
                </TouchableOpacity>
              </View>

              <View>
                <Text style={styles.metascoretext}>Metascore</Text>
              </View>
            </View>

            <View style={styles.seperater3}></View>

            <View style={styles.bar1container}>
              <View style={styles.bar1}></View>

              <Text style={styles.casttext}>Cast</Text>


              <ScrollView horizontal>
                {people.map((person, index) => (
                  <Card
                    key={index}
                    title={person.name}
                    onPress={() => showModal(person)}
                    person={person}
                  />
                ))} 
              </ScrollView>
            </View>
            <View style={styles.seperater4}></View>
              <View style={styles.bar1container}>
                <View style={styles.bar1}></View>

                <Text style={styles.casttext}>Box Office</Text>

      <Text style={styles.avgviewerstext}>{selectedMovie?.season1[0].episode1Views}</Text>

<TouchableOpacity onPress={boxofficefunction}> 
                    <Text style={styles.actualbudgettext}>Budget:</Text>
              <Text style={styles.budgettext}>${selectedMovie?.budget.toLocaleString()}</Text>
</TouchableOpacity>


              </View> 
            

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.button}>
              <Text style={styles.backtext}>BACK</Text>
            </TouchableOpacity>
            </ScrollView>
          </View>
          
        </View>
      </Modal>

       <Modal visible={filmographymodalvisible} animationType="slide">
         <View style={styles.space}>
         
       <Text style={styles.filmographyheadertext}>Filmography: {name}</Text>

<TouchableOpacity
              onPress={() => setFilmographymodalvisible(false)}
              style={styles.filmographymodalbackbutton}>
              <Text style={styles.backtext}>BACK</Text>
            </TouchableOpacity>

            </View>
                  <ScrollView style={styles.filmographycontainer}>

             <View style={styles.space2}>



            </View>
        <Text style={styles.yellowactortext}>Actor(5)</Text>

             
      {movies.map((movie, index) => (
            <TouchableOpacity onPress={()=>gotomoviefromlisthingy(movie) } style={styles.longcard}>
    <Image style={styles.pImage} source={movie?.posterImage} /> 
    <View style={styles.matchedPersonContainer2}>
        <Text style={styles.awardtext}>{movie.award}</Text>

    <Text style={styles.movieText}>{movie.title}</Text>
                     <Image style={styles.starrImagelongcard} source={require('../assets/star.png')} />
                         <Text style={styles.imbdratinglongcard}>{movie.imbdrating.toFixed(1)}</Text>
              <Text style={styles.movieyeartext}>{movie.year}</Text>



            </View>
            

  </TouchableOpacity>
          ))}

            </ScrollView>
        </Modal>
         <Modal visible={boxofficemodalvisible} animationType="slide">
         <View style={styles.space}>
           <TouchableOpacity onPress={navback}>
          <Image source={require('../assets/arrow.png')} style={styles.arrowimageinviewershipmodal} />
        </TouchableOpacity>
       <Text style={styles.filmographyheadertext}>Season 1 Viewership</Text>

<TouchableOpacity
              onPress={() => setFilmographymodalvisible(false)}
              style={styles.filmographymodalbackbutton}>
              <Text style={styles.backtext}>BACK</Text>
            </TouchableOpacity>

            </View>
                  <ScrollView style={styles.filmographycontainer}>

             <View style={styles.space2}>



            </View>
        <Text style={styles.yellowactortext}>Season 1</Text>

              <View style={styles.whitestrip}>
          <Text style={styles.viewershiptext}>S1 Episode 1</Text>
          <Text style={styles.episodeviewstext}>{selectedMovie?.season1[0].episode1Views.toLocaleString()}</Text>
          <Text style={styles.viewershiptext}>S1 Episode 2</Text>
          <Text style={styles.episodeviewstext}>{selectedMovie?.season1[0].episode2Views.toLocaleString()}</Text>
          <Text style={styles.viewershiptext}>S1 Episode 3</Text>
          <Text style={styles.episodeviewstext}>{selectedMovie?.season1[0].episode3Views.toLocaleString()}</Text>
          <Text style={styles.viewershiptext}>S1 Episode 4</Text>
          <Text style={styles.episodeviewstext}>{selectedMovie?.season1[0].episode4Views.toLocaleString()}</Text>
          <Text style={styles.viewershiptext}>S1 Episode 5</Text>
          <Text style={styles.episodeviewstext}>{selectedMovie?.season1[0].episode5Views.toLocaleString()}</Text>
          <Text style={styles.viewershiptext}>S1 Episode 6</Text>
          <Text style={styles.episodeviewstext}>{selectedMovie?.season1[0].episode6Views.toLocaleString()}</Text>
          <Text style={styles.viewershiptext}>S1 Episode 7</Text>
          <Text style={styles.episodeviewstext}>{selectedMovie?.season1[0].episode7Views.toLocaleString()}</Text>
          <Text style={styles.viewershiptext}>S1 Episode 8</Text>
          <Text style={styles.episodeviewstext}>{selectedMovie?.season1[0].episode8Views.toLocaleString()}</Text>
          <Text style={styles.viewershiptext}>S1 Episode 9</Text>
          <Text style={styles.episodeviewstext}>{selectedMovie?.season1[0].episode9Views.toLocaleString()}</Text>
          <Text style={styles.viewershiptext}>S1 Episode 10</Text>
          <Text style={styles.episodeviewstext}>{selectedMovie?.season1[0].episode10Views.toLocaleString()}</Text>
          <Text style={styles.viewershiptext}>S1 Episode 11</Text>
          <Text style={styles.episodeviewstext}>{selectedMovie?.season1[0].episode11Views.toLocaleString()}</Text>
          <Text style={styles.viewershiptext}>S1 Episode 12</Text>
          <Text style={styles.episodeviewstext}>{selectedMovie?.season1[0].episode12Views.toLocaleString()}</Text>
          <Text style={styles.viewershiptext}>S1 Episode 13</Text>
          <Text style={styles.episodeviewstext}>{selectedMovie?.season1[0].episode13Views.toLocaleString()}</Text>
          <Text style={styles.viewershiptext}>S1 Episode 14</Text>
          <Text style={styles.episodeviewstext}>{selectedMovie?.season1[0].episode14Views.toLocaleString()}</Text>
          <Text style={styles.viewershiptext}>S1 Episode 15</Text>
          <Text style={styles.episodeviewstext}>{selectedMovie?.season1[0].episode15Views.toLocaleString()}</Text>
          <Text style={styles.viewershiptext}>S1 Episode 16</Text>
          <Text style={styles.episodeviewstext}>{selectedMovie?.season1[0].episode16Views.toLocaleString()}</Text>
          <Text style={styles.viewershiptext}>S1 Episode 17</Text>
          <Text style={styles.episodeviewstext}>{selectedMovie?.season1[0].episode17Views.toLocaleString()}</Text>
          <Text style={styles.viewershiptext}>S1 Episode 18</Text>
          <Text style={styles.episodeviewstext}>{selectedMovie?.season1[0].episode18Views.toLocaleString()}</Text>
          <Text style={styles.viewershiptext}>S1 Episode 19</Text>
          <Text style={styles.episodeviewstext}>{selectedMovie?.season1[0].episode19Views.toLocaleString()}</Text>
          <Text style={styles.viewershiptext}>S1 Episode 19</Text>
          <Text style={styles.episodeviewstext}>{selectedMovie?.season1[0].episode20Views.toLocaleString()}</Text>
          <Text style={styles.viewershiptext}>S1 Episode 20</Text>
          <Text style={styles.episodeviewstext}>{selectedMovie?.season1[0].episode21Views.toLocaleString()}</Text>
          <Text style={styles.viewershiptext}>S1 Episode 21</Text>
          <Text style={styles.episodeviewstext}>{selectedMovie?.season1[0].episode22Views.toLocaleString()}</Text>
          <Text style={styles.viewershiptext}>S1 Episode 22</Text>
          <Text style={styles.episodeviewstext}>{selectedMovie?.season1[0].episode23Views.toLocaleString()}</Text>
          <Text style={styles.viewershiptext}>S1 Episode 23</Text>
          <Text style={styles.episodeviewstext}>{selectedMovie?.season1[0].episode24Views.toLocaleString()}</Text>
          <Text style={styles.viewershiptext}>S1 Episode 24</Text>
         <Text style={styles.episodeviewstext}>{selectedMovie?.season1[0].episode1Views.toLocaleString()}</Text>

      
            </View>
     

            </ScrollView>
        </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    marginTop: 20,
  },
  whitestrip:{
backgroundColor:"white",
height:"1950%"
  },
  viewershiptext:{
    marginTop:"5%",
    marginLeft:"2%"
  },
  longcard:{
flexDirection: 'row',

    alignItems: 'center',
    backgroundColor: '#f2f2f2', // Background color
    borderRadius: 5, // Add border radius for rounded corners
    borderWidth: 1, // Add border width to create borders
    borderColor: '#ddd', // Border color
    padding: 10, // Add some padding for spacing
    marginTop:0,
    width:420,
    height:100,
  },
  filmographymodalbackbutton:{
fontSize:25
  },
  filmographycontainer:{
backgroundColor: '#f2f2f2', // Background color

  },
  space:{
marginTop:50,
height:50
  },
  space2:{

  },

  yellowactortext:{

fontSize:20,
fontWeight:"bold",
marginTop:0,
color:"#FFC733"
  },
  filmographyheadertext:{
alignSelf:"center",
textAlign:"center",
justifyContent:"cemter",
alignItems:"center",
fontSize:20,
fontWeight:"bold",
marginTop:-15,


  },
  imbdratinglongcard: {
    marginLeft: '90%',
    fontSize: 17,
    fontWeight: 'bold',
  },
  movieyeartext: {
    marginLeft: '30%',
    fontSize: 17,
    fontWeight: 'bold',
  },
  starrImagelongcard:{
  height: 20,
    width: 20,
        marginLeft: '90%',

  },
  header: {
    marginBottom: 10,
    height: 100,
    width:"100%",
  },   
  nametext:{
alignSelf:"center",
textAlign:"center",
justifyContent:"cemter",
alignItems:"center",
fontSize:20,
fontWeight:"bold",
marginTop:30

  },
  image2:{
    alignSelf:"center",
    marginTop:10,
  },
  personbackground:{
    backgroundColor:"lightgray",
    width:130,
    height:150,

  },
  arrowimage:{
    transform: [{ rotate: '180deg' }],
    height:20,
    width:20,
    marginTop:-20

  },
  backtext:{
    marginTop:-1120,
    marginRight:-340,
    fontSize:15
  },
  container2: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 20,
  },
  seperater: {
    borderWidth: 0.33,
    borderColor: '#ECECEC',
  },
  seperater2: {
    borderWidth: 0.83,
    borderColor: '#ECECEC',
    height: '11%',
    width: 500,
    padding: 0,
    marginBottom: -30,
  },
  seperater3: {
    borderWidth: 30,
    borderColor: '#FAFAFA',
    height: '1%',
    width: 500,
    padding: 0,
  },
  seperater4: {
    borderWidth: 20,
    borderColor: '#FAFAFA',
    height: '1%',
    width: 500,
    padding: 0,
  },
  rImage: {
    height: 20,
    width: 20,
    marginBottom: -32,
    marginRight: 45,
  },
  starimage2: {
    height: 30,
    width: 30,
    marginLeft: '8.7%',
  },
  starimageunfilled: {
    height: 27,
    width: 27,
    marginLeft: '38.5%',
    marginBottom: -90,
  },
  bluestartext: {
    color: 'blue',
    fontWeight: 'bold',
    marginHorizontal: '35%',
    marginVertical: '-7%',
  },
  imbdratingtext: {
    marginLeft: '7.5%',
    fontSize: 17,
    fontWeight: 'bold',
  },
  imbdratingtext10: {
    marginLeft: '7.8%',
    fontSize: 14,
    color: 'black',
    opacity: 0.3,
  },
  imbdratingtext101: {
    marginLeft: '5.3%',
    fontSize: 14,
    color: 'black',
    opacity: 0.3,
  },
  metascorethingy: {
    fontWeight: 'bold',

    color: 'white',
    textAlign: 'center',
    marginTop: 4,
    fontSize: 20,
  },
  metascoretext: {
    fontSize: 17.5,
    marginLeft: '61.5%',
    marginTop: '-5.5%',
  },
  metascorethingybutton: {
    backgroundColor: '#3EC75E',
    height: 30,
    width: 30,
    marginLeft: '67%',
    marginTop: '-12.5%',
  },
  bar1container: {
    padding: 16,
  },
  bar1: {
    borderColor: '#f3ce13',
    height: 30,
    width: 3,
    borderWidth: 2,
    borderRadius: 20,
  },
  casttext: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: '3%',
    marginTop: '-7%',
  },
   avgviewerstext: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: '3%',
    marginTop: '0ch%',
  },
  episodeviewstext: {
    fontSize: 16,
    marginLeft: '78%',
    marginTop: '-5%',
  },
  card1: {
    backgroundColor: '#ECECEC',
    padding: 10,
    borderRadius: 5,
    margin: 5,
    width: 105,
    height: 130,
    alignItems: 'center',
  },
  cardText1: {
    fontSize: 12.5,
    fontWeight: 'bold',
    marginTop: 20,
  },
  profileImage2: {
    height: 65,
    width: 65,
    marginTop: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerContainer2: {
   height:120
  },
  headerText2: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
  },
  button: {
    marginTop: '70%',
    backgroundColor: 'yellow',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
   button2: {
    padding: 20,
    borderRadius: 5,
    marginTop:-100,
    marginLeft:"80%"
  },
  buttonText: {
    color: 'black',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 170,
    resizeMode: 'cover',
    padding: 0,
    borderRadius: 8,
    marginBottom: 16,
  },
  bio: {
    marginLeft: 140,
    marginTop: -100,
  },
  addto: {
    backgroundColor: 'gold',
    height: 40,
    borderRadius: 10,
    marginTop:10
  },
  addtotext: {
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 17,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  seeall: {
    fontSize: 12,
    color: 'blue',
    marginTop: -20,
    marginLeft: 125,
  },
  awardsContainer: {
    marginBottom: 24,
  },
  awardItemContainer: {
    marginBottom: 16,

  },
  awardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  awardWinner: {
    fontSize: 16,
  },
  awardNominees: {
    fontSize: 16,
    color: 'gray',
  },
  moviesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: 100,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    padding: 8,
    height: 140,
    marginRight:5
  },
  cardRating: {
    padding: 12,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedMovieContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: '80%',
    maxHeight: '80%',
  },
  selectedMovieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  selectedMovieGenre: {
    fontSize: 15,
    color: 'gray',
    marginBottom: 20,
    borderWidth: 0.8,
    borderRadius: 3,
    width: 85,
    textAlign: 'center',
    marginLeft: 25,
    height: 25,
  },
  imagemodal: {
    width: '33%',
    height: 205,
    borderRadius: 3,
    padding: 16,
    marginLeft: 5,
  },
  selectedMovieBio: {
    fontSize: 11,
    marginTop: -185,
    marginLeft: 155,
    textAlign: 'left',
    padding: 3,
    width: '55%',
    height: 265,
  },
  selectedMovieBudget: {
    fontSize: 16,
    color: 'gray',
  },
  modalCloseButton: {
    padding: 8,
    marginTop: -420,
    alignSelf: 'flex-end',
    marginRight: 370,
  },
  modalCloseButtonText: {
    fontSize: 46,
    color: 'black',
  },
  actualbudgettext:{
    marginTop:"0.5%",
    fontSize: 20,
    color: 'black',
    fontWeight:"bold"
  },
  budgettext:{
fontSize: 20,
    marginLeft: '20%',
    marginTop: '-6%',
    color:"gray"
  },
  arrowimageinviewershipmodal:{
     transform: [{ rotate: '180deg' }],
    height:20,
    width:20,
    marginTop:10,
    marginLeft:"5%"
  }
});

export default App;
