const jwt = require("jsonwebtoken");
export default function isProtected() {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("token")) {
    const token = localStorage.getItem("token");
    const user = jwt.decode(token);
    console.log(user);
    var expDate = new Date(user.exp * 1000);
    var currentDate = new Date();
    if (currentDate === expDate) {
      return false;
    }
    return true;
  } else {
    return false;
  }
}
