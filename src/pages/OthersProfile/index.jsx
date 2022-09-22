import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

// Компоненты
import { Post } from '../../components/Post';

// Material UI
import Grid from '@mui/material/Grid';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsersPosts } from "../../redux/slices/post";


export const OthersProfile = () => {

    const dispatch = useDispatch();

    const location = useLocation()

    // Данные пользователя 
    const userData = useSelector((state) => state.auth.data);

    // Id других юзеров
    const SomeId = userData._id

    // Вытаскиваем данные из Link 
    const { fullName, avatarUrl, _id } = location.state 

    // Id пользователя 
    const Idnshik = _id

    const posts = useSelector((state) => state.posts.UsersPost);
    const postsLoading = posts.status == 'loading';

    // Запрашиваем посты по ID пользователя 
    React.useEffect(() => {
        dispatch(fetchUsersPosts(`${_id}`))
    }, [])

    const avatar = {
      width: "220px",
      height: "220px",
      borderRadius: "50%",
      fontFamily: "Arial",
      objectFit: "cover"
    };

  

  return (
    <>
        {
            SomeId === Idnshik ? <p><Navigate to="/profile"/></p> : <p>Вы просматриваете профиль пользователя - {fullName}</p>
        }

        <img style={avatar} src={avatarUrl ? `http://localhost:4444${avatarUrl}` : '/noavatar.png' } alt="Аватарка" />
     
        <Grid xs={8} item>
          {(postsLoading ? [...Array(5)] : posts.items ).map((obj, index) => 
            postsLoading ? (
              <Post key={index} isLoading={true} /> 
            ) : (
              <Post
                key={index}
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable={userData?._id == obj.user._id}
              />
            ),
          )}
        </Grid>
      
    </>
  )
}
