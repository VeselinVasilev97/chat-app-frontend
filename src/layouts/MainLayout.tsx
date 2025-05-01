// src/layouts/MainLayout.tsx
import { Outlet } from "react-router-dom";
import classes from './layout.module.css'
import Nav from "./Nav/Nav";
import Sidebar from "./Sidebar/Sidebar";
import ChatWindow from "../features/chat/chatWindow";

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
                    <div className={classes.content}>
                        <Outlet />
                    </div>
                    <div>
                        <ChatWindow />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MainLayout;
