import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const UploadMaterial = () => {
    const [courseName, setCourseName] = useState('');
    const [courseImage, setCourseImage] = useState('');
    const [coursePrice, setCoursePrice] = useState('');
    const [numLectures, setNumLectures] = useState(1);
    const [lectureData, setLectureData] = useState(Array(numLectures).fill({ video: '', description: '', pdf: '' }));

    const handleUpload = () => {
        // Implement your uploading logic here
        // You can use courseName, courseImage, coursePrice, and lectureData to send to your backend
        const courseData = {
            name: courseName,
            image: courseImage,
            price: coursePrice,
            lectures: lectureData,
        };

        // Send courseData to your backend for processing
        console.log('Course data uploaded:', courseData);
    };

    const handleFilePicker = async (index) => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.video, DocumentPicker.types.pdf],
            });

            const updatedLectureData = [...lectureData];
            updatedLectureData[index][result.type === 'video/mp4' ? 'video' : 'pdf'] = result.uri;
            setLectureData(updatedLectureData);
        } catch (error) {
            console.log('File picking error:', error);
        }
    };

    const renderLectureFields = () => {
        const lectureFields = [];
        for (let i = 0; i < numLectures; i++) {
            lectureFields.push(
                <View key={i} style={styles.lectureContainer}>
                    <Text style={styles.lectureHeading}>{`Lecture ${i + 1}`}</Text>
                    <Button title="Upload Video" onPress={() => handleFilePicker(i)} />
                    <Button title="Upload PDF" onPress={() => handleFilePicker(i)} />
                    <TextInput
                        style={styles.input}
                        placeholder="Lecture Description"
                        value={lectureData[i].description}
                        onChangeText={text => handleLectureChange(i, 'description', text)}
                        multiline
                    />
                </View>
            );
        }
        return lectureFields;
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Upload Course Lectures</Text>
            <TextInput
                style={styles.input}
                placeholder="Course Name"
                value={courseName}
                onChangeText={text => setCourseName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Course Image Link"
                value={courseImage}
                onChangeText={text => setCourseImage(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Course Price"
                value={coursePrice}
                onChangeText={text => setCoursePrice(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Number of Lectures"
                keyboardType="numeric"
                value={numLectures.toString()}
                onChangeText={text => setNumLectures(parseInt(text) || 1)}
            />
            {renderLectureFields()}
            <Button title="Upload" onPress={handleUpload} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
    },
    lectureContainer: {
        marginBottom: 20,
    },
    lectureHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default UploadMaterial;
