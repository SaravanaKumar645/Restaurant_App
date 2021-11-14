import React, { useState, useEffect } from "react";
import styles from "../../styles/Cart.module.css";
import axios from "axios";
import { Tooltip, tooltipClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Notifications from "../Notifications";
import { toast, ToastContainer } from "react-toastify";
import isAuthenticated from "../../Authentication/authCheck";
import dynamic from "next/dynamic";
import Loader from "../Loader";

const fetchUserCart = async (email) =>
  await axios
    .post(
      `https://restaurant-web-server.herokuapp.com/api/get-cart-items/${email}`
    )
    .then((res) => ({
      error: false,
      cart: res.data,
    }))
    .catch(() => ({
      error: true,
      cart: null,
    }));

const DynamicComponent = dynamic(() => import("./RenderCartList"));

const Cart = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => () => setLoading(false), []);

  useEffect(async () => {
    setLoading(true);
    const user = await isAuthenticated();
    const data = await fetchUserCart(user.email);
    setCartItems(data.cart.cartDetails);
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

  //*Api Calls
  const handleOrderInitiate = (e, value, index) => {
    e.target.preventDefault;
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

  const handleRemoveItem = (e, value, index) => {
    e.target.preventDefault;
    console.log(value);
    setLoading(true);
    axios({
      url: "https://restaurant-web-server.herokuapp.com/api/delete-cart-item",
      method: "POST",
      data: { id: value._id, email: value.email },
    })
      .then((result) => {
        setLoading(false);
        if (result.status === 200) {
          var currentCart = [...cartItems];
          currentCart.splice(index, 1);
          setCartItems(currentCart);
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
        setLoading(false);
        console.log(err);
        Notifications.notifyError("Something went wrong !\n" + err);
      });
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
        <p>Your Cart &ensp;!</p>
      </div>
      <div className={styles.items}>
        <ul>
          {cartItems.length > 0 &&
            cartItems.map((value, index) => {
              return (
                <li key={index}>
                  <div className={styles.p_img}>
                    <img
                      className={styles.img}
                      src={value.item_details.item_pic}
                    />
                  </div>
                  <div className={styles.p_details}>
                    <h3>{value.item_name}</h3>
                    <p className={styles.p_desc}>
                      {value.item_details.item_description}
                    </p>
                    <strong>
                      Stock : <span>{value.item_details.item_stock}</span>
                    </strong>
                    <div className={styles.PriceandQuantityWrapper}>
                      <h4>Rs. {value.item_details.item_price}</h4>
                      <input
                        key={index}
                        placeholder="Select Quantity"
                        type="number"
                        id={`quantity${index}`}
                        min={1}
                        max={
                          value.item_details.item_stock > 4
                            ? value.item_details.item_stock - 3
                            : value.item_details.item_stock
                        }
                      ></input>
                    </div>
                  </div>
                  <div className={styles.iconButtons}>
                    <BootstrapTooltip title="Remove from Cart">
                      <a onClick={(e) => handleRemoveItem(e, value, index)}>
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          className={styles.iDelete}
                        />
                      </a>
                    </BootstrapTooltip>
                    <BootstrapTooltip title="Order Now">
                      <a onClick={(e) => handleOrderInitiate(e, value, index)}>
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
        {cartItems.length < 1 && (
          <div className={styles.noProductFound}>
            <p>Currently your Cart is Empty !</p>
          </div>
        )}
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default Cart;
