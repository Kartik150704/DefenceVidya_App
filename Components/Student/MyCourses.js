import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import firebase from 'firebase/app';
// import 'firebase/firestore';

// Initialize Firebase (Replace with your Firebase configuration)
// const firebaseConfig = {
//   apiKey: "your-api-key",
//   authDomain: "your-auth-domain",
//   projectId: "your-project-id",
//   storageBucket: "your-storage-bucket",
//   messagingSenderId: "your-messaging-sender-id",
//   appId: "your-app-id"
// };
// firebase.initializeApp(firebaseConfig);

// ... (Previous imports and code)

// ... (Previous imports and code)

const MyCourses = ({navigation,prop}) => {
    const [courses, setCourses] = useState([]);

    const fetchCourses = async () => {
        let response = await fetch("http://localhost:8080/dv/mycourses", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({email:prop})
        })
        response = await response.json();
        console.log(response);
        let tempcourse = response


        // for (let i = 0; i < tempcourse.length; i++) {
        //     let t = {
        //         id: i + 1,
        //         title: tempcourse[i].heading,
        //         description: tempcourse[i].about,
        //         // image:tempcourse[i].enrollLink
        //         image: "https://picsum.photos/id/237/536/354"
        //     }
        //     tempcourse[i] = t;
        // }
        setCourses(tempcourse);
        

    }
    useEffect(() => {
        // Your data fetching logic or dummy data here
        const dummyCourses = [
            { id: 1, title: 'Course 1', description: 'Description for Course 1', image: 'https://picsum.photos/id/237/536/354' },
            { id: 2, title: 'Course 2', description: 'Description for Course 2', image: 'https://picsum.photos/id/237/536/354' },
            { id: 3, title: 'Course 3', description: 'Description for Course 3', image: 'https://picsum.photos/id/237/536/354' },
            { id: 4, title: 'Course 4', description: 'Description for Course 4', image: 'https://picsum.photos/id/237/536/354' },

        ];

        setCourses(dummyCourses);
        fetchCourses();


    }, []);

    const goTOCourse=(title)=>
    {
        console.log("Function called")
        navigation.navigate("About Course",{courseTitle:title})
    }


    return (
        <View style={styles.container}>
            <Text style={styles.heading}>My Courses</Text>
            <GestureHandlerRootView>

            <ScrollView style={styles.scrollContainer}>
                {courses.map(course => (
                    <TouchableOpacity onPress={()=>goTOCourse(course.title)} key={course.id} style={styles.courseBox}>
                        <Image source={{ uri: course.image }} style={styles.courseImage} />
                        <View style={styles.textContainer}>
                            <Text style={styles.courseTitle}>{course.title}</Text>
                            <Text style={styles.courseDescription}>{course.description}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            </GestureHandlerRootView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        marginTop:10
    },
    heading: {
        textAlign: 'center',
        fontWeight: 'bold', // Adding this to make the text bold
        fontSize: 20, // Adjust the font size as needed
        margin: 10,
    },
    scrollContainer: {
        maxHeight: 400, // Specify the maximum height for scrollable content
        margin: 10
    },
    courseBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 10,
    },
    courseImage: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    courseTitle: {
        fontWeight: 'bold',
    },
    courseDescription: {
        marginTop: 5,
    },
});

export default MyCourses;