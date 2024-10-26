import React, { useContext } from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import s from './Layout.module.css';
import { ThemeContext } from '../ThemeContext/ThemeContext';

const Layout = ({ children }) => {
    const { theme } = useContext(ThemeContext); // Получаем тему из контекста

    return (
        <div className={`${s.container} ${theme === 'dark' ? s.dark : s.light}`}>
            <Navbar />
            <div className={`${s.content} ${theme === 'dark' ? s.dark : s.light}`}>
                {children}
            </div>
        </div>
    );
};

export default Layout;
