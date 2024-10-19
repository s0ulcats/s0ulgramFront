import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUsersStatus } from '../../redux/features/users/usersSlice';
import s from './StatusEditor.module.css';
import { AiOutlineEdit, AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'; // Импорт иконок из React Icons

const StatusEditor = ({ initialStatus, userId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [status, setStatus] = useState(initialStatus || '');
    const dispatch = useDispatch();

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
        <div className={s.statusEditor} onDoubleClick={handleDoubleClick}>
            {isEditing ? (
                <div className={s.editContainer}>
                    <input
                        type="text"
                        value={status}
                        onChange={handleStatusChange}
                        onBlur={handleBlur}
                        autoFocus
                        className={s.input} // Применяем стили к input
                    />
                    <AiOutlineCheck className={s.icon} onClick={handleBlur} /> {/* Иконка подтверждения */}
                    <AiOutlineClose className={s.icon} onClick={() => { setStatus(initialStatus); setIsEditing(false); }} /> {/* Иконка отмены */}
                </div>
            ) : (
                <div className={s.statusDisplay}>
                    <span className={s.statusText}>{status || 'Status'}</span> {/* Применяем стили к span */}
                    <AiOutlineEdit className={s.icon} onClick={handleDoubleClick} /> {/* Иконка редактирования */}
                </div>
            )}
        </div>
    );
};

export default StatusEditor;
