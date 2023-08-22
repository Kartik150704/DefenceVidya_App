import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './Navbarcss.js'; // Adjust the path based on your file structure
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from './LoginPage.js';


const Stack = createNativeStackNavigator();
const NavBar = () => {

  const [login,setlogin]=useState(false);
  const [signup,setsignup]=useState(false);
  const [userdata,setuserdata]=useState(null);
  const openlogin=()=>
  {
    setlogin(true);
    setsignup(true)
  }

  const opensignup=()=>
  {

  }

  const logout=()=>
  {
      setlogin(false);
      setsignup(false);
      setuserdata(null);
  }

  const openprofile=()=>
  {
      
  }

  return (
    <View style={styles.container}>
      {login ==false && userdata==null && <TouchableOpacity  onPress={openlogin}><Text style={styles.loginbutton}>Sign In</Text></TouchableOpacity>}
      {login ==true && userdata!=null && <TouchableOpacity  onPress={openprofile}><Text style={styles.loginbutton}>{userdata}</Text></TouchableOpacity>}
      {login ==true && userdata!=null && <TouchableOpacity  onPress={logout}><Text style={styles.signupbutton}>Log Out</Text></TouchableOpacity>}
      {signup==false && userdata==null && <TouchableOpacity ><Text style={styles.signupbutton}>Sign Up</Text></TouchableOpacity>}
      {login==true && userdata==null && <LoginPage setdata={setuserdata}/>}
    </View>
  );
};


export default NavBar;
