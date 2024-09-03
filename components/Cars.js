import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import database from "../firebase"

const CarDealership = () => {
  const navigation = useNavigation();
  const navback = () => {
    navigation.navigate('BottomNavigator');
  };

  const [modalVisible, setModalVisible] = useState(false);
    const [money, setMoney] = useState(0);

  const [selectedCar, setSelectedCar] = useState(null);
  const [filter, setFilter] = useState(null);
  const [sort, setSort] = useState('highest');

  const cars = [
    { id: 1, make: 'Toyota', model: 'Camry', year: 2021, price: 25000, color: 'white', type: 'sedan' },
    { id: 2, make: 'Honda', model: 'Civic', year: 2022, price: 22500, color: 'red', type: 'sedan' },
    { id: 3, make: 'Ford', model: 'Mustang', year: 2020, price: 40000, color: 'black', type: 'sports' },
    { id: 4, make: 'McLaren', model: '720S', year: 2023, price: 500000, color: 'yellow', type: 'sports' },
    { id: 5, make: 'Porsche', model: '911', year: 2023, price: 150000, color: 'blue', type: 'sports' },
    { id: 6, make: 'Lamborghini', model: 'Aventador', year: 2023, price: 800000, color: 'red', type: 'sports' },
    { id: 7, make: 'Lamborghini', model: 'Urus', year: 2023, price: 250000, color: 'red', type: 'suv' },
    { id: 8, make: 'Bugatti', model: 'Chiron', year: 2023, price: 3000000, color: 'black', type: 'sports' } 


  ];

  const handleCarPress = (car) => {
    setSelectedCar(car);
    setModalVisible(true);
  };
useEffect(() => {

     const moneyRef = database.ref('user/money');
    moneyRef.on('value', (snapshot) => {
      setMoney(snapshot.val());
    });

  }, []);
const handleBuyCar = () => {
    // Check if a house is selected
    if (selectedCar) {
      // Save the selected house to the database
      if(selectedCar.price<money){


    const newMoney = money - selectedCar.price;

    // Update the 'user/money' node in the database
    database
        .ref('user/money')
        .set(newMoney)
        .then(() => {
            console.log('Money updated successfully');
        })
      database
        .ref('cars')
        .push(selectedCar) // Assuming your database structure supports adding houses
        .then(() => {
          Alert.alert(
      'Success',
      `You Purchased ${selectedCar.make} ${selectedCar.model} For $${selectedCar.price.toLocaleString()}`,
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
      `You Cannot Buy This Car Because You Don't Have Enough Money`,
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
  const renderCarItem = ({ item }) => {
    if (filter && item.type !== filter) return null;
    return (
      <TouchableOpacity onPress={() => handleCarPress(item)}>
        <View style={styles.carContainer}>
          <Text style={styles.makeText}>{item.make}</Text>
          <Text style={styles.modelText}>{item.model}</Text>
          <Text style={styles.yearText}>Year: {item.year}</Text>
          <Text style={styles.priceText}>Price: ${item.price.toLocaleString()}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderModal = () => {
    if (!selectedCar) return null;
    return (
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.makeText}>{selectedCar.make}</Text>
          <Text style={styles.modelText}>{selectedCar.model}</Text>
          <Text style={styles.yearText}>Year: {selectedCar.year}</Text>
          <Text style={styles.priceText}>Price: ${selectedCar.price.toLocaleString()}</Text>
          <Text style={styles.colorText}>Color: {selectedCar.color}</Text>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleBuyCar()}>
            <Text style={styles.buyText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  const filteredCars = cars.filter((car) => !filter || car.type === filter);
  const sortedCars = [...filteredCars].sort((a, b) => {
    if (sort === 'highest') return b.price - a.price;
    if (sort === 'lowest') return a.price - b.price;
    return 0;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Car Dealership</Text>
      <View style={styles.filterContainer}>
        <Text style={styles.filterText}>Filter:</Text>
        <TouchableOpacity onPress={() => setFilter(null)}>
          <Text style={[styles.filterOption, !filter && styles.activeFilterOption]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('sports')}>
          <Text style={[styles.filterOption, filter === 'sports' && styles.activeFilterOption]}>Sports</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('suv')}>
          <Text style={[styles.filterOption, filter === 'suv' && styles.activeFilterOption]}>SUV</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('sedan')}>
          <Text style={[styles.filterOption, filter === 'sedan' && styles.activeFilterOption]}>Sedan</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sortContainer}>
        <Text style={styles.sortText}>Sort by:</Text>
        <TouchableOpacity onPress={() => setSort('highest')}>
          <Text style={[styles.sortOption, sort === 'highest' && styles.activeSortOption]}>Highest Price</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSort('lowest')}>
          <Text style={[styles.sortOption, sort === 'lowest' && styles.activeSortOption]}>Lowest Price</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={sortedCars}
        renderItem={renderCarItem}
        keyExtractor={(item) => item.id.toString()}
      />
      {renderModal()}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={navback} style={styles.backButton}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
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
    color: 'red',
    marginTop: 5,
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  filterOption: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#F2F2F2',
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  filterText: {
    marginRight: 10,
    fontWeight: 'bold',
    color:"black"
  },
  activeFilterOption: {
    backgroundColor: 'blue',
    color:"white"
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
        color:"white"

  },
  carContainer: {
    padding: 16,
    backgroundColor: '#F2F2F2',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  makeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modelText: {
    fontSize: 16,
  },
  yearText: {
    fontSize: 14,
  },
  priceText: {
    fontSize: 16,
    marginTop: 8,
    fontWeight: 'semi-bold',
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
  backButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  backButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CarDealership;
