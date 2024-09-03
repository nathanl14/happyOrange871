import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Phone from "./Chrome"
import Chrome from "./Chrome"
import Instagram from "./Instagram"


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Phone Screen"
        onPress={() => navigation.navigate('Phone')}
      />
    </View>
  );
}

function PhoneScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Phone Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Chrome" component={Chrome} />
        <Stack.Screen name="Phone" component={Phone} />
         <Stack.Screen name="Instagram" component={Instagram} />

       

      </Stack.Navigator>
    </NavigationContainer>
  );
}
