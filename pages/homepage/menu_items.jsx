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
      </Head>
    </>
  );
};

export default Menu_items;
