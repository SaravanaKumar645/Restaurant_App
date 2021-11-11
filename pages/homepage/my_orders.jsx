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
      </Head>
    </>
  );
};

export default My_Orders;
