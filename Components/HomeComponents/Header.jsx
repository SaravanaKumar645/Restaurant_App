import React, { useEffect, useState } from "react";
import styles from "../../styles/Header.module.css";
import jwt from "jsonwebtoken";
import Link from "next/link";
import { useRouter } from "next/router";
import isAuthenticated from "../../Authentication/authCheck";
import { Tooltip, tooltipClasses } from "@mui/material";
import { styled } from "@mui/material/styles";

const Header = () => {
  const [currentUser, setCurrentUser] = useState([]);
  const router = useRouter();
  const { asPath } = useRouter();
  const tabPath = asPath;

  useEffect(async () => {
    const user = await isAuthenticated();
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/login_user");
  };
  return (
    <div className={styles.header}>
      <h2>
        Welcome&ensp;{" "}
        <BootstrapTooltip title={currentUser.email}>
          <span>{currentUser.name} !</span>
        </BootstrapTooltip>
      </h2>

      <ul>
        <Link href="/homepage/menu_items">
          <li>
            <a
              className={
                tabPath === "/homepage/menu_items"
                  ? styles["navTabFocused"]
                  : styles["navTab"]
              }
            >
              Menu
            </a>
          </li>
        </Link>
        <Link href="/homepage/my_orders">
          <li>
            <a
              className={
                tabPath === "/homepage/my_orders"
                  ? styles["navTabFocused"]
                  : styles["navTab"]
              }
            >
              My Orders
            </a>
          </li>
        </Link>
        <Link href="/homepage/my_cart">
          <li>
            <a
              className={
                tabPath === "/homepage/my_cart"
                  ? styles["navTabFocused"]
                  : styles["navTab"]
              }
            >
              My Cart
            </a>
          </li>
        </Link>
        <Link href="/homepage/user_profile">
          <li>
            <a
              className={
                tabPath === "/homepage/user_profile"
                  ? styles["navTabFocused"]
                  : styles["navTab"]
              }
            >
              My Profile
            </a>
          </li>
        </Link>
        <li>
          <a className={styles.navTab} onClick={handleLogout}>
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Header;
