import React from 'react';
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai';
import Moment from 'react-moment';
import s from './PostItem.module.css';
import { NavLink } from 'react-router-dom';

const PostItem = ({ post }) => {
    if (!post) {
        return <div className={s.post}>Загрузка...</div>;
    }

    return (
        <NavLink to={`/post/${post._id}`} className={s.link}>
            <div className={s.post}>
                {post.imgUrl ? (
                    <div className={s.imageWrapper}>
                        <img alt='img' src={`http://localhost:3001/${post.imgUrl}`} className={s.image} />
                    </div>
                ) : (
                    <div className={s.placeholder}>
                        <span>{post.title}</span>
                    </div>
                )}
                <div className={s.info}>
                    <div className={s.username}>{post.username || 'Unavailable author '}</div>
                    <div className={s.date}>
                        <Moment date={post.createdAt} format='D MMM YYYY' />
                    </div>
                </div>
                <div className={s.title}>{post.title}</div>
                <p className={s.text}>{post.text}</p>

                <div className={s.stats}>
                    <div className={s.statItem}>
                        <AiFillEye className={s.icon} /> <span>{post.views}</span>
                    </div>
                    <div className={s.statItem}>
                        <AiOutlineMessage className={s.icon} /> <span>{post.comments?.length || 0}</span>
                    </div>
                </div>
            </div>
        </NavLink>
    );
};

export default PostItem;
