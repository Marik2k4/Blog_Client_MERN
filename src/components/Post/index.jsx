import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

// Material UI
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import { fetchRemovePost, fetchTegs, fetchPosts } from '../../redux/slices/post';

export const Post = ({
  id,
  title,
  createdAt,
  imageUrl,
  user, // ава + ник
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {

  const ChangedDate = moment(new Date(createdAt)).format('LL') // August 13, 2022

  const month = ChangedDate.split(' ')[0] // August
  const data = ChangedDate.split(' ')[1] // 13
  const year = ChangedDate.split(' ')[2] // 2022

  let ChangedDateRus = ''

  if (month === 'August') {
    ChangedDateRus = 'Август ' + data + ' ' + year
  } 
  if (month === 'September') {
    ChangedDateRus = 'Сентябрь ' + data + ' ' + year
  }  
  if (month === 'October') {
    ChangedDateRus = 'Октябрь ' + data + ' ' + year
  }  
  if (month === 'November') {
    ChangedDateRus = 'Ноябрь ' + data + ' ' + year
  }  
  if (month === 'December') {
    ChangedDateRus = 'Декабрь' + data + ' ' + year
  }  
  if (month === 'January') {
    ChangedDateRus = 'Январь ' + data + ' ' + year
  }  
  if (month === 'February') {
    ChangedDateRus = 'Февраль ' + data + ' ' + year
  }  
  if (month === 'March') {
    ChangedDateRus = 'Март' + data + ' ' + year
  }  
  if (month === 'April') {
    ChangedDateRus = 'Апрель ' + data + ' ' + year
  }  
  if (month === 'May') {
    ChangedDateRus = 'Май ' + data + ' ' + year
  }  
  if (month === 'June') {
    ChangedDateRus = 'Июнь ' + data + ' ' + year
  }  
  if (month === 'July') {
    ChangedDateRus = 'Июль ' + data + ' ' + year
  }  
  

  // Ширина экрана
  const [LitSize, setLitSize] = React.useState(true);

  // Проверям ширину, когда нет никаких изменений 
  const pageWidth = document.documentElement.scrollWidth

  React.useEffect(() => {
    if(pageWidth <= 780) {
      setLitSize(false)
    }
    // console.log(pageWidth)
  }, [pageWidth])


  const dispatch = useDispatch();

  if (isLoading) {
    return <PostSkeleton />;
  }

  // Удаление статьи 
  const onClickRemove = async () => {
    if(window.confirm('Вы точно хотите удалить статью?')) {
      
      await dispatch(fetchRemovePost(id));
  
      // Обновляем блок с тегами
      await dispatch(fetchTegs());

    }
  };



  window.addEventListener("resize", function() {
    if (window.matchMedia("(min-width: 780px)").matches) {
        setLitSize(true); 
        // console.log("!!Screen width is at least 780px");
    } else {
        setLitSize(false);
        // console.log("!!Screen less than 780px");
    }
  });

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>

      {isEditable && (
        <div className={styles.editButtons}>
          {/* Редактирование статьи */}
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          {/* Удаление статьи */}
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}

    <Link className={styles.FullPostBlock} to={`/post/${id}`}>

      {/* Фото */}
      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={imageUrl}
          alt={title}
        />
      )}

      <div className={styles.wrapper}>
        {/* Ава и Имя */}
        <UserInfo {...user} time={ChangedDateRus} />
        <div className={styles.indention}>
          {/* Заголовок поста */}
          <h2 className={clsx(LitSize ? styles.title : styles.titleMin, { [styles.titleFull]: isFullPost })}>
            {/* {isFullPost ? title : <Link to={`/post/${id}`}>{title}</Link>} */}
            {isFullPost ? title : <span>{title}</span> }
          </h2>
          {/* Теги */}
          <ul className={styles.tags}>
            {tags.map((name) => (
              <li key={name}>
                <Link to = {`/TagedPosts/${name}`} state = {{name: name}}>#{name}</Link>
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          {/* Просмотры и коменты */}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>

    </Link>

    </div>
  );
};
