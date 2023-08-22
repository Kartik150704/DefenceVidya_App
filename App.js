import React from 'react';
import { View, StyleSheet } from 'react-native';
import Navbar from './Components/Navbar';
import CarouselCards from './Components/Coursel/CarouselCards.js';
import CourseList from './Components/Courses/CourseList';
import VideoPlayer from './Components/VideoPlayer/VideoPlayer';
import PdfViwer from './Components/StudyMaterial/PdfViewer';
const App = () => {
  

  return (
    <View style={{flex:1}}>
      <Navbar/>
      <CourseList/>
      <PdfViwer/>
    </View>
  );
};
 

export default App;
