import { useState, useCallback, useEffect } from "react";
import apiService from "../../services/apiService";

interface User {
  user_id: string;
  username: string;
  email: string;
}

const useFriends = () => {
  const [friends, setFriends] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAllFriends = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.get<User[]>(`/api/users/friends`);

      if (response.data && Array.isArray(response.data)) {
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
    getAllFriends();
  }, [getAllFriends]);

  return {
    friends,
    loading,
    error,
    getAllFriends, // Expose the function for manual invocation if needed
  };
};

export default useFriends;
