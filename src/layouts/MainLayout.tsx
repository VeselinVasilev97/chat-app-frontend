// src/layouts/MainLayout.tsx
import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "../Providers/UserProvider";
import classes from './layout.module.css'
import Nav from "./Nav/Nav";
import Sidebar from "./Sidebar/Sidebar";
const MainLayout = () => {
    const { user } = useUser();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div>
            <div className={classes.navWrapper}>
                <Nav />
            </div>
            <div className={classes.mainWrapper}>
                    <Sidebar />
                <div className={classes.contentWrapper}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
