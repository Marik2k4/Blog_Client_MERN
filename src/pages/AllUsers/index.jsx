import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Компоненты
import { User } from '../../components/User';

// Redux
import { fetchUsers } from '../../redux/slices/auth';

import styles from './AllUsers.module.scss'

export const AllUsers = () => {

    const dispatch = useDispatch();

    // Запрашиваем всех пользователей 
    React.useEffect(() => {
        dispatch(fetchUsers());
    }, [])

    // Данные пользователя 
    const Users = useSelector((state) => state.auth);
    const UserLoading = Users.status === 'loading';

    // TempArray.items
    // const TempArray = {
    //   "items": [
    //     {
    //       "avatarUrl": "/uploads/2.jpg",
    //       "email": "mark@mail.ru",
    //       "fullName": "Марк",
    //       "_id":  "62b4d148005a9df90a48b284"
    //     },
    //     {
    //       "avatarUrl": "/uploads/2.jpg",
    //       "email": "mark@mail.ru",
    //       "fullName": "Марк",
    //       "_id":  "62b4d148005a9df90a48b284"
    //     },
    //     {
    //       "avatarUrl": "/uploads/2.jpg",
    //       "email": "mark@mail.ru",
    //       "fullName": "Марк",
    //       "_id":  "62b4d148005a9df90a48b284"
    //     },
    //     {
    //       "avatarUrl": "/uploads/2.jpg",
    //       "email": "mark@mail.ru",
    //       "fullName": "Марк",
    //       "_id":  "62b4d148005a9df90a48b284"
    //     },
    //     {
    //       "avatarUrl": "/uploads/2.jpg",
    //       "email": "mark@mail.ru",
    //       "fullName": "Марк",
    //       "_id":  "62b4d148005a9df90a48b284"
    //     },
    //     {
    //       "avatarUrl": "/uploads/2.jpg",
    //       "email": "mark@mail.ru",
    //       "fullName": "Марк",
    //       "_id":  "62b4d148005a9df90a48b284"
    //     },
    //     {
    //       "avatarUrl": "/uploads/2.jpg",
    //       "email": "mark@mail.ru",
    //       "fullName": "Марк",
    //       "_id":  "62b4d148005a9df90a48b284"
    //     },
    //     {
    //       "avatarUrl": "/uploads/2.jpg",
    //       "email": "mark@mail.ru",
    //       "fullName": "Марк",
    //       "_id":  "62b4d148005a9df90a48b284"
    //     },
    //     {
    //       "avatarUrl": "/uploads/2.jpg",
    //       "email": "mark@mail.ru",
    //       "fullName": "Марк",
    //       "_id":  "62b4d148005a9df90a48b284"
    //     },
    //     {
    //       "avatarUrl": "/uploads/2.jpg",
    //       "email": "mark@mail.ru",
    //       "fullName": "Марк",
    //       "_id":  "62b4d148005a9df90a48b284"
    //     },
    //     {
    //       "avatarUrl": "/uploads/2.jpg",
    //       "email": "mark@mail.ru",
    //       "fullName": "Марк",
    //       "_id":  "62b4d148005a9df90a48b284"
    //     },
    //     {
    //       "avatarUrl": "/uploads/2.jpg",
    //       "email": "mark@mail.ru",
    //       "fullName": "Марк",
    //       "_id":  "62b4d148005a9df90a48b284"
    //     }

    //   ]
    // }

  
  return (
    <>
      {
        <div className={styles.wrapper}> 
          {(UserLoading ? [...Array(5)] : Array.from(Users.usersMas) ).map((obj, index) => 
              UserLoading ? (
                <User key={index} isLoading={UserLoading} /> 
              ) : (
                <User
                  key={index}
                  id={obj._id}
                  fullName={obj.fullName}
                  avatarUrl={obj.avatarUrl}
                />
              ),
          )}
        </div>
      }
    </>
  )
}
