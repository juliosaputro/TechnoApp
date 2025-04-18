import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginApi} from '../service/authService';

const ACCESS_TOKEN_KEY = 'access_token';
const TOKEN_TYPE_KEY = 'token_type';
const EXPIRES_IN_KEY = 'expires_in';
const USERNAME_KEY = 'username';

export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, {rejectWithValue}) => {
    try {
      const values = await AsyncStorage.multiGet([
        ACCESS_TOKEN_KEY,
        TOKEN_TYPE_KEY,
        EXPIRES_IN_KEY,
        USERNAME_KEY,
      ]);
      const storedData = values.reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});

      const accessToken = storedData[ACCESS_TOKEN_KEY];

      if (accessToken) {
        return {
          accessToken,
          tokenType: storedData[TOKEN_TYPE_KEY],
          expiresIn: storedData[EXPIRES_IN_KEY]
            ? parseInt(storedData[EXPIRES_IN_KEY], 10)
            : null,
          username: storedData[USERNAME_KEY],
        };
      }
      return null;
    } catch (error) {
      console.error('Failed to load auth data from storage', error);
      return rejectWithValue('Failed to load session');
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, {rejectWithValue}) => {
    try {
      const authData = await loginApi(credentials);
      const {access_token, token_type, expires_in} = authData;
      const username = credentials.username;

      if (!access_token || !token_type) {
        throw new Error('Incomplete auth data received from server.');
      }

      await AsyncStorage.multiSet([
        [ACCESS_TOKEN_KEY, access_token],
        [TOKEN_TYPE_KEY, token_type],
        [EXPIRES_IN_KEY, expires_in ? String(expires_in) : ''],
        [USERNAME_KEY, username],
      ]);

      return {
        accessToken: access_token,
        tokenType: token_type,
        expiresIn: expires_in,
        username: username,
      };
    } catch (error) {
      const errorMessage =
        error?.message || error?.error_description || 'Login failed';
      console.error('Login Thunk Error:', errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, {rejectWithValue}) => {
    try {
      await AsyncStorage.multiRemove([
        ACCESS_TOKEN_KEY,
        TOKEN_TYPE_KEY,
        EXPIRES_IN_KEY,
        USERNAME_KEY,
      ]);
    } catch (error) {
      console.error('Failed to remove auth data from storage', error);
      return rejectWithValue('Logout failed');
    }
  },
);

const initialState = {
  accessToken: null,
  tokenType: null,
  expiresIn: null,
  username: null,
  isLoading: true,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearState: state => {
      Object.assign(state, initialState, {isLoading: false});
    },
    clearAuthError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(checkAuthStatus.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        if (action.payload) {
          state.accessToken = action.payload.accessToken;
          state.tokenType = action.payload.tokenType;
          state.expiresIn = action.payload.expiresIn;
          state.username = action.payload.username;
        } else {
          Object.assign(state, initialState, {isLoading: false});
        }
        state.isLoading = false;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        Object.assign(state, initialState, {isLoading: false});
        state.error = action.payload || 'Failed to check auth status';
      })
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.tokenType = action.payload.tokenType;
        state.expiresIn = action.payload.expiresIn;
        state.username = action.payload.username;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        Object.assign(state, initialState, {isLoading: false});
        state.error = action.payload || 'Login failed';
      })
      .addCase(logoutUser.pending, state => {
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, state => {
        Object.assign(state, initialState, {isLoading: false});
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Logout failed';
      });
  },
});

export const {clearState, clearAuthError} = authSlice.actions;

export const selectAccessToken = state => state.auth.accessToken;
export const selectTokenType = state => state.auth.tokenType;
export const selectExpiresIn = state => state.auth.expiresIn;
export const selectUsername = state => state.auth.username;
export const selectIsAuthLoading = state => state.auth.isLoading;
export const selectAuthError = state => state.auth.error;
export const selectIsLoggedIn = state => !!state.auth.accessToken;

export default authSlice.reducer;
