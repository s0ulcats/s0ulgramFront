import React, { useContext } from 'react';
import Moment from 'react-moment';
import { AiOutlineUser, AiOutlineCalendar } from 'react-icons/ai';
import s from './CommentItem.module.scss';
import { ThemeContext } from '../ThemeContext/ThemeContext';

const CommentItem = ({ comment }) => {
    const { theme } = useContext(ThemeContext);
    if (!comment || !comment.author) {
        return <p className={s.errorMessage}>Comment unavailable</p>;
    }

    return (
        <div className={`${s.commentItem} ${theme === 'dark' ? s.dark : s.light}`}>
            <div className={`${s.commentContent} ${theme === 'dark' ? s.dark : s.light}`}>
                <p className={`${s.commentText} ${theme === 'dark' ? s.dark : s.light}`}>
                    <AiOutlineUser className={s.icon} />
                    <strong className={`${s.author} ${theme === 'dark' ? s.dark : s.light}`}>{comment.author.username}:</strong>{comment.comment}
                </p>
                <p className={`${s.commentDate} ${theme === 'dark' ? s.dark : s.light}`}>
                    <AiOutlineCalendar className={`${s.icon} ${theme === 'dark' ? s.dark : s.light}`} />
                    <Moment date={comment.createdAt} format="D MMM YYYY" />
                </p>
            </div>
        </div>
    );
};

export default CommentItem;
