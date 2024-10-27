import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUsersStatus } from '../../redux/features/users/usersSlice';
import s from './StatusEditor.module.scss';
import { AiOutlineEdit, AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { ThemeContext } from '../../components/ThemeContext/ThemeContext';

const StatusEditor = ({ initialStatus, userId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [status, setStatus] = useState(initialStatus || '');
    const dispatch = useDispatch();
    const { theme } = useContext(ThemeContext);

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
        if (status !== initialStatus) {
            dispatch(updateUsersStatus({ id: userId, params: { status: status || 'Статус' } }));
        }
    };

    return (
        <div className={`${s.statusEditor} ${theme === 'dark' ? s.dark : s.light}`} onDoubleClick={handleDoubleClick}>
            {isEditing ? (
                <div className={s.editContainer}>
                    <input
                        type="text"
                        value={status}
                        onChange={handleStatusChange}
                        onBlur={handleBlur}
                        autoFocus
                        className={`${s.input} ${theme === 'dark' ? s.dark : s.light}`}
                    />
                    <AiOutlineCheck className={s.icon} onClick={handleBlur} />
                    <AiOutlineClose className={s.icon} onClick={() => { setStatus(initialStatus); setIsEditing(false); }} />
                </div>
            ) : (
                <div className={s.statusDisplay}>
                    <span className={s.statusText}>{status || 'Status'}</span>
                    <AiOutlineEdit className={s.icon} onClick={handleDoubleClick} />
                </div>
            )}
        </div>
    );
};

export default StatusEditor;
