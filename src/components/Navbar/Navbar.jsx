import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import s from './Navbar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, logout } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';

const Navbar = () => {
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const activeStyles = {
    color: '#ff79a9', // Розовый цвет для активной ссылки
  };

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
    toast('You successfully logged out');
  };

  return (
    <div className={s.nav}>
      <img className={s.icon} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbyte1fof8-sxWRFoD0R1EPTqQqDGafx_Cwg&s'/>
      {isAuth && (
        <ul className={s.navList}>
          <li>
            <NavLink style={({ isActive }) => (isActive ? activeStyles : undefined)} to="/" className={s.navLink}>
              Main
            </NavLink>
          </li>
          <li>
            <NavLink style={({ isActive }) => (isActive ? activeStyles : undefined)} to="/posts" className={s.navLink}>
              My Posts
            </NavLink>
          </li>
          <li>
            <NavLink style={({ isActive }) => (isActive ? activeStyles : undefined)} to="/new" className={s.navLink}>
              Add Post
            </NavLink>
          </li>
          <li>
            <NavLink style={({ isActive }) => (isActive ? activeStyles : undefined)} to="/users" className={s.navLink}>
              Users
            </NavLink>
          </li>
        </ul>
      )}
      <div className={s.authContainer}>
        {isAuth ? (
          <button className={s.btn} onClick={logoutHandler}>
            Log out
          </button>
        ) : (
          <Link to={'/login'} className={s.navLink}>
            Enter
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
