import router from "next/router";
import isProtected from "./routeCheck";
import Notifications from "../Components/Notifications";
// const withAuth = (Component) => {
//   const Auth = async (props) => {
//     // /If user is logged in, return Original component
//     if (isProtected()) {
//       return <Component {...props} />;
//     }

//     // /If user is not logged in, return Login component
//     return <Login_user />;
//   };

//   // /Copy getInitial props so it will run as well
//   if (Component.getInitialProps) {
//     Auth.getInitialProps = Component.getInitialProps;
//   }

//   return Auth;
// };

// export default withAuth;

const withAuth = (WrappedComponent) => {
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const accessToken = isProtected();
      // If there is no access token we redirect to "/" page.
      if (!accessToken) {
        router.replace("/");
        return null;
      }
      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default withAuth;
