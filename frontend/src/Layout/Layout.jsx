import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Login from "../Pages/Auth/Login";
import AdminStateManager from "../utils/AdminStateManager";
import PublicStateManager from "../utils/PublicStateManager";
import AdminLayout from "./AdminLayout";
import PublicLayout from "./PublicLayout";

export default function Layout() {
    const location = useLocation();

    const navigate = useNavigate();
    useEffect(() => {
        if (location.pathname === '/') {
            navigate('/index')
        }
    })
    if (location.pathname.startsWith('/admin')) {
        if(!location.pathname.startsWith('/admin/login')){
            return (
                <RecoilRoot>
                    <AdminStateManager />
                    <AdminLayout />
                </RecoilRoot>
            )
        }

        else{
            return (
                <RecoilRoot>
                    <AdminStateManager />
                    <Login />
                </RecoilRoot>
            )
        }
        
    }


    return (
        <RecoilRoot>
            <PublicStateManager />
            <PublicLayout />
        </RecoilRoot>
    )
}