import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Modal, Image, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import database from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { atom, useAtom } from 'jotai'; 
      
const App = () => {
  const [car, setCars] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [money, setMoney] = useState(500000);
  
 const navigation = useNavigation();



  const backnav = () => {
    navigation.navigate('BottomNavigator');
  };

    const houses1 = [

    { id: 1, bedrooms: 3, bathrooms: 2, sqft: 1500, price: 350000, address: '123 Main St', type: "Condo", },

    ]
  useEffect(() => {
    // Fetch houses data from the database
    const carsRef = database.ref('cars');
    carsRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert the data object into an array
        const carsArray = Object.values(data);
        setCars(carsArray);
      }
    });

    // Clean up the database reference when component unmounts
    return () => carsRef.off('value');
  }, []);

  const handleCarPress = (car) => {
    setSelectedCar(car);
    setModalVisible(true);
  };



  const handleBackButtonPress = () => {
  setModalVisible(false);
};


  const renderCarItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleCarPress(item)}>
        <View style={styles.houseContainer}>
          <Text style={styles.addressText}>Make: {item.make}</Text>
          <Text style={styles.bedroomsText}>Model: {item.model}</Text>
          <Text style={styles.bathroomsText}>Type: {item.type}</Text>
          <Text style={styles.sqftText}>Year: {item.year}</Text>
          <Text style={styles.priceText}>Value: ${item.price.toLocaleString()}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderModal = () => {
    if (!selectedCar) return null;
    return (
      <Modal visible={modalVisible} animationType="slide">
      
        <View style={styles.modalContainer}>
        <View>
      <TouchableOpacity onPress={handleBackButtonPress}> 
            <Text style={styles.back}>Back</Text>
        </TouchableOpacity>
        </View>
        
 <Text style={styles.addressText}>Make: {item.make}</Text>
          <Text style={styles.bedroomsText}>Model: {item.model}</Text>
          <Text style={styles.bathroomsText}>Type: {item.type}</Text>
          <Text style={styles.sqftText}>Year: {item.car}</Text>
          <Text style={styles.priceText}>Value: ${item.price.toLocaleString()}</Text>

          

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
      <Text style={styles.header}>Car Shop</Text>
      <FlatList
        data={car}
        renderItem={renderCarItem}
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
    textAlign:"center"
  },
  amenitybutton:{
    borderWidth:1,
    alignItems:"center",
    width:405,
    height:55,
    backgroundColor:"#2356E8",
    borderColor:"black",

  },

  gymtext:{
       fontSize: 26,
    marginTop:"4%",
    color:"white",
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
