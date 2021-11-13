const jwt = require("jsonwebtoken");
export default async function isAutheticated() {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("token")) {
    const token = localStorage.getItem("token");
    const user = jwt.decode(token);
    console.log(user);
    return user;
  } else {
    return false;
  }
}
