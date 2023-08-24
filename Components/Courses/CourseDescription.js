import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {useState,useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const CourseDescription = ({route}) => {

    const {courseTitle}=route.params
    const [username,setusername]=useState(AsyncStorage.getItem('username'));
    const [useremail,setuseremail]=useState(AsyncStorage.getItem('useremail'))
    let userdata={course:courseTitle}
    const [course,setcourse]=useState(hardcourse)
    
    const getCourses = async () => {

        let temail=await AsyncStorage.getItem('useremail')
        let tuser=await AsyncStorage.getItem('username')

        setuseremail(temail);
        setusername(tuser)

        // console.log(temail);
        // console.log(tuser);  

        console.log(useremail);
        console.log(username)

        let response = await fetch("http://localhost:8080/dv/allaboutcourse",
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

    const PlayVideo=async ()=>
    {
        
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
                                <Text style={styles.playButtonText}>Play</Text>
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
                                <Text style={styles.downloadButtonText}>Download</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
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
});

export default CourseDescription;
