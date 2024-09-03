import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import StartCareerScreen from './components/StartCareerScreen';
import Chrome from './components/Chrome';
import Phone from './components/Phone';
import Instagram from './components/Instagram';
import BottomNavigator from './components/BottomNavigator';  
import Training from './components/Training';
import Splash from './components/Splash';
import Week from './components/Week';  
import Character from './components/Character';
import College from './components/College';                           
import Auditions from './components/Auditions'; 
import Actdashboard from './components/Actdashboard';   
import Actingprofile from './components/Actingprofile';   
import AssetExample from './components/AssetExample';
import Assets from './components/Assets';  
import Realestate from './components/Realestate';
import Cars from './components/Cars'; 
import Bank from './components/Bank';
import Acting from './components/Acting';     
import LoginScreen from './components/LoginScreen'; 
import Beginnerauditions from './components/Beginnerauditions';
import Driverslicense from './components/Driverslicense';    
import Ownedhomes from './components/Ownedhomes';      
import Tindr from './components/Tindr';      
import Relationships from './components/Relationships'; 
import Shopping from './components/Shopping'; 
import Allshoppingstuff from './components/Allshoppingstuff';      
import Stuff from './components/Stuff'; 
import Ownedcars from './components/Ownedcars';
import Jobs from './components/Job';
import Twittr from './components/Twittr';
import Network from './components/Network';
import Syndication from './components/Sydication';
import Settings from './components/Settings';

import { Easing, StatusBar, StyleSheet, Text, View } from 'react-native';

import {
  TransitionSpecs,
  HeaderStyleInterpolators,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import firebase from 'firebase';

const Stack = createStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const closeConfig = {
  animation: 'timing',
  config: {
    duration: 160,       
    easing: Easing.linear,
  },
};

const customTransition = {
  gestureEnabled: true, 
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          {
            rotate: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: ['180deg', '0deg'],
            }),
          },
          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.7],
                })
              : 1,
          },
        ],
      },
      opacity: current.opacity,
    };
  },
};

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true, 
        gestureDirection: 'vertical',
      }}>
      <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
      <Stack.Screen name="StartCareerScreen" component={StartCareerScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Chrome" component={Chrome} />
      <Stack.Screen name="Phone" component={Phone} />
      <Stack.Screen name="Training" component={Training} />
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="College" component={College} />
      <Stack.Screen name="Instagram" component={Instagram} />
      <Stack.Screen name="Character" component={Character} />
      <Stack.Screen name="Auditions" component={Auditions} />
      <Stack.Screen name="Actingprofile" component={Actingprofile} />
      <Stack.Screen name="Actdashboard" component={Actdashboard} />
      <Stack.Screen name="AssetExample" component={AssetExample} />
      <Stack.Screen name="Assets" component={Assets} />
      <Stack.Screen name="Realestate" component={Realestate} />
      <Stack.Screen name="Cars" component={Cars} />
      <Stack.Screen name="Bank" component={Bank} />
      <Stack.Screen name="Acting" component={Acting} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Beginnerauditions" component={Beginnerauditions} />
      <Stack.Screen name="Driverslicense" component={Driverslicense} />
      <Stack.Screen name="Ownedhomes" component={Ownedhomes} />
      <Stack.Screen name="Tindr" component={Tindr} />
      <Stack.Screen name="Relationships" component={Relationships} />
      <Stack.Screen name="Shopping" component={Shopping} />
      <Stack.Screen name="Allshoppingstuff" component={Allshoppingstuff} />
      <Stack.Screen name="Stuff" component={Stuff} />
      <Stack.Screen name="Ownedcars" component={Ownedcars} />
      <Stack.Screen name="Jobs" component={Jobs} />
      <Stack.Screen name="Twittr" component={Twittr} />
      <Stack.Screen name="Network" component={Network} />
      <Stack.Screen name="Syndication" component={Syndication} />
      <Stack.Screen name="Settings" component={Settings} />

      <Stack.Screen
        name="Week"
        component={Week}
        options={{
          gestureDirection: 'vertical',
          transitionSpec: {
            open: config,
            close: closeConfig,
            edgeWidth: 0,
          },
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

export default App;
