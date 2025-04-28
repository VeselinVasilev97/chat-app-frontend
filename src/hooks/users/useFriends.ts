import { useState, useCallback, useEffect } from "react";
import socketService from "../../services/socketService";

interface User {
  user_id: string;
  username: string;
  email: string;
  isOnline:boolean;
}

const useFriends = () => {
  const [friends, setFriends] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    console.log("Fetching friends list...");
    
    const handleFriendListUpdate = (updatedFriends: User[]) => {
      console.log("Updated friends list:", updatedFriends);
      
      setFriends(updatedFriends);
    };

    socketService.on("friendsListWithStatuses", handleFriendListUpdate);
    socketService.requestFriendsWithStatuses();

    return () => {
      socketService.off("friendsListWithStatuses", handleFriendListUpdate);
    };
  }, []);
  
  return {
    friends,
    loading,
    error,
    setFriends,
  };
};

export default useFriends;
