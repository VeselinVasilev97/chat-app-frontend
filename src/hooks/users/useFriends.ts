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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAllFriends = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.get<User[]>("/api/users/friends");

      if (response.data && Array.isArray(response.data)) {
        console.log(response.data, "friends data");
        
        setFriends(response.data);
      } else {
        setError("Friend list is empty or invalid data format");
      }
    } catch (error) {
      setError("An error occurred while fetching friends.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // getAllFriends();
    console.log('we are in useEffect');
    
    // Subscribe to WebSocket updates
    const handleFriendListUpdate = (updatedFriends: User[]) => {
      console.log(updatedFriends);
      
      setFriends(updatedFriends);
    };

    socketService.on("friendsListWithStatuses", handleFriendListUpdate);
    socketService.requestFriendsWithStatuses();

    // return () => {
    //   socketService.off("friendsListWithStatuses", handleFriendListUpdate);
    // };
  }, [getAllFriends]);
  
  return {
    friends,
    loading,
    error,
    getAllFriends,
    setFriends,
  };
};

export default useFriends;
