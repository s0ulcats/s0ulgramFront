import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../../utils/axios.js';

const initialState = {
    users: [],
    user: null, // Состояние для одного пользователя
    loading: false,
    error: null,
};

// Асинхронный запрос для получения всех пользователей
export const getAllUsers = createAsyncThunk('user/getAllUsers', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get('/users');
        return data; // Возвращаем данные пользователей
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Error fetching users');
    }
});

export const getUserById = createAsyncThunk('user/getUserById', async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/users/${id}`); // Исправлено
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Error fetching user');
    }
});

export const updateUsersStatus = createAsyncThunk('user/updateUsersStatus', async ({ id, params }) => {
    try {
      const { data } = await axios.put(`/users/${id}`, params)
      return data;
    } catch (error) {
      throw error;
    }
  });

export const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null; // Сбрасываем ошибку при новом запросе
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload; // Сохраняем полученных пользователей
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Сохраняем ошибку
            })
            .addCase(getUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })            
            .addCase(getUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default usersSlice.reducer;
