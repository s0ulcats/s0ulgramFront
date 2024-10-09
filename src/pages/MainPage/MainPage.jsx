import React, { useEffect } from 'react';
import PostItem from '../../components/PostItem/PostItem.jsx';
import PopularPosts from '../../components/PopularPosts/PopularPosts.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../redux/post/postSlice.js';
import s from './MainPage.module.css';

const MainPage = () => {
  const dispatch = useDispatch();
  const { posts, popularPosts, loading, error } = useSelector(state => state.post);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  useEffect(() => {
    console.log('Posts:', posts);
  }, [posts]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!posts || !posts.length) {
    return <div>Posts don’t exist</div>;
  }

  return (
    <div className={s.main}>
      <div className={s.posts}>
        <div className={s.postsContainer}>
          {posts.map((post, idx) => (
            <PostItem key={idx} post={post} />
          ))}
        </div>
      </div>

      <div className={s.popularPosts}>
        <h2>Popular Posts:</h2>
        <div className={s.popularPostsContainer}>
          {popularPosts.map((post, idx) => (
            <PopularPosts key={idx} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
