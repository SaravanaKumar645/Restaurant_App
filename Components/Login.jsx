import React, { useState } from "react";
import styles from "../styles/Login.module.css";
import { useRouter } from "next/router";
import Notifications from "./Notifications";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      url: "http://localhost:4000/api/login-user",
      method: "POST",
      data: { email: email, password: password },
    })
      .then((result) => {
        if (result.status === 200) {
          console.log(result.data.msg);
          console.log(result.data);
          Notifications.notifySuccess(result.data.msg);
          localStorage.setItem("token", result.data.accessToken);
          router.replace("/homepage/menu_items");
        } else if (result.status === 202) {
          Notifications.notifyError(result.data.msg);
          console.log(result.data.msg);
        } else if (result.status === 203) {
          Notifications.notifyError(result.data.msg);
          console.log(result.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
        Notifications.notifyError("Something went wrong .Try Again !");
      });
  };

  return (
    <div className={styles.container}>
      <ToastContainer theme="colored" autoClose={5000} position="top-right" />
      <h1>Login to your Account !</h1>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <input
          type="email"
          required
          autoFocus
          placeholder="Enter your Email ..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          required
          minLength={5}
          maxLength={10}
          placeholder="Enter your Password ..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Login</button>
      </form>
      <p>
        Don&apos;t have an account ?&ensp;{" "}
        <span onClick={() => router.replace("/register_user")}>
          Register here !
        </span>
      </p>
    </div>
  );
};

export default Login;
