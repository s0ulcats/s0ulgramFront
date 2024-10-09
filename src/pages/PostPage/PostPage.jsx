import React, { useCallback, useEffect, useState } from 'react';
import { AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete } from 'react-icons/ai';
import Moment from 'react-moment';
import axios from '../../utils/axios.js';
import { Link, useNavigate, useParams } from 'react-router-dom';
import s from './PostPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { removePost } from '../../redux/post/postSlice.js';
import { toast } from 'react-toastify';
import { createComment, getPostComments } from '../../redux/features/comments/commentSlice.js';
import CommentItem from '../../components/CommentItem/CommentItem.jsx';

const PostPage = () => {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { comments = [], loading } = useSelector((state) => state.comment);
  const params = useParams();

  const handleSubmit = async () => {
    try {
      const postId = params.id;
      await dispatch(createComment({ postId, comment }));
      setComment('');
    } catch (error) {
      setError('Failed to create comment. Please try again.');
      console.log("Error during comment submit:", error);
    }
  };

  const fetchComments = useCallback(async () => {
    try {
      await dispatch(getPostComments(params.id));
    } catch (error) {
      setError('Failed to fetch comments. Please try again.');
    }
  }, [params.id, dispatch]);

  const removePostHandler = async () => {
    try {
      await dispatch(removePost(params.id));
      toast('Post was deleted');
      navigate('/posts');
    } catch (error) {
      setError('Failed to delete post. Please try again.');
      console.log(error);
    }
  };

  const fetchPost = useCallback(async () => {
    try {
      const { data } = await axios.get(`/posts/${params.id}`);
      setPost(data);
    } catch (error) {
      setError('Failed to fetch post. Please try again.');
      console.log('Error fetching post:', error);
    }
  }, [params.id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  if (!post) {
    return <div className={s.post}>Loading...</div>;
  }

  return (
    <div>
      {error && <div>Error: {error}</div>}
      <div className={s.postPage}>
        <button>
          <Link to="/">Return</Link>
        </button>
        <div>
          {post.imgUrl && (
            <img alt="img" src={`http://localhost:3001/${post.imgUrl}`} />
          )}
        </div>
        <div className={s.postInfo}>
          <span>{post.username}</span>
          <Moment date={post.createdAt} format="D MMM YYYY" />
        </div>
        <h2>{post.title}</h2>
        <p>{post.text}</p>
        <div className={s.postActions}>
          <div>
            <button>
              <AiFillEye /> <span>{post.views}</span>
            </button>
            <button>
              <AiOutlineMessage /> <span>{comments.length}</span>
            </button>
          </div>

          {user?._id === post.author && (
            <div>
              <button>
                <Link to={`/${params.id}/edit`}>
                  <AiTwotoneEdit />
                </Link>
              </button>
              <button onClick={removePostHandler}>
                <AiFillDelete />
              </button>
            </div>
          )}
        </div>
      </div>

      <div>
        <form onSubmit={e => e.preventDefault()}>
          <input value={comment} type="text" placeholder="Comment" onChange={e => setComment(e.target.value)} />
          <button type="submit" onClick={handleSubmit}>Send</button>
        </form>

        {Array.isArray(comments) && comments.map((cmt) => (
          <CommentItem key={cmt._id} cmt={cmt} />
        ))}
      </div>
    </div>
  );
};

export default PostPage;
