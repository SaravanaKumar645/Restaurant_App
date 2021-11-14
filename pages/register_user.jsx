import Register from "../Components/Register";
import Head from "next/head";
import { useEffect } from "react";
import isProtected from "../Authentication/routeCheck";
import router from "next/router";
import Notifications from "../Components/Notifications";

const Register_user = () => {
  useEffect(() => {
    const redirect = isProtected();
    if (redirect) {
      Notifications.notifySuccess("Cached User details. Login success !");
      router.replace("/homepage/menu_items");
    }
  }, []);
  return (
    <>
      <Register />
      <Head>
        <title>Register</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <script
          src="https://kit.fontawesome.com/1794b9b2a9.js"
          crossOrigin="anonymous"
        ></script>
      </Head>
    </>
  );
};

export default Register_user;
