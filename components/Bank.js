import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import database from '../firebase';

const ChaseHomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  const [balance, setBalance] = useState(-20);
  const [amount, setAmount] = useState('');
  const navigation = useNavigation();
  const [partners, setPartners] = useState([]); 






   useEffect(() => {
   
    const partnerRef = database.ref('partner');
    partnerRef.on('value', (snapshot) => {
      const partnerData = snapshot.val();
      if (partnerData) {
        setPartners(Object.values(partnerData)); // assuming partner data is an array of objects
      }
    });
  }, []);
  const handleTransfer = () => {
    // Assuming you want to show the modal with partner data
    setModalVisible2(true);
  };

  useEffect(() => {
    const moneyRef = database.ref('user/money');
    moneyRef.on('value', (snapshot) => {
      setBalance(snapshot.val());
    });
  }, []);

  const navback = () => {
    navigation.navigate('BottomNavigator');
  };
  const withdraw = () => {
    if (parseInt(amount) > balance) {
      alert('Insufficient funds');
    } else if (amount === '') {
      alert('Please enter an amount');
    } else {
      setBalance(balance - parseInt(amount));
      setAmount('');
      setModalVisible(false);
    }
  };

  const deposit = () => {
    if (amount === '') {
      alert('Please enter an amount');
    } else {
      setBalance(balance + parseInt(amount));
      setAmount('');
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerTextbutton}>
          <Text style={styles.headerText}>Khase Bank</Text>
          <TouchableOpacity onPress={navback} style={styles.backbutton}>
            <Text style={styles.backtext}>{'<'}</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      <View style={styles.bigviewwithaccountbalance}>
        <Image
          style={styles.bankimage}
          source={require('../assets/bankbackground.png')}
        />

        <View style={styles.smallviewwithaccountbalance}>
          <View style={styles.buttonscontainer}>
            <View style={styles.row}>
              <View style={styles.box1}>
                {
                  <TouchableOpacity
                    style={styles.withdrawButton}
                    onPress={() => setModalVisible(true)}>
                    <Text style={styles.buttonText}>Withdraw</Text>
                  </TouchableOpacity>
                }
              </View>

              <View style={styles.box2}>
                {
                  <TouchableOpacity
                    style={styles.depositButton}
                    onPress={() => setModalVisible(true)}>
                    <Text style={styles.buttonText}>Deposit</Text>
                  </TouchableOpacity>
                }
              </View>

              <View style={styles.box3}>
                {
                  <TouchableOpacity
                    style={styles.transferButton} 
                    onPress={handleTransfer}>
                    <Text style={styles.buttonText}>Transfer</Text>
                  </TouchableOpacity>
                }
              </View>
            </View>
          </View>
        </View>
        <Text style={styles.balanceAmount}>${balance.toLocaleString()}</Text>
      </View>

      <Text style={styles.balanceText}>Recent Transactions</Text>

      <Modal animationType="slide" visible={modalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Enter Amount:</Text>
          <TextInput
            style={styles.input}
            placeholder="$0.00"
            value={amount}
            onChangeText={(text) => setAmount(text)}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.withdrawButton} onPress={withdraw}>
            <Text style={styles.buttonText}>Withdraw</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.depositButton} onPress={deposit}>
            <Text style={styles.buttonText}>Deposit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View></View>

         <Modal animationType="slide" visible={modalVisible2}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Select Partner:</Text>
      {partners.map((partner, index) => (
        <View key={index} style={styles.partnerContainer}>
          <Image source={{ uri: partner.profileImage }} style={styles.profileImage} />
          <View style={styles.partnerInfo}>
            <Text style={styles.partnerName}>{partner.name}</Text>
            {/* Display other partner information here */}
          </View>
        </View>
      ))}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setModalVisible2(false)}>
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>
    </View>
  </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -480,
  },

  bigviewwithaccountbalance: {
    borderWidth: 1,
    borderColor: 'blue',
    height: '20%',
    width: '100%',
    marginTop: '-10%',
  },
  smallviewwithaccountbalance: {
    backgroundColor: 'white',
    height: '65%',
    width: '85%',
    marginTop: '-53%',
    alignSelf: 'center',
  },
  bankimage: {
    width: '100%',
    height: '100%',
  },

  box1: {
    width: 95,
    height: 50,
    borderColor: 'gray',
    borderTopWidth: 1,
    borderRightWidth: 1,
    marginTop: '34.5%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  box2: {
    width: 95,
    height: 50,
    borderColor: 'gray',
    borderTopWidth: 1,
    borderRightWidth: 1,
    marginTop: '34.5%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  box3: {
    width: 95,
    height: 50,
    borderColor: 'gray',
    borderTopWidth: 1,
    marginTop: '34.5%',
    alignSelf: 'center',
    justifyContent: 'center',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: '5%',
  },

  backbutton: {
    marginLeft: '-22%',
    marginTop: '-12%',
  },
  backtext: {
    fontSize: 40,
    color: 'white',
  },
  header: {
    backgroundColor: '#1A43BF',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    height: '17%',
  },
  headerText: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
  },
  headerTextbutton: {
    marginTop: '30%',
  },
  balanceText: {
    fontSize: 20,
    marginTop: 30,
    marginRight: '53%',
    color: 'gray',
  },
  balanceAmount: {
    fontSize: 28,
    marginTop: '-30%',
    marginLeft: '40%',
  },
  withdrawButton: {
    marginBottom: '10%',
  },
  depositButton: {
    marginBottom: '10%',
  },
  transferButton: {
    marginBottom: '10%',
  },
  buttonText: {
    color: 'blue',
    fontSize: 18,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#2196f3',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});

export default ChaseHomeScreen;
