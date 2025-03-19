import { useUser } from "../../Providers/UserProvider";
import socketService from "../../services/socketService";
// import classes from '../Page.module.css'


const MainPage = () => {
  const {user} = useUser()
  socketService.connect();
  
  return (
    <div>
      <p>Welcome {user?.username}</p>
    </div>
  );
};

export default MainPage;