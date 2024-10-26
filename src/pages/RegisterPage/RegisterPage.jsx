import React, { useContext, useEffect, useState } from 'react';
import s from './Register.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, registerUser } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai'; // Иконки для пользователя и пароля
import { ThemeContext } from '../../components/ThemeContext/ThemeContext';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { status } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector(checkIsAuth);
  const { theme } = useContext(ThemeContext)

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
          toast.success('Registration successful!')
      } catch (error) {
          toast.error('Registration failed. Please try again.'); // Уведомление об ошибке
          console.log(error);
      }
  };

  return (
      <form onSubmit={handleSubmit} className={`${s.form} ${theme === 'dark' ? s.dark : s.light}`}>
          <h1 className={s.title}>Registration</h1>
          <label>
              <AiOutlineUser className={s.icon} />
              <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`${s.input} ${theme === 'dark' ? s.dark : s.light}`}
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
                  className={`${s.input} ${theme === 'dark' ? s.dark : s.light}`}
                  autoComplete="new-password" // Добавлено
              />
          </label>

          <div className={s.actions}>
              <button type="submit" className={s.button}>Submit</button>
              <Link to="/login" className={`${s.link} ${theme === 'dark' ? s.dark : s.light}`}>Already have an account?</Link>
          </div>
      </form>
  );
};

export default RegisterPage;
