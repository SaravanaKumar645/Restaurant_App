import Header from "../../Components/HomeComponents/Header";
import Orders from "../../Components/HomeComponents/Orders";
import Head from "next/head";
import withAuth from "../../Authentication/protectedRoutes";
const My_Orders = () => {
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

export default withAuth(My_Orders);
