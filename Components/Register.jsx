import React, { useState } from "react";
import styles from "../styles/Register.module.css";
import axios from "axios";
import router from "next/router";
import { toast, ToastContainer } from "react-toastify";
import Notifications from "./Notifications";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      url: "http://localhost:4000/api/register-user",
      method: "POST",
      data: { name: name, email: email, password: password, mobile: mobile },
    })
      .then((result) => {
        if (result.status === 200) {
          console.log(result.data.msg);
          console.log(result.data);
          Notifications.notifySuccess(result.data.msg);
          localStorage.setItem("token", result.data.accessToken);
          router.replace("/homepage/menu_items");
        } else if (result.status === 202) {
          console.log(result.data.msg);
          Notifications.notifyError(result.data.msg);
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
      <h1>Register your Account !</h1>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <input
          type="text"
          required
          value={name}
          maxLength={37}
          autoFocus={true}
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          type="email"
          value={email}
          required
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          minLength={5}
          maxLength={10}
          required
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input
          type="tel"
          maxLength={10}
          required
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(Number(e.target.value))}
        ></input>

        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account ?&ensp;{" "}
        <span onClick={() => router.replace("/login_user")}>Login here !</span>
      </p>
    </div>
  );
};

export default Register;
