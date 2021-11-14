import Head from "next/head";
import Login from "../Components/Login";
import isProtected from "../Authentication/routeCheck";
import router from "next/router";
import { useEffect } from "react";
import Notifications from "../Components/Notifications";

const Login_user = () => {
  useEffect(() => {
    const redirect = isProtected();
    if (redirect) {
      Notifications.notifySuccess("Cached User details. Login success !");
      router.replace("/homepage/menu_items");
    }
  }, []);
  return (
    <>
      <Login />
      <Head>
        <title>Login</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <script
          src="https://kit.fontawesome.com/1794b9b2a9.js"
          crossOrigin="anonymous"
        ></script>
      </Head>
    </>
  );
};

export default Login_user;
