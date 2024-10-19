import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios.js';

const initialState = {
  comments: [],
  loading: false,
};

export const createComment = createAsyncThunk(
  'comment/createComment',
  async ({ postId, comment }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/comments/${postId}`, { postId, comment });
      return data;
    } catch (error) {
      console.log('Error creating comment:', error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPostComments = createAsyncThunk(
  'comment/getPostComments',
  async (postId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/posts/comments/${postId}`);
      return data;
    } catch (error) {
      console.log('Error fetching post comments:', error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        console.log('Create comment error:', action.payload);
      })
      .addCase(getPostComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPostComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(getPostComments.rejected, (state, action) => {
        state.loading = false;
        console.log('Fetch comments error:', action.payload);
      });
  },
});

export default commentSlice.reducer;
