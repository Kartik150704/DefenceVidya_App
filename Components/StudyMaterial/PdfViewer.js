import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { Linking } from 'react-native';
import { Button, List, Divider } from 'react-native-paper';

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

const getPdfDownloadURLWithToken = async (pdfPath, accessToken) => {
  const storage = getStorage();

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

const PdfViewer = () => {
  const [pdfLinks, setPdfLinks] = useState([]);

  useEffect(() => {
    async function fetchPdfLinks() {
      const pdfItems = [
        { path: 'StudyMaterial/Google/Lecture1.pdf', token: 'e676d474-ffc4-4627-9109-b28acbacbeaf' },
        { path: 'StudyMaterial/Google/Lecture1.pdf', token: 'e676d474-ffc4-4627-9109-b28acbacbeaf' },
        { path: 'StudyMaterial/Google/Lecture1.pdf', token: 'e676d474-ffc4-4627-9109-b28acbacbeaf' },
        { path: 'StudyMaterial/Google/Lecture1.pdf', token: 'e676d474-ffc4-4627-9109-b28acbacbeaf' }
        // Add more PDF items here
      ];

      const pdfLinks = await Promise.all(
        pdfItems.map(async (item) => {
          const link = await getPdfDownloadURLWithToken(item.path, item.token);
          return { ...item, link };
        })
      );

      setPdfLinks(pdfLinks);
    }

    fetchPdfLinks();
  }, []);

  const openPdfInChrome = async (pdfLink) => {
    const supported = await Linking.canOpenURL(pdfLink);

    if (supported) {
      await Linking.openURL(pdfLink);
    } else {
      console.log(`Cannot open URL: ${pdfLink}`);
    }
  };

  const renderItem = ({ item }) => (
    <List.Item
      title={`PDF Lecture ${item.path}`}
      description="Click to open"
      onPress={() => openPdfInChrome(item.link)}
      style={styles.listItem}
      titleStyle={styles.title}
      descriptionStyle={styles.description}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={pdfLinks}
        renderItem={renderItem}
        keyExtractor={(item) => item.path}
        ItemSeparatorComponent={() => <Divider />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listItem: {
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default PdfViewer;