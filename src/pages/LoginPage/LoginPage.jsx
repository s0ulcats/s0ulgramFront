import React, { useState, useEffect } from 'react';
import s from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, loginUser } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai'; // Иконки для полей ввода

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { status } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(checkIsAuth);

  useEffect(() => {
      const token = window.localStorage.getItem('token');
      if (token) {
          navigate('/');
      }
  }, [status, isAuth, navigate]);

  const handleSubmit = async () => {
      try {
          await dispatch(loginUser({ username, password })).unwrap();
          setPassword('');
          setUsername('');
      } catch (error) {
          toast.error('Invalid username or password!'); // Уведомление об ошибке
      }
  };

  return (
      <form onSubmit={(e) => e.preventDefault()} className={s.form}>
          <h1 className={s.title}>Authorization</h1>
          <label className={s.label}>
              <AiOutlineUser className={s.icon} />
              Login:
              <input
                  type="text"
                  placeholder='Login'
                  value={username}
                  className={s.input}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username" // Добавлено
              />
          </label>
          <label className={s.label}>
              <AiOutlineLock className={s.icon} />
              Password:
              <input
                  type="password"
                  placeholder='password'
                  value={password}
                  className={s.input}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password" // Добавлено
              />
          </label>

          <div className={s.buttonGroup}>
              <button type='submit' className={s.submitButton} onClick={handleSubmit}>Enter</button>
              <Link to={'/register'} className={s.link}>Do not have an account?</Link>
          </div>
      </form>
  );
};


export default LoginPage;
