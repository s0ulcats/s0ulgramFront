import React from 'react';
import s from './UserPorifle.module.css';
import PostItem from '../PostItem/PostItem';
import { Link } from 'react-router-dom';

const UserProfile = ({ user, posts }) => {
  if (!user) {
    return <div>Loading...</div>;
  }

  const avatar = user.username.trim().toUpperCase().split('').slice(0, 2).join('');
  const userPosts = posts.filter(post => post.author === user._id);

  return (
    <div>
      <div className={s.info}>
        <div className={s.avatar}>
          {avatar}
        </div>
        <div className={s.username}>{user.username}</div>
        <div>
          <button>
            <Link to={`/dialogs/${user._id}`}>Direct</Link>
          </button>
        </div>
      </div>

      <div className={s.posts}>
        {userPosts.length > 0 ? (
          <div className={s.postsGrid}>
            {userPosts.map((post, idx) => (
              <PostItem key={idx} post={post} />
            ))}
          </div>
        ) : (
          <div>No posts available.</div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
