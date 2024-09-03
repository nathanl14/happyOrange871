import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import database from '../firebase';

const WatchStore = () => {
  const navigation = useNavigation();
  const navback = () => {
    navigation.navigate('BottomNavigator');
  };

 
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filter, setFilter] = useState(null);
  const [sort, setSort] = useState('highest');
  const [shuffledItems, setShuffledItems] = useState([]);

  const items = [
    { id: 1, name: 'Watch', brand: 'Opple Series 8', price: 500, type: 'watch',style:3, image: require('../assets/applewatch.png') },
    { id: 2, name: 'Luxury Watch', brand: 'Timex Submariner', price: 15000, type: 'watch', style:6, image: require('../assets/rolex.png') },
    { id: 3, name: 'Luxury Watch', brand: 'Timex Datejust', price: 12000, type: 'watch', style:5, image: require('../assets/rolex.png') },
    { id: 4, name: 'Luxury Watch', brand: 'Timex Daytona', price: 30000, type: 'watch', style:7, image: require('../assets/rolex.png') },
    { id: 5, name: 'Luxury Watch', brand: 'Timex Presidential', price: 20000, type: 'watch', style:6, image: require('../assets/rolex.png') },
    { id: 6, name: 'Luxury Watch', brand: 'Ricky MIllie McLaren', price: 1200000, type: 'watch', style:9, image: require('../assets/richardmillie.png') },
    { id: 7, name: 'Luxury Watch', brand: 'Ricky MIllie Nadal', price: 220000, type: 'watch', style:8, image: require('../assets/richardmillie.png') },
    { id: 8, name: 'Luxury Watch', brand: 'Ricky MIllie Ferrari', price: 2000000, type: 'watch', style:10, image: require('../assets/richardmillie.png') },
    { id: 9, name: 'Formal Suit', brand: 'Suit', price: 400, type: 'suit', style:3,image: require('../assets/regsuit.png') },
    { id: 10, name: 'Formal Suit', brand: 'Dulca & Jabanna', price: 4000, type: 'suit', style:8,image: require('../assets/reg2suit.png') },
    { id: 11, name: 'Luxury Suit', brand: 'Arwani', price: 45000, type: 'suit', style:10,image: require('../assets/luxsuit.png') },
    { id: 12, name: 'Luxury Suit', brand: 'Arwani', price: 25000, type: 'suit', style:9,image: require('../assets/luxsuit.png') },
    { id: 14, name: 'Glasses', brand: 'Ray-Bon', price: 200, type: 'glasses',style:6, image: require('../assets/rayban.png') },
    { id: 15, name: 'Luxury Glasses', brand: 'Carterier', price: 6000, type: 'glasses',style:9, image: require('../assets/cartier.png') },
      { id: 16, name: 'Luxury Glasses', brand: 'Carterier', price: 8000, type: 'glasses',style:10, image: require('../assets/cartier.png') },
    { id: 17, name: 'Leather Dress Shoes', brand: 'Clarks', price: 120, type: 'shoes' ,style:5, image: require('../assets/brownshoes.png') },
        { id: 18, name: 'Leather Dress Shoes', brand: 'Arwani', price: 3000, type: 'shoes' ,style:10, image: require('../assets/blackshoes.png') },

    // Add more items here...
  ]


  const handleItemPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };
  useEffect(() => {
    // Shuffle the items array when the component mounts or when the filter changes
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setShuffledItems(shuffled.slice(0, 5)); // Select the first 5 items
  }, [filter]);


const handleBuyNow = () => {
 if (selectedItem) {
      // Save the selected house to the database
      if(selectedItem.type==='suit'){
      database
        .ref('suits')
        .push(selectedItem) // Assuming your database structure supports adding houses
        .then(() => {
          // House added successfully to the database
          alert('suit added to database');
        })
      }



        if(selectedItem.type==='watch'){
      database
        .ref('watch')
        .push(selectedItem) // Assuming your database structure supports adding houses
        .then(() => {
          // House added successfully to the database
          alert('watch added to database');
        })
      }


        if(selectedItem.type==='shoes'){
      database
        .ref('shoes')
        .push(selectedItem) // Assuming your database structure supports adding houses
        .then(() => {
          // House added successfully to the database
          alert('shoes added to database');
        })
      }

        if(selectedItem.type==='glasses'){
      database
        .ref('glasses')
        .push(selectedItem) // Assuming your database structure supports adding houses
        .then(() => {
          // House added successfully to the database
          alert('glasses added to database');
        })
      }
    }

};


   
  const renderItem = ({ item }) => {
    if (filter && item.type !== filter) return null;
    return (
      <TouchableOpacity onPress={() => handleItemPress(item)}>
        <View style={styles.itemContainer}>
          <Image source={item.image} style={styles.itemImage} />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.brandText}>{item.brand}</Text>
            <Text style={styles.priceText}>Price: ${item.price.toLocaleString()}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderModal = () => {
    if (!selectedItem) return null;
    return (
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.itemName}>{selectedItem.name}</Text>
          <Text style={styles.brandText}>{selectedItem.brand}</Text>
          <Text style={styles.priceText}>Price: ${selectedItem.price.toLocaleString()}</Text>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleBuyNow()}>
            <Text style={styles.buyText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </Modal> 
    );
  };

  const filteredItems = items.filter((item) => !filter || item.type === filter);
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sort === 'highest') return b.price - a.price;
    if (sort === 'lowest') return a.price - b.price;
    return 0;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Clothing & Jewelry Store</Text>
      <View style={styles.filterContainer}>
        <Text style={styles.filterText}>Filter:</Text>
        <TouchableOpacity onPress={() => setFilter(null)}>
          <Text style={[styles.filterOption, !filter && styles.activeFilterOption]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('watch')}>
          <Text style={[styles.filterOption, filter === 'watch' && styles.activeFilterOption]}>Watches</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('suit')}>
          <Text style={[styles.filterOption, filter === 'suit' && styles.activeFilterOption]}>Suits</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('shoes')}>
          <Text style={[styles.filterOption, filter === 'shoes' && styles.activeFilterOption]}>Shoes</Text>
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
        data={shuffledItems}
        renderItem={renderItem}
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
    color: 'black',
  },
  activeFilterOption: {
    backgroundColor: 'blue',
    color: 'white',
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
    color: 'white',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F2F2F2',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  itemImage: {
    width: 70,
    height: 80,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1, 
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  brandText: {
    fontSize: 16,
  },
  priceText: {
    fontSize: 16,
    marginTop: 8,
    fontWeight: '600',
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

export default WatchStore;
