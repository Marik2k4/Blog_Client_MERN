import React from "react";
import styles from "./SideBlock.module.scss";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export const SideBlock = ({ title, children }) => {
  return (
    <Paper className={styles.root}>
      <Typography variant="h6" className={styles.title}>
        {title}
      </Typography> 
      {children}
    </Paper>
  );
};
