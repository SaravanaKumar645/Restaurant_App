import React, { useState, useEffect } from "react";
import styles from "../../styles/Menu.module.css";
import axios from "axios";
import { Tooltip, tooltipClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Notifications from "../Notifications";
import { toast, ToastContainer } from "react-toastify";
import isAuthenticated from "../../Authentication/authCheck";
import Loader from "../Loader";

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
  const [isLoading, setLoading] = useState(false);

  useEffect(() => () => setLoading(false), []);

  useEffect(async () => {
    setLoading(true);
    const user = await isAuthenticated();
    const data = await fetchData();
    setMenuItems(data.menus.menuDetails);
    console.log(data);
    setCurrentUser(user);
    setLoading(false);
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
    setLoading(true);
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
          setLoading(false);
          Notifications.notifySuccess(result.data.msg);
        } else if (result.status === 408) {
          setLoading(false);
          Notifications.notifyError(result.data.msg);
        } else if (result.status === 202) {
          setLoading(false);
          console.log(result.data);
          Notifications.notifyWarning(result.data.msg);
        }
      })
      .catch((err) => {
        setLoading(false);
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
    } else if (orderQuantity > value.item_stock - 3) {
      return Notifications.notifyError(
        "You have exceeded the maximum quantity !"
      );
    } else {
      setLoading(true);
      axios({
        url: "https://restaurant-web-server.herokuapp.com/api/create-orders",
        method: "POST",
        data: { orderedItem: value, quantity: orderQuantity },
      })
        .then((result) => {
          setLoading(false);
          if (result.status === 200) {
            console.log(result.data);
            Notifications.notifySuccess(result.data.msg);
          } else if (result.status === 408) {
            Notifications.notifyError(result.data.msg);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          Notifications.notifyError("Something went wrong !\n" + err);
        });
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer
        style={{ zIndex: "9999" }}
        theme="colored"
        autoClose={5000}
        position="top-right"
      />
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
        {menuItems.length < 1 && (
          <div className={styles.noProductFound}>
            <p>Sorry no menu found ! !</p>
          </div>
        )}
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default Menu;
