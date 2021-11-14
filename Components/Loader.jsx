import React from "react";
import styles from "../styles/Login.module.css";
const Loader = (props) => {
  return (
    <div className={styles.loader}>
      <h3>Please wait ...</h3>
    </div>
  );
};

export default Loader;
