import Header from "../../Components/HomeComponents/Header";
import Head from "next/head";
import Profile from "../../Components/HomeComponents/Profile";
import withAuth from "../../Authentication/protectedRoutes";

const My_Profile = () => {
  return (
    <>
      <Header />
      <Profile />
      <Head>
        <title>My Profile</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <script
          src="https://kit.fontawesome.com/1794b9b2a9.js"
          crossOrigin="anonymous"
        ></script>
      </Head>
    </>
  );
};

export default withAuth(My_Profile);
