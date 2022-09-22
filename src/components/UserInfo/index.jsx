import React from 'react';
import styles from './UserInfo.module.scss';
import { Link } from 'react-router-dom';

// Инфа в посте 
export const UserInfo = ({ avatarUrl, fullName, time, _id }) => {
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatarUrl ?`http://localhost:4444${avatarUrl}` : '/noavatar.png'}  />
      <div className={styles.userDetails}>
        <Link className={styles.linker} to={`/othersProfile/${_id}`} state = {{fullName, avatarUrl, _id}} >
          <span className={styles.userName}>{fullName}</span>
        </Link>
        <span className={styles.additional}>{time}</span>
      </div>
    </div>
  );
};
