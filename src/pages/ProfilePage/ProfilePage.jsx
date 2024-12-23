import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../../redux/features/users/usersSlice';
import s from './ProfilePage.module.scss';
import PostItem from '../../components/PostItem/PostItem';
import { getAllPosts } from '../../redux/post/postSlice';
import { useParams, useNavigate } from 'react-router-dom';
import StatusEditor from './StatusEditor';
import { AiOutlineUser, AiOutlineFileText } from 'react-icons/ai';
import Preloader from '../../components/Preloader/Preloader';
import { ThemeContext } from '../../components/ThemeContext/ThemeContext';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const { user: authUser } = useSelector((state) => state.auth);
  const { user: myProfile, loading, error } = useSelector((state) => state.user);
  const { posts = [] } = useSelector((state) => state.post);

  useEffect(() => {
    if (!authUser) {
      navigate('/login');
      return;
    }
    
    if (authUser._id) {
      dispatch(getUserById(authUser._id));
      dispatch(getAllPosts(id));
    }
  }, [dispatch, authUser, id, navigate]);

  if (loading) return <Preloader />;
  if (error) return <p className={s.error}>Error: {error}</p>;

  if (!authUser || !myProfile) {
    return <p className={s.profileNotFound}>Profile not found or not authorized.</p>;
  }

  const userPosts = posts.filter(post => post.author === authUser._id);

  return (
    <div className={`${s.container} ${theme === 'dark' ? s.dark : s.light}`}>
      <div className={s.userCard}>
        <div className={s.avatar}>
          {myProfile.username.trim().toUpperCase().split('').slice(0, 1).join('')}
        </div>
        <div className={s.username}>
          <AiOutlineUser className={s.icon} />
          {myProfile.username}
        </div>
        <div className={s.status}>
          <StatusEditor initialStatus={myProfile.status} userId={myProfile._id} />
        </div>
        <div className={s.posts}>
          {userPosts.length > 0 ? (
            <div className={s.postsGrid}>
              {userPosts.map((post, idx) => (
                <PostItem key={idx} post={post} />
              ))}
            </div>
          ) : (
            <div className={s.noPosts}>
              <AiOutlineFileText className={s.noPostsIcon} />
              No posts available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
