import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Material UI
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import {MuiDrawer} from '../../components/Drawer'

import { selectIsAuth, logout} from "../../redux/slices/auth";

import styles from './Header.module.scss';

import axios from '../../axios';


export const Header = () => {

  const dispatch = useDispatch()

  const isAuth = useSelector(selectIsAuth); // авторизован или нет 
  const [userName, setUserName] = React.useState(''); // имя пользователя 

  // После авторизации получаем имя пользователя 
  if (isAuth) {
    axios.get(`/auth/me`).then(res => {
      setUserName(res.data.fullName);
    }).catch((err) => {
      console.warn(err);
      alert('Ошибка при получении user')
    })
  }

  // Выход
  const onClickLogout = () => {
    if(window.confirm('Вы точно хотите выйти?')) {
      dispatch(logout());
      // удаляем токен после выхода из системы 
      window.localStorage.removeItem('token');
    }
  };

  const [value, setValue] = React.useState("one");
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>

          {/* Заголовок и бургер меню*/}

          <Link className={styles.logo} to="/">
            <div>Write Man</div>
          </Link>

          <div className={styles.drawer}>
            <MuiDrawer />
          </div> 


          {/* Вкладки */}

          <Box sx={{ width: '100%' }} className={styles.buttons}>
              {isAuth ? (
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="secondary tabs example"
                  className={styles.MainBut}
                >
                   
                  <Tab value="one" label={userName} to='/profile' component={Link}  />

                  <Tab value="two" label="Авторы" to='/allUsers' component={Link} />

                  <Tab value="three" label="Написать статью" to='/add-post' component={Link} />

                  <Tab value="four" label="Выйти" onClick={onClickLogout} />
                 
                </Tabs>
              ) : (
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="secondary tabs example"
                  className={styles.MainBut}
                >

                  <Tab value="five" label="Войти" to='/login' component={Link}  />

                  <Tab value="six" label="Создать аккаунт" to='/register' component={Link} />

                </Tabs>
              )
              }

          </Box>

        </div>
      </Container>
    </div>
  );
};
