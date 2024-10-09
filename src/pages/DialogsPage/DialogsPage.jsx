import React, { useCallback, useEffect, useState } from 'react';
import { AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete } from 'react-icons/ai';
import Moment from 'react-moment';
import axios from '../../utils/axios.js';
import { Link, useNavigate, useParams } from 'react-router-dom';
import s from './DialogsPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, getUserMessage } from '../../redux/features/messages/messageSlice.js';
import MessageItem from '../../components/MessageItem/MessageItem.jsx';

const DialogsPage = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null); // Добавляем переменную для хранения ошибок
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { messages = [], loading } = useSelector((state) => state.message);
  const params = useParams();

  const handleSubmit = async () => {
    try {
      const userId = params.id;
      await dispatch(createMessage({ userId, message }));
      setMessage(''); // Очищаем поле после отправки
    } catch (error) {
      setError('Failed to create message. Please try again.');
      console.log("Error during comment submit:", error);
    }
  };

  const fetchMessages = useCallback(async () => {
    try {
      const response = await dispatch(getUserMessage(params.id));
      console.log("Fetched messages:", response);  // Лог для проверки полученных данных
    } catch (error) {
      setError('Failed to fetch messages. Please try again.');
      console.log("Error fetching messages:", error);  // Логирование ошибки
    }
  }, [params.id, dispatch]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // Проверка, что user не null или undefined
  if (!user || !user._id) {
    return <div>Loading...</div>; // Или другой компонент, который будет отображаться, пока данные не загружены
  }

  return (
    <div>
      {error && <div>Error: {error}</div>} {/* Вывод ошибки, если есть */}
      <div className={s.postPage}>
        <button>
          <Link to={`/user/${user._id}`}>Return</Link>
        </button>
      </div>

      <div>
        <form onSubmit={e => e.preventDefault()}>
          <input
            value={message}
            type="text"
            placeholder="Message"
            onChange={e => setMessage(e.target.value)}
          />
          <button type="submit" onClick={handleSubmit}>Send</button>
        </form>

        {/* Проверяем, есть ли сообщения */}
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((msg) => (
            <MessageItem key={msg._id} msg={msg} />
          ))
        ) : (
          <div>No messages found</div>  // Выводим сообщение, если сообщений нет
        )}
      </div>
    </div>
  );
};

export default DialogsPage;
