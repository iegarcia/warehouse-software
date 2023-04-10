import { Navigate } from "react-router-dom";

export function ProtectedRoutes({ children }) {
  const user = sessionStorage.getItem("user");
  console.log(user);
  if (!user) return <Navigate to="/login" />;

  return <>{children} </>;
}
