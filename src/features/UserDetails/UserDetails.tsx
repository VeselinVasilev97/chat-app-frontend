import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../../Providers/AuthProvider';

const UserDetails = () => {
  const {user} = useUser()
  const params = useParams()
  const userId = params.userid;
  
  const getSpecificUserData = async() => {}


  useEffect(()=>{

  },[])


  return (
    <div>
      <p>{userId}</p>
    </div>
  )
}

export default UserDetails