import React, { useEffect, useState } from "react";
import styles from "../../styles/Header.module.css";
import jwt from "jsonwebtoken";
import Link from "next/link";
import { useRouter } from "next/router";
const Header = () => {
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
  const router = useRouter();
  const { asPath } = useRouter();
  const tabPath = asPath;

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/login_user");
  };
  return (
    <div className={styles.header}>
      <h2>Welcome&ensp; {currentUser.name} !</h2>
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
