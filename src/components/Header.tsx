import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Header = () => {

  const { user, logout } = useAuth();

  return (
    <header>
        <h1>Hem sidan</h1>
        <ul>
            <li><NavLink to="/">Startsidan</NavLink></li>
            <li><NavLink to="/blogg">Blogg</NavLink></li>
            {user && (
              <li><NavLink to="/minblogg">Min blogg</NavLink></li>
            )}
            <li>
              {
                !user ? <NavLink to="/loggain">Logga in</NavLink> : <button onClick={logout}>Logga ut</button>
              }
            </li>
        </ul>
    </header>
  )
}

export default Header