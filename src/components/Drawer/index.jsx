import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer, Box, Typography, IconButton } from '@mui/material'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import ListItemIcon from '@mui/material/ListItemIcon';


import PersonPinIcon from '@mui/icons-material/PersonPin';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TagIcon from '@mui/icons-material/Tag';
import CreateIcon from '@mui/icons-material/Create';
import LogoutIcon from '@mui/icons-material/Logout';


import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

import { selectIsAuth, logout } from '../../redux/slices/auth';

import styles from './Drawer.module.scss';

import axios from '../../axios';

export const MuiDrawer = () => {

  const dispatch = useDispatch()
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
      setIsDrawerOpen(false); // закрываем drawer
    }
  };

  return (
    <>
      <IconButton
        onClick={() => setIsDrawerOpen(true)}
        size='large'
        edge='start'
        color='inherit'
        aria-label='logo'>
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor='right'
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}>

        <Box p={2} width='220px' role='presentation' textAlign='center'>
          <Typography variant='h6' component='div'>
            {/* Side Panel */}

            {isAuth ? (
              <div className={styles.list}>
                <List sx={{ width: '100%', maxWidth: 220, bgcolor: 'background.paper' }}>

                  <ListItem>
                    <ListItemIcon>
                      <PersonPinIcon className={styles.icon}/>
                    </ListItemIcon>

                    <Link to="/profile" className={styles.Tab}>
                      <Button onClick={() => setIsDrawerOpen(false)} className={styles.text}>Профиль</Button>
                    </Link>
                  </ListItem>

                  <ListItem>
                    <ListItemIcon>
                      <PeopleAltIcon className={styles.icon}/>
                    </ListItemIcon>

                    <Link to="/allUsers" className={styles.Tab}> 
                      <Button onClick={() => setIsDrawerOpen(false)} className={styles.text}>Авторы</Button>
                    </Link>
                  </ListItem>

                  <ListItem>
                    <ListItemIcon>
                      <TagIcon className={styles.icon}/>
                    </ListItemIcon>

                    <Link to="/allTags" className={styles.Tab}>
                      <Button onClick={() => setIsDrawerOpen(false)} className={styles.text}>Теги</Button>
                    </Link>
                  </ListItem>
                          
                  <ListItem>
                    <ListItemIcon>
                      <CreateIcon className={styles.icon}/>
                    </ListItemIcon>

                    <Link to="/add-post" className={styles.Tab}>
                      <Button onClick={() => setIsDrawerOpen(false)} className={styles.text}>Написать статью</Button>
                    </Link>
                  </ListItem>

                  <ListItem>
                    <ListItemIcon>
                      <LogoutIcon className={styles.icon}/>
                    </ListItemIcon>

                    <Button onClick={onClickLogout} className={styles.text}>Выйти</Button>   
                  </ListItem>

                </List>
              </div>
            ) : (
              <>
                <Link to="/login" >
                  <Button onClick={() => setIsDrawerOpen(false)}>Войти</Button>
                </Link>

                <Link to="/register"> 
                  <Button onClick={() => setIsDrawerOpen(false)}>Создать аккаунт</Button>
                </Link>
              </>
            )
          
          }

          </Typography>
        </Box>

      </Drawer>
    </>
  )
}