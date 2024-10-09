import React from 'react';
import s from './PopularPosts.module.css';
import { Link } from 'react-router-dom';

const PopularPosts = ({ post }) => {
  return (
    <div className={s.popularPostsContainer}>
      <div className={s.popularPosts}>
        <Link to={`${post._id}`} className={s.postTitle}>
          {post.title}
        </Link>
      </div>
    </div>
  );
}

export default PopularPosts;
