import { useState, FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../Providers/AuthProvider";
import config from "../../config";
import { LoginCredentials } from '../../types/types';

const LoginFeature = () => {
  const { login, isLoading } = useUser();

  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    login(credentials);
  };
    

  return (
    <div>
      <div>
        <h1>Sign in to your account</h1>
      </div>
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