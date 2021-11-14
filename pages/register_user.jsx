import Register from "../Components/Register";
import Head from "next/head";

const Register_user = () => {
  return (
    <>
      <Register />
      <Head>
        <title>Register</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <script
          src="https://kit.fontawesome.com/1794b9b2a9.js"
          crossOrigin="anonymous"
        ></script>
      </Head>
    </>
  );
};

export default Register_user;
