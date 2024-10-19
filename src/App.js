import Layout from "./components/Layout/Layout.jsx";
import { Routes, Route } from 'react-router-dom';
import MainPage from "./pages/MainPage/MainPage.jsx";
import PostsPage from "./pages/PostsPage/PostsPage.jsx";
import AddPostPage from "./pages/AddPostPage/AddPostPage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import PostPage from "./pages/PostPage/PostPage.jsx"; // Импортируем PostPage
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMe } from "./redux/features/auth/authSlice.js";
import UsersPage from "./pages/UsersPage/UsersPage.jsx";
import UserProfileContainer from "./components/UserProfile/UserProfileContainer.jsx";
import DialogPage from "./pages/DialogPage/DialogPage.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import EditPostPage from "./pages/EditPostPage/EditPostPage.jsx";

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/new" element={<AddPostPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/post/:id" element={<PostPage />} /> {/* Изменено для постов */}
        <Route path="/post/:id/edit" element={<EditPostPage />} /> {/* Добавлен маршрут для редактирования поста */}
        <Route path="/user/:id" element={<UserProfileContainer />} /> {/* Изменено для пользователей */}
        <Route path="/dialog/:id" element={<DialogPage />} /> {/* Добавлен маршрут для диалогов */}
      </Routes>

      <ToastContainer position="bottom-right" />
    </Layout>
  );
}

export default App;