import React, { useState,  } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { atom, useAtom } from 'jotai';
import { skinatom } from './Character';
import database from '../firebase';
 import  { useEffect } from 'react';

export const followersatom = atom(500);



const Instagram = () => {
  const Card = ({ title, onPress, person }) => (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image style={styles.profileImage} source={person?.profileImage} />
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity> 
  );
  
 const navback = () => {
    navigation.navigate('BottomNavigator');    
  };



  const ModalContent = ({ person, visible, onClose,}) => {
    if (!person) {
      return null; // Return null if person is null
    }





     const follow = () => {
        if (person.relationship >= 50) {
    // Add the person to the "relationships" section of the database
    database.ref(`relationships/${person.name}`).set(person);
  }
  if (selectedPerson) {
    const updatedPeople = people.map((person) => {
      if (person.name === selectedPerson.name) {
        return { ...person, following: true };
      }
      return person;
    });


    setSelectedPerson({ ...selectedPerson, following: true });


    // Update the following status for the selected person in the database
    database.ref(`people/${selectedPerson.name}`).set({ ...selectedPerson, following: true });


    // Update the people list in the state
    setPeople(updatedPeople);
  }
};

 
    return (
      <Modal visible={visible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.profileContainer}>
              <Text style={styles.profileName}>{person.name}</Text>
            </View>

    
            <Image style={styles.igcircle} source={require('../assets/igcircle.png')} />

            <Text style={styles.posts}>Posts</Text>

            <Text style={styles.followers}>Followers</Text>


            
            <Text style={styles.following}>Following</Text>

            <View>
               <TouchableOpacity onPress={follow} style={[styles.followbutton, person.following && styles.followButtonGray]}>
              <Text style={styles.followtext}>
                {person.following ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>

            

              <TouchableOpacity style={styles.u}>
                <Text style={styles.whotofollowtext}> Who To Follow</Text>
              </TouchableOpacity>
            </View>

            <View>
              <Text style={styles.followersstyle}></Text>
            </View>

            <View>
              <Text style={styles.followersCount}>{person.followers.toLocaleString()}</Text>
            </View>

            <View>
              <Image source={person.profileImage} style={styles.actualprofileImage} />
            </View>

            <View style={styles.profileContainer}>
              <Text style={styles.profileName2}>{person.name}</Text>
            </View>
          </View>
                    
  <View>
<TouchableOpacity onPress={closeModal}>
<Image style={styles.backimage} source={require('../assets/arrow.png')} /> 
</TouchableOpacity>
</View> 



<View>
<TouchableOpacity style={styles.messagebutton}>
              <Text style={styles.followtext}>
              Message
              </Text>
            </TouchableOpacity>

</View>
        </View>
      </Modal>
    );
  };

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(true);
    const [postModalVisible, setPostModalVisible] = useState(true);

  const [modal2Visible, setModal2Visible] = useState(true);
  const [followingModalVisible, setFollowingModalVisible] = useState(false);

  const [selectedPerson, setSelectedPerson] = useState(null);

  const [skin, setSkin] = useAtom(skinatom);
  const [followers, setFollowers] = useAtom(followersatom);
const [peopleList, setPeopleList] = useState([]);


  const [selectedCategory, setSelectedCategory] = useState(null); 
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [caption, setCaption] = useState('');

  const [image, setImage] = useState(null); // Handle image upload
  



  useEffect(() => {

     
  fetchDataFromDatabase();
}, []);


const fetchDataFromDatabase = () => {
  // Fetch the people list from the database
  database.ref('people').once('value', (snapshot) => {
    const peopleData = snapshot.val();
    if (peopleData !== null) {
      const updatedPeople = people.map((person) => {
        const data = peopleData[person.name];
        if (data && data.following !== undefined) {
          return { ...person, following: data.following };
        }
        return person;
      });
      setPeople(updatedPeople);
    }
  });

  
  // Fetch the people list from the database
  database.ref('people').once('value', (snapshot) => {
    const peopleData = snapshot.val();
    if (peopleData) {
      const peopleList = Object.values(peopleData);
      setPeopleList(peopleList); // Update the people list state
    }
  });


};




 const handlePostScreen = () => {
    setPostModalVisible(true);
  };

  const handlePostPress = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setDropdownVisible(false);
  };

  const handleSubmitPost = () => {
    // Handle the post submission logic here
    setPostModalVisible(false);
    setSelectedCategory(null);
    setCaption('');
  };

  const categories = [
    { label: 'Glamour Shot', value: 'sexy_pic' },
    { label: 'Movie Trailer', value: 'trailer_post' },
    { label: 'Casting Announcement', value: 'casting_announcement' },
    { label: 'Selfie', value: 'selfie' },
    { label: 'Family Moment', value: 'family_photo' },
    { label: 'Cast Group Photo', value: 'cast_photo' },
    { label: 'Behind-the-Scenes Fun', value: 'funny_vid' },
  ];





  const [people,setPeople] = useState([
    { name: '@bryancranston', relationship:50, friend:false, followers: 5500000, following: false, profileImage: require('../assets/skin1.png') },
    { name: '@Vindiesel',relationship:0 ,friend:false, followers: 94000000, following: false, profileImage: require('../assets/skin2.png') },
    { name: '@therock',relationship:0 , friend:false,followers: 380000000, following: false, profileImage: require('../assets/skin3.png') },
    { name: '@terrycews',relationship:0 , friend:false,followers: 9700000, following: false, profileImage: require('../assets/skin4.png') },
    { name: '@mj',relationship:0 ,friend:false, followers: 11000000, following: false, profileImage: require('../assets/skin5.png') },
  ]);
const seewhoimfollowing = () => {
  // Retrieve the people data from the "people" section of the database
      setFollowingModalVisible(true);
  database.ref('people').once('value', (snapshot) => {
    const peopleData = snapshot.val();
    if (peopleData) {
      const peopleList = Object.values(peopleData);
      console.log(peopleList); // Display the people data in the console
            setModal2Visible(true);

      // You can do further processing or update the state with the people data as needed
    }
  });
};



  const FollowingModal = () => {
    return (
      <Modal visible={followingModalVisible} animationType="slide">
        <View style={styles.followingmodalcontainer}>
          <View style={styles.modalContent}>
            <Text>This is who I'm following</Text>

            {/* Add the content for the following list */}
             {peopleList.map((person, index) => (
            <Text key={index}>{person.name}</Text> // Display each person's name
          ))}

            <TouchableOpacity onPress={() => setFollowingModalVisible(false)} style={styles.closeButton}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };




  const showModal = (person) => {
    setModalVisible(true);
    setSelectedPerson(person);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPerson(null);
  };

  return (
    <View style={styles.container}>



      <Image style={styles.igcircle} source={require('../assets/igcircle.png')} />
          <View>
<TouchableOpacity onPress={navback}>
<Text style={styles.backtext}>BACK </Text>
</TouchableOpacity>
</View> 

      <Text style={styles.posts}>Posts</Text>

      <Text style={styles.followers}>Followers</Text>


        <TouchableOpacity style={styles.followingbutton} onPress={seewhoimfollowing}> 
      <Text style={styles.following1}>Following</Text>
        </TouchableOpacity>
  
      <View>
        <TouchableOpacity style={styles.editprofilebutton}>
          <Text style={styles.editprofiletext}> Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.u}>
          <Text style={styles.whotofollowtext}> Who To Follow</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.followersstyle}>{followers.toLocaleString()}</Text>
      </View>

      <View>
        <TouchableOpacity style={styles.skin1}>
          <Image style={styles.skinimage} source={require('../assets/skin4.png')} />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal>
        {people.map((person, index) => (
          <Card key={index} title={person.name} onPress={() => showModal(person)} person={person} />
        ))}
      </ScrollView>



<View style={styles.tabContainer}>
   
    <TouchableOpacity
  style={[styles.tabBox, { backgroundColor: 'black' }]}
  onPress={() => handlePostScreen()}
>
      <Image style={styles.tabBox} source={require('../assets/postimage.png')} />

</TouchableOpacity>

      <TouchableOpacity
        style={[styles.tabBox, { backgroundColor: 'green',  }]}
        onPress={() => handlePress('green')}
      >
        <Text style={styles.tabText}>Green</Text>
      </TouchableOpacity>
    
    </View>


 <Modal visible={postModalVisible} transparent animationType="slide">
      <View style={styles.postModalContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.postHeader}> New Post</Text>
                <View style={styles.whiteStrip}>

              
                </View>
          {/* Image Preview */}
          {image && (
            <Image source={{ uri: image }} style={styles.imagePreview} />
          )}

          <TextInput
            style={styles.captionInput}
            placeholder="Write a caption..."
            placeholderTextColor="#888"  
            value={caption}
            onChangeText={setCaption}
          />   
        
          
          <TouchableOpacity style={styles.postButton} onPress={handlePostPress}>
            <Text style={styles.postButtonText}>Choose Type Of Post</Text>
            

             <TouchableOpacity style={styles.arrow } onPress={handlePostPress}>
      <Image style={styles.arrowButtonText} source={require('../assets/grayArrow.png')} />
                 
          </TouchableOpacity>
          </TouchableOpacity>

          {dropdownVisible && (
            <View style={styles.dropdown}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.value}
                  style={styles.dropdownItem}
                  onPress={() => handleCategorySelect(category)}
                >
                  <Text style={styles.dropdownItemText}>{category.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {selectedCategory && (
            <Text style={styles.selectedCategory}>Selected: {selectedCategory.label}</Text>
          )}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitPost}>
            <Text style={styles.submitButtonText}>Post</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={() => setPostModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
 
<FollowingModal peopleList={peopleList} />

      <ModalContent person={selectedPerson} visible={modalVisible} onClose={closeModal} />



    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,     
    backgroundColor:"black"
  },
     tabContainer: {
    flexDirection: 'row', // Align children horizontally
    justifyContent: 'space-around', // Distribute space evenly
    alignItems: 'center',
    backgroundColor: 'black',
    paddingVertical: 10,
    borderTopWidth: 3,
    borderTopColor: '#373737',
    width:"115%",
    marginTop:"80%"
  },
  tabBox: {
    width: 80,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25, // Optional: Rounded corners

  },
  tabText: {
    color: 'white',
    fontWeight: 'bold', 
  },   
  skinimage: {
    height: 85,
    width: 85,
    marginVertical: -230, 
    marginRight: 272,
  },
  followersstyle: {
    marginVertical: -230,
    marginLeft: 70,
    fontSize: 15,
    fontWeight: 'bold',
    color:"white",
             

  },
  igcircle: { 
    height: 98, 
    width: 98,  
    marginLeft: -275,    
    marginTop: 80, 
  },
  editprofilebutton: {
    borderColor: 'gray', 
    marginTop: 100,
    borderWidth: 0.7,
    justifyContent: 'center',
    width: 380,
    height: 25,
  },
  editprofiletext: {
    textAlign: 'center',          
    color:"white"
  },
  posts: {
    marginRight: 90,
    marginVertical: -73,
    color:"white"
  },
  followers: {
    marginRight: -70,
    marginVertical: 55,
    flexDirection: 'column',
    color:"white" 
  },    
  following: {
    marginRight: -240,
    marginTop: -71,
  },
  following1:{
color:"white"     
  },  
  followingbutton:{


marginRight:-240,
marginTop:-70
  },
  whotofollowtext: {
    color: 'blue',
  },
  u: {
    marginTop: 50,
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    width: 125,
    height:150,
    alignItems: 'center'
  },
  cardText: {
    fontSize: 12.5,
    fontWeight: 'bold',
    marginTop:20
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height:50
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    height:1000
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
   height:90,
   width:90,
   marginTop:10     
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop:20
  },
  followersContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  followersCount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical:-240,
    marginLeft:65
  },
  followersText: {
    fontSize: 16,
    color: 'gray',
  },
  closeButton: {
    color: 'blue',
    fontSize: 16,
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  actualprofileImage:{
    marginVertical:-235,
    marginRight:272,
    height:90,
   width:90,

  },
  followbutton: {
    borderRadius:5,   
    marginTop: 100,
    width: 195,
    height: 30, 
    marginRight:200,
        backgroundColor:"#24a0ed",

  },
  messagebutton:{
  borderRadius:5,   
    marginVertical:-689,
    width: 195,
    height: 30,
    marginRight:-220,
        backgroundColor:"#949494",
  
  },
  followtext:{
    textAlign:"center",
    color:"white",
    height:28,
  borderRadius:20,
 marginTop:5
  },
  profileName2:{
    marginVertical:-300,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign:"center"
  },
   followButtonGray: {
    backgroundColor: "gray",
  },
    backimage: {

marginRight:350,  
    backgroundColor: 'white', 
    transform: [{ rotate: '180deg' }],
    width:30,
    height:30,
    marginVertical:-900
    
  },
  backtext:{
    marginVertical:-145,
    marginLeft:320,
    color:"White"    
  },




   postModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
  },
  whiteStrip:{
    backgroundColor:"white",
    height:"25%",
        width:"50%"

  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  postHeader: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#333',
  },
  captionInput: {
    width: '110%',
    backgroundColor: 'black',
    color: 'white',
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    height:"15%", 
    borderBottomWidth:0.25,
    borderBottomColor:"#242424"    
  },
  arrow:{
    marginLeft:"92%",
    marginTop:"-6%",
  },
   arrowButtonText: {
   height: 78, 
    width: 78,  
    marginLeft: "-140%",    
    marginTop: "-60%", 
  },
  postButton: {
  width: '110%',
    backgroundColor: 'black',
    color: 'white',
    fontSize: 16,
    height:"5%", 
    borderBottomWidth:0.25,
    borderBottomColor:"#242424"  
  },
  postButtonText: {
    color: 'white',
    fontSize: 15,
    marginLeft:"3.1%",
    fontWeight:0.5   
  },
  dropdown: {
    backgroundColor: '#444',
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
  },
  dropdownItem: {
    padding: 15,
    borderBottomColor: '#555',
    borderBottomWidth: 1,
  },
  dropdownItemText: {
    color: 'white',
    fontSize: 16,
  },
  selectedCategory: {
    color: '#f56040',
    fontSize: 18,
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: '#42a5f5',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  
  closeButtonText: {
    color: '#f56040',
    fontSize: 18,
    textAlign: 'center',
  },
});
export default Instagram;
