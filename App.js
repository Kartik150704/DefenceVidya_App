import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import LoginPage from './Components/LoginPage';
import SignupPage from './Components/SignupPage';
import Navbar from './Components/Navbar'
import CourseDescription from './Components/Courses/CourseDescription'
import MyCourses from './Components/Student/MyCourses';
import PaymentPage from './Components/BuyCourse/PaymentPage'

const Stack = createStackNavigator();

const App = () => {
  return (
    
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Navbar">
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="SignupPage" component={SignupPage} />
          <Stack.Screen name="Navbar" component={Navbar}/>
          <Stack.Screen name="About Course" component={CourseDescription}/>
          <Stack.Screen name="mycourses" component={MyCourses}/>
          <Stack.Screen name="payment" component={PaymentPage}/>
        </Stack.Navigator>
      </NavigationContainer>
    
  );
};

export default App;
