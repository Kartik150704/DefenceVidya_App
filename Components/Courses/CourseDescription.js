import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity,Modal } from 'react-native';
import {useState,useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';

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


const hardcourse = {
    id: 1,
    title: 'Introduction to React Native',
    description: 'Learn the basics of React Native development.',
    image: 'https://www.google.com/logos/doodles/2015/googles-new-logo-5078286822539264.3-hp2x.gif',
    lectures: [
        { id: 1, title: 'Getting Started', videoUrl: 'https://example.com/lecture-1.mp4' },
        { id: 2, title: 'Components and Styling', videoUrl: 'https://example.com/lecture-2.mp4' },
        { id: 3, title: 'Getting Started', videoUrl: 'https://example.com/lecture-1.mp4' },
        { id: 4, title: 'Getting Started', videoUrl: 'https://example.com/lecture-1.mp4' },

        // ... more lectures
    ],
    studyMaterials: [
        { id: 1, title: 'Introduction to React', pdfUrl: 'https://example.com/intro-to-react.pdf' },
        { id: 2, title: 'Styling in React Native', pdfUrl: 'https://example.com/styling-in-react-native.pdf' },
        // ... more study materials
    ],
};

const CourseDescription = ({navigation,route}) => {

    // Download Link of a particular video
    const getVideoDownloadURLWithToken = async (videoPath) => {
        const storage = getStorage();
        const accessToken = 'e676d474-ffc4-4627-9109-b28acbacbeaf';
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

      //Download Pdf link

      const getPdfDownloadURLWithToken = async (pdfPath) => {
        const storage = getStorage();
        const accessToken = 'e676d474-ffc4-4627-9109-b28acbacbeaf';
        const pdfRef = ref(storage, pdfPath);
      
        try {
          const downloadURL = await getDownloadURL(pdfRef);
          const downloadURLWithToken = `${downloadURL}?token=${accessToken}`;
          return downloadURLWithToken;
        } catch (error) {
          console.error('Error getting PDF download URL:', error);
          return null;
        }
      };


    const {courseTitle}=route.params
    const [username,setusername]=useState(AsyncStorage.getItem('username'));
    const [useremail,setuseremail]=useState(AsyncStorage.getItem('useremail'))
    let userdata={course:courseTitle}
    const [course,setcourse]=useState(hardcourse)
    const [isModalVisible, setModalVisible] = useState(false);
    // Buy Course Window
    const closeModal = () => {
        setModalVisible(false);
        
    };
    
    const getCourses = async () => {

        let temail=await AsyncStorage.getItem('useremail')
        let tuser=await AsyncStorage.getItem('username')

        setuseremail(temail);
        setusername(tuser)

        // console.log(temail);
        // console.log(tuser);  

        console.log(useremail);
        console.log(username)

        let response = await fetch("https://betawill-com.onrender.com/dv/allaboutcourse",
            {
                
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'

                },
                body:JSON.stringify(userdata)
            })

        response=await response.json();
        let lecture=response.lectures
        let aboutcourse=response.aboutcourse
        let lectt=[];
        let pdft=[];
        for(let i=0;i<lecture.total_lectures;i++)
        {
            let x={
                id:i+1,
                title:lecture.descriptions[i],
                videoUrl:""
            }
            let y={
                id:i+1,
                title:lecture.descriptions[i],
                pdfUrl:""
            }
            lectt.push(x);
            pdft.push(y);
        }
        let temp={
            id:1,
            title:aboutcourse.heading,
            description:aboutcourse.about,
            image:'https://www.google.com/logos/doodles/2015/googles-new-logo-5078286822539264.3-hp2x.gif',
            lectures:lectt,
            studyMaterials:pdft

            
        }

        setcourse(temp)
        
    }


    useEffect(() => {
        getCourses();
    }, []);


    // Checking whether Buyer has that course or not

    const PlayVideo=async (index)=>
    {
        let response=await fetch("https://betawill-com.onrender.com/dv/check/coursebuy",{
            method:"POST",
            headers:
            {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({user:useremail,course:courseTitle})
        })

        response=await response.json();
        if(response)
        {
            let videoPath=`Lectures/${courseTitle}/Lecture${index}.mp4`;
            let link=await getVideoDownloadURLWithToken(videoPath);
            console.log(link);
            Linking.openURL(link)
        }
        else
        {
            setModalVisible(true)
        }
        
    }

    const OpenPdf=async (index)=>
    {
        let response=await fetch("https://betawill-com.onrender.com/dv/check/coursebuy",{
            method:"POST",
            headers:
            {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({user:useremail,course:courseTitle})
        })

        response=await response.json();
        if(response)
        {
            let videoPath=`StudyMaterial/${courseTitle}/Lecture${index}.pdf`;
            let link=await getPdfDownloadURLWithToken(videoPath);
            console.log(link);
            Linking.openURL(link)
        }
        else
        {
            setModalVisible(true)
        }
    }

    const goToBuyCourse=()=>
    {
        setModalVisible(false)
        navigation.navigate("payment",{coursetitle:courseTitle})
    }
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>{course.title}</Text>
            <ScrollView style={styles.scrollContainer}>
                <Image source={{ uri: course.image }} style={styles.courseImage} />
                <Text style={styles.courseDescription}>{course.description}</Text>
                <Text style={styles.lectureCount}>Number of Lectures: {course.lectures.length}</Text>
                <View style={styles.lecturesListContainer}>
                    <Text style={styles.sectionHeading}>Lectures</Text>
                    {course.lectures.map(lecture => (
                        <View key={lecture.id} style={styles.itemContainer}>
                            <Text style={styles.itemTitle}>{lecture.title}</Text>
                            <TouchableOpacity style={styles.playButton}>
                                <Text onPress={()=>PlayVideo(lecture.id)} style={styles.playButtonText}>Play</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
                <View style={styles.studyMaterialsContainer}>
                    <Text style={styles.sectionHeading}>Study Materials</Text>
                    {course.studyMaterials.map(material => (
                        <View key={material.id} style={styles.itemContainer}>
                            <Text style={styles.itemTitle}>{material.title}</Text>
                            <TouchableOpacity style={styles.downloadButton}>
                                <Text onPress={()=>OpenPdf(material.id)} style={styles.downloadButtonText}>Download</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
                <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>You have not bought this course yet.</Text>
                    <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                        <Text style={styles.modalButtonText}>Close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                        <Text style={styles.modalButtonText} onPress={goToBuyCourse}>Buy Course</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    heading: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        margin: 10,
    },
    scrollContainer: {
        margin: 10,
    },
    courseImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    courseDescription: {
        fontSize: 16,
        marginBottom: 10,
    },
    lectureCount: {
        fontSize: 18,
        marginBottom: 10,
    },
    sectionHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    lectureItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    lectureTitle: {
        fontSize: 16,
        flex: 1,
    },
    playButton: {
        backgroundColor: '#3498db',
        padding: 5,
        borderRadius: 5,
    },
    playButtonText: {
        color: 'white',
        fontSize: 14,
    },
    lecturesListContainer: {
        borderTopWidth: 1,
        borderColor: '#ccc',
        marginTop: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    itemTitle: {
        fontSize: 16,
        flex: 1,
    },
    downloadButton: {
        backgroundColor: '#27ae60',
        padding: 5,
        borderRadius: 5,
    },
    downloadButtonText: {
        color: 'white',
        fontSize: 14,
    },
    studyMaterialsContainer: {
        borderTopWidth: 1,
        borderColor: '#ccc',
        marginTop: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Almost invisible background
    },
    modalContent: {
        backgroundColor: 'white',
        marginTop:20,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        height: '50%', // Set the height to 50% of the screen
        marginTop: '25%', // 25% margin from the top
        marginBottom: '25%', // 25% margin from the bottom
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButton: {
        backgroundColor: '#3498db',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop:30,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CourseDescription;
