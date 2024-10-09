import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createPost } from '../../redux/post/postSlice';
import s from './AddPostPage.module.css';

const AddPostPage = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = () => {
    try {
      const data = new FormData();
      data.append('title', title);
      data.append('text', text);
      data.append('image', image);
      dispatch(createPost(data));
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const clearFormHandler = () => {
    setText('');
    setTitle('');
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className={s.addPostPage}>
      <label>
        Add image:
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </label>

      <div>
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="img"
            style={{ width: '100%', borderRadius: '12px', marginBottom: '20px' }}
          />
        )}
      </div>

      <label>
        Post title:
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <label>
        Post text:
        <textarea
          value={text}
          placeholder="Post text"
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </label>

      <div>
        <button onClick={submitHandler}>Add</button>
        <button onClick={clearFormHandler}>Cancel</button>
      </div>
    </form>
  );
};

export default AddPostPage;
