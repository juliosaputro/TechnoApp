import {configureStore} from '@reduxjs/toolkit';

import authReducer from '../reducers/authSlice';
import homeReducer from '../reducers/homeSlice';
import menuReducer from '../reducers/menuSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
    menu: menuReducer,
  },
});
