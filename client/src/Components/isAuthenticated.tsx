import { Navigate, Outlet } from "react-router-dom"

const isAuthenticated = () => !!localStorage.getItem("refreshToken");

const RedirectIfAuth: React.FC = () => {

    return isAuthenticated() ? <Navigate to="/" /> : <Outlet />
}

export default RedirectIfAuth;