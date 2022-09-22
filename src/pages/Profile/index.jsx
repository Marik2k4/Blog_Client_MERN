import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Material Ui
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

// Компоненты
import { Post } from '../../components/Post';
import axios from '../../axios';

// Redux
import { selectIsAuth, fetchAuthMe, fetchUpdatehMe } from "../../redux/slices/auth";
import { fetchUsersPosts } from "../../redux/slices/post";
import { Navigate } from 'react-router-dom';

import styles from './Profile.module.scss';

export const Profile = () => {

  const dispatch = useDispatch();

  // авторизован или нет 
  const isAuth = useSelector(selectIsAuth); 

  // Данные пользователя 
  const userData = useSelector((state) => state.auth);
  const userFullUnfo = userData.data // данные
  const isUserDataLoading = userData.status == 'loading';

  // Посты пользователя 
  const posts = useSelector((state) => state.posts.UsersPost);
  const postsLoading = posts.status == 'loading';

  // Получение ID пользователя после сохранения новой аватарки 
  const [idShnik, setIdshnik] = React.useState('');

  React.useEffect(() => {
    
    // Когда получили данные о пользователи 
    if (!isUserDataLoading) {
      
      const userFullUnfo = userData.data

      // Запрашиваем посты пользователя
      dispatch(fetchUsersPosts(userFullUnfo._id ? `${ userFullUnfo._id }` : `${ idShnik }`))
        
    }

  }, [isUserDataLoading]) // isUserDataLoading - вывод записей после обновления страницы 


  // Загрузка  новой аватарки 
  const [imageUrl, setImageUrl] = React.useState('');

  // Ссылка на input изображения
  const inputFileRef = React.useRef(null)

  // Нажали ли на "Изменить аватарку"
  const [click, setClick] = React.useState(false);


  // Загрузили новое фото
  const handleChangeFile = async (event) => {
    setClick(true);
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);

      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);  

    } catch (err) {
      console.warn(err);
      alert('Ошибка при загрузке файла')
    }
  };



  // Запрос на изменения профиля 
  const onSubmit = async () => {
    setClick(false);
    try {

      const userId = userFullUnfo._id

      // Id пользователя и новая ава 
      const UserData = {
        userId,
        imageUrl
      }

      setIdshnik(userId);

      // Запрос на обновление данных (аватарка)
      await dispatch(fetchUpdatehMe(UserData))

      // Запрос на получение данных
      await dispatch(fetchAuthMe())

      // Запрашиваем посты после изменение авы, чтобы в постах изменить аватарку 
      await dispatch(fetchUsersPosts(`${ userId }`))


    } catch (err) {
      console.warn(err);
      alert('Ошибка при изменении данных')
    }
  };


  //  Запрет на вход не авторизированным пользователям 
  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/"/>
  }


  return (

    <div>
    {
      (!isUserDataLoading) ? 

      (
        <>

        <div className={styles.MainInfo}>
          <img className={styles.avatar} src={imageUrl ? `http://localhost:4444${imageUrl}` : (!(userFullUnfo.avatarUrl) ? '/noavatar.png' : `http://localhost:4444${userFullUnfo.avatarUrl}`)} alt="Аватарка" /> 

          <div className={styles.WithOutAva}>
            <div className={styles.userDetails}> 
              <span className={styles.userName}>{userFullUnfo.fullName}</span>
            </div>

            {
              !click ? (
                <Button className={styles.btn} onClick={() => inputFileRef.current.click()} variant="outlined" size="large" color="secondary">
                  Изменить аватарку
                </Button>
              ) :
              (
                <Button className={styles.btn} onClick={onSubmit} size="large">
                  Сохранить
                </Button>
              )
            }

            <input 
              ref={inputFileRef} 
              type="file" 
              // Изменилось ли что-нибудь в input 
              onChange={handleChangeFile} 
              hidden 
            /> 

          </div>
        </div>
          

          <p className={styles.PostsHeader}>Ваши пyбликации:</p>

          <Grid xs={8} item>
          {(postsLoading ? [...Array(5)] : Array.from(posts.items) ).map((obj, index) => 
            postsLoading ? (
              <Post key={index} isLoading={true} /> 
            ) : (
              <Post
                key={index}
                id={obj._id}
                title={obj.title}
               // imageUrl={obj.imageUrl}
                imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable={userFullUnfo?._id == obj.user._id}
              />
            ),
          )}
        </Grid>

        </>
      ) 

      : 

      (
        <>
          <img className={styles.avatar} src={'/noavatar.png'} alt="Аватарка" /> 
          <p>Данные загружаются</p>
        </>
      )

    }
      
    </div>

  )
}




