import Head from "next/head";
import Login from "../Components/Login";

const Login_user = () => {
  return (
    <>
      <Login />
      <Head>
        <title>Login</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <script
          src="https://kit.fontawesome.com/1794b9b2a9.js"
          crossOrigin="anonymous"
        ></script>
      </Head>
    </>
  );
};

export default Login_user;
