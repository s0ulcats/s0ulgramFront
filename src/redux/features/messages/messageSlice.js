import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios.js';

const initialState = {
  messages: [],
  loading: false,
};

export const createMessage = createAsyncThunk(
  'message/createMessage',
  async ({ userId, message }) => {
    try {
      const { data } = await axios.post(`/dialogs/${userId}`, {
        userId,
        message,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getUserMessage = createAsyncThunk(
  'message/getUserMessage',
  async (userId) => {
    try {
      const { data } = await axios.get(`/dialogs/${userId}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.messages)) {
          state.messages.push(action.payload); // Убедитесь, что это массив
        } else {
          state.messages = [action.payload]; // Если нет, создайте новый массив
        }
      })
      .addCase(createMessage.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getUserMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = Array.isArray(action.payload) ? action.payload : []; // Проверка на массив
      })
      .addCase(getUserMessage.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default messageSlice.reducer;
