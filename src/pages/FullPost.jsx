import React from "react";
import ReactMarkdown from 'react-markdown'
import { useParams } from "react-router-dom";
import axios from '../axios';

// Компоненты
import { Post } from "../components/Post";
import { AddComment } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock/CommentsBlock";

export const FullPost = () => {
  // Данные пользователя 
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true)

  // Вытаскиваем id из адресной строки 
  const { id } = useParams()

  // Делаем запрос на страницу с отдельным постом 
  React.useEffect(() => {
    axios.get(`/post/${id}`).then(res => {

      // Информация о посте
      setData(res.data);

      // Завершаем анимацию, если статья загрузилась 
      setIsLoading(false); 

    }).catch((err) => {
      console.warn(err);
      alert('Ошибка при получении статьи')
    })
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost/>
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={(data.comments).length}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text}/>
      </Post>
      
      {/* Комментарии */}
      <CommentsBlock
        CommentObject={data.comments}
        isLoading={false}
      >
        {/* Поле ввода комментария  = children */}
        <AddComment 
          id={id}  // id статьи
        />
      </CommentsBlock>
    </>
  );
};
