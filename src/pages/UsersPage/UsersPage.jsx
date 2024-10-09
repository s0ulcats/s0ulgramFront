import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/features/users/usersSlice';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import s from './UsersPage.module.css';

const UsersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Добавляем навигацию
  const { users, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleUserClick = (id) => {
    navigate(`/user/${id}`); // Навигация по ID пользователя
  };

  return (
    <div className={s.container}>
      <button className={s.returnButton}>
        <NavLink to="/" style={{ textDecoration: 'none', color: '#fff' }}>Return</NavLink>
      </button>
      <div className={s.userItem}>
        {users.length ? (
          users.map((user) => {
            const avatar = user.username.trim().toUpperCase().split('').slice(0, 2).join('');
            return (
              <div key={user._id} onClick={() => handleUserClick(user._id)} className={s.userCard}>
                <div className={s.avatar}>
                  {avatar}
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
