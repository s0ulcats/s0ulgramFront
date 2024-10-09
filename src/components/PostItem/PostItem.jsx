import React from 'react';
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai';
import Moment from 'react-moment';
import s from './PostItem.module.css';
import { NavLink } from 'react-router-dom';

const PostItem = ({ post }) => {
  if (!post) {
    return (
      <div className={s.post}>
        Loading...
      </div>
    );
  }

  return (
    <NavLink to={`/post/${post._id}`}>
      <div className={s.post}>
        {post.imgUrl ? (
          <img alt='img' src={`http://localhost:3001/${post.imgUrl}`} className={s.image}/>
        ) : (
          <div className={s.placeholder}>
            <span>{post.title}</span>
          </div>
        )}
        <div className={s.info}>
          <div>{post.username}</div>
          <div><Moment date={post.createdAt} format='D MMM YYYY' /></div>
        </div>
        <div className={s.title}>{post.title}</div>
        <p>{post.text}</p>

        <div className={s.stats}>
          <button>
            <AiFillEye /> <span>{post.views}</span>
          </button>
          <button>
            <AiOutlineMessage /> <span>{post.comments?.length || 0}</span>
          </button>
        </div>
      </div>
    </NavLink>
  );
};

export default PostItem;
