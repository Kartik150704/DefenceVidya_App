import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity ,StyleSheet} from 'react-native';
import styles from './Navbarcss.js'; // Adjust the path based on your file structure
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './LoginPage.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CourseList from './Courses/CourseList.js';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import MyCourses from './Student/MyCourses.js';

const NavBar = ({ navigation }) => {


  const [useremail, setuseremail] = useState(AsyncStorage.getItem('useremail') | null);
  const [username, setusername] = useState(AsyncStorage.getItem('username') | null)

  const [flag, setflag] = useState(1)
  useEffect(() => {
    const fetchData = async () => {
      const userEmailFromStorage = await AsyncStorage.getItem('useremail');
      const usernameFromStorage = await AsyncStorage.getItem('username');

      setuseremail(userEmailFromStorage);
      setusername(usernameFromStorage);
    };

    fetchData();
  }, []);
  if (useremail == null && username == null) {

  }

  const openlogin = () => {

    navigation.navigate("LoginPage")

  }


  const logout = () => {

    setuseremail(0);
    AsyncStorage.removeItem('username')
    AsyncStorage.removeItem('useremail')

  }

  const Signup = () => {
    navigation.navigate("SignupPage")
  }

  const Refresh = async () => {


    const userEmailFromStorage = await AsyncStorage.getItem('useremail');
    const usernameFromStorage = await AsyncStorage.getItem('username');

    setuseremail(userEmailFromStorage);
    setusername(usernameFromStorage);





  }

  return (
    <GestureHandlerRootView >

    <ScrollView>
    <View style={styles1.container}>
      {(useremail == 0 || useremail == null) && <TouchableOpacity onPress={openlogin}><Text style={styles.loginbutton}>Sign In</Text></TouchableOpacity>}
      {(useremail != 0 && useremail != null) && <TouchableOpacity ><Text style={styles.loginbutton}>{username}</Text></TouchableOpacity>}
      {(useremail != 0 && useremail != null) && <TouchableOpacity onPress={logout}><Text style={styles.signupbutton}>Log Out</Text></TouchableOpacity>}
      {(useremail == 0 || useremail == null) && <TouchableOpacity onPress={Signup}><Text style={styles.signupbutton}>Signup</Text></TouchableOpacity>}
      {(useremail == 0 || useremail == null) && <TouchableOpacity onPress={Refresh}><Text style={styles.signupbutton}>Refresh</Text></TouchableOpacity>}

    </View>
    <View>
      {(useremail!=0 && useremail!=null) && <MyCourses prop={useremail} navigation={navigation}/>}

    </View>
    <View>
      {(useremail!=0 && useremail!=null) && <CourseList navigation={navigation}/>}
    </View>





    </ScrollView>
    
    </GestureHandlerRootView>
  );
};

const styles1={
  container:
  {
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    margin:20
  }
}

export default NavBar;
