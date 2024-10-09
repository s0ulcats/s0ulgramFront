import React from 'react';
import s from './MessageItem.module.css';

const MessageItem = ({ msg }) => {
  const avatar = msg.message.trim().toUpperCase().split('').slice(0, 2).join('');

  return (
    <div className={s.commentItem}>
      <div className={s.avatar}>
        {avatar}
      </div>
      <div className={s.commentText}>
        {msg.message}
      </div>
    </div>
  );
};

export default MessageItem;