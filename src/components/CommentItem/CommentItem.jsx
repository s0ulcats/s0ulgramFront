import React from 'react';
import Moment from 'react-moment';
import { AiOutlineUser, AiOutlineCalendar } from 'react-icons/ai'; // Importing icons
import s from './CommentItem.module.css'; // Importing styles

const CommentItem = ({ comment }) => {
    if (!comment || !comment.author) {
        return <p className={s.errorMessage}>Comment unavailable</p>; // Message if comment is unavailable
    }

    return (
        <div className={s.commentItem}> {/* Main class for comment item */}
            <div className={s.commentContent}> {/* Class for comment content */}
                <p className={s.commentText}>
                    <AiOutlineUser className={s.icon} /> {/* User icon */}
                    <strong className={s.author}>{comment.author.username}:</strong> {comment.comment}
                </p>
                <p className={s.commentDate}>
                    <AiOutlineCalendar className={s.icon} /> {/* Date icon */}
                    <Moment date={comment.createdAt} format="D MMM YYYY" /> {/* Formatting date */}
                </p>
            </div>
        </div>
    );
};

export default CommentItem;
