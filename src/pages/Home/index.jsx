import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Material Ui
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

// Компоненты
import { Post } from '../../components/Post';
import { TagsBlock } from '../../components/TagsBlock';
import Search from '../../components/SearchPosts';

// Redux
import { fetchPosts, fetchTegs } from '../../redux/slices/post';

import styles from './Home.module.scss'

export const Home = () => {

  const dispatch = useDispatch();

  // Все данные пользователя 
  const userData = useSelector((state) => state.auth.data);

  const { posts, tags } = useSelector((state) => state.posts);

  const isPostLoading = posts.status === 'loading';

  const isTagsLoading = tags.status === 'loading';

  // Тип сортировки постов
  const [SortType, setSortType] = React.useState('createdAt');

  // Получаем все теги 
  React.useEffect(() => {
    dispatch(fetchTegs());
  }, []);


  // Отправляем на бек название сортировки 
  React.useEffect(() => {
    dispatch(fetchPosts(SortType));
  }, [SortType])


  // Номер выбранной сортировки
  const [selected, setSelected] = React.useState(0);

  const SortList = [
    {id: 0, name: 'Новые', sortProperty: "createdAt"},
    {id: 1, name: 'Популярные', sortProperty: "viewsCount"},
  ]; 

  // Следим за изменением размера при ресайзе страницы
  const [LitSize, setLitSize] = React.useState(8);

  window.addEventListener("resize", function() {
    if (window.matchMedia("(min-width: 780px)").matches) {
        setLitSize(8); 
        // console.log("Screen width is at least 780px");
    } else {
        setLitSize(12);
        // console.log("Screen less than 780px");
    }
  });

  // Проверям ширину, когда нет никаких изменений 
  const pageWidth = document.documentElement.scrollWidth

  React.useEffect(() => {
    if(pageWidth <= 780) {
      setLitSize(12)
    }
    // console.log(pageWidth)
  }, [pageWidth])

  
 
  return (
    <>
    {/* Виды сортировок */}

      <Tabs className={styles.Sort} value={selected} onClick={() => setSelected(selected === 0 ? 1 : 0)} indicatorColor="secondary" textColor="secondary" aria-label="basic tabs example">
        {/* <Tab onClick={() => setSortType("createdAt")} label="Новые" />
        <Tab onClick={() => setSortType("viewsCount")} label="Популярные" /> */}

        {
          SortList.map((obj, i) => (
            <Tab
              key={i}
              label={`${obj.name}`}
              onClick={() => setSortType( `${obj.sortProperty}`)}
            />
            
          ))
        }
        
      </Tabs>

      {/* Передаём тип сортировки в поисковик */}
      <Search SortType={SortType}/>

      {/* Посты */}
      <Grid container spacing={4}>
        <Grid xs={LitSize} item>
          {(isPostLoading ? [...Array(5)] : posts.items ).map((obj, index) => 
            isPostLoading ? (
              <Post key={index} isLoading={true} /> 
            ) : (
              <Post
                key={index}
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={(obj.comments).length}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            ),
          )}
        </Grid>
        <Grid xs={4} item>
          {/* Теги */}
          <div className={styles.TagsBlock}>
            <TagsBlock 
              items={tags.items} 
              isLoading={isTagsLoading} 
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
};
