import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from '../../utils/axios.js'
import s from './EditPostPage.module.css';
import { updatePost } from '../../redux/post/postSlice.js';

const EditPostPage = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [oldImage, setOldImage] = useState('');
  const [newImage, setNewImage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams()

  const submitHandler = () => {
    try {
      const updatedPost = new FormData()
      updatedPost.append('title', title)
      updatedPost.append('text', text)
      updatedPost.append('id', params.id)
      updatedPost.append('image', newImage)
      dispatch(updatePost(updatedPost))
      navigate('/posts')
    } catch (error) {
      console.log(error);
      
    }
  }

  const clearFormHandler = () => {
    setTitle('')
    setText('')
  }


  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`)
    setTitle(data.title)
    setText(data.text)
    setOldImage(data.imgUrl)
  }, [params.id]);

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  return (
    <form onSubmit={(e) => e.preventDefault()} className={s.addPostPage}>
      <label>
        Add image:
        <input
          type="file"
          onChange={(e) => 
          {  setNewImage(e.target.files[0])
            setOldImage('')}
          }
        />
      </label>

      <div>
        {oldImage && (
          <img
            src={`http://localhost:3001/${oldImage}`}
            alt={oldImage.name}
            style={{ width: '100%', borderRadius: '12px', marginBottom: '20px' }}
          />
        )}
        {newImage && (
          <img
            src={URL.createObjectURL(newImage)}
            alt={newImage.name}
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
        <button onClick={submitHandler}>Save</button>
        <button onClick={clearFormHandler}>Cancel</button>
      </div>
    </form>
  );
}

export default EditPostPage
