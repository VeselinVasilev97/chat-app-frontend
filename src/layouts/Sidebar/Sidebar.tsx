// import NavLink from '../../components/NavLink/NavLink'
import { useState } from 'react';
import Friends from '../../features/friendsFeature/Friends';
import classes from './Sidebar.module.css'
import { FaUser, FaUsers } from 'react-icons/fa';
import Button from '../../components/Button/Button';
import useFriends from '../../hooks/users/useFriends';
const Sidebar = () => {
  const [view, setView] = useState(true)
  const { friends } = useFriends();
  


  return (
    <div className={classes.sidebar}>
      <Button onClick={() => setView(!view)} className={classes.switchViewBtn}>
        {
          view ?
            <FaUser
              size={20}
              color={"#262626"}
            />
            :
            <FaUsers
              size={20}
              color={"#262626"}
            />
        }

      </Button>
      {
        view ?
          <Friends friends={friends} />
          :
          <p>channels</p>
      }
    </div>
  )
}

export default Sidebar