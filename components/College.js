import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import database from '../firebase';
const { width, height } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';

const boyFirstNames = ['John', 'Michael', 'David', 'Daniel', 'William'];
const girlFirstNames = ['Jane', 'Sarah', 'Emily', 'Olivia', 'Sophia'];
const lastNames = ['Smith', 'Johnson', 'Brown', 'Davis', 'Lee', 'Garcia', 'Wilson', 'Lopez', 'Harris', 'Jackson'];

const getRandomClassmates = () => {
  const classmates = [];
  for (let i = 0; i < 10; i++) {
    const isGirl = Math.random() < 0.5; // 50% chance of being a girl
    const genderFirstNames = isGirl ? girlFirstNames : boyFirstNames;
    const gender = isGirl ? 'Girl' : 'Boy'; // Added gender selection
    const firstName = genderFirstNames[Math.floor(Math.random() * genderFirstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    classmates.push({
      id: i + 1, // Unique ID for each classmate
      gender,
      name: `${firstName} ${lastName}`,
      relationshipStat:50
    });
  }
  return classmates;
};



const colleges = [
  {
    id: '1',
    name: 'Acting Academy NYC',
    bio: 'Located in the heart of New York City, Acting Academy NYC offers comprehensive acting programs, covering various techniques such as method acting, improvisation, and voice training. Join us to refine your skills and showcase your talent on Broadway.',
    logo: 'AA',
    tuition: 40000,
    color: '#FFD700',
    credits: 0,
  },
  {
    id: '2',
    name: 'Hollywood Drama School',
    bio: 'Immerse yourself in the world of acting at Hollywood Drama School. Our intensive training programs provide hands-on experience in film and television acting, scene study, and script analysis. Discover your true potential in the entertainment capital of the world.',
    logo: 'HDS',
    tuition: 32500,
    color: '#FF4500',
    credits: 0,
  },
  {
    id: '3',
    name: 'Los Angeles Stage Performers Institute',
    bio: 'At Los Angeles Stage Performers Institute, we focus on stage acting and performance. Our expert faculty will guide you through classical and contemporary theater techniques, monologue preparation, and ensemble work. Join us to shine on the grand stages of Los Angeles.',
    logo: 'LASPI',
    tuition: 29500,
    color: '#00CED1',
    credits: 0,
  },
  {
    id: '4',
    name: 'New York School of Acting',
    bio: "The New York School of Acting offers a well-rounded curriculum that covers acting for stage, film, and television. With our state-of-the-art facilities and industry-experienced instructors, you'll gain the skills and confidence to excel in any acting medium.",
    logo: 'NYSA',
    tuition: 33000,
    color: '#800080',
    credits: 0,
  },
  {
    id: '5',
    name: 'Hollywood Acting Institute',
    bio: 'Discover the art of acting at the prestigious Hollywood Acting Institute. Our immersive programs combine traditional acting techniques with on-camera training, preparing you for success in both stage and screen.',
    logo: 'HAI',
    tuition: 43000,
    color: '#FF8C00',
    credits: 0,
  },
  {
    id: '6',
    name: 'Los Angeles Acting Academy',
    bio: 'Polish your acting skills at the Los Angeles Acting Academy. Our industry-oriented curriculum focuses on practical training, audition techniques, and professional networking. Prepare yourself for the competitive world of acting with our guidance.',
    logo: 'LAAA',
    tuition: 30500,
    color: '#4682B4',
    credits: 0,
  },
];

const CollegeCard = ({ college, onPress }) => (
  <TouchableOpacity
    style={[styles.collegeCard, { backgroundColor: college.color }]}
    onPress={onPress}>
    <Text style={styles.collegeLogo}>{college.logo}</Text>
    <Text style={styles.collegeName}>{college.name}</Text>
  </TouchableOpacity>
);

const ClassmatesModal = ({ classmates, onClose }) => (
  <Modal visible={true} animationType="slide" transparent={true}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.classmatesTitle}>Classmates</Text>
        {classmates.map((classmate, index) => (
          <Text key={index} style={styles.classmateName}>
            {classmate.gender}: {classmate.name}
             <View
              style={{
                height: 10,
                width: `${classmate.relationshipStat}%`,
                backgroundColor: 'green',
                borderRadius: 5,
              }}
            />
          </Text>
        ))}
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);


const App = () => {
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [collegeJoined, setCollegeJoined] = useState(false);
  const [joinedCollegeData, setJoinedCollegeData] = useState(null);
  const [showClassmatesModal, setShowClassmatesModal] = useState(false);
  const [classmates, setClassmates] = useState([]);

  const navigation = useNavigation();

  const backnav = () => {
    navigation.navigate('BottomNavigator');
  };

  const handleCollegePress = (college) => {
    setSelectedCollege(college);
  };

  const handleModalClose = () => {
    setSelectedCollege(null);
  };

  const handleBackButtonPress = () => {
    // Handle back button press
  };

  const handleQuestionMarkButtonPress = () => {
    // Handle question mark button press
  };

  useEffect(() => {
    const collegeCheckRef = database.ref('collegecheck');
    collegeCheckRef.once('value', (snapshot) => {
      setCollegeJoined(snapshot.val());
    });

    const joinedCollegeRef = database.ref('joinedCollegeData');
    joinedCollegeRef.once('value', (snapshot) => {
      setJoinedCollegeData(snapshot.val());
    });

    if (collegeJoined) {
      const randomClassmates = getRandomClassmates();
      setClassmates(randomClassmates);
    }
  }, [collegeJoined]);

  const handleJoinCollege = () => {
    if (selectedCollege) {
      database.ref('colleges').child(selectedCollege.id).set(selectedCollege);
      database.ref('joinedCollegeData').set(selectedCollege);
      setCollegeJoined(true);
      database.ref('collegecheck').set(true);

      setJoinedCollegeData(selectedCollege);
    }
  };

  const handleActivityPress = (activity) => {
    Alert.alert(
      'Activity Completed',
      `You completed the ${activity} activity.`
    );
  };

  const handleViewClassmates = () => {
    setShowClassmatesModal(true);
    
    const classmatesData = getRandomClassmates();
      classmatesData.forEach((classmate) => {
        database.ref('classmates').child(classmate.id).set(classmate);
      });
    
  };

  if (collegeJoined === true) {
    return (
      <View
        style={[
          styles.container2,
          { backgroundColor: joinedCollegeData?.color },
        ]}>
        <TouchableOpacity style={styles.logobutton}>
          <Text
            style={[
              styles.joinedCollegeLogo,
              { color: joinedCollegeData?.color },
            ]}>
            {joinedCollegeData?.logo}
          </Text>
        </TouchableOpacity>
        <Text style={[styles.joinedCollegeName, { color: '#fff' }]}>
          {joinedCollegeData?.name}
        </Text>
        <Text style={[styles.joinedCollegeBio, { color: '#fff' }]}>
          {joinedCollegeData?.bio}
        </Text>
        <Text style={[styles.joinedCollegeTuition, { color: '#fff' }]}>
          {joinedCollegeData?.tuition}
        </Text>
        <TouchableOpacity
          onPress={() => handleActivityPress('Script Study')}
          style={styles.activityButton}>
          <Text style={styles.activityButtonText}>Script Studying</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleActivityPress('Memorization')}
          style={styles.activityButton}>
          <Text style={styles.activityButtonText}>Memorization</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleActivityPress('Improvisation')}
          style={styles.activityButton}>
          <Text style={styles.activityButtonText}>Improvisation</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleViewClassmates}
          style={styles.activityButton}>
          <Text style={styles.activityButtonText}>Classmates</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={backnav}>
            <Text style={styles.back1}>Back</Text>
          </TouchableOpacity>
        </View>
        {showClassmatesModal && (
          <ClassmatesModal
            classmates={classmates}
            onClose={() => setShowClassmatesModal(false)}
          />
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={backnav} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Choose a Program to join</Text>
        <TouchableOpacity
          onPress={handleQuestionMarkButtonPress}
          style={styles.questionButton}>
          <Text style={styles.questionButtonText}>?</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {colleges.map((college) => (
          <CollegeCard
            key={college.id}
            college={college}
            onPress={() => handleCollegePress(college)}
          />
        ))}
      </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    width: width,
  },
  backButton: {
    padding: 10,
    marginTop: '20%',
  },
  container2: {
    flex: 1,
  },
  back1: {
    fontSize: 20,
    marginTop: -530,
    marginLeft: 340,
    fontWeight: 'bold',
    color: 'blue',
  },
  joinedCollegeName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  joinedCollegeBio: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  joinedCollegeTuition: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
  },
  joinedCollegeLogo: {
    fontSize: 40,

    textAlign: 'center',
  },
  logobutton: {
    borderRadius: 50,
    width: 150,
    marginTop: '20%',
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  questionButton: {
    padding: 10,
    marginTop: '8%',
  },
  questionButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  collegeCard: {
    width: width - 40,
    height: 150,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  collegeLogo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  collegeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  modalContent: {
    width: width - 40,
    height: height - 80,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  collegeBio: {
    marginBottom: 10,
    textAlign: 'center',
  },
  collegeTuition: {
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  activityButton: {
    padding: 10,
    marginTop: '0.2%',
    height: 70,
    borderRadius: 5,
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.7,
    borderColor: 'blue',
  },
  activityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  classmatesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  classmateName: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default App;
