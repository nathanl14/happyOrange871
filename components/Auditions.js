import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
  Modal,
  Alert,
  Image,
} from 'react-native';
import database from '../firebase';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { atom, useAtom } from 'jotai';

let movies = [
  {
    id: '1',
    title: 'King Cobra Kai',
    genre: 'Drama',
    bio: 'An American martial arts comedy-drama television series that take place in Los Angeles, California ',
    section: 'metflix',
    actingLevel: 7 ,
    inprogress: false,
    weeksUntilRelease: 0,
    movierating: 0,
    salary: 1100000,
    popularity: 8,
    imbdrating: 0,
    metascore: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
    award:"",
    year:"",
    episodeweektracker:0,
     seasons: [
      {
        season1: false,
        episodes: [
          {
            episodeNumber: 1,
            viewership: 0,
          },
          {
            episodeNumber: 2,
            viewership: 0,
          },
          {
            episodeNumber: 3,
            viewership: 0,
          },
          {
            episodeNumber: 4,
            viewership: 0,
          },
           {
            episodeNumber: 5,
            viewership: 0,
          },
           {
            episodeNumber: 6,
            viewership: 0,
          },
           {
            episodeNumber: 7,
            viewership: 0,
          },
           {
            episodeNumber: 8,
            viewership: 0,
          },
           {
            episodeNumber: 9,
            viewership: 0,
          },
        ],
      },
      {
        seasonNumber: 2,
        episodes: [
          {
            episodeNumber: 1,
            viewership: 0,
          },
          {
            episodeNumber: 2,
            viewership: 0,
          },
          // ... other episodes of season 2
        ],
      },
      // ... other seasons
    ],
  },
  {
    id: '2',
    title: 'Euphourica',
    genre: 'Drama',
    bio: 'When  teenagers in the fictional town of East Highland, California,seek hope while balancing the strains of love, loss, highschool, and addiction.',
    section: 'hbo',
    actingLevel: 8.4,
    budget: 160000000,
    inprogress: false,
    weeksUntilRelease: 0,
    movierating: 0,
    salary: 1100000,
    popularity: 10,
    imbdrating: 0,
    metascore: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
    award:"",
    year:""

  },
  {
    id: '3',
    title: 'Unusual Things',
    genre: 'Horror',
    bio: 'in the 1980s. The nearby Laboratory performs scientific research for the United States but secretly experiments with the supernatural human test subjects.',
    section: 'metflix',
    actingLevel: 8.7,
    inprogress: false,
    weeksUntilRelease: 0,
    movierating: 0,
    salary: 1100000,
    popularity: 10,
    imbdrating: 0,
    metascore: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
    award:"",
    year:""

  },
  {
    id: '4',
    title: 'The Inner Banks',
    genre: 'Drama',
    bio: 'group of local teens in the Inner Banks of North Carolina. When a hurricane kills the power for the summer season, it sets off a chain of crazy events that force the friends to make life-altering decisions',
    section: 'metflix',
    actingLevel: 7.5,
    inprogress: false,
    weeksUntilRelease: 0,
    movierating: 0,
    salary: 1100000,
    popularity: 8,
    metascore: 0,
    imbdrating: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
    award:"",
    year:""
  },
  {
    id: '5',
    title: 'All United Statian Homecoming',
    genre: 'Drama',
    bio: 'A young adult sports drama set against the backdrop of the HBCU, aka historically Black colleges and universities, experience at Crinminston University',
    section: 'cw' && 'metflix',
    actingLevel: 6.2,
    inprogress: false,
    salary: 1100000,
    popularity: 7,
    metascore: 0,
    movierating: 0,
    imbdrating: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
    award:"",
    year:""
  },
  {
    id: '6',
    title: 'Waterdale',
    genre: 'Drama',
    bio: 'American supernatural horror crime drama television series based on the characters of Comics. ',
    section: 'cw',
    actingLevel: 6.6,
    inprogress: false,
    salary: 1100000,
    popularity: 9,
    metascore: 0,
    movierating: 0,
    imbdrating: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
    award:"",
    year:""
  },
  {
    id: '7',
    title: 'All United Statian',
    genre: 'Drama',
    bio: 'A rising high school American football player from L.A. is recruited to play for Beverly Hills High, the wins, losses and struggles of two families from vastly different worlds—Crenshaw and Beverly Hills',
    section: 'cw',
    actingLevel: 7.6,
    inprogress: false,
    salary: 1100000,
    popularity: 8,
    metascore: 0,
    movierating: 0,
    imbdrating: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
    award:"",
    year:""
  },
  {
    id: '8',
    title: 'The Lightningmans',
    genre: 'Action',
    bio: 'Follow the adventures of a group of siblings with extraordinary superpowers who use their abilities to fight crime and protect their city, all while dealing with the challenges of high school life.',
    section: 'nickaloadeon',
    actingLevel: 5.7,
    inprogress: false,
    salary: 1100000,
    popularity: 9,
    metascore: 0,
    movierating: 0,
    imbdrating: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
    award:"",
    year:""
  },
  {
    id: '9',
    title: 'The Speedster',
    genre: 'Action',
    bio: "Join the adventures of a young forensic scientist who gains superhuman speed and becomes the vigilante known as The Speedster to protect his city from metahuman threats and uncover the truth about his mother's murder.",
    section: 'cw',
    actingLevel: 7.7,
    inprogress: false,
    salary: 1100000,
    popularity: 9,
    imbdrating: 0,
    movierating: 0,
    metascore: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
    award:"",
    year:""
  },
  {
    id: '10',
    title: 'The Bounty Hunter',
    genre: 'Sci-Fi',
    bio: "Follow the thrilling adventures of a lone bounty hunter navigating the outer reaches of the galaxy in the aftermath of the Empire's fall, as he battles foes, protects the Child, and unravels the mystery of his target.",
    section: 'bisney+',
    actingLevel: 8.7,
    inprogress: false,
    salary: 1100000,
    popularity: 10,
    metascore: 0,
    movierating: 0,
    imbdrating: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
    award:"",
    year:""
  },
  {
    id: '11',
    title: 'The Final Of Us',
    genre: 'Adventure',
    bio: 'A global pandemic destroys civilization, a  survivor takes charge of a 12-year-old girl who may be humanitys last hope.',
    section: 'hbo',
    actingLevel: 8.9,
    inprogress: false,
    salary: 1100000,
    popularity: 8,
    imbdrating: 0,
    movierating: 0,
    metascore: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
    award:"",
    year:""
  },
  {
    id: '12',
    title: 'Breaking Awful',
    genre: 'Crime',
    bio: 'A chemistry teacher diagnosed with cancer turns to producing and selling meth with a former student in order to his familys future.',
    section: 'metflix',
    actingLevel: 9.5,
    inprogress: false,
    salary: 1100000,
    popularity: 10,
    imbdrating: 0,
    movierating: 0,
    metascore: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
    award:"",
    year:""
  },

  {
    id: '13',
    title: 'That Person',
    genre: 'Crime',
    bio: 'The story of Joeseph, a bookstore manager in New York, who turns into a serial killer who is infatuated with women. ',
    section: 'metflix',
    actingLevel: 7.7,
    inprogress: false,
    salary: 1100000,
    popularity: 9,
    movierating: 0,
    metascore: 0,
    imbdrating: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
    award:"", 
    year:""
  },
  {
    id: '14',
    title: 'Better Call Samuel',
    genre: 'Drama',
    bio: 'A prequel to the critically acclaimed TV series Breaking Awful, Better Call Samuel follows the journey of Jim, a small-time lawyer struggling to make a name for himself in the legal world, as he transforms into the morally ambiguous lawyer, Saml Goodmoon.',
    section: 'metflix',
    actingLevel: 8.9,
    inprogress: false,
    salary: 1100000,
    popularity: 9,
    metascore: 0,
    imbdrating: 0,
    movierating: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
    award:"",
    year:""
  },
  {
    id: '15',
    title: 'Companions',
    genre: 'Comedy',
    bio: 'Follow the lives of six friends - Rach, Russ, Chandler, Monica, Joe, and Penelopee - as they navigate their careers, relationships, and friendships in New York City. With memorable moments and iconic catchphrases.',
    section: 'metflix',
    actingLevel: 8.9,
    inprogress: false,
    salary: 1100000,
    popularity: 10,
    metascore: 0,
    movierating: 0,
    imbdrating: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
    award:"",
    year:""
  },
  {
    id: '16',
    title: 'The Workplace',
    genre: 'Comedy',
    bio: 'A mockumentary-style sitcom that follows the daily lives of office employees at aCompany. With its unique blend of humor, memorable characters, and hilarious situations, The Workplace has become a cult favorite and remains one of the most beloved comedy series of all time.',
    section: 'metflix',
    actingLevel: 9.0,
    inprogress: false,
    salary: 1100000,
    popularity: 10,
    imbdrating: 0,
    metascore: 0,
    movierating: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
    award:"",
    year:""
  },
  {
    id: '17',
    title: 'Unshamed',
    genre: 'Comedy',
    bio: "A dark comedy-drama that revolves around the dysfunctional Gallagan family living in Chicago's South Side. With its gritty depiction of poverty, addiction, and family dynamics, Unshamed has gained a loyal following for its bold and unconventional storytelling.",
    section: 'metflix',
    actingLevel: 8.6,
    inprogress: false,
    salary: 1100000,
    popularity: 8,
    imbdrating: 0,
    metascore: 0,
    marvelblockbuster: false,
    movierating: 0,
    imbdstars1: 1278378,
    castmembers: '',
    award:"",
    year:""
  },
  {
    id: '18',
    title: 'Present Family',
    genre: 'Comedy',
    bio: 'A mockumentary-style sitcom that follows the lives of Jay  and his family, including his second wife, stepson, and two adult children and their families. Present Family is known for its humorous and heartwarming portrayal of a diverse and blended family.',
    section: 'acd',
    actingLevel: 8.8,
    inprogress: false,
    salary: 1100000,
    popularity: 9,
    imbdstars1: 1278378,
    movierating: 0,
    metascore: 0,
    imbdrating: 0,
    marvelblockbuster: false,
    castmembers: '',
    award:"",
    year:""
  },
  {
    id: '19',
    title: 'GrownUp-Ish ',
    genre: 'Comedy',
    bio: 'A spinoff of ACbs Brown-Ish Zeze Johnston is off to college and must live outside the nest, dealing with drugs, sex, and relationships along the way',
    section: 'acd',
    actingLevel: 8.8,
    inprogress: false,
    salary: 1100000,
    popularity: 8,
    metascore: 0,
    movierating: 0,
    imbdrating: 0,
    imbdstars1: 1278378,
    marvelblockbuster: false,
    castmembers: '',
    award:"",
    year:""
  },
  {
    id: '20',
    title: 'Brown-Ish',
    genre: 'Comedy',
    bio: 'Follow the hilarious adventures of an African-American family living in a predominantly white neighborhood, as they navigate through various cultural, social, and racial issues with humor',
    section: 'acd',
    actingLevel: 8.7,
    inprogress: false,
    movierating: 0,
    salary: 1100000,
    popularity: 9,
    imbdstars1: 1278378,
    metascore: 0,
    imbdrating: 0,
    marvelblockbuster: false,
    castmembers: '',
    award:"",
    year:""
  },
  {
    id: '21',
    title: 'Dark Panther',
    moviename: 'Dark Panther: Rise of Shadows',
    genre: 'Action',
    bio: 'In "Dark Panther: Rise of Shadows," T\'Balla, a tormented prince burdened by a tragic past, assumes the mantle of the enigmatic Dark Panther, sworn to protect the city of Wokanda from the clutches of darkness. When a malevolent supervillain known as "Eclipse" emerges, wielding destructive powers fueled by ancient shadows, T\'Balla must confront his own inner demons and unlock the true potential of his dark abilities to save his city and avenge the loss of his loved ones. As the shadows deepen and secrets unravel, "Dark Panther: Rise of Shadows" delves into a gripping tale of redemption, sacrifice, and the relentless pursuit of justice in the face of overwhelming darkness.',
    section: 'Morvel',
    actingLevel: 8.7,
    inprogress: false,
    movierating: 0,
    imbdstars1: 1278378,
    metascore: 84,
    salary: 1100000,
    popularity: 9,
    budget: 200000000,
    imbdrating: 0,
    marvelblockbuster: true,
    castmembers: '',
    award:"",
    year:""
  },
];

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(0);
  const [overall, setOverall] = useState(0);
  const [sectionFilter, setSectionFilter] = useState(null);
  const [randomMovies, setRandomMovies] = useState([]);
  const [moviesData, setMoviesData] = useState([]);
  const [gotblackpantherRole, setgotBlackpantherRole] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const [aaagency, setAaagency] = useState(false);
  const [buagency, setBuagency] = useState(false);
  const [utpaagency, setUtpaagency] = useState(false);
  const [caaagency, setCaaagency] = useState(false); 
  const [wmeagency, setWmeagency] = useState(false);
  const [userRating, setUserRating] = useState(100); // Replace with your own rating



  const [people, setPeople] = useState([
    { name: '@bryancranston', followers: 5500000, following: false },
    { name: '@Vindiesel', followers: 94000000, following: false },
    { name: '@therock', followers: 380000000, following: false },
    { name: '@terrycrews', followers: 9700000, following: false },
    { name: '@mj', followers: 11000000, following: false },
  ]);

  const navtoacting = () => {
    navigation.navigate('Acting');
  };

  const handleAccept = () => {};
  if (gotblackpantherRole) {
    movies.push({
      id: '23',
      title: 'Dark Panther 2',
      genre: 'Action',
      bio: 'In the highly anticipated sequel to Dark Panther, Dark Panther 2: Shadows of Betrayal," T\'Balla, haunted by the tragic loss of his most trusted advisor, embarks on a harrowing journey of vengeance and redemption. As he uncovers a treacherous conspiracy that threatens to tear apart Wokanda from within, T\'Balla must confront a formidable supervillain known as "Obsidian," a master of dark magic who seeks to harness the ancient powers hidden within Wokanda for his nefarious purposes. In this thrilling installment, the line between hero and villain becomes blurred, pushing T\'Balla to his limits as he battles his inner demons and fights for the soul of his kingdom.',
      section: 'Morvel',
      actingLevel: 8.7,
      inprogress: false,
      weeksUntilRelease: 0,
      movierating: 0,
      metascore: 0,
      marvelblockbuster: false,
      salary: 1100000,
      popularity: 9,
      imbdrating: 0,
    });
  }
 
  const agencies = [
    {
      name: 'AA Agency',
      ratingRequirement: 65,
      filmrequirement:5,
      content: 'Agency A',
      celebrityClients: ['no one'],
      branding: '#FF6B6B',
      textColor: '#FFFFFF',
    },
    {
      name: 'BU Agency',
      ratingRequirement: 75,
      filmrequirement:10,
      content: 'Bright United',
      celebrityClients: ['Ralph Macchia'],
      branding: '#0077B6',
      textColor: '#FFFFFF',
    },
    {
      name: 'UTPA Agency',
      ratingRequirement: 80,
      filmrequirement:15,
      content: 'United Talented People Agency',
      celebrityClients: [
        'Arnald Schwarzeneggar',
        'Lily Jamez',
        'Timathée Chalamete',
      ],
      branding: '#FFD166',
      textColor: '#000000',
    },
    {
      name: 'CAA Agency',
      ratingRequirement: 90,
      filmrequirement:25,
      content: 'Creative Actors Agency',
      celebrityClients: ['Meghan Fox', 'Zendayah ', 'Jenna Ortegah'],
      branding: '#EF476F',
      textColor: '#FFFFFF',
    },
    {
      name: 'WME Agency',
      ratingRequirement: 90,
      filmrequirement:25,
      content: 'Will Morrison Endevours',
      celebrityClients: ['Kenu Reeves', 'Tom Halland ', 'Bri Larson'],
      branding: '#06D6A0',
      textColor: '#000000',
    },
  ];

   const currentagency = ({ agency }) => (
    <Modal
      visible={currentagencyvisible}
      animationType="fade"
      onRequestClose={closeModal2}>
      <View> 

      </View>
    </Modal>
  );
  const AgencyInfoModal = ({ agency }) => (
    <Modal
      visible={agencyinfoModalVisible}
      animationType="fade"
      onRequestClose={closeModal1}>
      <View
        style={[styles.modalContainer, { backgroundColor: agency?.branding }]}>
        <Text style={[styles.header, { color: agency?.textColor }]}>
          {agency?.name}
        </Text>
        <Text style={[styles.content, { color: agency?.textColor }]}>
          {agency?.content}
        </Text>
        <View style={styles.section}>
          <Text style={[styles.subHeader, { color: agency?.textColor }]}>
            Celebrity Clients:
          </Text>
          {agency?.celebrityClients.map((client) => (
            <Text
              key={client}
              style={[styles.client, { color: agency?.textColor }]}>
              - {client}
            </Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={[styles.subHeader, { color: agency?.textColor }]}>
            Rating Requirement:
          </Text>
          <Text
            style={[styles.ratingRequirement, { color: agency?.textColor }]}>
            {agency?.ratingRequirement}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.closebutton}
          onPress={closeagencyinfoModalVisible}>
          <Text style={styles.closebutton}>CLOSE</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );


  const AgenciesModal = ({
    modalVisible1,
    closeModal1,
    handleJoinAgency,
    handleInfoModal,
  }) => (
    <Modal
      visible={modalVisible1}
      animationType="slide"
      onRequestClose={closeModal1}>
      <View style={styles.modalContainer}>
        <Text style={styles.header}>Agencies</Text>
        {agencies.map((agency) => (
          <TouchableOpacity
            key={agency.name}
            onPress={() => handleInfoModal(agency)}
            style={[styles.agencyRow, { backgroundColor: agency.branding }]}>
            <View style={styles.agencyInfo}>
              <Text style={[styles.agencyName, { color: agency.textColor }]}>
                {agency.name}
              </Text>
              <TouchableOpacity onPress={() => handleInfoModal(agency)}>
                <Text style={styles.questionMark}>?</Text>
              </TouchableOpacity>
            </View>
            <Button
              title="Join Now"
              onPress={() => handleJoinAgency(agency)}
              color={'white'}
            />
          </TouchableOpacity>
        ))}
        <Button title="Close" onPress={closeModal1} />
      </View>
    </Modal>
  );
  const [modalVisible1, setModalVisible1] = useState(false);
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [agencyinfoModalVisible, setAgencyinfoModalVisible] = useState(false);
  const [currentagencyvisible, setcurrentagencyvisible] = useState(false);

  const handleJoinAgency = (agency) => {
    if (userRating >= agency.ratingRequirement) {
      // Perform the logic for joining the agency here
      // ...

      Alert.alert('Alert!', 'Are You Sure You Want To Join This Agency', [
        {
          text: 'Yes',
          onPress: () => {
            if (agency.name === 'AA Agency') {
              if (rating >= 40) {
                setAaagency(true); 
                setBuagency(false);
                setUtpaagency(false);
                setCaaagency(false);
                setWmeagency(false);
                Alert.alert(`Congratulations! You've joined ${agency.name}`);

                database.ref('agency/aaagency').set(true);
                database.ref('agency/buagency').set(false);
                database.ref('agency/utpaagency').set(false);
                database.ref('agency/caaagency').set(false);
                database.ref('agency/wmeagency').set(false);
              } else {
                Alert.alert('Sorry', "You've been rejected");
              }
            } else if (agency.name === 'BU Agency') {
              setBuagency(true);
              setAaagency(false);
              setUtpaagency(false);
              setCaaagency(false);
              setWmeagency(false);
              Alert.alert(`Congratulations! You've joined ${agency.name}`);

              database.ref('agency/buagency').set(true);
              database.ref('agency/aaagency').set(false);
              database.ref('agency/utpaagency').set(false);
              database.ref('agency/caaagency').set(false);
              database.ref('agency/wmeagency').set(false);
            } else if (agency.name === 'UTPA Agency') {
              setUtpaagency(true);
              setAaagency(false);
              setBuagency(false);
              setCaaagency(false);
              setWmeagency(false);

              database.ref('agency/utpaagency').set(true);
              database.ref('agency/aaagency').set(false);
              database.ref('agency/buagency').set(false);
              database.ref('agency/caaagency').set(false);
              database.ref('agency/wmeagency').set(false);
            } else if (agency.name === 'CAA Agency') {
              setCaaagency(true);
              setAaagency(false);
              setBuagency(false);
              setUtpaagency(false);
              setWmeagency(false);

              database.ref('agency/caaagency').set(true);
              database.ref('agency/aaagency').set(false);
              database.ref('agency/buagency').set(false);
              database.ref('agency/utpaagency').set(false);
              database.ref('agency/wmeagency').set(false);
            } else if (agency.name === 'WME Agency') {
              setWmeagency(true);
              setAaagency(false);
              setBuagency(false);
              setUtpaagency(false);
              setCaaagency(false);

              database.ref('agency/wmeagency').set(true);
              database.ref('agency/aaagency').set(false);
              database.ref('agency/buagency').set(false);
              database.ref('agency/utpaagency').set(false);
              database.ref('agency/caaagency').set(false);
            }
          },
        },
        {
          text: 'No',
          onPress: () => {},
        },
      ]);
    }
  };

  const handleInfoModal = (agency) => {
    setSelectedAgency(agency);
    openagency(agency);
  };

  const closeModal1 = () => {
    setSelectedAgency(null);
    setModalVisible1(false);
  };

  const openagency = (agency) => {
    setAgencyinfoModalVisible(true);
    setSelectedAgency(agency);
    setModalVisible1(false);
  };

  const closeagencyinfoModalVisible = () => {
    setModalVisible1(true);
    setAgencyinfoModalVisible(false);
  };

  const [rating, setRating] = useState(0); // State for storing the rating fetched from database
  useEffect(() => {
    // Fetch rating data from the database
    const dbRefRating = database.ref('user/rating');
    dbRefRating.on('value', (snapshot) => {
      setRating(snapshot.val());
    });

    const aaagencyref = database.ref('agency/aaagency');
    aaagencyref.once('value', (snapshot) => {
      setAaagency(snapshot.val());

      const dbRef = database.ref('movies' && 'finishedmovies');
      dbRef.on('value', (snapshot) => {
        if (snapshot.exists()) {
          const moviesInDb = snapshot.val();

          // Filter out the movies that are already in the database

          const filteredMovies = movies.filter(
            (movie) =>
              !moviesInDb.hasOwnProperty(movie.id) && movie.actingLevel < 7
          );
          setMoviesData(filteredMovies);

          // Update the state with the filtered movies
        } else {
          // If no movies in the database, display all movies
          setMoviesData(movies);
        }
      });
    });

    const buagencyref = database.ref('buagency');
    buagencyref.once('value', (snapshot) => {
      setBuagency(snapshot.val());

      const dbRef = database.ref('movies' && 'finishedmovies');
      dbRef.on('value', (snapshot) => {
        if (snapshot.exists()) {
          const moviesInDb = snapshot.val();

          // Filter out the movies that are already in the database

          const filteredMovies = movies.filter(
            (movie) =>
              !moviesInDb.hasOwnProperty(movie.id) && movie.actingLevel < 8
          );
          setMoviesData(filteredMovies);

          // Update the state with the filtered movies
        } else {
          // If no movies in the database, display all movies
          setMoviesData(movies);
        }
      });
    });

    const utpaagencyref = database.ref('utpaagency');
    utpaagencyref.once('value', (snapshot) => {
      setUtpaagency(snapshot.val());
    });

    const caaagencyref = database.ref('caaagency');
    caaagencyref.once('value', (snapshot) => {
      setAaagency(snapshot.val());
    });

    const wmeagencyref = database.ref('wmeagency');
    wmeagencyref.once('value', (snapshot) => {
      setWmeagency(snapshot.val());
    });

   
  }, []);

  const [apply, setApply] = useState(0);

  const navigation = useNavigation();
  const isFocused = useIsFocused(); // Get the focus status of the component

  const navback = () => {
    navigation.navigate('BottomNavigator');
  };

  const fetchMoviesData = () => {
    // Query the movies in the database
  };

  const fetchMoviesData2 = () => {
    // Query the movies in the database
    const dbRef = database.ref('movies2');
    dbRef.on('value', (snapshot) => {
      if (snapshot.exists()) {
        const moviesInDb = snapshot.val();

        // Filter out the movies that are already in the database
        const filteredMovies = movies.filter(
          (movie) => !moviesInDb.hasOwnProperty(movie.id)
        );

        // Update the state with the filtered movies
        setMoviesData(filteredMovies);
      } else {
        // If no movies in the database, display all movies
        setMoviesData(movies);
      }
    });
  };

  const isFocused2 = useIsFocused(); // Get the focus status of the component

  useEffect(() => {
    if (isFocused2) {
      fetchMoviesData();
    }
  }, [isFocused2]); // Trigger the effect when the focus status changes

  const [alertonetimethingy, setAlertonetimethingy] = useState(false);

  const handleMoviePress = (movie) => {
    setSelectedMovie(movie);
    setModalVisible(true);

      
    

    if (movie.actingLevel > 8) {
      Alert.alert('Warning', 'This movie has a High acting level.', [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => setModalVisible(false),
        },
        {
          text: 'Ok',
          onPress: () => console.log('User confirmed to watch the movie'),
        },
      ]);
    }
  };

  useEffect(() => {
    const getRandomMovies = () => {
      const randomIndices = Array.from({ length: 6 }, () =>
        Math.floor(Math.random() * movies.length)
      );
      const newRandomMovies = [
        movies[randomIndices[1]],
        movies[randomIndices[2]],
        movies[randomIndices[3]],
        movies[randomIndices[4]],
        movies[randomIndices[5]],
      ];
      setRandomMovies(newRandomMovies);
    };

    // Run the function to get random movies every time the component is focused
    if (isFocused) {
      getRandomMovies();
    }
  }, [isFocused]); // Trigger the effect when the focus status changes

  const handleReset = () => {
    const randomIndices = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * movies.length)
    );
    const newRandomMovies = [
      movies[randomIndices[1]],
      movies[randomIndices[2]],
      movies[randomIndices[3]],
      movies[randomIndices[4]],
      movies[randomIndices[5]],
    ];
    setRandomMovies(newRandomMovies);
  };

  const handleSectionFilter = (section) => {
    setSectionFilter(section);
  };

  const renderMovieItem = ({ item }) => {
    if (randomMovies.includes(item)) {
      return (
        <TouchableOpacity
          style={styles.movieItem}
          onPress={() => handleMoviePress(item)}>
          <Text style={styles.movieTitle}>{item.title}</Text>
          <Text style={styles.movieGenre}>{item.genre}</Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const dbRef = database.ref('movies');
  const dbRef2 = database.ref('movies2');

  const handleModalButton1Press = () => {
    if (selectedMovie.marvelblockbuster === true) {
      setAccepted(true);
      accept();
    }
    if (selectedMovie.marvelblockbuster === false) {
      Alert.alert(
        'Apply',
        'Are You Sure You Want To Apply For This Movie Or Show',
        [
          {
            text: 'No',
            style: 'cancel',
            onPress: () => setModalVisible(false),
          },
          {
            text: 'Yes',
            onPress: () => {
              accept();
            },
          },
        ]
      );
    }
  };

  if (selectedMovie?.marvelblockbuster === true) {
    return (
      <View style={styles.container1}>
        <Text style={styles.title1}>Great news!</Text>
        <Text style={styles.message}>
          Congratulations, you have been accepted into the Morvel Universe! You
          will play the superhero, {selectedMovie.title}, again congratulations
          on this amazing opportunity! Get ready to showcase your talent in
          superhero blockbusters, team-ups, and guest appearances in other
          Morvel shows and films. During your contract you will be guaranteed an
          ensemble role in the upcoming revengers movie and a lead in your very
          own film, {selectedMovie.moviename}, based off of the the success in
          those movies your contract will be renewed. Your base payment at the
          release of {selectedMovie.moviename}, will be $
          {selectedMovie.salary.toLocaleString()} and the budget will be around
          ${selectedMovie.budget.toLocaleString()}, the payment for the upcoming
          revengers movie will be determined later. We can't wait to start
          working.
        </Text>
        {!accepted ? (
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={handleModalButton1Press}>
            <Text style={styles.acceptText}>Accept</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.signature}>Nathan</Text>
        )}

        <Text style={styles.signatureLabel}>Signature</Text>

        <View>
          <View>
            <Image
              source={require('../assets/blackpanther.png')}
              style={styles.blackpantherimage}
            />
          </View>
          <Text style={styles.logo}>MORVEL</Text>
        </View>

        <View style={styles.line2} />

        <View>
          <TouchableOpacity onPress={navback}>
            <Text style={styles.close}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function accept() {
    const randomIndexes = [];
    

    // Update the database

      if (rating > selectedMovie.actingLevel) {
        if (selectedMovie.id === '21') {
          setgotBlackpantherRole(true);
        }
        Alert.alert('Alert', 'You got the role.', [
          {
            text: 'Ok',
            onPress: () => {
              navtoacting();
              
            },
          },
        ]);




        const weeks = Math.floor(Math.random() * 10) + 8;
    selectedMovie.weeksUntilRelease = weeks;
      selectedMovie.movierating = rating-15;


    // Update the database with the new weeksUntilRelease value
    database.ref('movies').child(selectedMovie.id).update({
      weeksUntilRelease: weeks,
      movierating: selectedMovie.movierating,

      
    });

        const movieId = selectedMovie.id;
        movies = movies.filter((movie) => movie.id !== movieId);
        dbRef.child(movieId).set(selectedMovie);
        setModalVisible(false); 


         // Get two random people from the people array
      const randomPeopleIndexes = [];
      while (randomPeopleIndexes.length < 2) {
        const randomIndex = Math.floor(Math.random() * people.length);
        if (!randomPeopleIndexes.includes(randomIndex)) {
          randomPeopleIndexes.push(randomIndex);
        }
      }

      // Construct the cast members string with the two selected people
      const castMembers =
        people[randomPeopleIndexes[0]].name +
        ', ' +
        people[randomPeopleIndexes[1]].name;

      // Create a new updated movie object
      const updatedMovie = {
        ...selectedMovie,
        castmembers: castMembers,
      };
 
      // Update the selected movie's castmembers with the constructed string
      setSelectedMovie(updatedMovie);

      }
      if (rating < selectedMovie.actingLevel) {
        Alert.alert(
          'Alert',
          'You did not get the role. Your rating is lower than the required acting level.',
          [
            {
              text: 'Ok',
              onPress: () => {
                setModalVisible(false);
                const movieId = selectedMovie.id;
                movies = movies.filter((movie) => movie.id !== movieId);
                dbRef2.child(movieId).set(selectedMovie);
              },
            },
          ]
        );
      }
    
  }
  const renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>{selectedMovie.title}</Text>
      <Text style={styles.modalBio}>{selectedMovie.bio}</Text>
      <Text style={styles.modalSection}>{selectedMovie.section}</Text>
      <Text style={styles.modalActingLevel}>
        Acting level: {selectedMovie.actingLevel}
      </Text>
      <TouchableOpacity
        style={styles.modalButton}
        onPress={handleModalButton1Press}>
        <Text style={styles.modalButtonText}>Apply For Audition</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.modalButton2}
        onPress={() => setModalVisible(false)}>
        <Text style={styles.modalButtonText}>Close</Text>
      </TouchableOpacity>

      <Modal
        visible={setModalVisible2}
        transparent
        onRequestClose={() => setModalVisible2(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>MCU Universe</Text>
        </View>
      </Modal>
    </View>
  );

  const filteredMovies = sectionFilter
    ? movies.filter((movie) => movie.section === sectionFilter)
    : movies;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Inbox</Text>
        <TouchableOpacity style={styles.resetButton} onPress={navback}>
          <Text style={styles.resetButtonText}>Back</Text>
        </TouchableOpacity>


    
        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => setModalVisible1(true)}>
          <Text style={styles.resetButtonText}>Agencies</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sectionFilter}></View>
      <View style={styles.regscreenline} />

      <FlatList
        data={moviesData}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id}
        style={styles.movieList}
      />
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        {renderModalContent()}
      </Modal>
      <AgenciesModal
        modalVisible1={modalVisible1}
        closeModal1={closeModal1}
        handleJoinAgency={handleJoinAgency}
        handleInfoModal={handleInfoModal}
      />
      <AgencyInfoModal agency={selectedAgency} closeModal1={closeModal1} />
      
    </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // White color
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    fontSize: 25,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2356E8', // Blue color
  },
  resetButton: {
    backgroundColor: '#FFD700', // Gold color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft:50
  }, 
  resetButtonText: {
    color: '#000000', // Black color
    fontWeight: 'bold',
  },
  sectionFilter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  content: {
    marginBottom: 10,
  },
  subHeader: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  client: {
    marginBottom: 5,
  },
  ratingRequirement: {
    marginBottom: 10,
  },
  agencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    width: '110%',
    height: '12%',
  },
  agencyInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  agencyName: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
  },
  questionMark: {
    fontSize: 20,
    marginRight: 10,
  },
  sectionFilterButton: {
    backgroundColor: '#808080', // Gray color
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  sectionFilterButtonText: {
    color: '#333333', // Dark gray color
    fontWeight: 'bold',
  },
  sectionFilterButtonActive: {
    backgroundColor: '#2356E8', // Blue color
  },
  sectionFilterButtonTextActive: {
    color: '#FFFFFF', // White color
    fontWeight: 'bold',
  },
  movieList: {
    flex: 1,
  },
  movieItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#808080', // Gray color
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2356E8', // Blue color
  },
  movieGenre: {
    fontSize: 14,
    color: '#808080', // Gray color
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White color
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2356E8', // Blue color
  },
  modalBio: {
    fontSize: 16,
    marginBottom: 20,
    color: '#808080', // Gray color
  },
  modalSection: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2356E8', // Blue color
  },
  modalActingLevel: {
    fontSize: 14,
    marginBottom: 20,
    color: '#808080', // Gray color
  },
  modalButton: {
    backgroundColor: '#2356E8', // Blue color
    paddingVertical: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF', // White color
    textAlign: 'center',
  },
  modalButton2: {
    backgroundColor: '#808080', // Gray color
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  modalButtonText2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF', // White color
    textAlign: 'center',
  },
  signature: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#808080', // Gray color
    textAlign: 'center',
  },
  signatureLabel: {
    fontSize: 14,
    marginBottom: 5,
    color: '#808080', // Gray color
    textAlign: 'center',
  },
  blackpantherimage: {
    height: 15,
    width: 15,
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2356E8', // Blue color
    textAlign: 'center',
    marginBottom: 20,
  },
  line2: {
    borderBottomColor: '#808080', // Gray color
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  regscreenline: {
    borderBottomColor: 'gray', // Gray color
    borderBottomWidth: 1.5,
    marginTop: -20,
    opacity: 0.2,
  },
  close: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2356E8', // Blue color
    textAlign: 'center',
    marginTop: 10,
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2356E8', // Blue color
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
    color: 'black',
    fontFamily: 'sans-serif',
  },
  acceptButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  acceptText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: 'black',
    marginVertical: -120,
  },
  signature: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: -80,
    fontFamily: 'sans-serif',
  },
  signatureLabel: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'sans-serif',
    marginVertical: 90,
  },
  close: {
    marginVertical: -440,
    marginLeft: 300,
  },
});

export default App;
