import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/features/users/usersSlice';
import { useNavigate } from 'react-router-dom';
import s from './UsersPage.module.css';
import { AiOutlineUser } from 'react-icons/ai'; // Иконка пользователя
import Preloader from '../../components/Preloader/Preloader';

const UsersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  if (loading) return <Preloader />
  if (error) return <p className={s.error}>Error: {error}</p>;

  const handleUserClick = (id) => {
    navigate(`/user/${id}`);
  };

  return (
    <div className={s.container}>
      <h1 className={s.title}>Users</h1>
      <div className={s.userItem}>
        {users.length ? (
          users.map((user) => {
            const avatar = user.username.trim().toUpperCase().split('').slice(0, 2).join('');
            return (
              <div key={user._id} onClick={() => handleUserClick(user._id)} className={s.userCard}>
                <div className={s.avatar}>
                  <AiOutlineUser className={s.userIcon} /> {/* Иконка пользователя */}
                </div>
                <div className={s.username}>
                  {user.username}
                </div>
              </div>
            );
          })
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
