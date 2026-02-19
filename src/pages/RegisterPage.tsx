import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, NavLink } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { user, loading, register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/minblogg');
    }
  }, [user, loading]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      await register({ username, email, password });

      setSuccess(true);
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err: any) {
      setError(err.message || 'Registreringen misslyckades');
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h1>Registrera dig</h1>
        <form onSubmit={handleSubmit}>
          {error && <div className="error">{error}</div>}
          {success && (
            <div className="success">
              Registrering lyckades! <NavLink to="/loggain">Du kan nu logga in.</NavLink>
            </div>
          )}

          <div className="form-group">
            <label>Användarnamn</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

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

          <button type="submit" className="register-btn">Registrera</button>
        </form>

        <p className="register-link">
          Har du redan ett konto? <NavLink to="/loggain">Logga in här</NavLink>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;