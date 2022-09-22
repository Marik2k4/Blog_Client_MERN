import React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Material Ui
import Grid from '@mui/material/Grid';

// Redux
import { fetchTegedPosts } from '../../redux/slices/post';

// Компоненты
import { Post } from '../../components/Post';

export const TagedPosts = () => {

  const dispatch = useDispatch();

  const location = useLocation()

  const { posts } = useSelector((state) => state.posts);

  // Данные пользователя 
  const userData = useSelector((state) => state.auth.data);

  const isPostLoading = posts.status === 'loading';

  // Получили название тега на который нажали из Link -> props 
  const { name } = location.state

  // Запрашиваем посты по тегу
  React.useEffect(() => {
      dispatch(fetchTegedPosts(name));
  }, []);

      
  return (
    <>

    <h2>
      <p># {name}</p>
    </h2>
    
    <Grid xs={8} item>
          {(isPostLoading ? [...Array(5)] : posts.items ).map((obj, index) => 
            isPostLoading ? (
              <Post key={index} isLoading={true} /> 
            ) : (
              
              <Post
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={(obj.comments).length}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            ),
          )}
        </Grid>
    </>
  )
}
