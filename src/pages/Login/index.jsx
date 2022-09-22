import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate} from 'react-router-dom';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from 'react-hook-form';
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

import styles from "./Login.module.scss";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth); // авторизован или нет 
  const dispatch = useDispatch();

  const { register, handleSubmit, setError, formState: { errors, isValid }} = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  })

  // Отправляем данные на бэк если валидация прошла успешно 
  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    // Если не появился токен 
    if(!data.payload) {
      return alert('Не удалось авторизоваться')
    }

    // Сохраняем данные в Local Storage если появился токен 
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  }

  // После успешного входа перекидываем на главную страницу 
  if(isAuth) {
    return <Navigate to="/" />
  }

  return (
    <div className={styles.wrapper}>
      <Paper className={styles.root}>
        <Typography className={styles.title} variant="h5">
          Вход в аккаунт
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className={styles.field}
            label="E-Mail"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            type="email"
            {...register('email', { required: 'Укажите почту'})}
            color="secondary"
            fullWidth
          />
          <TextField 
            className={styles.field} 
            label="Пароль" 
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            {...register('password', { required: 'Укажите пароль'})}
            color="secondary"
            fullWidth 
          />
          <Button disabled={!isValid} type="submit" size="large" variant="contained" color="secondary" fullWidth>
            Войти
          </Button>
        </form>
      </Paper>
    </div>
  );
};
