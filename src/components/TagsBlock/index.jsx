import React from "react";
import { Link } from 'react-router-dom';

// Material Ui
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

// Компоненты
import { TagsSkeleton } from "./Skeleton";
import Search from "../SearchTags";
import { SideBlock } from "../SideBlock";

import styles from './TagsBlock.module.scss'

export const TagsBlock = ({ items, isLoading = true }) => {

  let TagsArray = items; // массив всех тегов от всех постов 
  let FilteredArray = [...new Set(TagsArray)]; // избавляемся от повторяющихся элементов 

  return (
    <SideBlock title="Тэги пользователей">

      <Search className={styles.searchBar} FilteredArray={FilteredArray} />

      <List className={styles.list}>

        {
          
          FilteredArray.length !== 0 ? (
          
            (isLoading ? <TagsSkeleton/> : FilteredArray).map((name, i) => (
                
              // Список всех тегов 
              <Link
                key={i}
                to = {`/TagedPosts/${name}`}
                state = {{name: name}} // название тега 
                style={{ textDecoration: "none", color: "black" }}
              >
              
                <ListItem key={i} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <TagIcon />
                    </ListItemIcon>
                    {isLoading ? (
                      <Skeleton width={100} />
                    ) : (
                      <ListItemText primary={name} />
                    )}
                  </ListItemButton>
                </ListItem>
                
              </Link>

            ))

          ) : (
            <>По вашему запросу ничего не найдено</>
          )
          
        }

      </List>
    </SideBlock>
  );
};
