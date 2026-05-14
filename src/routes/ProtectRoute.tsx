import { Navigate, Outlet } from "react-router-dom";


const ProtectRoute = () => {

    const token = localStorage.getItem("token_bablyon");

    return token ? <Outlet /> : <Navigate to="/login" replace />;

}

export default ProtectRoute