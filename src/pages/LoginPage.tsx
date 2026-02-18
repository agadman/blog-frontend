import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, NavLink } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const {login, user, loading} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/minblogg");
    }
  }, [user, loading]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      await login({email, password});
      navigate("/minblogg");
    } catch(error) {
      console.error("Login error:", error);
      setError("Inloggningen misslyckades. Kontrollera att du angett rätt epost och lösenord.");
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Logga in</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>E-post</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Lösenord</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">Logga in</button>
        </form>
        <p className="register-link">
          Har du inget konto? <NavLink to="/registrera">Registrera dig här</NavLink>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;