import { useSearchParams } from "react-router-dom";

const UserDetails = () => {
    const [searchParams] = useSearchParams();
    const userId = searchParams.get('userid');
    console.log(userId);
    console.log("LOGGGINGG");
    

    return (
    <div>UserDetails: ID is : {userId}</div>
  )
}

export default UserDetails