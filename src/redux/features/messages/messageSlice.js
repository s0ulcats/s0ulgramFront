import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  messages: [],
  loading: false,
  error: null,
};

export const createMessage = createAsyncThunk(
  'messages/createMessage',
  async ({ dialogId, message }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `/api/messages/${dialogId}`,
        { message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 403) {
        console.error("Ошибка 403: Недостаточно прав для выполнения этого действия.");
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload);
      })
      .addCase(createMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default messageSlice.reducer;
