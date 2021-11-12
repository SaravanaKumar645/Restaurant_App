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

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <script
          src="https://kit.fontawesome.com/1794b9b2a9.js"
          crossOrigin="anonymous"
        ></script>
      </Head>
    </>
  );
};

export default My_Cart;
