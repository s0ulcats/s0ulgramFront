import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineUser, AiOutlineCalendar } from 'react-icons/ai';
import s from './PopularPosts.module.scss';
import { ThemeContext } from '../ThemeContext/ThemeContext';

const PopularPosts = ({ post }) => {
    const { theme } = useContext(ThemeContext)
    return (
        <div className={`${s.popularPostsContainer} ${theme === 'dark' ? s.dark : s.light}`}>
            <div className={`${s.popularPostItem} ${theme === 'dark' ? s.dark : s.light}`}>
                <Link to={`/post/${post._id}`} className={s.postTitle}>
                    {post.title}
                </Link>
                <div className={s.postInfo}>
                    <span className={s.postAuthor}>
                        <AiOutlineUser className={s.icon} /> {post.username || 'Unavailable author'}
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
