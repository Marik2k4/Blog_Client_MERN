import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Material Ui
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

// Redux
import { selectIsAuth } from "../../redux/slices/auth";
import axios from "../../axios";

import styles from "./AddComment.module.scss";

export const AddComment = ({id}) => {

  // авторизован или нет 
  const isAuth = useSelector(selectIsAuth); 

  const userData = useSelector((state) => state.auth);
  const userFullUnfo = userData.data // данные
  // const isUserDataLoading = userData.status === 'loading';

  const [comment, setComment] = React.useState(' ');

  const user = userData.data

  // Данные для комментария 
  const DataForComment = {
    id, // id поста
    user, // данные о пользователе 
    comment
  }

  // Управляемый input 
  const onChangeInput = (event) => {
    setComment(event.target.value); 
  }

  const AddComment = () => {
    if(DataForComment.comment !== '') {
      axios.post(`/posts/${DataForComment.id}`, DataForComment);
      setComment(' ');
      window.location.reload();
    } else{
      alert('Комментарий не должен быть пустым!')
    }
  }

  // Запрет на вход не авторизированным пользователям 
  if (!window.localStorage.getItem('token') && !isAuth) {
    alert('Для просмотра поста необходимо войти в систему')
    return <Navigate to="/"/>
  }

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src = { `http://localhost:4444${userFullUnfo.avatarUrl}` }
        />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            color="secondary" 
            fullWidth
            value={comment}
            onChange={onChangeInput} 
            variant="outlined"
            maxRows={10}
            multiline
          />
          <Button variant="contained" color="secondary" onClick={AddComment}>Отправить</Button>
        </div>
      </div>
    </>
  );
};
