import NavLink from '../../components/NavLink/NavLink'
import classes from './Sidebar.module.css'

const sidebarItems = [
  {
    pageName: 'Dashboard',
    label: 'dashboard',
    to: '/main/dashboard',
  }
]
  
const Sidebar = () => {
  return (
    <div className={classes.sidebar}>
      {
        sidebarItems.map((item) => (
          <NavLink key={item.pageName} to={item.to} label={item.label} /> 
        ))
      }
    </div>
  )
}

export default Sidebar