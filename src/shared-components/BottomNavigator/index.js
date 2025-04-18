import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../../screen/home';
import MenuScreen from '../../screen/menu';
import HeaderLogo from '../HeaderLogo';
import HomeIconPNG from '../../assets/home.png';
import MenuIconSVG from '../../assets/Menu.svg';

const {width: screenWidth} = Dimensions.get('window');
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: true,
        tabBarActiveTintColor: '#333',
        tabBarInactiveTintColor: '#aaa',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIcon: ({focused, color, size}) => {
          let iconSource;
          let IconComponent;
          const iconSize = size * 0.8;

          if (route.name === 'HomeTab') {
            iconSource = HomeIconPNG;

            return (
              <Image
                source={iconSource}
                style={[
                  styles.iconStyle,
                  {width: iconSize, height: iconSize, tintColor: color},
                ]}
                resizeMode="contain"
              />
            );
          } else if (route.name === 'MenuTab') {
            IconComponent = MenuIconSVG;
            return (
              <View style={styles.iconStyle}>
                <IconComponent width={iconSize} height={iconSize} />
              </View>
            );
          }

          return null;
        },
      })}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          headerTitle: '',
          headerLeft: () => <HeaderLogo />,
        }}
      />
      <Tab.Screen
        name="MenuTab"
        component={MenuScreen}
        options={{
          title: 'Menu',
          headerTitleAlign: 'center',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {},
  tabBarLabel: {
    fontSize: screenWidth * 0.03,
  },
  iconStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BottomTabNavigator;
