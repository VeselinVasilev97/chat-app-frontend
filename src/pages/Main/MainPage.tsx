import { useUser } from "../../Providers/UserProvider";
// import classes from '../Page.module.css'


const MainPage = () => {
  const {user} = useUser()
  
  return (
    <div>
      <p>Welcome {user?.username}</p>
    </div>
  );
};

export default MainPage;