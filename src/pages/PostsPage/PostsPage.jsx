import React, { useContext, useEffect, useState } from 'react';
import axios from '../../utils/axios.js';
import PostItem from '../../components/PostItem/PostItem.jsx';
import s from './PostsPage.module.scss';
import { ThemeContext } from '../../components/ThemeContext/ThemeContext.jsx';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const { theme } = useContext(ThemeContext)

  const fetchMyPosts = async () => {
    try {
      const { data } = await axios.get('/posts/user/me');
      setPosts(data);
    } catch (error) {
      setError('Failed to fetch posts. Please try again.');
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  return (
    <div className={`${s.container} ${theme === 'dark' ? s.dark : s.light}`}>
      {error && <div className={s.error}>{error}</div>}
      <div className={s.postsGrid}>
        {posts.map((post, idx) => (
          <PostItem key={post._id} post={post} className={s.postItem} />
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
