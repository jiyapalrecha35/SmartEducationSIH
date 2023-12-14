import { Navigate } from "react-router-dom";
const UnProtected = ({ isLoggedIn, children }) => {
  if (isLoggedIn) {
    return <Navigate to="/profile" replace />;
  }
  return children;
};
export default UnProtected;