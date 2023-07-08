import React, { FC } from "react";
import styles from "./actions.module.css";

type ActionsProps = {
  children: React.ReactNode;
};

export const Actions: FC<ActionsProps> = ({ children }) => {
  return <div className={styles.actions}>{children}</div>;
};
