import React, { useEffect, useState } from 'react';
import s from './Register.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, registerUser } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai'; // Иконки для пользователя и пароля

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { status } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector(checkIsAuth);

  useEffect(() => {
      const token = window.localStorage.getItem('token');
      if (token) {
          navigate('/');
      }
  }, [status, isAuth, navigate]);

  const handleSubmit = (e) => {
      e.preventDefault();
      try {
          dispatch(registerUser({ username, password }));
          setPassword('');
          setUsername('');
          toast.success('Registration successful!'); // Уведомление об успешной регистрации
      } catch (error) {
          toast.error('Registration failed. Please try again.'); // Уведомление об ошибке
          console.log(error);
      }
  };

  return (
      <form onSubmit={handleSubmit} className={s.form}>
          <h1 className={s.title}>Registration</h1>
          <label>
              <AiOutlineUser className={s.icon} />
              <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={s.input}
                  autoComplete="username" // Добавлено
              />
          </label>
          <label>
              <AiOutlineLock className={s.icon} />
              <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={s.input}
                  autoComplete="new-password" // Добавлено
              />
          </label>

          <div className={s.actions}>
              <button type="submit" className={s.button}>Submit</button>
              <Link to="/login" className={s.link}>Already have an account?</Link>
          </div>
      </form>
  );
};

export default RegisterPage;
