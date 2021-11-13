import React from "react";
import styles from "../../styles/Cart.module.css";
import axios from "axios";
import { Tooltip, tooltipClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Notifications from "../Notifications";
import { toast, ToastContainer } from "react-toastify";

const RenderCartList = (props) => {
  const data = props.data;
  const currentUser = props.user;
  console.log("Inside render List ");

  var cartItems = [];
  for (let i = 0; i < data.length; i++) {
    cartItems.push(data[i].item_details);
  }
  console.log(cartItems);
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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Hello&ensp;{currentUser.name} !</h2>
        <p>Your Cart &ensp;!</p>
      </div>
      <div className={styles.items}>
        <ul>
          {cartItems.map((value, index) => {
            return (
              <li key={index}>
                <div className={styles.p_img}>
                  <img className={styles.img} src={value.item_pic} />
                </div>
                <div className={styles.p_details}>
                  <h3>{value.item_name}</h3>
                  <p className={styles.p_desc}>{value.item_description}</p>
                  <strong>
                    Stock : <span>{value.item_stock}</span>
                  </strong>
                  <div className={styles.PriceandQuantityWrapper}>
                    <h4>Rs. {value.item_price}</h4>
                    <input
                      key={index}
                      placeholder="Select Quantity"
                      type="number"
                      id={`quantity${index}`}
                      min={1}
                      max={
                        value.item_stock > 4
                          ? value.item_stock - 3
                          : value.item_stock
                      }
                      onChange={(e) => setQuantity(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className={styles.iconButtons}>
                  <BootstrapTooltip title="Add to Cart">
                    <a>
                      {/* <i className="fas fa-cart-plus"></i>{" "} */}
                      <FontAwesomeIcon icon={faCartPlus} className={styles.i} />
                    </a>
                  </BootstrapTooltip>
                  <BootstrapTooltip title="Order Now">
                    <a>
                      {/* <i className="fas fa-cart-arrow-down"></i>{" "} */}
                      <FontAwesomeIcon
                        icon={faCartArrowDown}
                        className={styles.i}
                      />
                    </a>
                  </BootstrapTooltip>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default RenderCartList;
