import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getHomeDataApi} from '../service/homeService'; // Impor service

export const fetchHomeData = createAsyncThunk(
  'home/fetchData',
  async (_, {rejectWithValue}) => {
    try {
      const data = await getHomeDataApi();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    clearHomeState: state => {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchHomeData.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchHomeData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchHomeData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch data';
        state.data = null;
      });
  },
});

export const {clearHomeState} = homeSlice.actions;
export default homeSlice.reducer;

export const selectHomeData = state => state.home.data;
export const selectIsHomeLoading = state => state.home.isLoading;
export const selectHomeError = state => state.home.error;
