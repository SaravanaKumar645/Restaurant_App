import Login_user from "../pages/login_user";
import { isAutheticated } from "./authCheck";

const withAuth = (Component) => {
  const Auth = (props) => {
    // /If user is not logged in, return login component
    if (!isAutheticated()) {
      return <Login_user />;
    }

    // /If user is logged in, return original component
    return <Component {...props} />;
  };

  // /Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
