import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';

// Material Ui
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

// Redux
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";

import styles from './Login.module.scss';

export const Registration = () => {

  // Авторизован или нет
  const isAuth = useSelector(selectIsAuth);  

  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors, isValid }} = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: ''
    },
    mode: 'onChange'
  })

  // Отправляем данные на бэк если валидация прошла успешно 
  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    // Если не появился токен 
    if(!data.payload) {
      return alert('Не удалось зарегистрироваться')
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
    <Paper classes={{ root: styles.root }}>
      
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField 
          className={styles.field} 
          label="Полное имя" 
          fullWidth 
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          color="secondary"
          {...register('fullName', { required: 'Укажите полное имя'})}
        />
        <TextField 
          className={styles.field} 
          label="E-Mail" 
          fullWidth 
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          color="secondary"
          {...register('email', { required: 'Укажите почту'})}
        />
        <TextField 
          className={styles.field} 
          label="Пароль" 
          fullWidth 
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type="password"
          color="secondary"
          {...register('password', { required: 'Укажите пароль'})}
        />

        <Button disabled={!isValid} type="submit" size="large" variant="contained" color="secondary" fullWidth>
          Зарегистрироваться
        </Button>

      </form>

    </Paper>
  );
};
