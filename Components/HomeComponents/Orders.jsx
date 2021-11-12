import React, { useState, useEffect } from "react";
import styles from "../../styles/Order.module.css";
const jwt = require("jsonwebtoken");
import { Tooltip, tooltipClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faCartPlus } from "@fortawesome/free-solid-svg-icons";

const Orders = () => {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      console.log("My Token : " + token);
      const user = jwt.decode(token);
      console.log("Current User : " + user);
      setCurrentUser(user);
    }
  }, []);
  // *For Tooltip
  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
      fontSize: "10pt",
      padding: "10px 15px 10px 15px",
      textAlign: "center",
    },
  }));
  const [currentUser, setCurrentUser] = useState({});
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Hello&ensp;{currentUser.name} !</h2>
        <p>Your Orders &ensp;!</p>
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
            <div className={styles.iconButtons}>
              <BootstrapTooltip title="Add to Cart">
                <a onClick={() => alert("clicked")}>
                  {/* <i className="fas fa-cart-plus"></i>{" "} */}
                  <FontAwesomeIcon icon={faCartPlus} className={styles.i} />
                </a>
              </BootstrapTooltip>
              <BootstrapTooltip title="Order Now">
                <a onClick={() => alert("clicked")}>
                  {/* <i className="fas fa-cart-arrow-down"></i>{" "} */}
                  <FontAwesomeIcon
                    icon={faCartArrowDown}
                    className={styles.i}
                  />
                </a>
              </BootstrapTooltip>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Orders;
