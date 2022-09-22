import React from 'react';
import { useSelector } from 'react-redux';
import { TagsBlock } from '../../components/TagsBlock';
import styles from './AllTags.module.scss';

export const AllTags = () => {
  // Теги
  const { tags } = useSelector((state) => state.posts);
  const isTagsLoading = tags.status === 'loading';

  return (
    <div>
       <div>
          <TagsBlock 
            className={styles.AllTags}
            items={tags.items} 
            isLoading={isTagsLoading} 
          />
        </div>
    </div>
  )
}
