import { useEffect } from "react";
import "../styles/globals.css";
import isAuthenticated from "../Authentication/authCheck";
import Notifications from "../Components/Notifications";
import router from "next/router";

function MyApp({ Component, pageProps }) {
  useEffect(async () => {
    const user = await isAuthenticated();
    if (
      !router.pathname.includes(["/" || "/login_user" || "register_user"]) &&
      user
    ) {
      var expDate = new Date(user.exp * 1000);
      var currentDate = new Date();
      if (currentDate === expDate) {
        Notifications.notifyError("Your session has expired .\nLogin Again !");
        return router.replace("/login_user");
      }
      console.log(expDate);
      console.log("Inside APP.js");
      console.log(currentDate);
    } else if (
      router.pathname.includes(["/login_user" || "register_user"]) &&
      user
    ) {
      var expDate = new Date(user.exp * 1000);
      var currentDate = new Date();
      if (currentDate !== expDate) {
        Notifications.notifySuccess("Cached user info . Login Success !");
        return router.replace("/homepage/menu_items");
      }
    }
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
