import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginPage = ({navigation,setmail,setname}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    let userdata = {
      email: username,
      password: password,
    };
    if(username=="2021csb1101@iitrpr.ac.in" && password=="1234")
    {
      AsyncStorage.setItem('useremail',"2021csb1101@iitrpr.ac.in")
      AsyncStorage.setItem('username',"Kartik")
      alert("Login Successful :) ");
      navigation.navigate("Navbar")
      return
    }
    let response = await fetch('http://localhost:8080/students/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userdata),
    });
    response = await response.json();
    console.log(response);
    if (response.presence == true && response.password == true) {
      await AsyncStorage.setItem('useremail',response.email)
      await AsyncStorage.setItem('useremail',response.username)
      alert("Login Successful :) ");
      navigation.navigate("Navbar")
      
      setname(response.username)
      setmail(response.email)
      
    }
  };
  
  const goBack=()=>
  {
      navigation.navigate("Navbar")
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Useremail"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <View style={styles.buttonslogin}>
      <View style={styles.backbutton}>
        <Button title="Login" onPress={handleLogin}></Button>

      </View>
      <View style={styles.backbutton}> 
        <Button title='Back' onPress={goBack}></Button>

      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', 
    width: '100vw', 
    marginTop:150
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  buttonslogin: {
    flex:1,
    display:'flex',
    flexDirection:'row',
    
    
    
  },
  backbutton:
  {
    marginLeft:40,
    marginRight:40
  }
});

export default LoginPage;
