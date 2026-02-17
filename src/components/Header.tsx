import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header>
        <h1>Hem sidan</h1>
        <ul>
            <li><NavLink to="/">Startsidan</NavLink></li>
            <li><NavLink to="/blogg">Blogg</NavLink></li>
        </ul>
    </header>
  )
}

export default Header