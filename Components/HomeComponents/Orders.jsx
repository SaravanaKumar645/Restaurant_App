import React, { useState, useEffect } from "react";
import styles from "../../styles/Order.module.css";
import { Tooltip, tooltipClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStoreSlash, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Notifications from "../Notifications";
import { toast, ToastContainer } from "react-toastify";
import isAuthenticated from "../../Authentication/authCheck";
import Loader from "../Loader";

const fetchUserOrder = async (email) =>
  await axios
    .post(
      `https://restaurant-web-server.herokuapp.com/api/get-user-orders/${email}`
    )
    .then((res) => ({
      error: false,
      orders: res.data,
    }))
    .catch(() => ({
      error: true,
      orders: null,
    }));

const Orders = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [orderItems, setOrderItems] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => () => setLoading(false), []);

  useEffect(async () => {
    setLoading(true);
    const user = await isAuthenticated();
    const data = await fetchUserOrder(user.email);
    setOrderItems(data.orders.orderDetails);
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

  // *For ApI Calls
  const handleCancelOrder = (e, value, index) => {
    setLoading(true);
    axios({
      url: `https://restaurant-web-server.herokuapp.com/api/cancel-orders/${value._id}/${value.email}`,
      method: "POST",
    })
      .then((result) => {
        setLoading(false);
        if (result.status === 200) {
          var updatedOrder = [...orderItems];
          updatedOrder.splice(index, 1, result.data.orderDetails);
          setOrderItems(updatedOrder);
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
  };

  const handleDeleteOrder = (e, value, index) => {
    setLoading(true);
    axios({
      url: `https://restaurant-web-server.herokuapp.com/api/delete-orders/${value._id}/${value.email}`,
      method: "POST",
    })
      .then((result) => {
        setLoading(false);
        if (result.status === 200) {
          var updatedOrder = [...orderItems];
          updatedOrder.splice(index, 1);
          setOrderItems(updatedOrder);
          console.log(result.data);
          Notifications.notifySuccess("Item has been deleted .");
        } else if (result.status === 408) {
          Notifications.notifyError(result.data.msg);
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
        <p>Your Orders &ensp;!</p>
      </div>
      <div className={styles.items}>
        <ul>
          {orderItems.length > 0 &&
            orderItems.map((value, index) => {
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
                      Total.Qty : <span>{value.quantity}</span>
                    </strong>
                    <div className={styles.PriceandQuantityWrapper}>
                      <h4>
                        Rs.{" "}
                        {Number(value.item_details.item_price) * value.quantity}
                      </h4>
                      <p className={styles.deliveryStatus}>
                        Status :{" "}
                        <span
                          className={
                            value.delivery_status === "pending"
                              ? styles["status_pending"]
                              : value.delivery_status === "cancelled"
                              ? styles["status_cancelled"]
                              : styles["status_delivered"]
                          }
                        >
                          {value.delivery_status}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className={styles.iconButtons}>
                    <BootstrapTooltip title="Cancel Order ">
                      <a>
                        <FontAwesomeIcon
                          icon={faStoreSlash}
                          className={
                            value.delivery_status === "cancelled" ||
                            value.delivery_status === "delivered"
                              ? styles["iDisabled"]
                              : styles["i"]
                          }
                          onClick={(e) => {
                            if (
                              value.delivery_status.includes([
                                "cancelled" || "delivered",
                              ])
                            ) {
                              Notifications.notifyError(
                                "Cannot cancel the item as it has already Delivered or Cancelled !"
                              );
                            } else {
                              handleCancelOrder(e, value, index);
                            }
                          }}
                        />
                      </a>
                    </BootstrapTooltip>
                    <BootstrapTooltip title="Remove from list ">
                      <a>
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          className={
                            value.delivery_status === "pending"
                              ? styles["iDeleteDisabled"]
                              : styles["iDelete"]
                          }
                          onClick={(e) => {
                            if (value.delivery_status === "pending") {
                              return Notifications.notifyError(
                                "You cannot remove the item with status = PENDING !"
                              );
                            } else {
                              handleDeleteOrder(e, value, index);
                            }
                          }}
                        />
                      </a>
                    </BootstrapTooltip>
                  </div>
                </li>
              );
            })}
        </ul>
        {orderItems.length < 1 && (
          <div className={styles.noProductFound}>
            <p>You don&apos;t have any orders !</p>
          </div>
        )}
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default Orders;
