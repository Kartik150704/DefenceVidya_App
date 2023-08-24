import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Linking } from 'react-native';

const PaymentPage = ({navigation,route}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [paymentLink, setPaymentLink] = useState(null);

    const {coursetitle}=route.params
    const handleBuyCourse = async () => {
        try {
            setLoading(true);

            let coursedata={
                course:coursetitle,
                email:email,
                password:password
            }
            console.log(coursedata)
            // Replace this with your actual API call to get the payment link from the backend
            const response = await fetch('http://localhost:8080/dv/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(coursedata),
            });
            const data = await response.json();
            // Assuming your backend responds with a payment link
            setPaymentLink(data.link);
            Linking.openURL(data.link)

        } catch (error) {
            console.error('Error fetching payment link:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Buy Course</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity
                style={styles.buyButton}
                onPress={handleBuyCourse}
                disabled={isLoading}
            >
                <Text style={styles.buttonText}>Buy Course</Text>
            </TouchableOpacity>
            {isLoading && <ActivityIndicator size="large" color="#3498db" />}
            {paymentLink && (
                <Text style={styles.paymentLink}>
                    
                </Text>
            )}
        </View>
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
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    buyButton: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    paymentLink: {
        marginTop: 20,
        fontSize: 16,
        color: '#3498db',
    },
});

export default PaymentPage;
