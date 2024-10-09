import React, { useState, useEffect } from 'react'
import s from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, loginUser } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { status } = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(checkIsAuth)

  useEffect(() => {
    // Проверяем токен перед редиректом
    const token = window.localStorage.getItem('token');
    if (token) {
      navigate('/');
    } else {
      if (status) toast(status);
    }
  }, [status, isAuth, navigate]);

  const handleSubmit = () => {
    try {
      dispatch(loginUser({ username, password }));
      setPassword('');
      setUsername('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className={s.form}>
      <h1>Authorization</h1>
      <label htmlFor="">
        Username:
        <input
          type="text"
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label htmlFor="">
        Password:
        <input
          type="password"
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
      </label>

      <div>
        <button type='submit' onClick={handleSubmit}>Enter</button>
        <Link to={'/register'}>Don't have an account?</Link>
      </div>
    </form>
  )
}

export default LoginPage
