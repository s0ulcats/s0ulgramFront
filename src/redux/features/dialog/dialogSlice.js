import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../../utils/axios.js';

const initialState = {
  dialogs: [],
  loading: false,
  error: null,
};

export const getAllDialogs = createAsyncThunk('dialog/getAllDialogs', async () => {
  try {
    const { data } = await axios.get('/dialogs');
    return data;
  } catch (error) {
    throw error;
  }
});


const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDialogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
    builder
      .addCase(getAllDialogs.fulfilled, (state, action) => {
        state.dialogs = action.payload.dialogs;
        state.loading = false;
      })
      .addCase(getAllDialogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default dialogSlice.reducer;