import { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { auth } = useContext(AuthContext);
  <Route
    {...rest}
    render={(props) =>
      auth.isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />
    }
  />;
};

export default PrivateRoute;
