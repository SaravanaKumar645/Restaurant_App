import router from "next/router";
import { useEffect } from "react";
import Menu from "../../Components/HomeComponents/Menu";
import Header from "../../Components/HomeComponents/Header";
import Head from "next/head";
const Menu_items = () => {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.replace("/login_user");
    }
  }, []);
  return (
    <>
      <Header />
      <Menu />
      <Head>
        <title>Menu Items</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <script
          src="https://kit.fontawesome.com/1794b9b2a9.js"
          crossOrigin="anonymous"
        ></script>
      </Head>
    </>
  );
};

export default Menu_items;
