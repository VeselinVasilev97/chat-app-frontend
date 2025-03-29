import { useState, FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../Providers/AuthProvider";
import config from "../../config";
import { LoginCredentials } from '../../types/types';
import styles from "./Login.module.css";

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
<div className={styles.container}>
  <div className={styles.card}>
    <h1 className={styles.title}>Sign in to your account</h1>
    <form onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <label htmlFor="email" className={styles.label}>Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={styles.input}
          placeholder="Email address"
          value={credentials.email}
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="password" className={styles.label}>Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className={styles.input}
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className={styles.button} disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign in"}
      </button>
      <Link to={config.ROUTES.REGISTER} className={styles.link}>
        Don't have an account? Sign up
      </Link>
    </form>
  </div>
</div>

  );
};

export default LoginFeature;