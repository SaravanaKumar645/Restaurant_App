export const isAutheticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("token")) {
    return localStorage.getItem("token");
  } else {
    return false;
  }
};
