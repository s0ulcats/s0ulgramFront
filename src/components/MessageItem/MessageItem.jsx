import React from 'react';
import Moment from 'react-moment';
import { AiOutlineUser, AiOutlineClockCircle } from 'react-icons/ai';
import s from './MessageItem.module.scss';

const MessageItem = ({ message }) => {
  if (!message || !message.author) {
    return <p className={s.errorMessage}>Message unavailable</p>;
  }

  return (
    <div className={s.messageContainer}>
      <p className={s.author}>
        <AiOutlineUser className={s.icon} />
        {message.author.username}
      </p>
      <p className={s.messageText}>
        {message.message}
      </p>
      <div className={s.timestampContainer}>
        <AiOutlineClockCircle className={s.icon} />
        <Moment date={message.createdAt} format="D MMM YYYY" className={s.timeStamp} />
      </div>
    </div>
  );
};

export default MessageItem;
