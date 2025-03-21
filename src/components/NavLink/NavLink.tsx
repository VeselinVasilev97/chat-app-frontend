import { Link } from "react-router-dom";
import classes from './NavLink.module.css'
type NavLinkProps = {
  to: string;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label }) => (
  <Link className={classes.navlink} to={to}>{label}</Link>
);

export default NavLink;