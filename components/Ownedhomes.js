import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Modal, Image, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import database from '../firebase';
import { useNavigation } from '@react-navigation/native';

const App = () => {
  const [houses, setHouses] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [money, setMoney] = useState(500000);
  const [totalValue, setTotalValue] = useState(0);


 const navigation = useNavigation();



  const backnav = () => {
    navigation.navigate('BottomNavigator');
  };

    const houses1 = [

    { id: 1, bedrooms: 3, bathrooms: 2, sqft: 1500, price: 350000, address: '123 Main St', type: "Condo", },

    ]
  useEffect(() => {
    // Fetch houses data from the database
    const housesRef = database.ref('houses');
    housesRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert the data object into an array
        const housesArray = Object.values(data);
        setHouses(housesArray);
      }
    });

    // Clean up the database reference when component unmounts
    return () => housesRef.off('value');
  }, []);

  useEffect(() => {
    const housesRef = database.ref('houses');
    housesRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert the data object into an array
        const housesArray = Object.values(data);
        setHouses(housesArray);
      }
    });
  }, []);

  const handleHousePress = (house) => {
    setSelectedHouse(house);
    setModalVisible(true);
  };

  const handleBuyNow = () => {
    if (selectedHouse) {
      // Calculate the costs based on percentages
     

      // Add amenities to the selected house
   
      // Calculate and display the total cost
    
    }
    setModalVisible(false);
  };

  const handleBackButtonPress = () => {
  setModalVisible(false);
};


  const renderHouseItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleHousePress(item)}>
        <View style={styles.houseContainer}>
          <Text style={styles.addressText}>Address: {item.address}</Text>
          <Text style={styles.bedroomsText}>Bedrooms: {item.bedrooms}</Text>
          <Text style={styles.bathroomsText}>Bathrooms: {item.bathrooms}</Text>
          <Text style={styles.sqftText}>Sq Ft: {item.sqft}</Text>
          <Text style={styles.priceText}>Value: ${item.price.toLocaleString()}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderModal = () => {
    if (!selectedHouse) return null;
    return (
      <Modal visible={modalVisible} animationType="slide">
      
        <View style={styles.modalContainer}>
        <View>
      <TouchableOpacity onPress={handleBackButtonPress}> 
            <Text style={styles.back}>Back</Text>
        </TouchableOpacity>
        </View>
                  <Text style={styles.addressText}>Real Estate Value {totalValue}</Text>
          <Text style={styles.addressText}>Address: {selectedHouse.address}</Text>
          <Text style={styles.bedroomsText}>Bedrooms: {selectedHouse.bedrooms}</Text>
          <Text style={styles.bathroomsText}>Bathrooms: {selectedHouse.bathrooms}</Text>
          <Text style={styles.sqftText}>Sq Ft: {selectedHouse.sqft}</Text>
          <Text style={styles.priceText}>Value: ${selectedHouse.price.toLocaleString()}</Text>

          <View style={styles.amenityContainer}>
            <Text style={styles.amenityText}>Purchase Amenities:</Text>
            
            <TouchableOpacity style={styles.amenitybutton}>
            <View>
             
                </View>
            <Text style={styles.gymtext}>Gym: ${selectedHouse.price * 0.02}</Text>
            </TouchableOpacity>
            
               <TouchableOpacity style={styles.amenitybutton}>
                <Text style={styles.gymtext}>Pool: ${selectedHouse.price * 0.03}</Text>
            </TouchableOpacity>
             <TouchableOpacity style={styles.amenitybutton}>
              <Text style={styles.gymtext}>Cigar Lounge: ${selectedHouse.price * 0.01}</Text>
            </TouchableOpacity>
<Image
                  style={styles.dumbellimage}
                  source={require('../assets/dumbell.png')}
                />

                 <Image
                  style={styles.poolimage}
                  source={require('../assets/poolimage.png')}
                />

                 <Image
                  style={styles.cigarimage}
                  source={require('../assets/cigarimage.jpg')}
                />
          </View>
      <ScrollView>
  <Text style={styles.header}>Current Amenities:</Text>

      </ScrollView>


        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
     <View>
      <TouchableOpacity onPress={backnav}>
            <Text style={styles.back1}>Back</Text>
        </TouchableOpacity>
        </View>
      <Text style={styles.header}>Zillaw</Text>
      <FlatList
        data={houses}
        renderItem={renderHouseItem}
        keyExtractor={(item) => item.id.toString()}
      />
      {renderModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
    marginTop: 5,
    textAlign: 'center',
  },
  houseContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  addressText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bedroomsText: {
    marginTop: 5,
  },
  bathroomsText: {
    marginTop: 5,
  },
  sqftText: {
    marginTop: 5,
  },
  priceText: {
    marginTop: 5,
    fontWeight: 'bold',
  },
  
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
        marginTop:100

  },
  amenityContainer: {
    marginVertical: 20,
  },
  amenityText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    alignItems:"center",
    textAlign:"center",
    color:"#2356E8"
  },
  amenitybutton:{
    borderWidth:0.5,
    alignItems:"center",
    width:425,
    height:55,
    backgroundColor:"white",
    borderColor:"black",

  },

  gymtext:{
       fontSize: 26,
    marginTop:"4%",
    color:"#2356E8",
    fontWeight:"bold",
    marginRight:"5%"
  },
  dumbellimage:{
    marginTop:"-49%",
    height:"23%",
    width:75,
    marginLeft:8
  }, 
  poolimage:{
     marginTop:"0%",
    height:"10%",
    width:65,
    marginLeft:12
  },
  cigarimage:{
    height:"10%",
    width:55,
    marginLeft:8,
    marginTop:"5%"
  },
  back:{
    marginTop:-55,
    fontSize:20,
    marginRight:300,
     fontWeight: 'bold',
    color: 'blue',
  },
  back1:{
    marginTop:-5,
    fontSize:20,
    marginRight:250,
     fontWeight: 'bold',
    color: 'blue',
  }
  
});

export default App;
