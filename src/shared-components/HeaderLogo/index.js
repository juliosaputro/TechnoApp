import React from 'react';
import {Image, StyleSheet, Dimensions} from 'react-native';

import logo from '../../assets/logo-techno.png';

const {width: screenWidth} = Dimensions.get('window');

const HeaderLogo = () => {
  return (
    <Image source={logo} style={styles.headerImage} resizeMode="contain" />
  );
};

const styles = StyleSheet.create({
  headerImage: {
    width: screenWidth * 0.3,
    height: 30,
    marginLeft: 15,
  },
});

export default HeaderLogo;
