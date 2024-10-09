import React from 'react';
import s from './CommentItem.module.css';

const CommentItem = ({ cmt }) => {
  const avatar = cmt.comment.trim().toUpperCase().split('').slice(0, 2).join('');

  return (
    <div className={s.commentItem}>
      <div className={s.avatar}>
        {avatar}
      </div>
      <div className={s.commentText}>
        {cmt.comment}
      </div>
    </div>
  );
};

export default CommentItem;