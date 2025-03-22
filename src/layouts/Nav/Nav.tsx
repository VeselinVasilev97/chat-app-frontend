import classes from './Nav.module.css'
import { useUser } from '../../Providers/AuthProvider'
import Button from '../../components/Button/Button'
import defaultProfileImage from '../../assets/defaultProfileImg.svg'
import settigns from '../../assets/settings.svg'
import Searchbar from '../../components/Searchbar/Searchbar'
const Nav = () => {
  const { user, logout } = useUser()
  
  return (
    <nav className={classes.nav}>
      <div className={classes.navProfile}>
        <img className={classes.profileImageNav} src={user?.profile_picture_url || defaultProfileImage} />
        <p className={classes.profileUsername}>{user?.username.toUpperCase()}</p>
      </div>
      <Searchbar />
      <div className={classes.logoutWrapper}>
        <Button
        variant='outline'
        className={classes.settingsButton}
        >
          <img className={classes.settingsImage} src={settigns} alt='settings' />
        </Button>
        <Button
        variant='danger'
          onClick={logout}
        >Logout</Button>
      </div>
    </nav>
  )
}

export default Nav