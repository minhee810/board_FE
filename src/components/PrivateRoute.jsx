import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  // 로그인 상태를 확인하는 로직
  const isAuthenticated = sessionStorage.getItem("userData") !== null;

  console.log("isAuthenticated : ", isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
