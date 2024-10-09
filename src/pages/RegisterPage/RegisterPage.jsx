import React, { useEffect, useState } from 'react';
import s from './Register.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, registerUser } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {status} = useSelector(state => state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector(checkIsAuth)

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      navigate('/');
    } else {
      if(status) {
        toast(status);
      }
    }
  }, [status, isAuth, navigate]);

  const handleSubmit = () => {
    try {
      dispatch(registerUser({ username, password }));
      setPassword('');
      setUsername('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className={s.form}>
      <h1>Registration</h1>
      <label>
        Username:
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <div>
        <button type="submit" onClick={handleSubmit}>Submit</button>
        <Link to="/login">Already have an account?</Link>
      </div>
    </form>
  );
};

export default RegisterPage;
