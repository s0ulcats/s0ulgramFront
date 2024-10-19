import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import s from './Navbar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, logout } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { AiOutlineHome, AiOutlineUser, AiOutlineFileAdd } from 'react-icons/ai';

const Navbar = () => {
    const isAuth = useSelector(checkIsAuth);
    const dispatch = useDispatch();
    const activeStyles = {
        color: '#ff79a9', // Розовый цвет для активной ссылки
        fontWeight: 'bold', // Увеличиваем жирность для активной ссылки
    };

    const logoutHandler = () => {
        dispatch(logout());
        window.localStorage.removeItem('token');
        toast('Successful log out');
    };

    return (
        <div className={s.nav}>
            <img 
                className={s.icon} 
                src='https://cdn.discordapp.com/attachments/703718225686560991/1246057668037181470/catBimBimBam.png?ex=6712ea62&is=671198e2&hm=13ef265f4f6a2460acda02cfc1efc51e0e76a0ff59413cebc552e76e892f5b4d&' 
                alt='Logo'
            />
            {isAuth && (
                <ul className={s.navList}>
                    <li>
                        <NavLink 
                            style={({ isActive }) => (isActive ? activeStyles : undefined)} 
                            to="/" 
                            className={s.navLink}
                        >
                            <AiOutlineHome /> Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            style={({ isActive }) => (isActive ? activeStyles : undefined)} 
                            to="/posts" 
                            className={s.navLink}
                        >
                            <AiOutlineFileAdd /> My posts
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            style={({ isActive }) => (isActive ? activeStyles : undefined)} 
                            to="/new" 
                            className={s.navLink}
                        >
                            <AiOutlineFileAdd /> Add Post
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            style={({ isActive }) => (isActive ? activeStyles : undefined)} 
                            to="/users" 
                            className={s.navLink}
                        >
                            <AiOutlineUser /> Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            style={({ isActive }) => (isActive ? activeStyles : undefined)} 
                            to="/profile" 
                            className={s.navLink}
                        >
                            <AiOutlineUser /> My profile
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
