import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal
} from 'react-native';
import Constants from 'expo-constants';
import database from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { atom, useAtom } from 'jotai';
import { yearAtom } from '../Home';
 
const App = () => {
  const [items, setItems] = useState([]);
  const [watchItems, setWatchItems] = useState([]);
  const [shoesItems, setShoeItems] = useState([]);
  const [currentSuitIndex, setCurrentSuitIndex] = useState(0);
  const [currentWatchIndex, setCurrentWatchIndex] = useState(0);
  const [currentShoeIndex, setCurrentShoeIndex] = useState(0);  
  const [startOscars, setStartOscars] = useState(false) 
  const [movies, setMovies] = useState([]); 
  const [year, setYear] = useAtom(yearAtom)
   const [starModalVisible, setStarModalVisible] = useState(false);

    const [oscaroutfit, setOscaroutfit] = useState(0);

const openAction = ()=>{
  setStartOscars(true)
  setStarModalVisible(true)

}
  const navigation = useNavigation();

  const backnav = () => {
    navigation.navigate('BottomNavigator');
  };

  useEffect(() => {
    const itemsRef = database.ref('suits');
    itemsRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const itemArray = Object.values(data);
        setItems(itemArray);
      }
    });

    return () => itemsRef.off('value');
  }, []);

  useEffect(() => {
    const watchItemsRef = database.ref('watch');
    watchItemsRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const watchItemArray = Object.values(data);
        setWatchItems(watchItemArray);
      }
    });

    return () => watchItemsRef.off('value');
  }, []);

   useEffect(() => {
      
  const shoeItemsRef = database.ref('shoes');
    shoeItemsRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const shoeItemArray = Object.values(data);
        setShoeItems(shoeItemArray);
      }
    });


    return () => shoeItemsRef.off('value');
  }, []);



  

  const renderSuitItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.header}>Suits</Text>
      <Image source={item.image} style={styles.itemImage} />
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.brandText}>{item.brand}</Text>
       <View style={styles.textcontainer}>
      <Text style={styles.styletext}>
               Fashion Rating

      </Text>
        {item.style <= 5 ? (
    <TouchableOpacity style={styles.backgroundfordanumber}>
      <Text style={styles.styletextnumberred}>
        {item.style}/10
      </Text>
    </TouchableOpacity>
  ) : item.style <= 7.9 ? (
    <TouchableOpacity style={styles.backgroundfordanumber}>
      <Text style={styles.styletextnumberyellow}>
        {item.style}/10
      </Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity style={styles.backgroundfordanumber}>
      <Text style={styles.styletextnumbergreen}>
        {item.style}/10
      </Text>
    </TouchableOpacity>
  )}
      </View> 
    </View>
  ); 

  const renderWatchItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.header}>Watches</Text>
      <Image source={item.image} style={styles.itemImage} />
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.brandText}>{item.brand}</Text>

      <View style={styles.textcontainer}>
      <Text style={styles.styletext}>
               Fashion Rating

      </Text>
       {item.style <= 5 ? (
    <TouchableOpacity style={styles.backgroundfordanumber}>
      <Text style={styles.styletextnumberred}>
        {item.style}/10
      </Text>
    </TouchableOpacity>
  ) : item.style <= 7.9 ? (
    <TouchableOpacity style={styles.backgroundfordanumber}>
      <Text style={styles.styletextnumberyellow}>
        {item.style}/10
      </Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity style={styles.backgroundfordanumber}>
      <Text style={styles.styletextnumbergreen}>
        {item.style}/10
      </Text>
    </TouchableOpacity>
  )}
      </View> 
    </View>
  );

const renderShoeItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.header}>Shoes</Text>
      <Image source={item.image} style={styles.itemImage} />
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.brandText}>{item.brand}</Text>

      <View style={styles.textcontainer}>

       
      
      <Text style={styles.styletext}>
               Fashion Rating

      </Text>

        {item.style <= 5 ? (
    <TouchableOpacity style={styles.backgroundfordanumber}>
      <Text style={styles.styletextnumberred}>
        {item.style}/10
      </Text>
    </TouchableOpacity>
  ) : item.style <= 7.9 ? (
    <TouchableOpacity style={styles.backgroundfordanumber}>
      <Text style={styles.styletextnumberyellow}>
        {item.style}/10
      </Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity style={styles.backgroundfordanumber}>
      <Text style={styles.styletextnumbergreen}>
        {item.style}/10
      </Text>
    </TouchableOpacity>
  )}
     
      </View> 
    </View>
  );
const handleNextSuitButton = () => {
  const nextSuitIndex = (currentSuitIndex + 1) % items.length;
  setCurrentSuitIndex(nextSuitIndex);

  const validItems = [items[nextSuitIndex], currentWatchItem, currentShoeItem].filter(
    (item) => item !== undefined
  );
  const updatedTotalStyleRating = calculateTotalStyle(validItems);

  setTotalStyleRating(updatedTotalStyleRating/3); // Update the state

  // Update the database with the new totalStyleRating value
  database.ref('totalStyleRating').set(updatedTotalStyleRating/3);
};

// Similar modifications for handleNextWatchButton and handleNextShoeButton
const handleNextWatchButton = () => {
  const nextWatchIndex = (currentWatchIndex + 1) % watchItems.length;
  setCurrentWatchIndex(nextWatchIndex);

  const validItems = [currentSuitItem, watchItems[nextWatchIndex], currentShoeItem].filter(
    (item) => item !== undefined
  );
  const updatedTotalStyleRating = calculateTotalStyle(validItems);

  setTotalStyleRating(updatedTotalStyleRating/3); // Update the state

  // Update the database with the new totalStyleRating value
  database.ref('totalStyleRating').set(updatedTotalStyleRating/3);
};

const handleNextShoeButton = () => {
  const nextShoeIndex = (currentShoeIndex + 1) % shoesItems.length;
  setCurrentShoeIndex(nextShoeIndex);

  const validItems = [currentSuitItem, currentWatchItem, shoesItems[nextShoeIndex]].filter(
    (item) => item !== undefined
  );
  const updatedTotalStyleRating = calculateTotalStyle(validItems);

  setTotalStyleRating(updatedTotalStyleRating/3); // Update the state

  // Update the database with the new totalStyleRating value
  database.ref('totalStyleRating').set(updatedTotalStyleRating/3);
};


  const currentSuitItem = items[currentSuitIndex];
  const currentWatchItem = watchItems[currentWatchIndex];
  const currentShoeItem = shoesItems[currentShoeIndex];

  const [totalStyleRating, setTotalStyleRating] = useState(0); // Add this state

const calculateTotalStyle = (items) => {
  let totalStyle = 0;
  items.forEach((item) => {
    totalStyle += item.style;
  });
  return totalStyle;
};

useEffect(() => {
  const oscarstyle = database.ref('totalStyleRating');
    oscarstyle.on('value', (snapshot) => {
      setTotalStyleRating(snapshot.val());
    });



  // Calculate the total style rating and store it in state
  const validItems = [currentSuitItem, currentWatchItem, currentShoeItem].filter(
    (item) => item !== undefined
  );
  setTotalStyleRating(calculateTotalStyle(validItems)/3);
}, [currentSuitItem, currentWatchItem, currentShoeItem]);
 

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


  

  const MovieCard = ({ movie, onPress }) => (

  <TouchableOpacity onPress={() => onPress(movie)} style={styles.card}>
    <Image style={styles.pImage} source={movie?.posterImage} />

              {movie.year === year && movie.metascore==="" && (

    <View style={styles.matchedPersonContainer2}>
        <Text style={styles.awardtext}>{movie.award}</Text>

    <Text style={styles.movieText}>{movie.title}</Text>
                     <Image style={styles.rImage} source={require('../assets/star.png')} />
                         <Text style={styles.imbdrating}>{movie.imbdrating.toFixed(1)}</Text>


            </View>
            )} 

  </TouchableOpacity>
);


 if(startOscars===true){



return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <View style={styles.headerContainer1}>
          <Text style={styles.headerText1}>Welcome To The Oscarz!</Text>
          
          <TouchableOpacity onPress={backnav}>
            <Text>BACK</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require('../assets/oscarsbackground.jpg')}
          style={styles.oscarimage}
        />
      </View>
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie}  />
        ))}
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={starModalVisible}
      >
        <View style={styles.overlayDimBackground}>
          <View style={styles.starModalContainer}>
           
  <Image
              source={require('../assets/chrisRock.png')}
              style={styles.imageOfHost}
            />

                          <Text style={styles.nameOfHost}>Kris Rock</Text>


              <Text style={styles.paragrapgh}>During the Academy Awards(Oscarz), the host makes a cutting joke about your wifes appearance.</Text>

            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>👋 Stand up and sternly warn him to keep your wifes name out of his mouth before delivering a sharp slap</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>😂 Laugh it off</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>😐 Sit there with a stone-faced expression</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}> Walk out of the show</Text>
            </TouchableOpacity>
          

  
          </View>
        </View>
      </Modal>
    </View>
  );

 }
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <View style={styles.headerContainer1}>
          <Text style={styles.headerText1}>Welcome To The Oscarz!</Text>
          
          <TouchableOpacity onPress={backnav}>
            <Text></Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require('../assets/oscarsbackground.jpg')}
          style={styles.oscarimage}
        />
      </View>
      <View>
        <Text style={styles.chooseoutfittext}>Choose Outfit:  {totalStyleRating.toFixed(1)}</Text>
      </View>
      <View style={styles.sectionContainer1}>
        {currentSuitItem && (
          <View>
            <FlatList
              data={[currentSuitItem]}
              renderItem={renderSuitItem}
              keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity
              style={styles.fowardbutton}
              onPress={handleNextSuitButton}>
              <Image
                style={styles.goldarrow}
                source={require('../assets/goldarrow.png')}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.sectionContainer2}>
        {currentWatchItem && (
          <View>
            <FlatList
              data={[currentWatchItem]}
              renderItem={renderWatchItem}
              keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity
              style={styles.fowardbutton}
              onPress={handleNextWatchButton}>
              <Image
                style={styles.goldarrow}
                source={require('../assets/goldarrow.png')}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.sectionContainer3}>
        {currentShoeItem && (
          <View>
            <FlatList
              data={[currentShoeItem]}
              renderItem={renderShoeItem}
              keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity
              style={styles.fowardbutton}  
              onPress={handleNextShoeButton}>
              <Image
                style={styles.goldarrow}
                source={require('../assets/goldarrow.png')}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View>
      <TouchableOpacity style={styles.donebutton} onPress={openAction}>
              <Text style={styles.donetext}>
                Start Award Show 
              </Text>
            </TouchableOpacity>

            </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    marginTop: 20,
  },
  paragrapgh:{
marginBottom:"20%",
marginTop:'35%',
fontSize:20
  },
  donebutton:{
    backgroundColor:"#C18700",
    width:185,
    alignSelf:"center",
    marginTop:"-25%",
    borderRadius:5
  },
   matchedPersonContainer2: {
    alignItems: 'flex-start',
    backgroundColor: '#f2f2f2', // Background color
    borderRadius: 5, // Add border radius for rounded corners
    borderWidth: 1, // Add border width to create borders
    borderColor: '#ddd', // Border color
    padding: 10, // Add some padding for spacing
    marginTop:"-130%",
    width:420,
    height:100
  },
  rImage:{
    alignSelf:"flex-end",
    justifyContent: 'flex-end',
    alignItems:'flex-end',
     height:35,
    width:35,
      marginTop:"-16%",


  },
  movieText:{
    marginTop:"7%",
    fontSize:25
  },
  imbdrating:{
    alignSelf:"flex-end",
    fontSize:25
   
  },
  awardtext:{
    fontSize: 24,
    fontWeight: 'bold',
    color: '#C18700',
    alignSelf: 'center',
  },
  donetext:{
    color:"white",
    fontSize:30,
    textAlign:"center"
  },
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
  oscarimage: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
    padding: 0,
    borderRadius: 8,
    marginBottom: 16,
  },
  headerText1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#C18700',
    marginTop: 10,
  },
  chooseoutfittext: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#C18700',
    alignSelf: 'center',
    marginTop: -45,
  },
  headerContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  goldarrow: {
    transform: [{ rotate: '90deg' }],
    height: 52,
    width: 52,
    alignSelf: 'flex-end',
    marginTop: '-20%',
    marginRight: 10,
  },
  sectionContainer1: {
    marginBottom: 0,
    
  },
   sectionContainer2: {
    marginBottom: 0,
    
  },
   sectionContainer3: {
    marginBottom: 160,
    
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EABF14',
    textAlign: 'center',
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 0, // Set marginBottom to 0 to remove space between item containers
        height:125

  },
  itemImage: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  brandText: {
    marginTop: 5,
    alignSelf: 'center',
  },
  textcontainer:{
    width:105,
  },
  styletext: {
    fontWeight: 'bold',
    alignSelf:'center',
    marginTop:-40
  },
  styletextnumberred:{
     fontWeight: 'bold',
    alignSelf:'center',
    marginTop:-40,
    backgroundColor:"red",
    color:"white",
    fontSize:20,
      borderRadius:25,

  },
   styletextnumberyellow:{
     fontWeight: 'bold',
    alignSelf:'center',
    marginTop:-40,
    backgroundColor:"yellow",
    color:"white",
    fontSize:20,
      borderRadius:25,

  },
   styletextnumbergreen:{
     fontWeight: 'bold',
    alignSelf:'center',
    marginTop:-40,
    backgroundColor:"#29CE1F",
    color:"white",
    fontSize:20,
      borderRadius:25,

  },
  backgroundfordanumber:{
    borderRadius:25,
    height:50,
    width:65
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
    marginBottom:"-20%"
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
    marginLeft: '-21%',
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
  nameOfHost:{
 fontSize:18,
 fontWeight:"bold",
     marginTop:"-18%",
     marginLeft:"-20%"

  },
  imageOfHost:{
   height:"15%",
    width:"25%",
    marginLeft:"-75%",
  }

});

export default App;
