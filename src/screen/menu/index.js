import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {
  fetchMenuData,
  selectMenuItems,
  selectIsMenuLoading,
  selectMenuError,
} from '../../app/reducers/menuSlice';
import ListMenu from '../../shared-components/ListMenu';

const {width: screenWidth} = Dimensions.get('window');
const Tab = createMaterialTopTabNavigator();

const MenuScreen = () => {
  const dispatch = useDispatch();

  const categories = useSelector(selectMenuItems);
  const isLoading = useSelector(selectIsMenuLoading);
  const error = useSelector(selectMenuError);

  useEffect(() => {
    dispatch(fetchMenuData());
  }, [dispatch]);

  const renderMainContent = () => {
    if (isLoading && (!categories || categories.length === 0)) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      );
    }

    if (error && !isLoading) {
      return (
        <View style={styles.centered}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <Text style={styles.infoText}>Could not load menu categories.</Text>
        </View>
      );
    }

    if (Array.isArray(categories) && categories.length > 0) {
      return (
        <Tab.Navigator
          screenOptions={{
            tabBarScrollEnabled: true,
            tabBarIndicatorStyle: {backgroundColor: 'tomato'},
            tabBarLabelStyle: {
              fontSize: screenWidth * 0.035,
              textTransform: 'capitalize',
              fontWeight: '600',
            },
            tabBarItemStyle: {width: 'auto', paddingHorizontal: 12},
            tabBarStyle: {backgroundColor: '#ffffff'},
          }}>
          {categories.map((category, index) => (
            <Tab.Screen
              key={index}
              name={category?.category_name}
              options={{tabBarLabel: category?.category_name}}>
              {() => (
                <ListMenu
                  category={category?.category_name}
                  items={category?.menu || []}
                />
              )}
            </Tab.Screen>
          ))}
        </Tab.Navigator>
      );
    }

    return (
      <View style={styles.centered}>
        <Text style={styles.infoText}>No menu categories found.</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>{renderMainContent()}</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
    fontSize: screenWidth * 0.04,
  },
  infoText: {
    color: 'gray',
    textAlign: 'center',
    fontSize: screenWidth * 0.035,
  },
});

export default MenuScreen;
