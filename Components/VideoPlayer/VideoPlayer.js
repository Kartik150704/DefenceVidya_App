import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ResizeMode, Video } from 'expo-av';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyClCN3-iXsY3sR_t_p723eXdz-fZr1WV-g",
  authDomain: "friend-website-45257.firebaseapp.com",
  projectId: "friend-website-45257",
  storageBucket: "friend-website-45257.appspot.com",
  messagingSenderId: "387813290760",
  appId: "1:387813290760:web:638da9a8a110d99395f2bd",
  measurementId: "G-MNSPGVSE1F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const getVideoDownloadURLWithToken = async (videoPath, accessToken) => {
  const storage = getStorage();
  
  const videoRef = ref(storage, videoPath);
  
  try {
    const downloadURL = await getDownloadURL(videoRef);
    const downloadURLWithToken = `${downloadURL}?token=${accessToken}`;
    console.log(downloadURLWithToken)
    return downloadURLWithToken;
  } catch (error) {
    console.error('Error getting video download URL:', error);
    return null;
  }
};

const VideoPlayer = () => {
  const [videoLink, setVideoLink] = useState('');

  useEffect(() => {
    async function fetchVideoLink() {
      const videoPath = 'Lectures/Google/Lecture2.mp4';
      const accessToken = 'e676d474-ffc4-4627-9109-b28acbacbeaf';
      const link = await getVideoDownloadURLWithToken(videoPath, accessToken);
      setVideoLink(link);
      
    }
    fetchVideoLink();
  }, []);

  return (
    <View style={styles.container}>
      {videoLink && <Video
        source={{ uri: videoLink }} // Replace with your video URL
        style={styles.videoPlayer}
        useNativeControls={true}
        activityIndicator={true}
        videoAspectRatio="16:9"
        resizeMode='stretch'
        // resizeMode='contain'
        showDuration={true}
      />}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      // alignItems: 'center',
      flexDirection:'column'
    },
    videoPlayer: {
      alignSelf: 'center',
      height: '40%',
      width:'80%',
      resizeMode: 'stretch' ,
      overflow:'hidden',
      margin:'10px'  // Adjust the aspect ratio based on your video's dimensions
      },
  });
  

export default VideoPlayer;
