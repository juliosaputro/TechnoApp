/**
 * @format
 */

import React from 'react'; // Impor React
import { AppRegistry } from 'react-native';
import App from './App'; // Komponen root aplikasi Anda
import { name as appName } from './app.json';
import { Provider } from 'react-redux'; // Impor Provider dari react-redux
import { store } from './src/app/store/store'; // Impor store Redux Anda (sesuaikan path jika perlu)

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => Root);
