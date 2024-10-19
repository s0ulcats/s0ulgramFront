import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from '../../utils/axios.js';
import s from './EditPostPage.module.css';
import { updatePost } from '../../redux/post/postSlice.js';
import { AiOutlineFileImage, AiOutlineEdit, AiOutlineSave, AiOutlineClose } from 'react-icons/ai'; // Иконки для полей и кнопок

const EditPostPage = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [oldImage, setOldImage] = useState('');
  const [newImage, setNewImage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const updatedPost = new FormData();
      updatedPost.append('title', title);
      updatedPost.append('text', text);
      updatedPost.append('id', params.id);
  
      if (newImage) {
        updatedPost.append('image', newImage);
      }
  
      await dispatch(updatePost({ id: params.id, params: updatedPost })).unwrap();
      navigate(`/posts`);
    } catch (error) {
      console.error('Error updating post:', error); // Для отладки
    }
  };

  const clearFormHandler = () => {
    setTitle('');
    setText('');
  };

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setTitle(data.title);
    setText(data.text);
    setOldImage(data.imgUrl);
  }, [params.id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return (
    <form onSubmit={submitHandler} className={s.editPostPage}>
      <label className={s.fileInputLabel}>
        <AiOutlineFileImage className={s.icon} /> {/* Иконка для загрузки изображения */}
        Add image:
        <input
          type="file"
          className={s.fileInput}
          onChange={(e) => {
            setNewImage(e.target.files[0]);
            setOldImage('');
          }}
        />
      </label>

      <div className={s.imagePreviewContainer}>
        {oldImage && (
          <img
            src={`http://localhost:3001/${oldImage}`}
            alt={oldImage.name}
            className={s.imagePreview}
          />
        )}
        {newImage && (
          <img
            src={URL.createObjectURL(newImage)}
            alt={newImage.name}
            className={s.imagePreview}
          />
        )}
      </div>

      <label>
        <AiOutlineEdit className={s.icon} /> {/* Иконка для заголовка */}
        Title:
        <input
          type="text"
          placeholder="title"
          value={title}
          className={s.inputField}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <label>
        <AiOutlineEdit className={s.icon} /> {/* Иконка для текста */}
        Text:
        <textarea
          value={text}
          placeholder="Post text"
          className={s.textareaField}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </label>

      <div className={s.buttonGroup}>
        <button type="submit" className={s.saveButton}>
          <AiOutlineSave className={s.iconButton} /> Save {/* Иконка на кнопке "Сохранить" */}
        </button>
        <button type="button" className={s.cancelButton} onClick={clearFormHandler}>
          <AiOutlineClose className={s.iconButton} /> Cancel {/* Иконка на кнопке "Отмена" */}
        </button>
      </div>
    </form>
  );
};

export default EditPostPage;
