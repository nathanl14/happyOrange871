import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  Alert,
  Image
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import database from '../firebase';

let jobs = [
  {
    id: '1',
    title: 'Call Center Representative',
    wage: 15,
    spendenergy: 25,
  },
  {
    id: '2',
    title: 'Omazon Delivery Driver',
    wage: 18,
    spendenergy: 30,
  },
  {
    id: '3',
    title: 'DashDoor Delivery Driver',
    wage: 13,
    spendenergy: 20,
  },
  {
    id: '4',
    title: 'Retail Sales Associate',
    wage: 12,
    spendenergy: 25,
  },
  {
    id: '5',
    title: 'Web Developer',
    wage: 20,
    spendenergy: 40,
  },
  {
    id: '6',
    title: 'Graphic Designer',
    wage: 17,
    spendenergy: 35,
  },
  {
    id: '7',
    title: 'Data Analyst',
    wage: 19,
    spendenergy: 40,
  },
  {
    id: '8',
    title: 'Marketing Manager',
    wage: 16,
    spendenergy: 30,
  },
  {
    id: '9',
    title: 'Accountant',
    wage: 14,
    spendenergy: 30,
  },
  {
    id: '10',
    title: 'Customer Service Representative',
    wage: 13,
    spendenergy: 25,
  },
  {
    id: '11',
    title: 'Software Engineer',
    wage: 20,
    spendenergy: 40,
  },
  {
    id: '12',
    title: 'Nurse',
    wage: 18,
    spendenergy: 35,
  },
  {
    id: '13',
    title: 'Electrician',
    wage: 16,
    spendenergy: 30,
  },
  {
    id: '14',
    title: 'Chef',
    wage: 14,
    spendenergy: 25,
  },
  {
    id: '15',
    title: 'Plumber',
    wage: 17,
    spendenergy: 30,
  },
];


const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState({});
  const [appliedJob, setAppliedJob] = useState(null);
  const [visibleJobs, setVisibleJobs] = useState([]);
  const [currentJobModalVisible, setCurrentJobModalVisible] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

    useEffect(() => {
    // Fetch applied job from the database when component is focused
    if (isFocused) {
      fetchAppliedJob();
      loadRandomJobs();
    }
  }, [isFocused]);

const goback= ()=>{
navigation.navigate("BottomNavigator")
}
  const fetchAppliedJob = () => {
    // Fetch applied job from the database here
    database.ref('appliedJob').once('value', (snapshot) => {
      const job = snapshot.val();
      setAppliedJob(job);
    });
  };

  useEffect(() => {
    if (appliedJob) {
    }
  }, [appliedJob]);

  const loadRandomJobs = () => {
    // Display 5 random jobs from the jobs array, excluding the applied job
    const filteredJobs = jobs.filter(job => job.id !== (appliedJob && appliedJob.id));
    const randomIndices = Array.from({ length: 5 }, () =>
      Math.floor(Math.random() * filteredJobs.length)
    );
    const randomJobs = randomIndices.map(index => filteredJobs[index]);
    setVisibleJobs(randomJobs);
  };

 
  const handleLoadMore = () => {
    // Load more jobs when "Load More" button is pressed
    const currentVisibleJobs = visibleJobs.length;
    const nextJobs = jobs.slice(
      currentVisibleJobs,
      currentVisibleJobs + 5
    );
    setVisibleJobs([...visibleJobs, ...nextJobs]);
  };

  const handleJobPress = (job) => {
    if (appliedJob) {
      Alert.alert(
        'Current Job',
        'You need to quit your current job before applying for a new one.'
      );
    } else {
      setSelectedJob(job);
      setModalVisible(true);
    }
  };

  const handleApply = () => {
    // Implement your apply logic here
    // For now, let's assume the job is successfully applied
    setAppliedJob(selectedJob);
    setModalVisible(false);
    Alert.alert('Success', `You Have Been Accepted For The Job ${selectedJob.title}`);

    // Store the applied job in the database
    database.ref('appliedJob').set(selectedJob);
  };

  const handleQuitJob = () => {
    // Remove the applied job from the database
    database.ref('appliedJob').remove();

    // Clear the appliedJob state
    setAppliedJob(null);
    setCurrentJobModalVisible(false);
  };

  const renderJobItem = ({ item }) => {
    return (
      <View style={styles.jobBox}>
        <TouchableOpacity onPress={() => handleJobPress(item)}>
          <View>
            <Text style={styles.jobTitle}>{item.title}</Text>
          </View>
          <View>
            <Text style={styles.jobWage}>Wage: ${item.wage}/hour</Text>
          <Image style={styles.spendEnergy} source={require('../assets/energyicon.png')} /> 
          <Text style={styles.spendEnergynumbertext}>: {item.spendenergy}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goback}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Job Listings</Text>
      </View>
      {appliedJob && (
        <View style={styles.currentJobSection}>
          <TouchableOpacity
            style={styles.currentJobButton}
            onPress={() => setCurrentJobModalVisible(true)}
          >
            <Text style={styles.currentJobButtonText}>
              Current Job: {appliedJob.title}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.jobList}>
        <FlatList
          data={visibleJobs}
          renderItem={renderJobItem}
          keyExtractor={(item) => item.id.toString()}
        />
     
      </View>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        {/* Modal content */}
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{selectedJob.title}</Text>
          <Text style={styles.modalWage}>
            Wage: ${selectedJob.wage}/hour
          </Text>
          <Text style={styles.modalSpendEnergy}>
            Energy Cost Per Week: {selectedJob.spendenergy}
          </Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={handleApply}
          >
            <Text style={styles.modalButtonText}>Apply</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton2}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        visible={currentJobModalVisible}
        onRequestClose={() => setCurrentJobModalVisible(false)}
      >
        {/* Current job modal content */}
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            Current Job: {appliedJob ? appliedJob.title : ''}
          </Text>
          <Text style={styles.modalWage}>
            Wage: {appliedJob ? `$${appliedJob.wage}/hour` : ''}
          </Text>
          <Text style={styles.modalSpendEnergy}>
            Energy Cost Per Week: {appliedJob ? appliedJob.spendenergy : ''}
          </Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={handleQuitJob}
          >
            <Text style={styles.modalButtonText}>Quit Job</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton2}
            onPress={() => setCurrentJobModalVisible(false)}
          >
            <Text style={styles.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  backButton: {
    backgroundColor: '#3246EB',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  currentJobSection: {
    backgroundColor: '#FFFF00',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  currentJobText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  jobList: {
    flex: 1,
  },
  jobBox: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    elevation: 3,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  jobWage: {
    fontSize: 14,
    color: '#666',
  },
  loadMoreButton: {
    backgroundColor: '#3246EB',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  loadMoreButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#444444',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFF00',
  },
  modalWage: {
    fontSize: 18,
    marginBottom: 20,
    color: '#FFFFFF',
  },
  modalButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButton2: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
    spendEnergy: {
    color: '#666',
    height:40,
    width:40,
  },
  spendEnergynumbertext:{
marginTop:-40,
marginLeft:"10.5%",
fontSize:30,

  },
  currentJobSection: {
    backgroundColor: '#FFFF00',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  currentJobButton: {
    backgroundColor: '#3246EB',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  currentJobButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalSpendEnergy: {
    fontSize: 18,
    marginBottom: 20,
    color: '#FFFFFF',
  },
});

export default App;