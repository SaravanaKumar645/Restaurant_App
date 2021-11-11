import router from "next/router";
import { useEffect } from "react";
import Header from "../../Components/HomeComponents/Header";
import Cart from "../../Components/HomeComponents/Cart";
import Head from "next/head";
const My_Cart = () => {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.replace("/login_user");
    }
  }, []);
  return (
    <>
      <Header />
      <Cart />
      <Head>
        <title>My Cart</title>
      </Head>
    </>
  );
};

export default My_Cart;
