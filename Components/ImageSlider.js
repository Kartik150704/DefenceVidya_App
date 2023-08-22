import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Animated, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [position] = useState(new Animated.Value(0));

  useEffect(() => {
    startAutoPlay();

    return () => {
      stopAutoPlay();
    };
  }, []);

  const startAutoPlay = () => {
    autoPlayInterval = setInterval(nextSlide, 3000);
  };

  const stopAutoPlay = () => {
    clearInterval(autoPlayInterval);
  };

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % images.length;

    Animated.timing(position, {
      toValue: -nextIndex * SCREEN_WIDTH,
      duration: 500,
      useNativeDriver: true,
    }).start();

    setCurrentIndex(nextIndex);
  };

  const renderSlides = () => {
    return images.map((image, index) => (
      <Animated.View
        key={index}
        style={[
          styles.slide,
          {
            transform: [
              { perspective: 1000 },
              {
                rotateY: position.interpolate({
                  inputRange: [
                    -SCREEN_WIDTH * (index + 1),
                    -SCREEN_WIDTH * index,
                    -SCREEN_WIDTH * (index - 1),
                  ],
                  outputRange: ['-120deg', '0deg', '120deg'],
                }),
              },
            ],
          },
        ]}
      >
        <Image source={image} style={styles.image} resizeMode="cover" />
      </Animated.View>
    ));
  };

  return (
    <View style={styles.sliderContainer}>
      <Animated.View style={[styles.slider, { transform: [{ translateX: position }] }]}>
        {renderSlides()}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    flexDirection: 'row',
    width: SCREEN_WIDTH * 3,
    height: 200,
  },
  slide: {
    width: SCREEN_WIDTH,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImageSlider;
