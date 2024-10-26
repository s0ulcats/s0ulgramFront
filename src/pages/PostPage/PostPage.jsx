import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete } from 'react-icons/ai';
import Moment from 'react-moment';
import axios from '../../utils/axios.js';
import { Link, useNavigate, useParams } from 'react-router-dom';
import s from './PostPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { removePost } from '../../redux/post/postSlice.js';
import { createComment, getPostComments } from '../../redux/features/comments/commentSlice.js';
import CommentItem from '../../components/CommentItem/CommentItem.jsx';
import Preloader from '../../components/Preloader/Preloader.jsx';
import { ThemeContext } from '../../components/ThemeContext/ThemeContext.jsx';

const PostPage = () => {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { comments = [], loading } = useSelector((state) => state.comment);
  const params = useParams();
  const { theme } = useContext(ThemeContext); // Получаем тему из контекста

  const handleSubmit = async () => {
    try {
      const postId = params.id;
      await dispatch(createComment({ postId, comment }));
      setComment(''); // Очищаем поле ввода комментария
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const fetchComments = useCallback(async () => {
    try {
      await dispatch(getPostComments(params.id));
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }, [params.id, dispatch]);

  useEffect(() => {
    fetchComments(); // Загружаем комментарии при монтировании компонента
  }, [fetchComments]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`/posts/${params.id}`);
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [params.id]);

  if (!post) {
    return <Preloader />
  }

  return (
    <div className={`${s.container} ${theme === 'dark' ? s.dark : s.light}`}>
      <Link to="/" className={s.returnBtn}>Return</Link>
      <div className={s.postPage}>
        {post.imgUrl && (
          <div className={s.imgWrapper}>
            <img alt="img" src={`http://localhost:3001/${post.imgUrl}`} className={s.image} />
          </div>
        )}
        <div className={s.postInfo}>
          <span>{post.username}</span>
          <Moment date={post.createdAt} format="D MMM YYYY" />
        </div>
        <h2 className={s.title}>{post.title}</h2>
        <p className={s.text}>{post.text}</p>
        <div className={s.postActions}>
          <div className={s.stats}>
            <button className={s.iconBtn}>
              <AiFillEye /> <span>{post.views}</span>
            </button>
            <button className={s.iconBtn}>
              <AiOutlineMessage /> <span>{comments.length}</span>
            </button>
          </div>

          {user?._id === post.author && (
            <div className={s.actions}>
              <button className={`${s.iconBtn} ${theme === 'dark' ? s.dark : s.light}`}>
                <Link to={`/post/${post._id}/edit`}>
                  <AiTwotoneEdit />
                </Link>
              </button>
              <button className={`${s.iconBtn} ${theme === 'dark' ? s.dark : s.light}`} onClick={() => dispatch(removePost(params.id))}>
                <AiFillDelete />
              </button>
            </div>
          )}
        </div>

        <div className={s.comments}>
          <h3>Comments</h3>
          <div className={s.addComment}>
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment"
              className={`${s.commentInput} ${theme === 'dark' ? s.dark : s.light}`}
            />
            <button onClick={handleSubmit} className={s.submitBtn}>Submit</button>
          </div>

          <div className={s.commentList}>
            {Array.isArray(comments) && comments.map((cmt) => (
              <CommentItem key={cmt._id} comment={cmt} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
