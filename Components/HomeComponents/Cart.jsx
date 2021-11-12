import React, { useState, useEffect } from "react";
import styles from "../../styles/Cart.module.css";
const jwt = require("jsonwebtoken");

const Cart = () => {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      console.log("My Token : " + token);
      const user = jwt.decode(token);
      console.log("Current User : " + user);
      setCurrentUser(user);
    }
  }, []);
  const [currentUser, setCurrentUser] = useState({});
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Hello&ensp;{currentUser.name} !</h2>
        <p>Your Cart &ensp;!</p>
      </div>
      <div className={styles.items}>
        <ul>
          <li key={1}>
            <div className={styles.p_img}>
              <img src="https://img.icons8.com/external-becris-lineal-becris/64/000000/external-user-mintab-for-ios-becris-lineal-becris.png"></img>
            </div>
            <div className={styles.p_details}>
              <h3>Product Name</h3>
              <p className={styles.p_desc}>
                Here u will enter ur product description and they can be maximum
                200 characters and this ffor checking .
              </p>
              <strong>
                Stock : <span>20</span>
              </strong>
              <div className={styles.PriceandQuantityWrapper}>
                <h4>Rs. 224</h4>
                <input
                  placeholder="Select Quantity"
                  aria-valuemax="9"
                  aria-valuemin="0"
                  type="number"
                  min={0}
                  max={9}
                ></input>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Cart;
