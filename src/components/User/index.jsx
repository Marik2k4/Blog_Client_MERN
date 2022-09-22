import React from 'react';
import { Link } from 'react-router-dom';
import styles from './User.module.scss'
import { UsersSkeleton } from '../../pages/AllUsers/Skeleton';

export const User = ({
    id,
    fullName,
    avatarUrl,
    isLoading
}) => {

  const _id = id;

 if(isLoading){
  return <UsersSkeleton/>
 }

  return (
    <div className={styles.wrapper}>
      <Link className={styles.linker} to={`/othersProfile/${id}`} state = {{fullName, avatarUrl, _id}} >
        <div className={styles.block}>
            <img className={styles.ava} src={avatarUrl ?`http://localhost:4444${avatarUrl}` : '/noavatar.png'}></img>
            <div className={styles.MainIfo}>
              <span>{fullName}</span>
            </div>
        </div>
      </Link>
    </div>
  )
}
