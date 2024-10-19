import React, { useEffect } from 'react';
import PostItem from '../../components/PostItem/PostItem.jsx';
import PopularPosts from '../../components/PopularPosts/PopularPosts.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../redux/post/postSlice.js';
import { AiOutlineFire } from 'react-icons/ai'; // Иконка для популярности
import s from './MainPage.module.css';
import Preloader from '../../components/Preloader/Preloader.jsx';

const MainPage = () => {
  const dispatch = useDispatch();
  const { posts, popularPosts, loading, error } = useSelector(state => state.post);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (loading) {
    return <Preloader />
  }

  if (error) {
    return <div className={s.error}>Error: {error}</div>;
  }

  if (!posts || !posts.length) {
    return <div className={s.noPosts}>Posts don’t exist</div>;
  }

  return (
    <div className={s.main}>
      <div className={s.posts}>
        <div className={s.postsContainer}>
          {posts.map(post => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      </div>

      <div className={s.popularPosts}>
        <h2 className={s.popularTitle}>
          <AiOutlineFire className={s.popularIcon} /> Popular Posts:
        </h2>
        <div className={s.popularPostsContainer}>
          {popularPosts.map(post => (
            <PopularPosts key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
