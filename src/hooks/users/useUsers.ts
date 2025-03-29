import { useState, useCallback, useEffect } from "react";
import apiService from "../../services/apiService";

interface User {
  user_id: string;
  username: string;
  email: string;
}

const useUsers = () => {
  const [searchParam, setSearchParam] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const findMatchingUsers = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (searchParam.length < 3) return;
  
      setLoading(true);
      setError(null);
  
      const response = await apiService.get<User[]>(`/api/search/${searchParam}`);
  
      if (response.data) {
        setUsers(response.data);
      } else {
        setUsers([]);
        setError(response.error);
      }
  
      setLoading(false);
    },
    [searchParam]
  );


  const findUserByEmail = useCallback(async (user_id: string) => {
    if (!user_id.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await apiService.get<{ user: User }>(
        `/api/user/${user_id}`
      );
      if (response.data) {
        return response.data;
      } else {
        setError(response.error || "User not found");
      }
    } catch (error) {
      setError("An error occurred while fetching user.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (searchParam.length === 0) {
      setUsers([]);
    }
  }, [searchParam]);

  return {
    searchParam,
    setSearchParam,
    users,
    loading,
    error,
    findMatchingUsers,
    findUserByEmail,
  };
};

export default useUsers;
