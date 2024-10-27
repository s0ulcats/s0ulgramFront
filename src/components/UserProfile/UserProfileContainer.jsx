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
        dispatch(getUserById(id));
        dispatch(getAllPosts(id));
    }, [dispatch, id]);

    if (userLoading || postsLoading) return <Preloader />;
    if (userError || postsError) return <div>Error: {userError || postsError}</div>;

    return <UserProfile user={user} posts={posts} />;
};

export default UserProfileContainer;
