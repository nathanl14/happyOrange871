import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet,Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import database from '../firebase';

const CaliforniaHouses = () => {
  const navigation = useNavigation();
  const navback = () => {
    navigation.navigate('BottomNavigator');
  };



const handleBuyNow = () => {
    // Check if a house is selected
    if (selectedHouse) {
      // Save the selected house to the database
      if(selectedHouse.price<money){
      database
        .ref('houses')
        .push(selectedHouse) // Assuming your database structure supports adding houses
        .then(() => {
          Alert.alert(
      'Success',
      `You Purchased ${selectedHouse.address} For ${selectedHouse.price.toLocaleString()}`,
       [
          {
            text: 'Ok',
            onPress: () => setModalVisible(false),
          },
         
        ]
    );
        })
      }else{
Alert.alert(
      'No Cash',
      `You Cannot Buy This House Because You Don't Have Enough Money`,
       [
          {
            text: 'Ok',
            onPress: () => setModalVisible(false),
          },
         
        ]
    );
      }
        
    }
    setModalVisible(false);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState(null);
    const [money, setMoney] = useState(0); 

  const [filter, setFilter] = useState(null);
  const [sort, setSort] = useState(null);


   useEffect(() => {

     const moneyRef = database.ref('user/money');
    moneyRef.on('value', (snapshot) => {
      setMoney(snapshot.val());
    });

  }, []);

  const houses = [
    { id: 1, bedrooms: 3, bathrooms: 2, sqft: 1500, price: 350000, address: '123 Main St', type: "Condo",pool:350000 * 0.02, poolactive:"false", gym:"false", cigarLounge:"false"  },
    { id: 2, bedrooms: 2, bathrooms: 1, sqft: 1000, price: 250000, address: '456 Oak Ave', type: "Condo",pool:"false", gym:"false", cigarLounge:"false" },
    { id: 3, bedrooms: 4, bathrooms: 3, sqft: 2500, price: 550000, address: '754 Maple Ln', type: "Single-Family Home",pool:"false", gym:"false", cigarLounge:"false" },
    { id: 4, bedrooms: 4, bathrooms: 3, sqft: 2500, price: 550000, address: '719 Maple Ln', type: "Single-Family Home",pool:"false", gym:"false",cigarLounge:"false" },
    { id: 5, bedrooms: 6, bathrooms: 5, sqft: 5000, price: 3000000, address: '789 Maple Ln', type: "Mansion",pool:"false", gym:"false", cigarLounge:"false" },
    { id: 6, bedrooms: 3, bathrooms: 2, sqft: 1800, price: 390000, address: '234 Elm St', type: "Condo" ,pool:"false", gym:"false", cigarLounge:"false"},
    { id: 7, bedrooms: 5, bathrooms: 4, sqft: 3200, price: 780000, address: '567 Pine Ave', type: "Single-Family Home",pool:"false", gym:"false", cigarLounge:"false" },
    { id: 8, bedrooms: 2, bathrooms: 2, sqft: 1200, price: 280000, address: '678 Cedar Rd', type: "Condo",pool:"false", gym:"false", cigarLounge:"false" },
    { id: 9, bedrooms: 4, bathrooms: 3, sqft: 2800, price: 610000, address: '432 Oak Ave', type: "Single-Family Home",pool:"false", gym:"false", cigarLounge:"false" },
    { id: 10, bedrooms: 7, bathrooms: 6, sqft: 6000, price: 3500000, address: '987 Maple Ln', type: "Mansion",pool:"false", gym:"false", cigarLounge:"false" },
    { id: 11, bedrooms: 2, bathrooms: 2, sqft: 1500, price: 800000, address: '321 Ocean Blvd', type: "Penthouse",pool:"false", gym:"false", cigarLounge:"false" },
  ];

  const handleHousePress = (house) => {
    setSelectedHouse(house);
    setModalVisible(true);
  };

  const renderHouseItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleHousePress(item)}>
        <View style={styles.houseContainer}>
          <Text style={styles.addressText}>Address: {item.address}</Text>
          <Text style={styles.bedroomsText}>Bedrooms: {item.bedrooms}</Text>
          <Text style={styles.bathroomsText}>Bathrooms: {item.bathrooms}</Text>
          <Text style={styles.sqftText}>Sq Ft: {item.sqft}</Text>
          <Text style={styles.priceText}>Price: ${item.price.toLocaleString()}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderModal = () => {
    if (!selectedHouse) return null;
    return (
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.addressText}>Address: {selectedHouse.address}</Text>
          <Text style={styles.bedroomsText}>Bedrooms: {selectedHouse.bedrooms}</Text>
          <Text style={styles.bathroomsText}>Bathrooms: {selectedHouse.bathrooms}</Text>
          <Text style={styles.sqftText}>Sq Ft: {selectedHouse.sqft}</Text>
          <Text style={styles.priceText}>Price: ${selectedHouse.price.toLocaleString()}</Text>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        

           <TouchableOpacity onPress={handleBuyNow}>
      <Text style={styles.buyText}>Buy Now</Text>
    </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  const filterHouses = (type) => {
    setFilter(type);
  };

  const sortHouses = (option) => {
    setSort(option);
  };

  // Apply filters and sorting
  let filteredHouses = houses;
  if (filter) {
    filteredHouses = houses.filter((house) => house.type === filter);
  }

  if (sort === 'highest') {
    filteredHouses.sort((a, b) => b.price - a.price);
  } else if (sort === 'lowest') {
    filteredHouses.sort((a, b) => a.price - b.price);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Zillaw</Text>
      <View style={styles.filterContainer}>
        <Text style={styles.filterText}>Filter:</Text>
        <TouchableOpacity
          style={[styles.filterOption, filter === null && styles.activeFilterOption]}
          onPress={() => filterHouses(null)}
        >
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterOption, filter === 'Mansion' && styles.activeFilterOption]}
          onPress={() => filterHouses('Mansion')}
        >
          <Text>Mansion</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterOption, filter === 'Single-Family Home' && styles.activeFilterOption]}
          onPress={() => filterHouses('Single-Family Home')}
        >
          <Text>Single Family</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterOption, filter === 'Condo' && styles.activeFilterOption]}
          onPress={() => filterHouses('Condo')}
        >
          <Text>Condo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterOption, filter === 'Penthouse' && styles.activeFilterOption]}
          onPress={() => filterHouses('Penthouse')}
        >
          <Text>Penthouse</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sortContainer}>
        <Text style={styles.sortText}>Sort by:</Text>
        <TouchableOpacity
          style={[styles.sortOption, sort === 'highest' && styles.activeSortOption]}
          onPress={() => sortHouses('highest')}
        >
          <Text>Highest</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortOption, sort === 'lowest' && styles.activeSortOption]}
          onPress={() => sortHouses('lowest')}
        >
          <Text>Lowest</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredHouses}
        renderItem={renderHouseItem}
        keyExtractor={(item) => item.id.toString()}
      />
      {renderModal()}
      <TouchableOpacity onPress={navback} style={styles.button}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
    marginTop: 5,
    textAlign: 'center',
  },
 filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
    flexWrap: 'wrap', // Add this line
  },
  filterOption: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#F2F2F2',
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8, // Add this line
  },
  filterText: {
    marginRight: 10,
    fontWeight: 'bold',
  },
 
  activeFilterOption: {
    backgroundColor: 'blue',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sortText: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  sortOption: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
  activeSortOption: {
    backgroundColor: 'blue',
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
  },
  cancelText: {
    marginTop: 20,
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buyText: {
    marginTop: 10,
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CaliforniaHouses;
