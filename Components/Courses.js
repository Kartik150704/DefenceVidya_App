import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: 50,
        alignItems: 'center',
    },
    courseBox: {
        backgroundColor: 'lightgray',
        padding: 10,
        margin: 5,
        borderRadius: 5,
        width: 200,
        height: 150,
    },
    courseText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    arrowButtonsContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    arrowButton: {
        paddingHorizontal: 15,
    },
});

class Course {

    constructor() {
        this.courseNames = [];
        this.currentIndex = 0;
    }

    push(coursename) {
        this.courseNames.push(coursename);
        console.log(this.courseNames.length);
    }

    moveNext() {
        console.log(this.currentIndex);
        if (this.currentIndex < this.courseNames.length - 1) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0;
        }
        
        
    }

    movePrev() {
        console.log(this.currentIndex);
        if (this.currentIndex > 0) {
            this.currentIndex --    ;
        } else {
            this.currentIndex = this.courseNames.length - 1;
        }
    }

    getCurrentCourse(index) {
        console.log(this.courseNames[index])
        return this.courseNames[index];
    }

    display(index) {
        return (
            <View style={styles.courseBox}>
                <Text style={styles.courseText}>{this.courseNames[index]}</Text>
            </View>
        );
    }


   
}

const Courses = () => {
    const c1 = new Course();
    c1.push("Google");
    c1.push("React Native");
    c1.push("JavaScript");
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const moveNext = () => 
    {
        if(currentIndex<c1.courseNames.length-1)
        {
            // currentIndex++;
            setCurrentIndex(currentIndex + 1);

        }
        else
        {
            // currentIndex=0;
            setCurrentIndex(0);
        }

    }
    const movePrev = () =>
    {
        if(currentIndex>0)
        {
            // currentIndex--;
            setCurrentIndex(currentIndex - 1);

        }
        else
        {
            // currentIndex= c1.courseNames.length-1;
            setCurrentIndex(c1.courseNames.length-1);
        }
    }
    return(
        <View style={styles.arrowButtonsContainer}>
                {c1.display(currentIndex)}
                <TouchableOpacity style={styles.arrowButton} onPress={() => movePrev()}>
                    <Text>←</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.arrowButton} onPress={() => moveNext()}>
                    <Text>→</Text>
                </TouchableOpacity>
            </View>
    )
};

export default Courses;
