import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  // Hämtar inloggad användare och logout-funktion från AuthContext
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <h1 className="logo">BloggHub</h1>
      <nav>
        <ul className="nav-links">
          <li><NavLink to="/" end>Startsidan</NavLink></li>
          <li><NavLink to="/blogg">Blogg</NavLink></li>
          {user && <li><NavLink to="/minblogg">Min blogg</NavLink></li>}
          <li>
            {!user 
              ? <NavLink to="/loggain">Logga in</NavLink>
              : <button onClick={logout} className="logout-btn">Logga ut</button>
            }
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;