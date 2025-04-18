import React, {useState, useRef} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const BannerCarousel = ({banners}) => {
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const renderBannerItem = ({item, index}) => {
    return (
      <TouchableOpacity key={index} style={styles.slide} activeOpacity={0.9}>
        <Image
          source={{uri: item}}
          style={styles.bannerImage}
          resizeMode="cover"
          onError={e =>
            console.log('Banner image load error:', e.nativeEvent.error)
          }
        />
      </TouchableOpacity>
    );
  };

  const handleViewAllPress = () => {
    console.log('View All pressed!');
  };

  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={banners}
        renderItem={renderBannerItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        autoplay={true}
        autoplayInterval={2000}
        loop={true}
        onSnapToItem={index => setActiveSlide(index)}
      />

      <View style={styles.bottomRowContainer}>
        <Pagination
          dotsLength={banners.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.paginationContainer}
          dotStyle={styles.paginationDot}
          inactiveDotStyle={styles.paginationInactiveDot}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />

        <TouchableOpacity
          style={styles.indicatorContainer}
          onPress={handleViewAllPress}>
          <Text style={styles.viewAllText}>View All</Text>
          <Text style={styles.icon}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  slide: {
    width: screenWidth,
    height: screenHeight * 0.22,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  bannerImage: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
  bottomRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: screenWidth * 0.04,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  paginationContainer: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: '#7feac4',
  },
  paginationInactiveDot: {
    backgroundColor: '#000',
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: screenWidth * 0.035,
    color: '#7feac4',
    fontWeight: '600',
    marginRight: 8,
  },
  icon: {
    fontSize: screenWidth * 0.055,
    color: '#333',
    fontWeight: '700',
  },
});

export default BannerCarousel;
