import React from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import s from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={s.container}>
      <Navbar />
      <div className={s.content}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
