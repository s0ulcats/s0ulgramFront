import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineUser, AiOutlineCalendar } from 'react-icons/ai';
import s from './PopularPosts.module.css';

const PopularPosts = ({ post }) => {
    return (
        <div className={s.popularPostsContainer}>
            <div className={s.popularPostItem}>
                <Link to={`/post/${post._id}`} className={s.postTitle}>
                    {post.title}
                </Link>
                <div className={s.postInfo}>
                    <span className={s.postAuthor}>
                        <AiOutlineUser className={s.icon} /> {post.author?.username || 'Unavailable author'}
                    </span>
                    <span className={s.postDate}>
                        <AiOutlineCalendar className={s.icon} /> {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PopularPosts;
