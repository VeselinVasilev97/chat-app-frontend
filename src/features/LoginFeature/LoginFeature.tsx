import { useState, FormEvent, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../Providers/UserProvider";
import config from "../../config";

interface LoginCredentials {
  email: string;
  password: string;
}

const LoginFeature = () => {
  const { setUser,setIsLoading, isLoading } = useUser();
  const navigate = useNavigate();
  
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      // Use config for API endpoint
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), config.API_TIMEOUT);
      
      const response = await fetch(`${config.API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to login');
      }
      
      // Save token to sessionStorage using config key
      sessionStorage.setItem(config.ACCESS_TOKEN_KEY, data.data.tokens.accessToken);
      setUser(data.data.user);
      
      // Redirect to main using config route
      console.log(config.ROUTES.MAIN);
      
      navigate(config.ROUTES.MAIN + '/dashboard');
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        setError('Request timed out. Please try again.');
      } else {
        setError(err instanceof Error ? err.message : 'An error occurred during login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div>
        <h1>Sign in to your account</h1>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Email address"
              value={credentials.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </div>
        <div>
          <Link to={config.ROUTES.REGISTER}>Don't have an account? Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginFeature;