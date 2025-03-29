import { useState, FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import styles from "../../features/LoginFeature/Login.module.css"; // Reusing the same styles

const RegisterFeature = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (credentials.password !== credentials.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError(null);
    // Call registration function here
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Create your account</h2>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.label}>Username</label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className={styles.input}
              placeholder="Username"
              value={credentials.username}
              onChange={handleChange}
            />
          </div>
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
          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className={styles.input}
              placeholder="Confirm Password"
              value={credentials.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className={styles.button}>Create account</button>
          <div className={styles.textCenter}>
            <Link to="/login" className={styles.link}>Already have an account? Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterFeature;
