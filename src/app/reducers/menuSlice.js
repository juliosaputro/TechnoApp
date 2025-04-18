import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getMenuDataApi} from '../service/menuService';

export const fetchMenuData = createAsyncThunk(
  'menu/fetchData',
  async (_, {rejectWithValue}) => {
    try {
      const data = await getMenuDataApi();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    clearMenuState: state => {
      state.items = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMenuData.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMenuData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items =
          action.payload?.result?.categories || action.payload || [];
        state.error = null;
      })
      .addCase(fetchMenuData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch menu items';
        state.items = [];
      });
  },
});

export const {clearMenuState} = menuSlice.actions;
export default menuSlice.reducer;

export const selectMenuItems = state => state.menu.items;
export const selectIsMenuLoading = state => state.menu.isLoading;
export const selectMenuError = state => state.menu.error;
