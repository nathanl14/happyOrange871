import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import database from '../firebase';
import { useNavigation, useIsFocused } from '@react-navigation/native';

let movies = [
  {
  id: '25',
  title: 'The Secret Society',
  genre: 'Thriller',
  bio: 'A group of individuals discover a hidden society with supernatural powers and must navigate a dangerous world of intrigue and betrayal.',
  directing: 70,
  typeoffilm: 'TV Show',  // Changed 'typeoffilm' to 'typeOfFilm'
  inprogress: false,      // Changed 'inprogress' to 'inProgress'
  weeksUntilRelease: 0,
  movierating:0,  
  budget: 500000,
  salary: 15000,
  popularity: 4,
  imbdRating: 0,          // Changed 'imbdrating' to 'imdbRating'
  auditionchance: 0,   
  weeksUntilaudition:0,   // Changed 'auditionchance' to 'auditionChance'
  award: "",              // Removed unnecessary properties
  year: "",               // Removed unnecessary properties
  section: "",            // Removed unnecessary properties
  metascore: 0,
  marvelblockbuster: false, // Changed 'marvelblockbuster' to 'marvelBlockbuster'
  imbdstars1: 1278378,    // Changed 'imbdstars1' to 'imdbStars1'
  castMembers: [],        // Changed '' to an empty array for 'castMembers'             
  episodeWeekTracker: 0,  // Changed 'episodeweektracker' to 'episodeWeekTracker'
  season1athing: false,   // Changed 'season1athing' to 'season1AThing'
  season1avgviewers:0,
  syndication:"",
  season1: [
    {
      episode1Views: 0,    // Changed 'episode1views' to 'episode1Views'
      episode2Views: 0,    // Changed 'episode2views' to 'episode2Views'
      episode3Views: 0,    // Changed 'episode3views' to 'episode3Views'
      episode4Views: 0,    // Changed 'episode4views' to 'episode4Views'
      episode5Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode6Views: 0,    // Changed 'episode1views' to 'episode1Views'
      episode7Views: 0,    // Changed 'episode2views' to 'episode2Views'
      episode8Views: 0,    // Changed 'episode3views' to 'episode3Views'
      episode9Views: 0,    // Changed 'episode4views' to 'episode4Views'
      episode10Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode11Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode12Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode13Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode14Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode15Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode16Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode17Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode18Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode19Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode20Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode21Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode22Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode23Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode24Views: 0,    // Changed 'episode5views' to 'episode5Views'

      







    },
  ],

  season2: [
    {
      episode1Views: 0,    // Changed 'episode1views' to 'episode1Views'
      episode2Views: 0,    // Changed 'episode2views' to 'episode2Views'
      episode3Views: 0,    // Changed 'episode3views' to 'episode3Views'
      episode4Views: 0,    // Changed 'episode4views' to 'episode4Views'
      episode5Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode6Views: 0,    // Changed 'episode1views' to 'episode1Views'
      episode7Views: 0,    // Changed 'episode2views' to 'episode2Views'
      episode8Views: 0,    // Changed 'episode3views' to 'episode3Views'
      episode9Views: 0,    // Changed 'episode4views' to 'episode4Views'
      episode10Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode11Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode12Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode13Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode14Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode15Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode16Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode17Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode18Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode19Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode20Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode21Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode22Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode23Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode24Views: 0,    // Changed 'episode5views' to 'episode5Views'
    },
  ], 
},
  {
    id: '26',
    title: 'The Lost Artifact',
    genre: 'Adventure',
    bio: 'A fearless archaeologist embarks on a perilous journey to find a legendary artifact that has the power to change the course of history.',
  directing: 70,
    typeoffilm: 'Tv Show',
    inprogress: false,
    weeksUntilRelease: 0,
    budget: 300000,
    movierating: 0,
    salary: 10000,
    popularity: 3,
    imbdRating: 0,          // Changed 'imbdrating' to 'imdbRating'
  auditionchance: 0,   
  weeksUntilaudition:0,   // Changed 'auditionchance' to 'auditionChance'
  award: "",              // Removed unnecessary properties
  year: "",               // Removed unnecessary properties
  section: "",            // Removed unnecessary properties
  metascore: 0,
  marvelblockbuster: false, // Changed 'marvelblockbuster' to 'marvelBlockbuster'
  imbdstars1: 1278378,    // Changed 'imbdstars1' to 'imdbStars1'
  castMembers: [],        // Changed '' to an empty array for 'castMembers'             
  episodeWeekTracker: 0,  // Changed 'episodeweektracker' to 'episodeWeekTracker'
  season1athing: false,   // Changed 'season1athing' to 'season1AThing'
  season1avgviewers:0,
  syndication:"",
  season1: [
    {
      episode1Views: 0,    // Changed 'episode1views' to 'episode1Views'
      episode2Views: 0,    // Changed 'episode2views' to 'episode2Views'
      episode3Views: 0,    // Changed 'episode3views' to 'episode3Views'
      episode4Views: 0,    // Changed 'episode4views' to 'episode4Views'
      episode5Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode6Views: 0,    // Changed 'episode1views' to 'episode1Views'
      episode7Views: 0,    // Changed 'episode2views' to 'episode2Views'
      episode8Views: 0,    // Changed 'episode3views' to 'episode3Views'
      episode9Views: 0,    // Changed 'episode4views' to 'episode4Views'
      episode10Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode11Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode12Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode13Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode14Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode15Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode16Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode17Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode18Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode19Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode20Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode21Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode22Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode23Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode24Views: 0,    // Changed 'episode5views' to 'episode5Views'

      







    },
  ],

  season2: [
    {
      episode1Views: 0,    // Changed 'episode1views' to 'episode1Views'
      episode2Views: 0,    // Changed 'episode2views' to 'episode2Views'
      episode3Views: 0,    // Changed 'episode3views' to 'episode3Views'
      episode4Views: 0,    // Changed 'episode4views' to 'episode4Views'
      episode5Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode6Views: 0,    // Changed 'episode1views' to 'episode1Views'
      episode7Views: 0,    // Changed 'episode2views' to 'episode2Views'
      episode8Views: 0,    // Changed 'episode3views' to 'episode3Views'
      episode9Views: 0,    // Changed 'episode4views' to 'episode4Views'
      episode10Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode11Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode12Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode13Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode14Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode15Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode16Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode17Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode18Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode19Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode20Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode21Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode22Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode23Views: 0,    // Changed 'episode5views' to 'episode5Views'
      episode24Views: 0,    // Changed 'episode5views' to 'episode5Views'
    },
  ], 
  },
  {
    id: '27',
    title: 'Love in Paris',
    genre: 'Romance',
    bio: 'Two strangers from different parts of the world meet in Paris and embark on a passionate love affair that challenges their beliefs and changes their lives forever.',
    actingLevel: 5,
    typeoffilm: 'Movie',
    inprogress: false,
    weeksUntilRelease: 0,
    movierating: 0,
    budget: 700000,
    salary: 20000,
    popularity: 4,
    imbdrating: 0,
    auditionchance: 0,
    weeksUntilaudition:0,
    section:0,
    metascore: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
    award:"",
    year:"",
    
  },
  {
    id: '28',
    title: 'The Quantum Paradox',
    genre: 'Sci-Fi',
    bio: 'A brilliant scientist discovers a way to travel through parallel universes, but soon realizes the devastating consequences of meddling with the fabric of reality.',
    actingLevel: 8,
    typeoffilm: 'Movie',
    inprogress: false,
    weeksUntilRelease: 0,
    movierating: 0,
    salary: 30000,
    budget: 1200000,
    popularity: 6,
    imbdrating: 0,
    auditionchance: 0,
    weeksUntilaudition:0,
    award:"",
    year:"",
    section:"",
     metascore: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
  },
  {
    id: '29',
    title: 'The Silent Witness',
    genre: 'Mystery',
    bio: 'A renowned detective investigates a murder case where all the evidence points to an impossible conclusion, forcing him to question the boundaries of logic and reason.',
    actingLevel: 7,
    typeoffilm: 'Short Film',
    inprogress: false,
    weeksUntilRelease: 0,
    movierating: 0,
    salary: 3000,
    budget: 80000,
    popularity: 2,
    imbdrating: 0,
    auditionchance: 0,
    weeksUntilaudition:0,
    award:"",
    year:"",
    section:"",
     metascore: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
  },
  {
    id: '30',
    title: 'Beyond the Horizon',
    genre: 'Drama',
    bio: 'A group of astronauts embarks on a mission to explore a distant planet, but their journey takes an unexpected turn when they encounter a mysterious phenomenon that challenges their understanding of the universe.',
    actingLevel: 6,
    typeoffilm: 'Movie',
    inprogress: false,
    weeksUntilRelease: 0,
    movierating: 0,
    salary: 12000,
    budget: 400000,
    popularity: 3,
    imbdrating: 0,
    auditionchance: 0,
    weeksUntilaudition:0,
    award:"",
    year:"",
    section:"",
     metascore: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
  },
  {
    id: '31',
    title: 'The Last Heist',
    genre: 'Action',
    bio: 'A master thief plans the ultimate heist to steal a priceless artifact from a heavily guarded museum, but he must outsmart a relentless detective who is determined to bring him down.',
    actingLevel: 7,
    typeoffilm: 'Short Film',
    inprogress: false,
    weeksUntilRelease: 0,
    movierating: 0,
    salary: 7500,
    budget: 200000,
    popularity: 2,
    imbdrating: 0,
    auditionchance: 0,
    weeksUntilaudition:0,
    award:"",
    year:"",
    section:"",
     metascore: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
  },
  {
    id: '32',
    title: 'The Forbidden Forest',
    genre: 'Fantasy',
    bio: 'In a world of mythical creatures and ancient magic, a young hero sets out on a quest to save his kingdom from an evil sorcerer and restore balance to the realm.',
    actingLevel: 6,
    typeoffilm: 'Movie',
    inprogress: false,
    weeksUntilRelease: 0,
    movierating: 0,
    salary: 18500,
    budget: 700000,
    popularity: 4,
    imbdrating: 0,
    auditionchance: 0,
    weeksUntilaudition:0,
    award:"",
    year:"",
    section:"",
     metascore: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
  },
  {
    id: '33',
    title: 'The Haunting Shadows',
    genre: 'Horror',
    bio: 'A group of friends venture into an abandoned mansion, only to be haunted by vengeful spirits that have been trapped within its walls for centuries.',
    actingLevel: 5,
    typeoffilm: 'Short Film',
    inprogress: false,
    weeksUntilRelease: 0,
    movierating: 0,
    budget: 100000,
    salary: 5500,
    popularity: 2,
    imbdrating: 0,
    auditionchance: 0,
    weeksUntilaudition:0,
    award:"",
    year:"",
    section:"",
     metascore: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
  },
  {
    id: '34',
    title: 'The Untold Legend',
    genre: 'Historical',
    bio: 'A legendary figure from history comes to life in this epic tale of courage, honor, and sacrifice set against the backdrop of a war-torn kingdom.',
    actingLevel: 8,
    typeoffilm: 'Movie',
    inprogress: false,
    weeksUntilRelease: 0,
    movierating: 0,
    budget: 1000000,
    salary: 25000,
    popularity: 5,
    imbdrating: 0,
    auditionchance: 0,
    weeksUntilaudition:0,
    award:"",
    year:0,   
     section: 'acd',
     metascore:"",
     marvelblockbuster:"false",
    imbdstars1: 1278378,
    castmembers: '',
  },
    {
    id: '35',
    title: 'Eternal Echoes',
    genre: 'Drama',
    bio: 'A musician struggles to find their creative spark after a life-changing event, leading them on a journey of self-discovery and healing.',
    actingLevel: 6,
    typeoffilm: 'Movie',
    inprogress: false,
    weeksUntilRelease: 0,
    budget: 450000,
    movierating: 0,
    salary: 14000,
    popularity: 3,
    imbdrating: 0,
    auditionchance: 0,
    weeksUntilaudition: 0,
    award: "",
    year: "",
    section:"",
     metascore: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
  },
  {
    id: '36',
    title: 'Chronicles of Cyberspace',
    genre: 'Sci-Fi',
    bio: 'In a futuristic world, a group of hackers fights against a powerful AI that threatens to take control of the entire digital realm.',
    actingLevel: 7,
    typeoffilm: 'Movie',
    inprogress: false,
    weeksUntilRelease: 0,
    budget: 850000,
    movierating: 0,
    salary: 18000,
    popularity: 4,
    imbdrating: 0,
    auditionchance: 0,
    weeksUntilaudition: 0,
    award: "",
    year: "",
    section:"",
     metascore: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
  },
 {
    id: '37',
    title: 'City of Whispers',
    genre: 'Mystery',
    bio: 'A detective investigates a series of mysterious disappearances in a small town, uncovering dark secrets that shake the community to its core.',
    actingLevel: 7,
    typeoffilm: 'Movie',
    inprogress: false,
    weeksUntilRelease: 0,
    budget: 600000,
    movierating: 0,
    salary: 17000,
    popularity: 4,
    imbdrating: 0,
    auditionchance: 0,
    weeksUntilaudition: 0,
    award: "",
    year: "",
    section:"",
     metascore: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
  },
  {
    id: '38',
    title: 'Harmony\'s Melody',
    genre: 'Romance',
    bio: 'Two musicians from different backgrounds find love and inspiration in each other\'s music, creating a harmonious bond that transcends cultural boundaries.',
    actingLevel: 6,
    typeoffilm: 'Movie',
    inprogress: false,
    weeksUntilRelease: 0,
    budget: 550000,
    movierating: 0,
    salary: 16000,
    popularity: 3,
    imbdrating: 0,
    auditionchance: 0,
    weeksUntilaudition: 0,
    award: "",
    year: "",
    section:"",
     metascore: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
  },
  {
    id: '39',
    title: 'Zero Gravity',
    genre: 'Sci-Fi',
    bio: 'A group of astronauts embarks on a mission to a distant exoplanet, only to encounter unforeseen challenges that test their teamwork and survival skills.',
    actingLevel: 8,
    typeoffilm: 'Movie',
    inprogress: false,
    weeksUntilRelease: 0,
    budget: 1100000,
    movierating: 0,
    salary: 25000,
    popularity: 5,
    imbdrating: 0,
    auditionchance: 0,
    weeksUntilaudition: 0,
    award: "",
    year: "",
    section:"",
     metascore: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
  },
  {
    id: '40',
    title: 'Whispers in the Wind',
    genre: 'Drama',
    bio: 'A group of strangers with interconnected pasts find themselves brought together by a series of mysterious events that force them to confront their past mistakes.',
    actingLevel: 7,
    typeoffilm: 'Movie',
    inprogress: false,
    weeksUntilRelease: 0,
    budget: 700000,
    movierating: 0,
    salary: 18000,
    popularity: 4,
    imbdrating: 0,
    auditionchance: 0,
    weeksUntilaudition: 0,
    award: "",
    year: "",
    section:"",
     metascore: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
  },
  {
    id: '41',
    title: 'Dreamweaver',
    genre: 'Fantasy',
    bio: 'A young dreamer discovers the ability to enter the dreams of others, but their newfound power draws them into a world of intrigue and danger.',
    actingLevel: 6,
    typeoffilm: 'Movie',
    inprogress: false,
    weeksUntilRelease: 0,
    budget: 480000,
    movierating: 0,
    salary: 15000,
    popularity: 3,
    imbdrating: 0,
    auditionchance: 0,
    weeksUntilaudition: 0,
    award: "",
    year: "",
    section:"",
     metascore: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
  },
{
    id: '42',
    title: 'The Enchanted Key',
    genre: 'Adventure',
    bio: 'A young adventurer sets out to find a mystical key that is said to unlock the secrets of an ancient civilization, leading to a journey filled with peril and discovery.',
    actingLevel: 6,
    typeoffilm: 'Movie',
    inprogress: false,
    weeksUntilRelease: 0,
    budget: 520000,
    movierating: 0,
    salary: 14000,
    popularity: 3,
    imbdrating: 0,
    auditionchance: 0,
    weeksUntilaudition: 0,
    award: "",
    year: "",
    section:"",
     metascore: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
  },
  // Movie 43
  {
    id: '43',
    title: 'Parallel Paradox',
    genre: 'Sci-Fi',
    bio: 'After an experiment gone awry, a scientist finds themselves trapped in a parallel universe where their actions have unforeseen consequences in both worlds.',
    actingLevel: 7,
    typeoffilm: 'Movie',
    inprogress: false,
    weeksUntilRelease: 0,
    budget: 750000,
    movierating: 0,
    salary: 18000,
    popularity: 4,
    imbdrating: 0,
    auditionchance: 0,
    weeksUntilaudition: 0,
    award: "",
    year: "",
    section:"",
     metascore: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
  },
  // Movie 44
  {
    id: '44',
    title: 'Whispers from the Past',
    genre: 'Mystery',
    bio: 'A historian stumbles upon a series of cryptic messages that point to a hidden treasure from the past, leading them on a journey of intrigue and danger.',
    actingLevel: 6,
    typeoffilm: 'Movie',
    inprogress: false,
    weeksUntilRelease: 0,
    budget: 580000,
    movierating: 0,
    salary: 16000,
    popularity: 3,
    imbdrating: 0,
    auditionchance: 0,
    weeksUntilaudition: 0,
    award: "",
    year: "",
    section:"",
     metascore: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
  },
  // Movie 45
  {
    id: '45',
    title: 'Crimson Masquerade',
    genre: 'Thriller',
    bio: 'A mysterious masked figure starts a series of elaborate heists, leaving a skilled detective to unravel the motives behind these daring crimes.',
    actingLevel: 7,
    typeoffilm: 'Movie',
    inprogress: false,
    weeksUntilRelease: 0,
    budget: 720000,
    movierating: 0,
    salary: 17000,
    popularity: 4,
    imbdrating: 0,
    auditionchance: 0,
    weeksUntilaudition: 0,
    award: "",
    year: "",
    section:"",
     metascore: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
  },
  // Movie 46
  {
    id: '46',
    title: 'Starlight Serenade',
    genre: 'Romance',
    bio: 'In a futuristic world, two individuals from different planets find love through their shared passion for music, challenging societal norms and prejudices.',
    actingLevel: 6,
    typeoffilm: 'Movie',
    inprogress: false,
    weeksUntilRelease: 0,
    budget: 600000,
    movierating: 0,
    salary: 15000,
    popularity: 3,
    imbdrating: 0,
    auditionchance: 0,
    weeksUntilaudition: 0,
    award: "",
    year: "",
    section:"",
     metascore: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
  },
  // Movie 47
  {
    id: '47',
    title: 'Echoes of Destiny',
    genre: 'Fantasy',
    bio: 'A chosen one embarks on a quest to fulfill a prophecy and save their realm from an ancient evil, facing mythical creatures and magical challenges along the way.',
    actingLevel: 8,
    typeoffilm: 'Movie',
    inprogress: false,
    weeksUntilRelease: 0,
    budget: 950000,
    movierating: 0,
    salary: 22000,
    popularity: 5,
    imbdrating: 0,
    auditionchance: 0,
    weeksUntilaudition: 0,
    award: "",
    year: "",
    section:"",
     metascore: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
  },
  // Movie 48
  {
    id: '48',
    title: 'Beneath the Surface',
    genre: 'Horror',
    bio: 'A group of researchers explores an underwater cave system, only to encounter malevolent creatures that have adapted to the darkness and isolation of the depths.',
    actingLevel: 7,
    typeoffilm: 'Movie',
    inprogress: false,
    weeksUntilRelease: 0,
    budget: 680000,
    movierating: 0,
    salary: 17000,
    popularity: 4,
    imbdrating: 0,
    auditionchance: 0,
    weeksUntilaudition: 0,
    award: "",
    year: "",
    section:"",
     metascore: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
  },
  // Movie 49
  {
    id: '49',
    title: 'Threads of Fate',
    genre: 'Drama',
    bio: 'Three individuals\' lives become intertwined by a series of chance encounters, testing their resilience and shaping their destinies in unexpected ways.',
    actingLevel: 6,
    typeoffilm: 'Movie',
    inprogress: false,
    weeksUntilRelease: 0,
    budget: 550000,
    movierating: 0,
    salary: 14000,
    popularity: 3,
    imbdrating: 0,
    auditionchance: 0,
    weeksUntilaudition: 0,
    award: "",
    year: "",
    section:"",
     metascore: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
  },
  // Movie 50
  {
    id: '50',
    title: 'Edge of Eternity',
    genre: 'Sci-Fi',
    bio: 'In a dystopian future, a group of rebels fights against a totalitarian regime by utilizing advanced technology to manipulate time and disrupt the regime\'s control.',
    actingLevel: 8,
    typeoffilm: 'Movie',
    inprogress: false,
    weeksUntilRelease: 0,
    budget: 900000,
    movierating: 0,
    salary: 21000,
    popularity: 5,
    imbdrating: 0,
    auditionchance: 0,
    weeksUntilaudition: 0,
    award: "",
    year: "",
    section:"",
     metascore: 0,
    marvelblockbuster: false,
    imbdstars1: 1278378,
    castmembers: '',
  },



];

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(0);
  const [sectionFilter, setSectionFilter] = useState(null);
  const [randomMovies, setRandomMovies] = useState([]);
  const [moviesData, setMoviesData] = useState([]);

  const [typeofmovieFilter, setTypeofmovieFilter] = useState(null); // Updated state variable

  const handleTypeofmovieFilter = (typeofmovie) => {
    setTypeofmovieFilter(typeofmovie); // Updated the state with the selected typeofmovie
  };

  const [inprogress, setInprogress] = useState(false);

  const [rating, setRating] = useState(null); // State for storing the rating fetched from database
  useEffect(() => {
    // Fetch rating data from the database
    const dbRef = database.ref('user/rating');
    dbRef.once('value', (snapshot) => {
      const ratingData = snapshot.val();
      const { yo } = ratingData;

      setRating(snapshot.val());
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
    const dbRef = database.ref('movies' && 'finishedmovies');
      dbRef.on('value', (snapshot) => {
        if (snapshot.exists()) {
          const moviesInDb = snapshot.val();

          // Filter out the movies that are already in the database

          const filteredMovies = movies.filter(
            (movie) =>
              !moviesInDb.hasOwnProperty(movie.id));
          setMoviesData(filteredMovies);

          // Update the state with the filtered movies
        } else {
        // If no movies in the database, display all movies
        setMoviesData(movies);
      }
    });
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

  useEffect(() => {
    fetchMoviesData();
  }, []);

  const [resetthingy, setResetthingy] = useState(false);

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
        movies[randomIndices[6]],
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
      movies[randomIndices[6]],
    ];
    setRandomMovies(newRandomMovies);

  };

  const handleSectionFilter = (section) => {
    setSectionFilter(section);
  };

  const renderMovieItem = ({ item }) => {
    if (randomMovies.includes(item)) {
      return (
        <View style={styles.movieBox}>
          <TouchableOpacity onPress={() => handleMoviePress(item)}>
            <View>
              <Text style={styles.movieTitle}>{item.title}</Text>
            </View>
            <View>
              <Text style={styles.movieGenre}>{item.genre}</Text>
            </View>

            <View style={styles.descview}>
              <Text style={styles.descriptionword}>Description:</Text>
              <Text style={styles.actualdescription}>{item.bio}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  };

  const dbRef = database.ref('movies');
  const dbRef2 = database.ref('movies2');



const createRandomActor = () => {
  const actorNames = ["Tom Holland", "Zendaya", "Chris Evans", "Scarlett Johansson", "Robert Downey Jr."];
  //const randomName = actorNames[Math.floor(Math.random() * actorNames.length)];
  
  return {
    name: "Tom Holland",
    relationshipStat: Math.floor(Math.random() * 100), // Random number for demonstration
  };
};

const addthemovie = () => {
  const movieId = selectedMovie.id;
  movies = movies.filter((movie) => movie.id !== movieId);
  
  // Create a new actor and add to the movie's castmembers
  const newActor = createRandomActor();
  const updatedCastMembers = selectedMovie.castmembers ? [...selectedMovie.castmembers, newActor] : [newActor];
  
  // Update the movie object with new castmembers
  const updatedMovie = {
    ...selectedMovie,
    castmembers: updatedCastMembers
  };

  // Save the updated movie to the database
  dbRef.child(movieId).set(updatedMovie);
  setModalVisible(false);

  // Additional code to handle TV Shows
  const moviesRef = database.ref('movies');
  moviesRef.once('value', (snapshot) => {
    const movies = snapshot.val();
    if (movies) {
      Object.values(movies).forEach((movie) => {
        if (movie.typeoffilm === 'TV Show') {
          movie.season1athing = true;
          if (movie.season1 || movie.season2) {
            moviesRef.child(movie.id).update(movie);
          }
        }
      });
    }
  });

  // Update the weeks until audition
  database.ref('movies').once('value', (snapshot) => {
    const movies = snapshot.val();
    if (movies) {
      Object.values(movies).forEach((movie) => {
        const weeks = Math.floor(Math.random() * 10) + 8;
        movie.weeksUntilaudition = weeks;
        database.ref('movies').child(movie.id).update({ weeksUntilaudition: weeks });
      });
    }
  });
};

const addtheaudition = () => {
  const movieId = selectedMovie.id;
  movies = movies.filter((movie) => movie.id !== movieId);

  // Remove the movie from the "movies" part of the database
  dbRef.child(movieId).remove();

  // Add the movie to the "auditions" part of the database
  dbRefAuditions.child(movieId).set(selectedMovie);

  setModalVisible(false);

  // Create a new updated movie object
  const updatedMovie = {
    ...selectedMovie,
  };

  // Update the selected movie's castmembers with the constructed string
  setSelectedMovie(updatedMovie);
};


  const handleModalButton1Press = () => {
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
  };

  const accept = () => {
    if (rating > selectedMovie.directing) {
  selectedMovie.auditionchance = Math.random();

  if (rating >= 90) {
    if (selectedMovie.auditionchance <= 0.5) {
      Alert.alert('Alert', `You will audition for ${selectedMovie.title}  in ${selectedMovie.weeksUntilaudition} weeks`, [
        {
          text: 'Ok',
          onPress: () => { addthemovie(); },
        },
      ]);
    } else{
       Alert.alert('Alert', 'You will not get an audition for the role.', [
        {
          text: 'Ok',
          onPress: () => {setModalVisible(false)},
        },
      ]);

    }

  }
     if (rating >= 80 ) {
      if (selectedMovie.auditionchance <= 0.45) {
      Alert.alert('Alert', `You will audition for ${selectedMovie.title} in ${selectedMovie.weeksUntilaudition} weeks`, [
          {
            text: 'Ok',
            onPress: () => { addthemovie(); },
          },
        ]);
      }else{
       Alert.alert('Alert', 'You will not get an audition for the role.', [
        {
          text: 'Ok',
          onPress: () => {setModalVisible(false), handleReset()},
        },
      ]);

    }
      
    } 
    if (rating >= 70 ) {
      if (selectedMovie.auditionchance <= 0.35) {
      Alert.alert('Alert', `You will audition for ${selectedMovie.title} in ${selectedMovie.weeksUntilaudition} weeks`, [
          {
            text: 'Ok',
            onPress: () => { addthemovie(); },
          },
        ]);
      }else{
       Alert.alert('Alert', 'You will not get an audition for the role.', [
        {
          text: 'Ok',
          onPress: () => {setModalVisible(false), handleReset()},
        },
      ]);

    }
    } 
    if (rating >= 60) {
      if (selectedMovie.auditionchance <= 0.25) {
      Alert.alert('Alert', `You will audition for ${selectedMovie.title} in ${selectedMovie.weeksUntilaudition} weeks`, [
          {
            text: 'Ok',
            onPress: () => { addthemovie(); },
          },
        ]);
      }else{
       Alert.alert('Alert', 'You will not get an audition for the role.', [
        {
          text: 'Ok',
          onPress: () => {setModalVisible(false), handleReset()},
        },
      ]);

    }
    }
    
  if (rating >= 50) {
      if (selectedMovie.auditionchance <= 0.15) {
      Alert.alert('Alert', `You will audition for ${selectedMovie.title} in ${selectedMovie.weeksUntilaudition} weeks`, [
          {
            text: 'Ok',
            onPress: () => { addthemovie(); },
          },
        ]);
      }else{
       Alert.alert('Alert', 'You will not get an audition for the role.', [
        {
          text: 'Ok',
          onPress: () => {setModalVisible(false), handleReset()},
        },
      ]);

    }
    }

    if (rating < 50) {
      if (selectedMovie.auditionchance <= 0.10) {
      Alert.alert('Alert', `You will audition for ${selectedMovie.title} in ${selectedMovie.weeksUntilaudition} weeks`, [
          {
            text: 'Ok',
            onPress: () => { addthemovie(); },
          },
        ]);
      }else{
       Alert.alert('Alert', 'You will not get an audition for the role.', [
        {
          text: 'Ok',
          onPress: () => {setModalVisible(false), handleReset()},
        },
      ]);

    }
    }
  
} else {
  Alert.alert(
    'Ignored',
    'You did not hear back',
    [
      {
        text: 'Ok',
        onPress: () => {
          setModalVisible(false);
         handleReset()
        },
      },
    ]
  );
}

  };
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
    </View>
  );

  const filteredMovies = typeofmovieFilter
    ? movies.filter((movie) => movie.typeoffilm === typeofmovieFilter) // Updated the filter condition
    : movies;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Castcall</Text>
        <TouchableOpacity style={styles.resetButton} onPress={navback}>
          <Text style={styles.resetButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sectionFilter}></View>
      <View style={styles.typeofmovieFilter}>
        <TouchableOpacity
          style={[
            styles.typeofmovieFilterButton,
            typeofmovieFilter === null && styles.typeofmovieFilterButtonActive,
          ]}
          onPress={() => handleTypeofmovieFilter(null)}>
          <Text
            style={[
              styles.typeofmovieFilterButtonText,
              typeofmovieFilter === null &&
                styles.typeofmovieFilterButtonTextActive,
            ]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.typeofmovieFilterButton,
            typeofmovieFilter === 'Tv Show' &&
              styles.typeofmovieFilterButtonActive,
          ]}
          onPress={() => handleTypeofmovieFilter('Tv Show')}>
          <Text
            style={[
              styles.typeofmovieFilterButtonText,
              typeofmovieFilter === 'Tv Show' &&
                styles.typeofmovieFilterButtonTextActive,
            ]}>
            TV Show
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.typeofmovieFilterButton,
            typeofmovieFilter === 'Short Film' &&
              styles.typeofmovieFilterButtonActive,
          ]}
          onPress={() => handleTypeofmovieFilter('Short Film')}>
          <Text
            style={[
              styles.typeofmovieFilterButtonText,
              typeofmovieFilter === 'Short Film' &&
                styles.typeofmovieFilterButtonTextActive,
            ]}>
            Short Film
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={moviesData}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        {renderModalContent()}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D1D2D2',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  movieBox: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
    justifyContent: 'center',
    width: 370,
    height: 220,
    marginLeft: 0,
    marginTop: 20,
  },
  descriptionword: {
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue', // Yellow color
  },
  descview: {
    marginTop: 80,
  },
  resetButton: {
    backgroundColor: '#3246EB', // Gold color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
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
  typeofmovieFilter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  typeofmovieFilterButton: {
    backgroundColor: '#808080', // Gray color
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  typeofmovieFilterButtonText: {
    color: '#333333', // Dark gray color
    fontWeight: 'bold',
  },
  typeofmovieFilterButtonActive: {
    backgroundColor: '#3246EB', // Gold color
  },
  typeofmovieFilterButtonTextActive: {
    color: '#000000', // Black color
    fontWeight: 'bold',
  },
  actualdescription: {},
  sectionFilterButton: {
    backgroundColor: '#808080', // Gray color
    paddingVertical: 5,
    paddingHorizontal: 1,
    borderRadius: 5,
  },
  sectionFilterButtonText: {
    color: '#333333', // Dark gray color
    fontWeight: 'bold',
  },
  sectionFilterButtonActive: {
    backgroundColor: '#FFD700', // Gold color
  },
  sectionFilterButtonTextActive: {
    color: '#000000', // Black color
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
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black', // Yellow color
    marginTop: -5,
  },
  movieGenre: {
    fontSize: 14,
    color: 'black', // Light gray color
    marginTop: 0,
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#444444', // Black color
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFF00', // Yellow color
  },
  modalBio: {
    fontSize: 16,
    marginBottom: 20,
    color: '#FFFFFF', // White color
  },
  modalSection: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFFF00', // Yellow color
  },
  modalActingLevel: {
    fontSize: 14,
    marginBottom: 20,
    color: '#FFFFFF', // White color
  },
  modalButton: {
    backgroundColor: 'green', // Red color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
  },
  modalButton2: {
    backgroundColor: 'red', // Red color
    borderRadius: 5,
    alignSelf: 'center',
    height: 45,
    width: 155,
    marginTop: 50,
  },

  modalButtonText: {
    color: '#FFFFFF', // White color
    fontWeight: 'bold',
    fontSize: 20,
    textalign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
});

export default App;
