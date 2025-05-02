// src/layouts/MainLayout.tsx
import { Outlet } from "react-router-dom";
import classes from './layout.module.css'
import Nav from "./Nav/Nav";
import Sidebar from "./Sidebar/Sidebar";
import Chats from "../features/chat/chats/Chats";
import { ChatProvider } from "../Providers/chat/ChatProvider";
import { useUser } from "../Providers/AuthProvider";

const MainLayout = () => {
    const { user } = useUser();
    
    if (!user) return null;

    return (
        <div>
            <div className={classes.navWrapper}>
                <Nav />
            </div>
            <div className={classes.mainWrapper}>
                <ChatProvider>
                    <div className={classes.sidebarWrapper}>
                        <Sidebar />
                    </div>
                    <div className={classes.contentWrapper}>
                        <div className={classes.content}>
                            <Outlet />
                        </div>
                        <Chats />
                    </div>
                </ChatProvider>
            </div>
        </div>
    );
};

export default MainLayout;
