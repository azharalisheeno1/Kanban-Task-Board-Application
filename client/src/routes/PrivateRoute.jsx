
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth/useAuth";

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
