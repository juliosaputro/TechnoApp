import React, {useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchHomeData,
  selectHomeData,
  selectIsHomeLoading,
  selectHomeError,
} from '../../app/reducers/homeSlice';
import CardInfo from '../../shared-components/CardInfo';
import BannerCarousel from '../../shared-components/BannerCarousel';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const HomeScreen = () => {
  const dispatch = useDispatch();

  const homeData = useSelector(selectHomeData);
  const isLoading = useSelector(selectIsHomeLoading);
  const error = useSelector(selectHomeError);

  useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);

  const handleRefresh = useCallback(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);

  const renderBanners = () => {
    if (error && !isLoading) {
      return (
        <View style={styles.centeredMessageContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <Text style={styles.infoText}>Pull down to retry</Text>
        </View>
      );
    }

    if (isLoading && !homeData?.result?.banner) {
      return (
        <View style={styles.centeredMessageContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      );
    }

    if (homeData?.result?.banner) {
      const banners = Array.isArray(homeData.result.banner)
        ? homeData.result.banner
        : [];
      if (banners.length > 0) {
        return <BannerCarousel banners={banners} />;
      }
    }

    return null;
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={handleRefresh}
          colors={['#007AFF']}
          tintColor={'#007AFF'}
        />
      }>
      {homeData && (
        <CardInfo
          greeting={homeData?.result?.greeting}
          name={homeData?.result?.name}
          imageUrl={homeData?.result?.qrcode}
          saldoValue={homeData?.result?.saldo}
          pointsValue={homeData?.result?.point}
        />
      )}

      {renderBanners()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: screenHeight * 0.05,
  },
  centeredMessageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: screenHeight * 0.05,
    minHeight: screenHeight * 0.2,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
    fontSize: screenWidth * 0.04,
  },
  infoText: {
    color: 'gray',
    marginTop: 5,
    textAlign: 'center',
    fontSize: screenWidth * 0.035,
  },
});

export default HomeScreen;
