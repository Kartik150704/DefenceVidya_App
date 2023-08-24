import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';


const SignupPage = ({navigation}) => {
    function generateOTP() {
        const otpLength = 5;
        let otp = '';
        
        for (let i = 0; i < otpLength; i++) {
          otp += Math.floor(Math.random() * 10);
        }
        
        return otp;
      }
    const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDOB] = useState('');
  const [course, setCourse] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState('');
  const [trueOTP,setTrueOTP]=useState('')

  const handleSignup = async () => {
    // Implement your signup logic here
    // For now, let's just show the OTP field
    alert("Otp sent successfully")
    let totp=generateOTP()
    
    let otpdata={
        receiver:email,
        otp:totp,
        mobNo:mobile

    }
    setTrueOTP(totp)

    let response=await fetch("http://localhost:8080/dv/verifyotp",
    {
        method:'POST',
        headers:
        {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(otpdata)
    })

    response=await response.json();
    console.log(response);
    if(response.otp=="sent successfully")
    {
        setShowOTP(true)
    }

    
  };

  const handleVerifyOTP = async () => {
    // Implement your OTP verification logic here
    // For now, let's just log the entered OTP
    let userdata={
        fullname:fullName,
        email:email,
        contactnumber:mobile,
        password:password,
        course:course
    }
    if(trueOTP==otp)
    {
        let response=await fetch('http://localhost:8080/dv/students/signup',
        {
            method:'POST',
            headers:
            {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(userdata)
        })

        response=await response.json();
        console.log(response)
        if(response.status=="present")
        {
            alert("User is already present , You can login :) ")
            navigation.navigate("LoginPage")
        }
        else
        {
            alert("User registered successfully , You can login now :)")
            navigation.navigate("LoginPage")
        }
    }
    
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        onChangeText={(text) => setFullName(text)}
        value={fullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Date of Birth"
        onChangeText={(text) => setDOB(text)}
        value={dob}
      />
      <TextInput
        style={styles.input}
        placeholder="Course"
        onChangeText={(text) => setCourse(text)}
        value={course}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        onChangeText={(text) => setMobile(text)}
        value={mobile}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
        secureTextEntry
      />
      {showOTP ? (
        <View >
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            onChangeText={(text) => setOTP(text)}
            value={otp}
          />
          <Button title="Verify OTP" onPress={handleVerifyOTP} />
        </View>
      ) : (
        <View style={styles.backbutton}>

        <Button title="Sign Up" onPress={handleSignup} >Sign Up</Button>

        </View>
      )}
      <View style ={styles.backbutton}>

      <Button  title="Back" onPress={() => setShowOTP(false)} >Back</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width:'100vw',
    marginTop:100
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  backbutton:
  {
    width: '100%',
    height: 40,
    // marginBottom: 10,
    paddingLeft: 10,
    marginTop:10
  }
  
});

export default SignupPage;
