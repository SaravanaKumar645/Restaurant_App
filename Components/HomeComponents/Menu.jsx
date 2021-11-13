import React, { useState, useEffect } from "react";
import styles from "../../styles/Menu.module.css";
const jwt = require("jsonwebtoken");
import axios from "axios";
import { Tooltip, tooltipClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Notifications from "../Notifications";
import { toast, ToastContainer } from "react-toastify";
import isAuthenticated from "../../Authentication/authCheck";

const fetchData = async () =>
  await axios
    .get("https://restaurant-web-server.herokuapp.com/api/get-all-menus")
    .then((res) => ({
      error: false,
      menus: res.data,
    }))
    .catch(() => ({
      error: true,
      menus: null,
    }));

const Menu = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(async () => {
    const user = await isAuthenticated();
    const data = await fetchData();
    setMenuItems(data.menus.menuDetails);
    console.log(data);
    setCurrentUser(user);
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

  const handleCartAdd = (e, value) => {
    e.target.preventDefault;
    console.log(value);
    value["email"] = currentUser.email;
    axios({
      url: "https://restaurant-web-server.herokuapp.com/api/add-cart-item",
      method: "POST",
      data: { item: value },
    })
      .then((result) => {
        if (result.status === 200) {
          console.log(result.data);
          Notifications.notifySuccess(result.data.msg);
        } else if (result.status === 408) {
          Notifications.notifyError(result.data.msg);
        } else if (result.status === 202) {
          console.log(result.data);
          Notifications.notifyWarning(result.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
        Notifications.notifyError("Something went wrong !\n" + err);
      });
  };

  const handleOrderInitiate = (e, value, index) => {
    e.target.preventDefault;
    value["email"] = currentUser.email;
    console.log(value);
    const orderQuantity = Number(
      document.getElementById(`quantity${index}`).value
    );
    console.log(orderQuantity);
    if (!orderQuantity > 0) {
      return Notifications.notifyError("Quantity can't be zero !");
    }

    axios({
      url: "https://restaurant-web-server.herokuapp.com/api/create-orders",
      method: "POST",
      data: { orderedItem: value, quantity: orderQuantity },
    })
      .then((result) => {
        if (result.status === 200) {
          console.log(result.data);
          Notifications.notifySuccess(result.data.msg);
        } else if (result.status === 408) {
          Notifications.notifyError(result.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
        Notifications.notifyError("Something went wrong !\n" + err);
      });
  };

  return (
    <div className={styles.container}>
      <ToastContainer theme="colored" autoClose={5000} position="top-right" />
      <div className={styles.header}>
        <h2>Hello&ensp;{currentUser.name} !</h2>
        <p>Here is the menu for you Today &ensp;!</p>
      </div>
      <div className={styles.items}>
        <ul>
          {menuItems.length > 0 &&
            menuItems.map((value, index) => {
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
                      <a onClick={(e) => handleCartAdd(e, value)}>
                        {/* <i className="fas fa-cart-plus"></i>{" "} */}
                        <FontAwesomeIcon
                          icon={faCartPlus}
                          className={styles.i}
                        />
                      </a>
                    </BootstrapTooltip>
                    <BootstrapTooltip title="Order Now">
                      <a onClick={(e) => handleOrderInitiate(e, value, index)}>
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

export default Menu;
