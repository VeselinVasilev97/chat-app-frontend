import config from '../config/index'

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}


const apiService = {
  get: async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    try {
      const response = await fetch(`${config.API_URL}${endpoint}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error instanceof Error ? error.message : "Unknown error" };
    }
  },

  post: async <T>(endpoint: string, body: any): Promise<ApiResponse<T>> => {
    try {
      const response = await fetch(`${config.API_URL}${endpoint}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error instanceof Error ? error.message : "Unknown error" };
    }
  },
};

export default apiService;
