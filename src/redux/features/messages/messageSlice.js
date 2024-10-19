import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  messages: [],
  loading: false,
  error: null,
};

// Асинхронное действие для создания сообщения
export const createMessage = createAsyncThunk(
  'messages/createMessage',
  async ({ dialogId, message }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); // Получаем токен из локального хранилища
      const response = await axios.post(
        `/api/messages/${dialogId}`,
        { message },
        { headers: { Authorization: `Bearer ${token}` } } // Отправляем токен в заголовке
      );
      return response.data; // Возвращаем данные нового сообщения
    } catch (err) {
      if (err.response && err.response.status === 403) {
        console.error("Ошибка 403: Недостаточно прав для выполнения этого действия.");
      }
      return rejectWithValue(err.response.data); // Возвращаем ошибку
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
        state.loading = true; // Устанавливаем статус загрузки
        state.error = null; // Обнуляем ошибку при отправке нового сообщения
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        state.loading = false; // Завершаем статус загрузки
        state.messages.push(action.payload); // Добавляем новое сообщение в массив
      })
      .addCase(createMessage.rejected, (state, action) => {
        state.loading = false; // Завершаем статус загрузки
        state.error = action.payload; // Устанавливаем ошибку
      });
  },
});

export default messageSlice.reducer;