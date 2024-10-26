import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Moment from 'react-moment';
import { AiOutlineUser, AiOutlineCalendar } from 'react-icons/ai'; // Importing icons
import s from './PostItem.module.scss'; // Importing styles
import { ThemeContext } from '../ThemeContext/ThemeContext';

const DialogItem = ({ dialog }) => {
    const { theme } = useContext(ThemeContext)
    if (!dialog) {
        return <div className={s.loading}>Loading...</div>; // Loading message
    }

    return (
        <NavLink to={`/dialog/${dialog._id}`} key={dialog._id} className={s.link}>
            <div className={`${s.dialogItem} ${theme === 'dark' ? s.dark : s.light}`}>
                <div className={s.info}>
                    <div className={s.username}>
                        <AiOutlineUser className={s.icon} /> {/* User icon */}
                        {dialog.username || 'Неизвестный пользователь'}
                    </div>
                    <div className={s.date}>
                        <AiOutlineCalendar className={s.icon} /> {/* Date icon */}
                        <Moment date={dialog.createdAt} format='D MMM YYYY' />
                    </div>
                </div>
            </div>
        </NavLink>
    );
};

export default DialogItem;