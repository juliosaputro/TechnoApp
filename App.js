/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
// Hapus impor yang tidak perlu jika ada
// import { Text, View } from 'react-native';

// Impor navigator utama Anda
import NavigationConfig from './src/configs/NavigationConfig';

function App() {
  // Komponen App sekarang hanya merender AppNavigator
  // Provider sudah ada di index.js
  return <NavigationConfig />;
}

export default App;
