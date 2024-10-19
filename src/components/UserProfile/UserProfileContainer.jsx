import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UserProfile from './UserProfile';
import { getUserById } from '../../redux/features/users/usersSlice';
import { getAllPosts } from '../../redux/post/postSlice';
import Preloader from '../Preloader/Preloader';

const UserProfileContainer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, loading: userLoading, error: userError } = useSelector((state) => state.user);
  const { posts = [], loading: postsLoading, error: postsError } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getUserById(id)); // Получаем данные пользователя
    dispatch(getAllPosts(id)); // Получаем посты пользователя
  }, [dispatch, id]);

  if (userLoading || postsLoading) return <Preloader />; // Отображаем индикатор загрузки
  if (userError || postsError) return <div>Error: {userError || postsError}</div>; // Обработка ошибок

  return <UserProfile user={user} posts={posts} />; // Передаем посты и пользователя в компонент
};

export default UserProfileContainer;