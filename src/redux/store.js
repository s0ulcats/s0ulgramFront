import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import postSlice from "./post/postSlice";
import commentSlice from "./features/comments/commentSlice";
import usersSlice from "./features/users/usersSlice";
import messageSlice from "./features/messages/messageSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        post: postSlice,
        comment: commentSlice,
        user: usersSlice,
        message: messageSlice,
    },
});
