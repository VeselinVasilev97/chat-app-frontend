// import NavLink from '../../components/NavLink/NavLink'
import { useState } from 'react';
import Friends from '../../features/friendsFeature/Friends';
import classes from './Sidebar.module.css'
import { FaUserFriends, FaLayerGroup } from 'react-icons/fa';
import Button from '../../components/Button/Button';
const Sidebar = () => {
  const [view, setView] = useState(true)
  return (
    <div className={classes.sidebar}>
      <Button onClick={() => setView(!view)} className={classes.switchViewBtn}>
        {
          view ?
            <FaLayerGroup
              size={30}
              color={"#262626"}
            />
            :
            <FaUserFriends
              size={30}
              color={"#262626"}
            />
        }

      </Button>
      {
        view ?
          <Friends />
          :
          <p>channels</p>
      }
    </div>
  )
}

export default Sidebar