// src/layouts/MainLayout.tsx
import { Outlet } from "react-router-dom";
import classes from './layout.module.css'
import Nav from "./Nav/Nav";
import Sidebar from "./Sidebar/Sidebar";

const MainLayout = () => {

    return (
        <div>
            <div className={classes.navWrapper}>
                <Nav />
            </div>
            <div className={classes.mainWrapper}>
                <div className={classes.sidebarWrapper}>
                    <Sidebar />
                </div>
                <div className={classes.contentWrapper}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
