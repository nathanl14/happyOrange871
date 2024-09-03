import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const tweets = [
  {
    username: '@FashionCritic101',
    tweetText:
      "Just spotted ActorName's outfit at the Oscarz Red Carpet and Im shook! 🔥✨ Rating it 9.3/10! Total showstopper! 🌟👗 #Fashionista",
    profileImage: require('../assets/lightskinbigbrownhair.png'),
  },
  {
    username: '@PopCraver',
    tweetText:
      "Okay, but can we talk about ActorName's Oscarz Red Carpet outfit  🤩✨ Its giving a solid 9.3/10 – pure fashion brilliance! 💃🏆 #OscarGlamour #ActorLifeStar #RedCarpetSlay",
    popcraver: true,
  },
  {
    username: '@TheRock',
    tweetText: 'The Rock Is Cooking',
    profileImage: require('../assets/skin3.png'),
  },
  {
    username: '@Zendava',
    tweetText: 'I ♡ Tom H',
    profileImage: require('../assets/lightskincurlybrownhair.png'),
  },
  {
    username: '@Tom H',
    tweetText: 'I ♡ Zendava',
    profileImage: require('../assets/skin1.png'),
  },
];

const TwitterFeed = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View>
        <TouchableOpacity style={styles.x}>
          <Text style={styles.xtext}>X</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileImageforme}>
        <Image
          source={require('../assets/skin5.png')}
          style={styles.profileImage}
        />
      </View>

      <TouchableOpacity style={styles.backbutton}>
        <Text style={styles.backtext}>BACK</Text>
      </TouchableOpacity>

      <View style={styles.border} />

      <ScrollView>
        {tweets.map((tweet, index) => (
          <View key={index} style={styles.tweetContainer}>
            {tweet.popcraver ? (
              <View style={styles.profileImage2}>
                <Text style={styles.popcraverText}>Pop Craver</Text>
              </View>
            ) : (
              <View style={styles.profileImagebackground}>
                <Image
                  source={tweet.profileImage}
                  style={styles.profileImage}
                />
              </View>
            )}

            <View style={styles.tweetContent}>
              <Text style={styles.username}>{tweet.username}</Text>
              <Text style={styles.tweetText}>{tweet.tweetText}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  popcraverText: {
    color: 'white',
    transform: [{ rotate: '-20deg' }],
    marginTop: 10,
    fontWeight: 'bold',
    width: 38,
    fontSize: 12,
    marginLeft: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'gray',
    padding: 10,
    marginBottom: 10,
    height: 140,
    opacity: 0.1,
  },
  backbutton:{
    marginTop:-30,
    marginLeft:"85%"
  },
  backtext:{
    color:"white"
  },
  border: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    height: 30,
  },
  profileImageforme: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    marginTop: '-22%',
    marginLeft: 15,
  },
  x: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    opacity: 1,
  },
  xtext: {
    fontSize: '50',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: '-28%',
    opacity: 1,
  },
  tweetContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
    height: 120,
  },
  profileImage: {
    width: 42,
    height: 42,
    borderRadius: 25,
    marginLeft: 4,
    marginTop: 3,
  },
  profileImagebackground: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
    backgroundColor: 'white',
  },

  profileImage2: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
    backgroundColor: 'orange',
  },
  tweetContent: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  tweetText: {
    fontSize: 15,
    marginTop: 3,
    color: 'white',
  },
});

export default TwitterFeed;
