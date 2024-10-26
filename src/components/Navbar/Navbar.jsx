import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, logout } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { AiOutlineHome, AiOutlineUser, AiOutlineFileAdd } from 'react-icons/ai';
import Logo from './Logo.png';
import s from './Navbar.module.scss';
import { ThemeContext } from '../ThemeContext/ThemeContext'; // Используем контекст

const Navbar = () => {
    const isAuth = useSelector(checkIsAuth);
    const dispatch = useDispatch();
    const activeStyles = {
        color: '#ff79a9',
        fontWeight: 'bold',
    };
    const { theme, toggleTheme } = useContext(ThemeContext)

    const logoutHandler = () => {
        dispatch(logout());
        window.localStorage.removeItem('token');
        toast('Successful log out');
    };

    return (
        <div className={`${s.nav} ${theme === 'dark' ? s.dark : s.light}`}>
            <img
                className={s.icon}
                src={Logo}
                alt='Logo'
            />
            {isAuth && (
                <ul className={`${s.navList} ${theme === 'dark' ? s.dark : s.light}`}>
                    <li>
                        <NavLink
                            style={({ isActive }) => (isActive ? activeStyles : undefined)}
                            to="/"
                            className={`${s.navLink} ${theme}`}
                        >
                            <AiOutlineHome /> Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            style={({ isActive }) => (isActive ? activeStyles : undefined)}
                            to="/posts"
                            className={`${s.navLink} ${theme}`}
                        >
                            <AiOutlineFileAdd /> My posts
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            style={({ isActive }) => (isActive ? activeStyles : undefined)}
                            to="/new"
                            className={`${s.navLink} ${theme}`}
                        >
                            <AiOutlineFileAdd /> Add Post
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            style={({ isActive }) => (isActive ? activeStyles : undefined)}
                            to="/users"
                            className={`${s.navLink} ${theme}`}
                        >
                            <AiOutlineUser /> Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            style={({ isActive }) => (isActive ? activeStyles : undefined)}
                            to="/profile"
                            className={`${s.navLink} ${theme}`}
                        >
                            <AiOutlineUser /> My profile
                        </NavLink>
                    </li>
                </ul>
            )}
            <div>
                <button onClick={toggleTheme} className={`${s.themeSwitchBtn}  ${theme === 'dark' ? s.dark : s.light}`}>
                    {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                </button>
            </div>
            <div className={s.authContainer}>
                {isAuth ? (
                    <button className={`${s.btn}  ${theme === 'dark' ? s.dark : s.light}`} onClick={logoutHandler}>
                        Log out
                    </button>
                ) : (
                    <Link to={'/login'} className={`${s.navLink}  ${theme === 'dark' ? s.dark : s.light}`}>
                        Enter
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
