import React, { useEffect, useContext } from 'react';
import PostItem from '../../components/PostItem/PostItem.jsx';
import PopularPosts from '../../components/PopularPosts/PopularPosts.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../redux/post/postSlice.js';
import { AiOutlineFire } from 'react-icons/ai';
import s from './MainPage.module.scss';
import Preloader from '../../components/Preloader/Preloader.jsx';
import { ThemeContext } from '../../components/ThemeContext/ThemeContext.jsx';

const MainPage = () => {
  const dispatch = useDispatch();
  const { posts, popularPosts, loading, error } = useSelector(state => state.post);
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return <div className={s.error}>Error: {error}</div>;
  }

  return (
    <div className={`${s.main} ${theme === 'dark' ? s.dark : s.light}`}>
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
