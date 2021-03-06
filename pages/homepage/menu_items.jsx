import Menu from "../../Components/HomeComponents/Menu";
import Header from "../../Components/HomeComponents/Header";
import Head from "next/head";
import withAuth from "../../Authentication/protectedRoutes";
const Menu_items = () => {
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

export default withAuth(Menu_items);
