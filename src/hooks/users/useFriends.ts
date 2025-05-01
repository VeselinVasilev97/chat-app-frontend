import { useState, useCallback, useEffect } from "react";
import apiService from "../../services/apiService";
import socketService from "../../services/socketService";

interface User {
  user_id: string;
  username: string;
  email: string;
  isOnline:boolean;
}

const useFriends = () => {
  const [friends, setFriends] = useState<User[]>([]);

  useEffect(() => {
    const handleFriendListUpdate = (updatedFriends: User[]) => {
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
    setFriends,
  };
};

export default useFriends;
