import { useState } from "react";
import classes from './Sidebar.module.css'
const Sidebar: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleSidebar = (state:boolean) => {
    setExpanded(state);
  }


  return(
    <div onMouseOver={() => toggleSidebar(true)} onMouseLeave={() => toggleSidebar(false)} className={expanded ? classes.sidebar : classes.sidebarCollapsed}>

    </div>
  );
}

export default Sidebar;