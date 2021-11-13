import Register from "../Components/Register";
import router from "next/router";
import { useEffect } from "react";
import Head from "next/head";

const Register_user = () => {
  useEffect(() => {
    if (localStorage.getItem("token")) {
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
