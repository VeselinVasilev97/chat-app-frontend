import { useState, useCallback, useEffect } from "react";
import socketService from "../../services/socketService";

interface User {
  user_id: string;
  username: string;
  email: string;
  isOnline: boolean;
}

const useFriends = () => {
  const [friends, setFriends] = useState<User[]>([]);

    const handleFriendListUpdate = (updatedFriends: User[]) => {
      console.log("Server is sending to frontened list of friends.");
      setFriends(updatedFriends);
    };

    
    useEffect(()=>{
      socketService.on("friendsListWithStatuses", handleFriendListUpdate);
    },[])


  const refreshFriends = useCallback(() => {
    socketService.requestFriendsWithStatuses();
  }, []);


  return {
    friends,
    refreshFriends
  };
};

export default useFriends;
