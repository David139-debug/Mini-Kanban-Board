import { Navigate, Outlet } from "react-router-dom"

const isAuthenticated = () => !!localStorage.getItem("refreshToken");

const RequireAuth: React.FC = () => {

  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />
}

export default RequireAuth;