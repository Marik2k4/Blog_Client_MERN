import React from "react";
import { Link } from 'react-router-dom';

// Компоненты
import { SideBlock } from "../SideBlock";

// Material UI
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";

import styles from './CommentsBlock.module.scss'

export const CommentsBlock = ({ fullName, children, CommentObject, isLoading = true }) => {

  console.log(CommentObject)
  return (
    <SideBlock title="Комментарии">

    {/* Поле ввода для комментария  */}
    {children}

    {/* Комментарии */}
      {
        <List>
            {
              CommentObject.map((object, i) => (
                <>
                  <React.Fragment key={i}>
                    <ListItem alignItems="flex-start" className={styles.ComBlock}>
                      {/* Аватарка пользователя */}
                      <ListItemAvatar >
                        {isLoading ? (
                          <Skeleton variant="circular" width={40} height={40} />
                        ) : (                          
                          <Link style={{ textDecoration: 'none' }} to={`/othersProfile/${CommentObject[i].AuthorId}`} state = {{
                            fullName: CommentObject[i].AuthorName, 
                            avatarUrl : CommentObject[i].AuthorAvatar, 
                            _id : CommentObject[i].AuthorId                            
                          }}>
                            <Avatar alt={CommentObject[i].AuthorName} src={`http://localhost:4444${CommentObject[i].AuthorAvatar}`} />
                          </Link>
                        )}
                      </ListItemAvatar>
                      {/* Текст комментария */}
                      {isLoading ? (
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <Skeleton variant="text" height={25} width={120} />
                          <Skeleton variant="text" height={18} width={230} />
                        </div>
                      ) : (
                        <ListItemText
                          primary={CommentObject[i].AuthorName}
                          secondary={CommentObject[i].text}
                        />
                      )}
                    </ListItem>
                    {/* Линия разделения */}
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                </>
              ))
            }
        </List>
      }
      
    </SideBlock>
  );
};
