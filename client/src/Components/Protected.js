import { Navigate } from "react-router-dom";
const Protected = ({ isLoggedIn, children, next }) => {
  if (!isLoggedIn) {
    return <Navigate to={{
      pathname : '/login',
      search : '?next='+next
    }} replace />;
  }
  return children;
};
export default Protected;