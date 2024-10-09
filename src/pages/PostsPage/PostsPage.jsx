import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios.js';
import PostItem from '../../components/PostItem/PostItem.jsx';
import s from './PostsPage.module.css';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

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
    <div>
      {error && <div>Error: {error}</div>}
      {posts.map((post, idx) => <PostItem key={idx} post={post} />)}
    </div>
  );
};

export default PostsPage;
