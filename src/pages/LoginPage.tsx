import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const {login, user} = useAuth();
  const navigate = useNavigate();

  // Kontrollerar användare
  useEffect(() => {
    if(user) {
      navigate("/minblogg");
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      await login({email, password});
      navigate("/minblogg");
    } catch(error) {
      setError("Inloggningen misslyckades. Kontrollera att du angett rätt epost och lösenord." + error)
    }
  }

  return (
    <div>
      <h1>Logga in</h1>

      <form onSubmit={handleSubmit}>
        {error && (
            <div>{error}</div>
        )}
        <div>
          <label>E-post</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Lösenord</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Logga in</button>
      </form>
    </div>
  );
};

export default LoginPage;