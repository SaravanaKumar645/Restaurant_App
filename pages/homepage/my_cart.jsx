import Header from "../../Components/HomeComponents/Header";
import Cart from "../../Components/HomeComponents/Cart";
import Head from "next/head";
import withAuth from "../../Authentication/protectedRoutes";
const My_Cart = () => {
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

export default withAuth(My_Cart);
