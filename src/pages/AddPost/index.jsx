import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate, Navigate, useParams } from 'react-router-dom';

// Material UI
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

// Редактор
import SimpleMDE from 'react-simplemde-editor';

// Redux
import { selectIsAuth } from "../../redux/slices/auth";

// Компоненты
import axios from '../../axios';

// Стили
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';


export const AddPost = () => {
  // Получаем id из адресной строки
  const { id } = useParams();

  const navigate = useNavigate();

  // Авторизован или нет
  const isAuth = useSelector(selectIsAuth);  

  // Отправка на бек 
  const [loading, setLoading] = React.useState(false);

  // Загрузка изображений 
  const [imageUrl, setImageUrl] = React.useState('');

  // текст, который вводим в редактор 
  const [text, setText] = React.useState(''); 

  // Заголовок
  const [title, setTitle] = React.useState('');

  // Теги
  const [tags, setTags] = React.useState('');

  const inputFileRef = React.useRef(null)

  // В процессе редактироваения
  const isEditing = Boolean(id)


  // Загрузка фото 
  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);

      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);

      // console.log(imageUrl)

    } catch (err) {
      console.warn(err);
      alert('Ошибка при загрузке файла')
    }
  };

  // Удаление фото
  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  // Текст в поле 
  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  // Отправка на бек
  const onSubmit = async () => {
    try {
      setLoading(true);

      const fields = {
        title, 
        imageUrl,
        tags,
        text
      }

      console.log('Теги поста:', fields.tags);


      // Отправляем запрос на создание или обновление поста 
      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post('/posts', fields);

      // const _id = isEditing ? id : data._id;

      // После создания перенаправляем на главную страницу 
      navigate(`/`);

    } catch (err) {
      console.warn(err);
      alert('Ошибка при создании статьи')
    }
  };

  // Изменение статьи
  React.useEffect(() => {
    if (id) {
      axios
      .get(`/post/${id}`)
      .then(({ data }) => {
        setTitle(data.title);
        setText(data.text);
        setImageUrl(data.imageUrl);
        setTags(data.tags.join('#'))
      })
      .catch(err => {
        console.warn(err);
        alert('Ошибка при получении статьи')
      })
    }
  }, []);

  // Настройки редактора 
  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  // Запрет на вход не авторизированным пользователям 
  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/"/>
  }

  return (
    <Paper className={styles.wrapper} style={{ padding: 30 }}>

      {/* Переводим клик на input */}
      <Button className={styles.btn} onClick={() => inputFileRef.current.click()} variant="outlined" size="large" color="secondary">
        Загрузить превью
      </Button>

      {/* Загрузка превью */}
      <input 
        ref={inputFileRef} 
        type="file" 
        // Изменилось ли что-нибудь в input 
        onChange={handleChangeFile} 
        hidden 
      />

      {/* Превью */}
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage} className={styles.removeImg}>
            Удалить
          </Button>
          <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
        </>
      )}

      <br />
      <br />

      {/* Заголовок */}
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />

      {/* Теги */}
      <TextField 
        classes={{ root: styles.tags }} 
        variant="standard" 
        placeholder="Тэги" 
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth 
      />
      
      {/* Редактор */}
      <SimpleMDE 
        className={styles.editor} 
        value={text} 
        onChange={onChange} 
        options={options} 
      />
      
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained" color="secondary">
          {isEditing ? 'Сохранить' : 'Опубликовать'}
        </Button>
        <Link to="/">
          <Button size="large" color="error">Отмена</Button>
        </Link>
      </div>
    </Paper>
  );
};
