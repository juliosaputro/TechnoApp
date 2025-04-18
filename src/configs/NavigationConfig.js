import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  ActivityIndicator,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';

import LoginScreen from '../screen/login';
import BottomTabNavigator from '../shared-components/BottomNavigator';

import {
  selectAccessToken,
  selectIsAuthLoading,
  checkAuthStatus,
  selectAuthError,
} from '../app/reducers/authSlice';

const {width: screenWidth} = Dimensions.get('window');
const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
);

const MainNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="MainApp" component={BottomTabNavigator} />
  </Stack.Navigator>
);

const NavigationConfig = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectAccessToken);
  const isLoading = useSelector(selectIsAuthLoading);
  const error = useSelector(selectAuthError);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.wrapper}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={styles.wrapper.backgroundColor}
        />
        <View style={styles.centeredContent}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.statusText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error && !token) {
    return (
      <SafeAreaView style={styles.wrapper}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={styles.wrapper.backgroundColor}
        />
        <View style={styles.centeredContent}>
          <Text style={styles.errorTitle}>Error loading application:</Text>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={styles.wrapper.backgroundColor}
      />
      <NavigationContainer>
        {token ? <MainNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: screenWidth * 0.1,
  },
  statusText: {
    marginTop: 10,
    fontSize: screenWidth * 0.04,
    color: '#333',
  },
  errorTitle: {
    fontSize: screenWidth * 0.045,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  errorText: {
    fontSize: screenWidth * 0.04,
    textAlign: 'center',
    color: '#333',
  },
});

export default NavigationConfig;
