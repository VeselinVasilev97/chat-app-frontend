// src/pages/Register.tsx
import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { RegisterCredentials } from '../../types/types';

const Register = () => {
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate passwords match
    if (credentials.password !== credentials.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    const payload = {
      username: credentials.username,
      email: credentials.email,
      password: credentials.password
    }

    try {
      // Replace with actual API call
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Store token in localStorage
      sessionStorage.setItem('token', data.token);

      // Update user state

      // Redirect to login
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <div >
      <div >
        <div>
          <h2 >
            Create your account
          </h2>
        </div>
        {error && (
          <div >
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div >
            <div>
              <label htmlFor="username">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                placeholder="Username"
                value={credentials.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" >
                Email address
              </label>
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
              <label htmlFor="password" className="sr-only">
                Password
              </label>
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
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required

                placeholder="Confirm Password"
                value={credentials.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
            // disabled={isLoading}
            >
              {/* {isLoading ? 'Creating account...' : 'Create account'} */}
            </button>
          </div>

          <div className="text-sm text-center">
            <Link to="/login" >
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;