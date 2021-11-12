import router from "next/router";
import { useEffect } from "react";
import Header from "../../Components/HomeComponents/Header";
import Orders from "../../Components/HomeComponents/Orders";
import Head from "next/head";
const My_Orders = () => {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.replace("/login_user");
    }
  }, []);
  return (
    <>
      <Header />
      <Orders />
      <Head>
        <title>My Orders</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <script
          src="https://kit.fontawesome.com/1794b9b2a9.js"
          crossOrigin="anonymous"
        ></script>
      </Head>
    </>
  );
};

export default My_Orders;
